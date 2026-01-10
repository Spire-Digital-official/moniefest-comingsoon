import heroBg from "@/assets/banner_bg.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Icon = ({ name }: { name: string }) => {
  if (name === "engage") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 7h18M7 11h10M5 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function About() {
  const [showIntro, setShowIntro] = useState(true);
  const introMeasureRef = useRef<HTMLDivElement | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // No preview toggle — keep intro visible

  useEffect(() => {
    const measure = () => {
      const a = introMeasureRef.current?.offsetHeight ?? 0;
      // Further reduce defaults so the section is shorter on most screens
      const extra = 40;
      const defaultMin = 240;
      const computed = Math.max(a, defaultMin) + extra;
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);

      // Desktop: don't force height; let content flow.
      if (!mobile && window.innerWidth >= 1024) {
        setMeasuredHeight(null);
        return;
      }

      if (mobile) {
        // On mobile, use the computed content height so the card shows
        // the full intro without an inner scroll. Add a small extra
        // padding so the CTA doesn't overlap text.
        const computedMobileHeight = computed + 24;
        setMeasuredHeight(computedMobileHeight);
        return;
      }

      // For tablet widths clamp to a fixed pixel maximum (480px) and also cap by 55% of the
      // viewport height to be conservative on very short viewports.
      const clampMaxPx = 480;
      const clampMaxVh = Math.floor(window.innerHeight * 0.55);
      const clampMax = Math.min(clampMaxPx, clampMaxVh);

      const final = Math.max(defaultMin + extra, Math.min(computed, clampMax));
      setMeasuredHeight(final);
    };

    requestAnimationFrame(measure);
    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keep the intro card scrolled to top when its size or visibility changes
  useEffect(() => {
    if (!cardRef.current) return;
    // Reset scroll so the top of content is visible after layout changes
    cardRef.current.scrollTop = 0;
  }, [showIntro, measuredHeight, isMobileView]);

  return (
    <section className="pt-24 sm:pt-12 pb-10 bg-background" id="programme">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-12 relative px-4">
          <div className="pointer-events-none hidden sm:flex absolute inset-x-0 -top-8 -z-10 justify-center">
            <div
              className="w-[86%] h-28 rounded-xl opacity-10 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(72,187,120,0.25), transparent 40%)" }}
            />
          </div>

          <div className="relative z-10 py-8 sm:py-12">
            <div className="relative w-full">
              <div className="flex items-center justify-center">
                <div ref={cardRef} className={`relative w-full max-w-full bg-card border border-border rounded-xl p-6 shadow-md md:animate-float min-h-[260px] sm:min-h-[320px] lg:min-h-[460px] pb-12 sm:pb-6 overflow-visible md:overflow-auto ${isMobileView ? 'pb-24' : ''} ${!showIntro ? 'flex items-center justify-center' : ''}`} style={measuredHeight ? { height: `${measuredHeight}px`, animationDuration: '6s' } : { animationDuration: '6s' }}>
                      <div ref={introMeasureRef} className="w-full h-full flex flex-col justify-center relative">
                    <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4">Designed to go beyond traditional finance events, MONIE Fest combines</h4>

                    <div className="flex flex-col sm:flex-row items-stretch gap-6 justify-center">
                      <div className="flex-1 text-center">
                        <div className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.12)] font-extrabold tracking-wide transform transition hover:scale-105 animate-float" style={{ animationDuration: "6s", background: "linear-gradient(90deg, hsl(var(--cta-start)) 0%, hsl(var(--cta-end)) 100%)", color: "#000000" }}>
                          INVESTMENT EDUCATION
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">Practical workshops, expert panels and hands-on demos to build real skills.</p>
                      </div>

                      <div className="hidden sm:flex items-center px-2">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="plus-animate text-muted-foreground" aria-hidden style={{ display: "block" }}>
                          <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.02)" />
                          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(72,187,120,0.09)] font-extrabold tracking-wide transform transition hover:scale-105 animate-float" style={{ animationDuration: "5.2s", background: "linear-gradient(90deg, hsl(var(--cta-start)) 0%, hsl(var(--cta-end)) 100%)", color: "#000000" }}>
                          FINANCIAL CONTENT
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">High-quality talks, case studies and content that connect finance to everyday life.</p>
                      </div>

                      <div className="hidden sm:flex items-center px-2">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="plus-animate text-muted-foreground" aria-hidden style={{ display: "block", animationDuration: "2.2s" }}>
                          <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.02)" />
                          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.08)] font-extrabold tracking-wide transform transition hover:scale-105 animate-float" style={{ animationDuration: "6.6s", background: "linear-gradient(90deg, hsl(var(--cta-start)) 0%, hsl(var(--cta-end)) 100%)", color: "#000000" }}>
                          LIFESTYLE EXPERIENCES
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">Immersive brand activations, live demos and curated experiences for all ages.</p>
                      </div>
                    </div>

                    <div className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground space-y-3">
                      <p className="text-base md:text-lg">To make money topics more accessible and engaging to young Malaysians and seasoned investors.</p>
                      <p className="text-base md:text-lg">The festival expands financial participation by reaching audiences outside the existing investor community and creating a more inclusive, lifestyle-driven approach to financial literacy.</p>
                    </div>
                    
                  </div>
                  

                  {/* mobile CTA: always visible inside the card on small screens */}
                  {isMobileView && null}

                </div>
              </div>
              {!isMobileView && (
                <div className="flex justify-center mt-8 sm:mt-6">
                  <Link to="/programme" className="inline-flex items-center px-4 py-2 bg-primary text-black font-semibold rounded-full shadow-md hover:shadow-lg">View Programme</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
