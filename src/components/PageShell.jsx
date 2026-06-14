import { Link } from "react-router-dom";
import Reveal from "./Reveal";

// Standard wrapper for a dedicated route/page: a header that clears the fixed
// navbar, then the page's sections. Sits in the `.page` layer above the 3D canvas.
export default function PageShell({ kicker, title, subtitle, children }) {
  return (
    <main className="page page-route">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <Link to="/" className="page-back">
              ← Back to home
            </Link>
          </Reveal>
          {kicker && (
            <Reveal delay={0.04}>
              <span className="kicker">{kicker}</span>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1 className="page-title">{title}</h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.12}>
              <p className="section-subtitle">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </header>
      {children}
    </main>
  );
}
