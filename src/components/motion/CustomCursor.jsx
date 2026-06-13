import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { motion as cfg, allowPointerFx } from "../../motionConfig";

const INTERACTIVE = 'a,button,input,textarea,summary,label,[role="button"],.tilt,.ba-range';

// A two-part cursor (precise dot + trailing ring) that grows over interactive
// elements. Desktop / fine-pointer only — never renders behavior on touch or
// for reduced-motion, where the native cursor is left untouched.
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useGSAP(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r || !cfg.cursor.enabled || !allowPointerFx()) return;

    document.body.classList.add("cursor-active");
    gsap.set([d, r], { xPercent: -50, yPercent: -50 });

    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.4, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.4, ease: "power3" });

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e) => e.target.closest?.(INTERACTIVE) && r.classList.add("hover");
    const out = (e) => e.target.closest?.(INTERACTIVE) && r.classList.remove("hover");
    const down = () => r.classList.add("down");
    const up = () => r.classList.remove("down");

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
