import { useRef } from "react";
import { transformations } from "../content";
import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";
import SplitHeading from "./motion/SplitHeading";
import { usePin } from "./motion/usePin";
import { motion as cfg, allowHeavyFx } from "../motionConfig";

export default function Transformations() {
  const section = useRef(null);
  const track = useRef(null);

  // Desktop cinematic moment: pin the section briefly while the three
  // comparison cards slide/scale into place. On mobile / reduced-motion this
  // is disabled and the cards just use the normal Reveal (no scroll-trap).
  const pinned = cfg.pins.transformations && allowHeavyFx();

  usePin(
    section,
    (tl) => {
      if (!track.current) return;
      tl.from(track.current.children, {
        xPercent: 26,
        opacity: 0,
        scale: 0.92,
        stagger: 0.18,
        ease: "power2.out",
      });
    },
    { enabled: pinned, start: "top top", end: "+=70%" }
  );

  return (
    <section className="section panel-bg" id="transformations" ref={section}>
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{transformations.kicker}</span>
          </Reveal>
          <SplitHeading className="section-title" style={{ maxWidth: "20ch" }}>
            {transformations.title}
          </SplitHeading>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{transformations.subtitle}</p>
          </Reveal>
        </div>

        <div className="ba-grid" ref={track}>
          {transformations.items.map((item, i) =>
            pinned ? (
              // When pinned, the pin timeline animates these in.
              <BeforeAfter key={i} {...item} />
            ) : (
              <Reveal key={i} delay={i * 0.1}>
                <BeforeAfter {...item} />
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
