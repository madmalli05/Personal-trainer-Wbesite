import PageShell from "../components/PageShell";
import About from "../components/About";

export default function AboutPage() {
  return (
    <PageShell
      kicker="About"
      title="The MadTrains Standard"
      subtitle="Premium coaching built on smart programming, real nutrition and relentless accountability."
    >
      <About />
    </PageShell>
  );
}
