import { lazy, Suspense, useEffect, useRef } from "react";
import { theme } from "./content";
import SmoothScroll from "./providers/SmoothScroll";
import CustomCursor from "./components/motion/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Transformations from "./components/Transformations";
import Results from "./components/Results";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Code-split the 3D scene (three.js/R3F) out of the initial bundle — it sits
// behind the content, so a null fallback is invisible while it loads.
const DumbbellScene = lazy(() => import("./components/DumbbellScene"));

export default function App() {
  // Shared scroll progress (0→1), fed by SmoothScroll, read by the 3D scene.
  const progressRef = useRef(0);

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

  return (
    <SmoothScroll progressRef={progressRef}>
      <CustomCursor />
      <Suspense fallback={null}>
        <DumbbellScene scrollRef={progressRef} />
      </Suspense>
      <Navbar />
      <main className="page">
        <Hero />
        <About />
        <Services />
        <Transformations />
        <Results />
        <Faq />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
