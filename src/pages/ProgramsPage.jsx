import PageShell from "../components/PageShell";
import Services from "../components/Services";
import Faq from "../components/Faq";

export default function ProgramsPage() {
  return (
    <PageShell
      kicker="Programs"
      title="Coaching, Engineered"
      subtitle="Pick the level of support that matches your goals — every plan is fully customized."
    >
      <Services />
      <Faq />
    </PageShell>
  );
}
