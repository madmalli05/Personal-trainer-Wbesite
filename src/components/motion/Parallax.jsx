import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { motion as cfg, allowMotion, allowHeavyFx } from "../../motionConfig";

// Moves its content vertically as the section scrolls through the viewport,
// creating depth. `speed` is relative to motionConfig.parallax.depth.
// Desktop + motion-on only (no parallax churn on mobile/reduced-motion).
export default function Parallax({ children, speed = 1, className, style }) {
  const ref = useRef(null);
  const travel = cfg.parallax.depth * speed * 100; // in % of own height

  useGSAP(
    () => {
      if (!ref.current || !allowMotion() || !allowHeavyFx() || travel === 0) return;
      gsap.fromTo(
        ref.current,
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
