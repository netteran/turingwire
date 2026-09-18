import Link from "next/link";
import { notFound } from "next/navigation";
import { getSourceById } from "@/lib/admin";
import { EditSourceForm } from "@/components/admin/EditSourceForm";

export const dynamic = "force-dynamic";

export default async function EditSourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sourceId = Number(id);
  const source = Number.isFinite(sourceId) ? await getSourceById(sourceId) : null;
  if (!source) notFound();

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link
          href="/admin/sources"
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          ← Back to sources
        </Link>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono tw-muted hover:tw-accent transition-colors"
        >
          View feed ↗
        </a>
      </div>
      <EditSourceForm source={source} />
    </>
  );
}
