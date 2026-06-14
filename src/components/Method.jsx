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

        <div className="method-dash">
          {/* Numbered stages */}
          <ol className="method-stages">
            {method.stages.map((s, i) => (
              <Reveal key={i} delay={i * 0.06} as="li">
                <span className="stage-n">{s.n}</span>
                <div className="stage-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Muscle-system panel (futuristic dashboard) */}
          <Reveal delay={0.1}>
            <aside className="muscle-panel" aria-label="Muscle system overview">
              <div className="muscle-panel-head">
                <span className="muscle-dot" /> MUSCLE SYSTEM
                <span className="muscle-status">// ONLINE</span>
              </div>
              <ul className="muscle-zones">
                {method.muscleZones.map((z, i) => (
                  <li key={z} className="muscle-zone" style={{ "--i": i }}>
                    <span className="zone-name">{z}</span>
                    <span className="zone-bar">
                      <span className="zone-fill" />
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
