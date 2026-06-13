import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { ScrollTrigger } from "../lib/gsap";
import { motion as cfg, allowMotion } from "../motionConfig";

// Smooth scrolling that is ROBUST first:
//  • Lenis self-drives its own rAF (autoRaf: true) — it can never "freeze" the
//    page if some wiring fails. We only sync ScrollTrigger + feed scroll
//    progress on top of that.
//  • `progressRef` (0→1) is read every frame by the 3D scene (no re-renders).
//  • Reduced-motion / motion-off: no Lenis at all, native scroll.
export default function SmoothScroll({ progressRef, children }) {
  const lenisRef = useRef(null);
  const on = allowMotion();

  // --- Smooth (Lenis) path -------------------------------------------------
  useEffect(() => {
    if (!on) return;
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const onScroll = (l) => {
      const p = l.progress ?? 0;
      if (progressRef) progressRef.current = p;
      document.documentElement.style.setProperty("--sp", p);
    };
    lenis.on("scroll", onScroll);
    lenis.on("scroll", ScrollTrigger.update); // keep reveals in sync with smooth scroll

    // Smooth anchor-link scrolling, offset for the fixed navbar.
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

    // Recompute trigger positions once fonts load (avoids reveal mis-timing).
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      lenis.off("scroll", onScroll);
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
    };
  }, [on, progressRef]);

  // --- Reduced-motion / off path: feed progress from native scroll ---------
  useEffect(() => {
    if (on) return;
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
  }, [on, progressRef]);

  if (!on) return <>{children}</>;

  // autoRaf:true → Lenis runs its own loop and can't stall the page.
  return (
    <ReactLenis root ref={lenisRef} options={{ duration: 0.9, smoothWheel: true, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
