import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Transformations from "../components/Transformations";
import Results from "../components/Results";
import Faq from "../components/Faq";
import Blog from "../components/Blog";
import Contact from "../components/Contact";

// The full long-scroll MadTrains homepage. (New brand sections are slotted in
// during stage 3 — this keeps every existing section and reorders cleanly.)
export default function Home() {
  return (
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
  );
}
