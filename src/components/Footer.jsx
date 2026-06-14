import { Link } from "react-router-dom";
import { brand, nav, pages, contact } from "../content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            {brand.nameFirst}
            <span style={{ color: "var(--accent)" }}>{brand.nameAccent}</span>
          </div>
          <p className="footer-tagline">{brand.tagline}</p>
          <div className="contact-socials">
            {contact.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            {pages.map((p) => (
              <li key={p.to}>
                <Link to={p.to}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Sections</h4>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link to={`/${item.href}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
        <Link to="/apply" className="btn btn-primary footer-cta">
          {brand.primaryCta.label} →
        </Link>
      </div>
    </footer>
  );
}
