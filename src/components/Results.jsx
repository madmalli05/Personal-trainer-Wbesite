import { results } from "../content";
import Reveal from "./Reveal";

export default function Results() {
  return (
    <section className="section panel-bg" id="results">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="kicker">{results.kicker}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title" style={{ maxWidth: "20ch" }}>
              {results.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-subtitle">{results.subtitle}</p>
          </Reveal>
        </div>

        <div className="testimonials">
          {results.testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="testimonial">
                <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                  {"☆".repeat(Math.max(0, 5 - t.rating))}
                </div>
                <blockquote className="quote">“{t.quote}”</blockquote>
                <figcaption className="who">
                  <div className="name">{t.name}</div>
                  <div className="result">{t.result}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
