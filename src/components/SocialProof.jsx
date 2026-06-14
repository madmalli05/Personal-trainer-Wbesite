import { socialProof } from "../content";
import Reveal from "./Reveal";
import Counter from "./Counter";

export default function SocialProof() {
  return (
    <section className="section social-proof" id="trust">
      <div className="container">
        <Reveal>
          <p className="trust-line">{socialProof.trustLine}</p>
        </Reveal>
        <div className="trust-stats">
          {socialProof.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="trust-stat">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                <div className="label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
