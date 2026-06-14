import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brand, nav } from "../content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="brand" onClick={close}>
          {brand.nameFirst}
          <span>{brand.nameAccent}</span>
        </Link>

        <nav>
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {nav.map((item) => (
              <li key={item.href}>
                {/* "/#section" so the link works from any page (RouteScroll handles it) */}
                <Link to={`/${item.href}`} onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={`/${brand.primaryCta.href}`}
                className="btn btn-primary nav-cta"
                onClick={close}
              >
                {brand.primaryCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
