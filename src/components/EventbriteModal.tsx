import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  eventId: string;
  height?: number;
  popupRef?: { current: Window | null };
};

const loadScript = () => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).EBWidgets) return resolve();
    const existing = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject();
    document.body.appendChild(s);
  });
};

const EventbriteModal = ({ open, onClose, eventId, height = 560, popupRef }: Props) => {
  const containerId = `eventbrite-widget-container-${eventId}`;
  const createdRef = useRef(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [widgetFailed, setWidgetFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    (async () => {
      try {
        await loadScript();
        if (cancelled) return;
        // create widget
        try {
          (window as any).EBWidgets.createWidget({
            widgetType: "checkout",
            eventId: eventId,
            iframeContainerId: containerId,
            iframeContainerHeight: height,
            onOrderComplete: () => {
              console.log("Order complete!");
            },
          });
          createdRef.current = true;

          // wait for Eventbrite to inject the iframe into the container; otherwise the widget
          // may have been blocked (adblock/CSP). Use a MutationObserver with a timeout.
          const containerEl = document.getElementById(containerId);
          let observer: MutationObserver | null = null;
          let checkTimeout: number | null = null;
          if (containerEl) {
            observer = new MutationObserver(() => {
              const iframe = containerEl.querySelector("iframe");
              if (iframe) {
                setWidgetReady(true);
                if (observer) observer.disconnect();
                if (checkTimeout) window.clearTimeout(checkTimeout);
              }
            });
            observer.observe(containerEl, { childList: true, subtree: true });

            checkTimeout = window.setTimeout(() => {
              const iframe = containerEl.querySelector("iframe");
              if (iframe) setWidgetReady(true);
              else setWidgetFailed(true);
              if (observer) observer.disconnect();
            }, 3000);
          } else {
            // container not present — mark as failed after short delay
            window.setTimeout(() => setWidgetFailed(true), 1000);
          }
        } catch (err) {
          // sometimes library exposes differently; attempt after small delay
          setTimeout(() => {
            try {
              (window as any).EBWidgets.createWidget({
                widgetType: "checkout",
                eventId: eventId,
                iframeContainerId: containerId,
                iframeContainerHeight: height,
              });
              createdRef.current = true;

              const containerEl2 = document.getElementById(containerId);
              let observer2: MutationObserver | null = null;
              let checkTimeout2: number | null = null;
              if (containerEl2) {
                observer2 = new MutationObserver(() => {
                  const iframe = containerEl2.querySelector("iframe");
                  if (iframe) {
                    setWidgetReady(true);
                    if (observer2) observer2.disconnect();
                    if (checkTimeout2) window.clearTimeout(checkTimeout2);
                  }
                });
                observer2.observe(containerEl2, { childList: true, subtree: true });

                checkTimeout2 = window.setTimeout(() => {
                  const iframe = containerEl2.querySelector("iframe");
                  if (iframe) setWidgetReady(true);
                  else setWidgetFailed(true);
                  if (observer2) observer2.disconnect();
                }, 3000);
              } else {
                window.setTimeout(() => setWidgetFailed(true), 1000);
              }
            } catch (e) {
              console.error("Failed to create Eventbrite widget", e);
              setWidgetFailed(true);
            }
          }, 300);
        }
      } catch (e) {
        console.error("Failed to load Eventbrite script", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, eventId, containerId, height]);

  // Close or redirect the popup opened on click depending on widget state
  useEffect(() => {
    const eventUrl = `https://www.eventbrite.com/e/${eventId}`;
    if (widgetReady) {
      try {
        if ((popupRef as any)?.current) {
          (popupRef as any).current.close();
          (popupRef as any).current = null;
        }
      } catch (e) {
        // ignore
      }
    }

    if (widgetFailed) {
      try {
        if ((popupRef as any)?.current) {
          (popupRef as any).current.location.href = eventUrl;
          (popupRef as any).current.focus();
          (popupRef as any).current = null;
        } else {
          window.open(eventUrl, "_blank", "noopener");
        }
      } catch (e) {
        try {
          window.open(eventUrl, "_blank", "noopener");
        } catch (e) {
          // last resort: do nothing
        }
      }
    }
  }, [widgetReady, widgetFailed, eventId, popupRef]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-[10000] w-[min(900px,96%)] max-w-[900px] bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
          <h3 className="font-semibold">Register</h3>
          <button onClick={onClose} className="text-slate-100 bg-transparent px-3 py-1 rounded-md hover:bg-slate-800">Close</button>
        </div>
        <div className="p-4 bg-white text-gray-900">
          <div>
            {!widgetReady && !widgetFailed && (
              <div className="flex items-center justify-center py-6">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
              </div>
            )}

            <div id={containerId} style={{ minHeight: Math.min(height, window.innerHeight * 0.75), maxHeight: '75vh', overflow: 'auto' }} />

            {widgetFailed && (
              <div className="mt-4">
                <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <p className="text-sm text-gray-700 mb-0">Eventbrite widget failed to load. Open the event page to register.</p>
                  <a href={`https://www.eventbrite.com/e/${eventId}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-md">Open Event Page</a>
                </div>
                <div className="mt-3">
                  <iframe title="Eventbrite" src={`https://www.eventbrite.com/e/${eventId}`} style={{ width: "100%", height: Math.min(height, window.innerHeight * 0.7), border: 0 }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default EventbriteModal;
