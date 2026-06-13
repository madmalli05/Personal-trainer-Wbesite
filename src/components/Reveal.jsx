import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { motion as cfg, allowMotion } from "../motionConfig";

// Scroll-reveal wrapper (GSAP + ScrollTrigger). Same API as before
// (`delay`, `y`, `as`, `className`, `style`) so every section keeps working —
// it just animates via GSAP now, keeping a single scroll engine.
// If motion is off (reduced-motion / touch settings), content renders visible.
export default function Reveal({
  children,
  delay = 0,
  y = cfg.reveal.y,
  className,
  style,
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current || !allowMotion()) return; // leave visible when motion is off
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: cfg.reveal.duration,
        delay,
        ease: cfg.reveal.ease,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
