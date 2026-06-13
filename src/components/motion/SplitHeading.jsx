import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../lib/gsap";
import { motion as cfg, allowMotion } from "../../motionConfig";

// Cinematic heading: splits text into lines that rise from behind a mask on
// scroll. Falls back to plain (visible) text when motion is off. The original
// text stays in the DOM for screen readers; we add aria-label as a safety net.
export default function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  style,
  start = "top 85%",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !allowMotion() || typeof children !== "string") return;

      let split;
      const run = () => {
        // mask:"lines" wraps each line in an overflow-hidden clip for the reveal.
        split = new SplitText(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 120,
          opacity: 0,
          duration: cfg.reveal.duration,
          ease: cfg.reveal.ease,
          stagger: cfg.reveal.stagger,
          scrollTrigger: { trigger: el, start, once: true },
        });
        ScrollTrigger.refresh();
      };

      // Wait for fonts so line-wrapping (and the split) is measured correctly.
      if (document.fonts?.status === "loaded") run();
      else document.fonts?.ready.then(run);

      return () => split?.revert();
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </Tag>
  );
}
