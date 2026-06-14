import { philosophy } from "../content";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import TiltCard from "./motion/TiltCard";

export default function Philosophy() {
  return (
    <section className="section" id="philosophy">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{philosophy.kicker}</span>
          </Reveal>
          <SplitHeading className="section-title">{philosophy.title}</SplitHeading>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{philosophy.subtitle}</p>
          </Reveal>
        </div>

        <div className="principles-grid">
          {philosophy.principles.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <TiltCard max={6}>
                <div className="principle-card">
                  <span className="principle-index">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
