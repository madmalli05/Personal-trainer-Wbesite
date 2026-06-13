import { transformations } from "../content";
import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";

export default function Transformations() {
  return (
    <section className="section panel-bg" id="transformations">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{transformations.kicker}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ maxWidth: "20ch" }}>
              {transformations.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{transformations.subtitle}</p>
          </Reveal>
        </div>

        <div className="ba-grid">
          {transformations.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <BeforeAfter {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
