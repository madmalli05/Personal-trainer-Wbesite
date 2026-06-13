import { useRef } from "react";
import { brand } from "../content";
import { gsap, useGSAP } from "../lib/gsap";
import { motion as cfg, allowMotion, allowHeavyFx } from "../motionConfig";
import MagneticButton from "./motion/MagneticButton";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !allowMotion()) return;
      const q = gsap.utils.selector(el);

      // --- Entrance: title lines rise from behind their mask, then tagline/CTAs.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q(".hero-title .line > span"), { yPercent: 118, duration: 0.95, stagger: 0.12 }, 0.1)
        .from(q(".hero-tagline"), { y: 26, opacity: 0, duration: 0.7 }, 0.55)
        .from(q(".hero-actions"), { y: 26, opacity: 0, duration: 0.7 }, 0.68)
        .from(q(".scroll-cue"), { opacity: 0, duration: 0.6 }, 0.85);

      // --- Pinned scroll choreography (desktop only): the hero holds while its
      // content parallaxes up and fades, handing off to the next section.
      if (cfg.pins.hero && allowHeavyFx()) {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "+=90%", scrub: true, pin: true, anticipatePin: 1 },
          })
          .to(q(".hero-inner"), { yPercent: -16, opacity: 0, ease: "none" }, 0)
          .to(q(".scroll-cue"), { opacity: 0, ease: "none", duration: 0.25 }, 0);
      }
    },
    { scope: root }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="container hero-inner">
        <h1 className="hero-title">
          {brand.headlineLines.map((line, i) => (
            <span className="line" key={i}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-tagline">{brand.tagline}</p>

        <div className="hero-actions">
          <MagneticButton as="a" href={brand.primaryCta.href} className="btn btn-primary magnetic">
            {brand.primaryCta.label} →
          </MagneticButton>
          <MagneticButton as="a" href={brand.secondaryCta.href} className="btn btn-ghost magnetic">
            {brand.secondaryCta.label}
          </MagneticButton>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse" />
        Scroll
      </div>
    </section>
  );
}
