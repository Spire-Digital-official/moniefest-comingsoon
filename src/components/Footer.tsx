import monieLogo from "@/assets/monielogo.png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import EventbriteModal from "./EventbriteModal";

const FOOTER_EVENTBRITE_ID = "1978806719165";
const FOOTER_EVENT_URL = `https://www.eventbrite.com/e/${FOOTER_EVENTBRITE_ID}`;

const Footer = () => {
  return (
    <footer className="footer-panel bg-navy" style={{ boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.45)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* clear divider between page content and footer */}
        <div className="w-full mb-8">
          <div className="mx-auto w-full max-w-[1200px] h-1 bg-border/40 rounded-sm" />
        </div>
        <div className="footer-inner">
          {/* Left: Brand (logo only) */}
          <div className="footer-brand">
            <div style={{ width: 200 }}>
              <div className="logo-fill" style={{
                WebkitMaskImage: `url(${monieLogo})`,
                maskImage: `url(${monieLogo})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                width: '200px',
                height: '56px',
                backgroundColor: 'hsl(var(--primary))'
              }} />
            </div>
          </div>

          {/* Ticket column (opens Eventbrite in a new tab) */}
          <div className="ticket-col">
            <noscript><a href={FOOTER_EVENT_URL} rel="noopener noreferrer" target="_blank">Buy Tickets on Eventbrite</a></noscript>
            {/* Open modal on click; open a blank popup immediately to avoid popup blockers and allow fallback */}
            <TicketButton eventUrl={FOOTER_EVENT_URL} eventId={FOOTER_EVENTBRITE_ID} />
          </div>

          {/* Middle: Site links */}
          <div className="footer-links">
            <div className="footer-title text-foreground">MONIE FEST 2026</div>
            <ul>
              <li><Link className="footer-link text-white hover:text-white" to="/programme">Programme</Link></li>
              <li><Link className="footer-link text-white hover:text-white" to="/speakers">Speakers</Link></li>
              <li><Link className="footer-link text-white hover:text-white" to="/highlights">Highlights</Link></li>
              <li><Link className="footer-link text-white hover:text-white" to={{ pathname: '/', hash: '#exhibitors' }}>Sponsors</Link></li>
              <li><Link className="footer-link text-white hover:text-white" to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Right: Socials */}
          <div className="w-full">
            <div className="footer-title mb-2">Visit Our Socials</div>

            <div className="mt-4">
              <div className="sm:flex sm:justify-between sm:items-start sm:gap-5 space-y-6 sm:space-y-0">
                <div className="sm:flex-1 sm:max-w-[220px] sm:pr-6">
                  <h4 className="text-primary mb-3 whitespace-nowrap">{"Finance\u00A0Lang"}</h4>
                  <ul className="space-y-2 md:space-y-2 text-sm md:text-base leading-normal">
                    <li>
                      <a className="block text-white hover:text-white" href="https://youtube.com/@finance.lang88" target="_blank" rel="noopener noreferrer">YouTube</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="https://www.instagram.com/finance.lang" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="#">RedNote</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="#">TikTok</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="https://www.financelang.com" target="_blank" rel="noopener noreferrer">Website</a>
                    </li>
                  </ul>
                </div>

                <div className="sm:flex-1 sm:max-w-[200px] sm:px-4">
                  <h4 className="text-primary mb-3 whitespace-nowrap">Monie</h4>
                  <ul className="space-y-2 md:space-y-2 text-sm md:text-base leading-normal">
                    <li>
                      <a className="block text-white hover:text-white" href="#">Facebook</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="#">Instagram</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="#">TikTok</a>
                    </li>
                  </ul>
                </div>

                <div className="sm:flex-1 sm:max-w-[180px] sm:pl-4">
                  <h4 className="text-primary mb-3 whitespace-nowrap">{"KL\u00A0Foodie"}</h4>
                  <ul className="space-y-2 md:space-y-2 text-sm md:text-base leading-normal">
                    <li>
                      <a className="block text-white hover:text-white" href="https://www.instagram.com/kl.foodie" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="https://www.tiktok.com/@kl.foodie" target="_blank" rel="noopener noreferrer">TikTok</a>
                    </li>
                    <li>
                      <a className="block text-white hover:text-white" href="https://www.foodiemedia.com" target="_blank" rel="noopener noreferrer">Website</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="mt-10 border-t-2 border-white/10 pt-6 text-sm text-white">
            <div className="flex flex-col md:flex-row items-center justify-center text-center gap-3">
              <div className="text-white">© {new Date().getFullYear()} Monie Fest — All rights reserved.</div>
            </div>
        </div>
        {/* Modal removed: open Eventbrite in a new tab instead of an embedded modal */}
      </div>
    </footer>
  );
};

export default Footer;

function TicketButton({ eventUrl, eventId }: { eventUrl: string; eventId: string }) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<Window | null>(null);

  const handleOpen = () => {
    // open modal only; do not open a blank popup upfront to avoid navigating away
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    try {
      if (popupRef.current) {
        popupRef.current.close();
        popupRef.current = null;
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="ticket-btn inline-flex items-center gap-3 px-4 py-2 rounded-md text-black font-bold motion-safe:animate-float" style={{ background: 'linear-gradient(90deg, hsl(var(--cta-start)) 0%, hsl(var(--cta-end)) 100%)', color: '#000', fontWeight: 700 }} aria-label="Get ticket">
        <span className="ticket-icon" aria-hidden style={{ color: '#000' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span className="ticket-label" style={{ color: '#000', fontWeight: 700 }}>GET TICKET</span>
      </button>

      <EventbriteModal open={open} onClose={handleClose} eventId={eventId} popupRef={popupRef} />
    </>
  );
}
