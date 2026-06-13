import { useEffect } from "react";
import Lenis from "lenis";
import { theme } from "./content";
import { useScrollProgress } from "./hooks/useScrollProgress";
import DumbbellScene from "./components/DumbbellScene";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Transformations from "./components/Transformations";
import Results from "./components/Results";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const scrollRef = useScrollProgress();

  // Inject the theme colors from content.js as CSS variables.
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", theme.accent);
    r.setProperty("--accent2", theme.accent2);
    r.setProperty("--bg", theme.bg);
    r.setProperty("--panel", theme.panel);
    r.setProperty("--text", theme.text);
    r.setProperty("--muted", theme.muted);
  }, []);

  // Smooth "scroll motion" via Lenis (skipped for reduced-motion users).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Make in-page anchor links scroll smoothly through Lenis.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -72 });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <DumbbellScene scrollRef={scrollRef} />
      <Navbar />
      <main className="page">
        <Hero />
        <About />
        <Services />
        <Transformations />
        <Results />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
