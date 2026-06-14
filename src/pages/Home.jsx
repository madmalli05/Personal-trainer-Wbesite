import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import About from "../components/About";
import Services from "../components/Services";
import Method from "../components/Method";
import Transformations from "../components/Transformations";
import Results from "../components/Results";
import Philosophy from "../components/Philosophy";
import Resources from "../components/Resources";
import Blog from "../components/Blog";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

// The full long-scroll MadTrains homepage.
export default function Home() {
  return (
    <main className="page">
      <Hero />
      <SocialProof />
      <About />
      <Services />
      <Method />
      <Transformations />
      <Results />
      <Philosophy />
      <Resources />
      <Blog />
      <Faq />
      <Contact />
    </main>
  );
}
