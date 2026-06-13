import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { motion as cfg, allowPointerFx } from "../../motionConfig";

// A button/link that's gently "pulled" toward the cursor and springs back.
// Only active on fine-pointer (desktop) with motion enabled — on touch or
// reduced-motion it renders as a normal button and the CSS :hover is the fallback.
export default function MagneticButton({ as: Tag = "a", className, children, strength, ...rest }) {
  const ref = useRef(null);
  const s = strength ?? cfg.magnetic.strength;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !cfg.magnetic.enabled || !allowPointerFx()) return;

      // GSAP owns the transform here, so don't let CSS transition fight quickTo.
      el.style.transitionProperty = "box-shadow, background-color, border-color, color";
      el.style.willChange = "transform";

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * s);
        yTo((e.clientY - (r.top + r.height / 2)) * s);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
