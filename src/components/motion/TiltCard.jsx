import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { motion as cfg, allowPointerFx } from "../../motionConfig";

// Wraps a card and gives it a 3D tilt-toward-cursor with a soft glare highlight.
// Fine-pointer + motion-on only; on touch/reduced-motion it's an inert wrapper
// (the inner card's CSS handles its own resting state).
export default function TiltCard({ children, className = "", max, glare = true }) {
  const ref = useRef(null);
  const m = max ?? cfg.tilt.max;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !cfg.tilt.enabled || !allowPointerFx()) return;

      gsap.set(el, { transformPerspective: 800, transformStyle: "preserve-3d" });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });
      const glareEl = glare ? el.querySelector(".tilt-glare") : null;

      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * m);
        rx(-py * m);
        if (glareEl) {
          glareEl.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${
            (py + 0.5) * 100
          }%, rgba(255,255,255,0.18), transparent 55%)`;
        }
      };
      const enter = () => glareEl && gsap.to(glareEl, { opacity: 1, duration: 0.3 });
      const leave = () => {
        rx(0);
        ry(0);
        if (glareEl) gsap.to(glareEl, { opacity: 0, duration: 0.5 });
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
      {glare && <span className="tilt-glare" aria-hidden="true" />}
    </div>
  );
}
