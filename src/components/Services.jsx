import { Link } from "react-router-dom";
import { programs } from "../content";
import Reveal from "./Reveal";
import TiltCard from "./motion/TiltCard";
import SplitHeading from "./motion/SplitHeading";

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
          <SplitHeading className="section-title" style={{ maxWidth: "20ch" }}>
            {programs.title}
          </SplitHeading>
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
                <div className="plan-actions">
                  {/* Primary path: apply (the form). Always works on any page. */}
                  <Link to="/apply" className="btn btn-primary">
                    {programs.applyLabel}
                  </Link>
                  {/* Optional direct-buy path. */}
                  <a
                    href={plan.buyUrl || "#"}
                    className="btn btn-ghost plan-buy"
                    {...(plan.buyUrl && plan.buyUrl.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {programs.buyLabel}
                  </a>
                </div>
              </div>
             </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
