import { getSources } from "@/lib/admin";
import { SourceTable } from "@/components/admin/SourceTable";
import { AddSourceForm } from "@/components/admin/AddSourceForm";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  const sources = await getSources();
  const active = sources.filter((s) => s.active);
  const deactivated = sources.filter((s) => !s.active);

  return (
    <>
      <p className="text-sm tw-muted mb-6 max-w-2xl">
        The feed list the pipeline reads. Changes take effect on the next ingest run —
        no deploy needed. Deactivating a source leaves its articles in place.
      </p>

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">
        Active ({active.length})
      </h2>
      <SourceTable sources={active} />

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3 mt-8">
        Deactivated ({deactivated.length})
      </h2>
      <SourceTable sources={deactivated} />

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3 mt-8">
        Add a source
      </h2>
      <AddSourceForm />
    </>
  );
}
