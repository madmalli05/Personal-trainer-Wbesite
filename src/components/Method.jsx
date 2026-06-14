import { method } from "../content";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";

export default function Method() {
  return (
    <section className="section panel-bg" id="method">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{method.kicker}</span>
          </Reveal>
          <SplitHeading className="section-title">{method.title}</SplitHeading>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{method.subtitle}</p>
          </Reveal>
        </div>

        <div className="method-grid">
          {method.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="method-step">
                <span className="method-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
