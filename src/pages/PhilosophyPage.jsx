import PageShell from "../components/PageShell";
import Philosophy from "../components/Philosophy";
import Method from "../components/Method";
import Resources from "../components/Resources";

export default function PhilosophyPage() {
  return (
    <PageShell
      kicker="Philosophy"
      title="Train With Intent"
      subtitle="The principles and the system behind every MadTrains program."
    >
      <Philosophy />
      <Method />
      <Resources />
    </PageShell>
  );
}
