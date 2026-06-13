import { useEffect } from "react";

// Native scrolling (no smooth-scroll library) for maximum reliability:
// wheel, trackpad, scrollbar, keyboard and touch all just work. Smoothness for
// anchor links comes from CSS `scroll-behavior: smooth` (disabled automatically
// for reduced-motion). We only track scroll progress (0→1) here:
//  • `progressRef` is read every frame by the 3D scene (no React re-renders).
//  • `--sp` drives the living background glow (see body::before in index.css).
// GSAP ScrollTrigger updates itself on native scroll, so nothing else is needed.
export default function SmoothScroll({ progressRef, children }) {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progressRef) progressRef.current = p;
      document.documentElement.style.setProperty("--sp", p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progressRef]);

  return <>{children}</>;
}
