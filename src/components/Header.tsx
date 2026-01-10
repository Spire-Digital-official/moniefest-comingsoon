import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import monieLogo from "@/assets/monielogo.png";

const navItems = [
  { label: "Exhibitors", route: "/", hash: "#exhibitors" },
  { label: "Programme", route: "/programme", hash: "#programme" },
  { label: "Speakers", route: "/speakers", hash: "#speakers" },
  { label: "Highlights", route: "/highlights", hash: "#highlights" },
  { label: "FAQ", route: "/faq", hash: "#faq" },
];

type HeaderProps = {
  onOpenEventbrite?: () => void;
};

const Header = ({ onOpenEventbrite }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent background scrolling when mobile menu is open
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    // ensure overflow is restored when menu closed
    document.body.style.overflow = "";
    return () => {};
  }, [isMenuOpen]);

  // When mobile menu opens, move focus to the first link for accessibility
  useEffect(() => {
    // Removed auto-focus on the first mobile link because it caused the link
    // to show focused/active styles (green + underline) on open. Leaving the
    // ref in place for potential future use.
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-black/20 md:bg-transparent backdrop-blur-md border-b border-transparent md:border-none transition-colors duration-300">
        <div className="container mx-auto px-4 py-2 md:py-2">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* Logo (masked so we can fill with exact brand color) */}
          <Link to="/" className="flex items-center" aria-label="Monie Fest 2026 home">
            <img
              src={monieLogo}
              alt="Monie Fest logo"
              className="h-6 md:h-8 w-auto object-contain mr-2"
              style={{ display: 'block', background: 'transparent' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const baseClass = "font-medium transition-colors px-3 py-2 rounded-md text-sm md:text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
              return (
                <NavLink
                  key={item.label}
                  to={`${item.route}${item.hash || ""}`}
                  onClick={(e: React.MouseEvent) => {
                    if (item.hash) {
                      e.preventDefault();
                      // Navigate to route with hash then smooth-scroll to target
                      navigate({ pathname: item.route, hash: item.hash });
                      setTimeout(() => {
                        const id = item.hash?.replace('#', '');
                        const el = id ? document.getElementById(id) : null;
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 120);
                    }
                  }}
                  className={({ isActive: navIsActive }) => `${baseClass} ${navIsActive ? "text-primary font-semibold" : "nav-link-contrast"}`}
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Button
              size="lg"
              className="register-btn-top shadow-lg text-black font-bold"
              aria-label="Get ticket"
              onClick={() => {
                if (onOpenEventbrite) return onOpenEventbrite();
                // Fallback: open Eventbrite page in a new tab when no handler supplied
                try {
                  window.open('https://www.eventbrite.com/e/1978806719165', '_blank', 'noopener');
                } catch (e) {
                  // ignore
                }
              }}
            >
              GET TICKET
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-full bg-white/5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring ring-1 ring-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
          {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-2 pb-4 border-t border-border bg-black/90 backdrop-blur-md shadow-sm rounded-b-lg overflow-hidden">
            <div className="pt-3 px-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold nav-link-contrast">Home</Link>
            </div>
            <nav className="flex flex-col gap-3 pt-2 px-4" aria-label="Mobile navigation">
              {navItems.map((item, idx) => {
                const mobileClass = "text-foreground font-medium hover:text-primary transition-colors px-3 py-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring text-lg";
                return (
                  <Link
                    key={item.label}
                    to={`${item.route}${item.hash || ""}`}
                    className={mobileClass.replace('text-foreground', 'nav-link-contrast')}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (item.hash) {
                        e.preventDefault();
                        navigate({ pathname: item.route, hash: item.hash });
                        setTimeout(() => {
                          const id = item.hash?.replace('#', '');
                          const el = id ? document.getElementById(id) : null;
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 120);
                      }
                    }}
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full register-btn-top text-black font-bold"
                  onClick={() => {
                    if (onOpenEventbrite) return onOpenEventbrite();
                    try {
                      window.open('https://www.eventbrite.com/e/1978806719165', '_blank', 'noopener');
                    } catch (e) {
                      // ignore
                    }
                  }}
                >
                  GET TICKET
                </Button>
              </div>
            </nav>
          </div>
        )}
        </div>
      </header>
      {/* Mobile-only spacer to push page content down so the hero/card isn't visible immediately */}
      <div aria-hidden className="md:hidden h-16"></div>
    </>
  );
};

export default Header;
