import { getSources } from "@/lib/admin";
import { SourceTable } from "@/components/admin/SourceTable";
import { AddSourceForm } from "@/components/admin/AddSourceForm";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  const sources = await getSources();
  const news = sources.filter((s) => s.kind === "news");
  const research = sources.filter((s) => s.kind === "research");

  return (
    <>
      <p className="text-sm tw-muted mb-6 max-w-2xl">
        The feed list the pipeline reads. Changes take effect on the next ingest run —
        no deploy needed. Deactivating a source leaves its articles in place.
      </p>

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">
        News ({news.filter((s) => s.active).length}/{news.length} active)
      </h2>
      <SourceTable sources={news} />

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3 mt-8">
        Research ({research.filter((s) => s.active).length}/{research.length} active)
      </h2>
      <SourceTable sources={research} />

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3 mt-8">
        Add a source
      </h2>
      <AddSourceForm />
    </>
  );
}
