import PageShell from "../components/PageShell";
import Contact from "../components/Contact";

export default function ApplyPage() {
  return (
    <PageShell
      kicker="Apply"
      title="Start Your Transformation"
      subtitle="Tell me about your goals — I'll reply within 24 hours with the right path for you."
    >
      <Contact />
    </PageShell>
  );
}
