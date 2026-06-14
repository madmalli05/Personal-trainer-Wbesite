import PageShell from "../components/PageShell";
import About from "../components/About";

// Stage 3 adds a dedicated Training Philosophy section; for now this page
// reuses the About section so the route works end-to-end.
export default function PhilosophyPage() {
  return (
    <PageShell
      kicker="Philosophy"
      title="Train With Intent"
      subtitle="The principles behind every MadTrains program."
    >
      <About />
    </PageShell>
  );
}
