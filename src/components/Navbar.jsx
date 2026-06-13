import { useEffect, useState } from "react";
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
        <a href="#top" className="brand" onClick={close}>
          {brand.name.split(" ")[0]}
          <span>{brand.name.split(" ").slice(1).join(" ") || ""}</span>
        </a>

        <nav>
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={brand.primaryCta.href} className="btn btn-primary nav-cta" onClick={close}>
                {brand.primaryCta.label}
              </a>
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
