import PageShell from "../components/PageShell";
import Transformations from "../components/Transformations";
import Results from "../components/Results";

export default function TransformationsPage() {
  return (
    <PageShell
      kicker="Proof"
      title="Real Transformations"
      subtitle="The work speaks. Drag the sliders, read the wins."
    >
      <Transformations />
      <Results />
    </PageShell>
  );
}
