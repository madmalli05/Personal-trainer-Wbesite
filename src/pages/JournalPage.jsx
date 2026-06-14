import PageShell from "../components/PageShell";
import Blog from "../components/Blog";

export default function JournalPage() {
  return (
    <PageShell
      kicker="Journal"
      title="Training Notes"
      subtitle="Straight-talking articles on training, nutrition and mindset."
    >
      <Blog />
    </PageShell>
  );
}
