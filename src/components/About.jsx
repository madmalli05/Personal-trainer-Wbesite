import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { about } from "../content";
import Reveal from "./Reveal";
import Img from "./Img";
import SplitHeading from "./motion/SplitHeading";
import Parallax from "./motion/Parallax";

// Counts up from 0 → value once it scrolls into view.
function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="num">
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section className="section panel-bg" id="about">
      <div className="container about-grid">
        <div className="about-text">
          <Reveal>
            <span className="kicker">{about.kicker}</span>
          </Reveal>
          <SplitHeading className="section-title">{about.title}</SplitHeading>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08} as="p" className="">
              <span style={{ display: "block" }}>{p}</span>
            </Reveal>
          ))}
        </div>

        <div className="about-media">
          <Reveal delay={0.08}>
            <Parallax speed={0.7}>
              <Img
                className="about-photo"
                src={about.image}
                alt={about.imageAlt}
                shape="portrait"
              />
            </Parallax>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="stats">
              {about.stats.map((s, i) => (
                <div className="stat" key={i}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <div className="label">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
