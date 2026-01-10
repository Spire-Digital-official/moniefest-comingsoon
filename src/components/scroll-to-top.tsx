import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll-to-top behaviour on route change.
// If the URL has a hash (e.g. #exhibitors) try to scroll to that element.
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Small timeout to allow the new route's DOM to render
    const t = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      // Default: scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToTop;
