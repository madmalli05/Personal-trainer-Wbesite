import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On route change: scroll to the hash target (e.g. /#programs) if present,
// otherwise jump to the top instantly. Lets the navbar's section links work
// from any page while keeping page navigation snappy.
export default function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // small delay so the target section is mounted before scrolling
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
