import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: scroll to top, OR to the #hash target element if the URL
 * has one (e.g. /book#policies). Waits a frame so the target has mounted.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Defer until the lazy page + section have rendered.
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}
