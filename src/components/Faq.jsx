import { faq } from "../content";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";

// Accordion built on native <details>/<summary> (accessible by default) with a
// CSS grid-rows reveal animation. No JS state needed.
export default function Faq() {
  return (
    <section className="section panel-bg" id="faq">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{faq.kicker}</span>
          </Reveal>
          <SplitHeading className="section-title">{faq.title}</SplitHeading>
        </div>

        <div className="faq-list">
          {faq.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <div className="faq-answer-wrap">
                  <p className="faq-answer">{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
