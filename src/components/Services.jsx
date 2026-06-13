import { programs } from "../content";
import Reveal from "./Reveal";
import TiltCard from "./motion/TiltCard";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="section" id="programs">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{programs.kicker}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ maxWidth: "20ch" }}>
              {programs.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{programs.subtitle}</p>
          </Reveal>
        </div>

        <div className="plans">
          {programs.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
             <TiltCard>
              <div className={`plan ${plan.featured ? "featured" : ""}`}>
                {plan.featured && <span className="badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <p className="blurb">{plan.blurb}</p>
                <ul>
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {plan.cta}
                </a>
              </div>
             </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
