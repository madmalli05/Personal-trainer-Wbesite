import { resources } from "../content";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import TiltCard from "./motion/TiltCard";

export default function Resources() {
  return (
    <section className="section panel-bg" id="resources">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{resources.kicker}</span>
          </Reveal>
          <SplitHeading className="section-title" style={{ maxWidth: "20ch" }}>
            {resources.title}
          </SplitHeading>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{resources.subtitle}</p>
          </Reveal>
        </div>

        <div className="resources-grid">
          {resources.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <TiltCard max={6}>
                <a className="resource-card" href={it.href}>
                  <span className="resource-tag">{it.tag}</span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                  <span className="resource-cta">Learn more →</span>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
