import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { motion as cfg, allowMotion } from "../motionConfig";

// Single source of truth for scrolling:
//  • Lenis provides the smooth scroll (driven by GSAP's ticker so Lenis and
//    ScrollTrigger stay perfectly in sync — the canonical integration).
//  • We feed the page scroll progress (0→1) into `progressRef` so the 3D
//    scene can read it every frame without causing React re-renders.
//  • In-page anchor links scroll smoothly with an offset for the fixed navbar.
//  • Reduced-motion / motion-off: no Lenis, native scroll, progress fed from
//    the window — content and navigation still work perfectly.
export default function SmoothScroll({ progressRef, children }) {
  const lenisRef = useRef(null);
  const on = allowMotion();

  // --- Smooth (Lenis) path -------------------------------------------------
  useEffect(() => {
    if (!on) return;
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const onScroll = (l) => {
      if (progressRef) progressRef.current = l.progress ?? 0;
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const tick = (time) => lenis.raf(time * 1000); // GSAP ticker is seconds, Lenis wants ms
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smoothly scroll in-page anchor links, offset for the fixed navbar.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -72 });
        }
      }
    };
    document.addEventListener("click", onClick);

    // Recompute pin/trigger positions once fonts are ready (avoids layout shift).
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      document.removeEventListener("click", onClick);
    };
  }, [on, progressRef]);

  // --- Reduced-motion / off path: feed progress from native scroll ---------
  useEffect(() => {
    if (on) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef) progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [on, progressRef]);

  if (!on) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ duration: cfg.smooth.duration, smoothWheel: true, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}
