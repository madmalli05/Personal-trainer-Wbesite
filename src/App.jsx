import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./content";
import SmoothScroll from "./providers/SmoothScroll";
import CustomCursor from "./components/motion/CustomCursor";
import RouteScroll from "./components/RouteScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import TransformationsPage from "./pages/TransformationsPage";
import JournalPage from "./pages/JournalPage";
import ApplyPage from "./pages/ApplyPage";
import PhilosophyPage from "./pages/PhilosophyPage";

// Code-split the 3D scene (three.js/R3F) out of the initial bundle.
const DumbbellScene = lazy(() => import("./components/DumbbellScene"));

export default function App() {
  // Shared scroll progress (0→1), fed by SmoothScroll, read by the 3D scene.
  const progressRef = useRef(0);

  // Inject theme colors from content.js as CSS variables.
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
    <BrowserRouter>
      <SmoothScroll progressRef={progressRef}>
        {/* Persistent across every route: cursor, 3D backdrop, nav, footer */}
        <CustomCursor />
        <Suspense fallback={null}>
          <DumbbellScene scrollRef={progressRef} />
        </Suspense>
        <Navbar />
        <RouteScroll />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/transformations" element={<TransformationsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
