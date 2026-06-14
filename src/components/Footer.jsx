import { brand, nav } from "../content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="brand">
          {brand.nameFirst}
          <span style={{ color: "var(--accent)" }}>{brand.nameAccent}</span>
        </div>
        <ul className="footer-links">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="copyright">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
