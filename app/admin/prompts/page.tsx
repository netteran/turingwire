import { getSettings } from "@/lib/admin";
import { PromptsForm } from "@/components/admin/PromptsForm";

export const dynamic = "force-dynamic";

export default async function PromptsPage() {
  const settings = await getSettings();
  const prompts = settings.filter((s) => s.key.startsWith("prompt."));

  return (
    <>
      <p className="text-sm tw-muted mb-2 max-w-2xl">
        Every prompt the ingest pipeline sends to the model, grouped by stage. Edits
        apply to the next ingest run — no deploy needed.
      </p>
      <p className="text-xs font-mono tw-muted mb-6 max-w-2xl leading-relaxed">
        <code>{"{placeholder}"}</code> tokens are filled in per article; leave them
        as-is. Use <code>{"{{"}</code> / <code>{"}}"}</code> for a literal brace (the
        classification and company-tagging prompts use this to describe a JSON
        shape). A removed or mistyped placeholder is left in the text rather than
        breaking the run.
      </p>
      {prompts.length === 0 ? (
        <p className="tw-muted text-sm font-mono">
          No prompts defined yet — run the latest migration.
        </p>
      ) : (
        <PromptsForm prompts={prompts} />
      )}
    </>
  );
}
