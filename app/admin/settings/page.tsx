import { getSettings } from "@/lib/admin";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const allSettings = await getSettings();
  // Prompts have their own page (textareas, grouped by pipeline stage) —
  // see /admin/prompts.
  const settings = allSettings.filter((s) => !s.key.startsWith("prompt."));

  return (
    <>
      <p className="text-sm tw-muted mb-6 max-w-2xl">
        Pipeline configuration, read by the ingest scripts at run time. Changes apply
        to the next run without a deploy.
      </p>
      {settings.length === 0 ? (
        <p className="tw-muted text-sm font-mono">No settings defined.</p>
      ) : (
        <SettingsForm settings={settings} />
      )}
    </>
  );
}
