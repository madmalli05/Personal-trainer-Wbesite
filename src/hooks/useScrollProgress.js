import { useEffect, useRef } from "react";

// Returns a *ref* (not state) holding overall page scroll progress 0 → 1.
// Using a ref means the 3D render loop can read the latest value every frame
// without triggering React re-renders on every scroll tick (smooth + cheap).
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
