import Link from "next/link";
import { getAdminStats, getRuns, getSources } from "@/lib/admin";
import { RunIngestButton } from "@/components/admin/RunIngestButton";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  success: "#16a34a",
  running: "#0891b2",
  failed: "#ef4444",
};

function when(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function duration(run: { started_at: string; finished_at: string | null }): string {
  if (!run.finished_at) return "running";
  const secs = Math.round(
    (new Date(run.finished_at).getTime() - new Date(run.started_at).getTime()) / 1000,
  );
  return secs < 60 ? `${secs}s` : `${Math.round(secs / 60)}m`;
}

export default async function AdminOverview() {
  const [stats, runs, sources] = await Promise.all([
    getAdminStats(),
    getRuns(15),
    getSources(),
  ]);

  const failing = sources.filter((s) => s.active && s.last_status === "error");

  const tiles = [
    { label: "Published", value: stats.published.toLocaleString() },
    { label: "Archived", value: stats.archived.toLocaleString() },
    { label: "Companies", value: stats.companies.toLocaleString() },
    { label: "Active sources", value: `${stats.activeSources}` },
    { label: "Latest article", value: when(stats.latestArticleAt) },
  ];

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1">
          {tiles.map((t) => (
            <div key={t.label} className="tw-card border tw-border rounded-lg px-4 py-3">
              <p className="text-xs font-mono tw-muted mb-1">{t.label}</p>
              <p className="text-lg font-semibold tw-heading font-mono">{t.value}</p>
            </div>
          ))}
        </div>
        <RunIngestButton />
      </div>

      {failing.length > 0 && (
        <div
          className="tw-card border rounded-lg p-4 mb-6"
          style={{ borderColor: "color-mix(in srgb, #ef4444 40%, transparent)" }}
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#ef4444" }}>
            {failing.length} source{failing.length !== 1 && "s"} failing
          </p>
          <ul className="space-y-1">
            {failing.slice(0, 5).map((s) => (
              <li key={s.id} className="text-xs font-mono tw-muted">
                <span className="tw-heading">{s.name}</span> — {s.last_error?.slice(0, 120)}
              </li>
            ))}
          </ul>
          <Link
            href="/admin/sources"
            className="mt-2 inline-block text-xs font-mono text-cyan-600 hover:text-cyan-500"
          >
            Manage sources →
          </Link>
        </div>
      )}

      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">
        Recent runs
      </h2>

      {runs.length === 0 ? (
        <div className="tw-card rounded-lg border tw-border p-8 text-center">
          <p className="tw-muted text-sm font-mono">No ingest runs recorded yet.</p>
          <p className="tw-muted text-xs mt-2">
            The next scheduled run is every 4 hours on weekdays, or start one now.
          </p>
        </div>
      ) : (
        <div className="tw-card rounded-xl border tw-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b tw-border"
                  style={{ background: "color-mix(in srgb, var(--border) 30%, transparent)" }}
                >
                  {["Started", "Status", "Trigger", "Took", "Articles", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2 text-xs font-mono uppercase tracking-widest tw-muted font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => {
                  const published =
                    (run.stats?.news_published ?? 0) + (run.stats?.research_published ?? 0);
                  return (
                    <tr key={run.id} className="border-b tw-border last:border-0">
                      <td className="px-4 py-2 font-mono text-xs tw-muted whitespace-nowrap">
                        {when(run.started_at)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{ color: STATUS_COLOR[run.status] ?? "var(--fg-muted)" }}
                        >
                          {run.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs tw-muted">{run.trigger}</td>
                      <td className="px-4 py-2 font-mono text-xs tw-muted">{duration(run)}</td>
                      <td className="px-4 py-2 font-mono text-xs tw-heading">
                        {published || "—"}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {run.github_run_url && (
                          <a
                            href={run.github_run_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-cyan-600 hover:text-cyan-500"
                          >
                            logs ↗
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {runs.some((r) => r.error) && (
        <div className="mt-4 tw-card border tw-border rounded-lg p-4">
          <p className="text-xs font-mono uppercase tracking-widest tw-muted mb-2">
            Last error
          </p>
          <pre className="text-xs font-mono tw-muted whitespace-pre-wrap">
            {runs.find((r) => r.error)?.error}
          </pre>
        </div>
      )}
    </>
  );
}
