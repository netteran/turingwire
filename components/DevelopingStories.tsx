import Link from "next/link";
import { getRecentStories } from "@/lib/queries";
import { formatDate } from "@/lib/format";

/**
 * The latest multi-source stories, featured above the feed on the homepage
 * and the /news/ and /research/ hubs. Stories are the site's most original
 * format (claims cross-checked across sources), so they lead.
 */
export async function DevelopingStories({ limit = 3 }: { limit?: number }) {
  const stories = await getRecentStories(limit);
  if (stories.length === 0) return null;

  return (
    <section className="mb-8" aria-labelledby="developing-stories">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 id="developing-stories" className="text-xs font-mono uppercase tracking-widest tw-muted">
          Developing stories
        </h2>
        <Link href="/stories/" className="text-xs font-mono tw-muted hover:tw-accent transition-colors">
          All stories →
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {stories.map((s) => (
          <Link
            key={s.slug}
            href={`/story/${s.slug}/`}
            className="tw-card border tw-border rounded-lg p-4 hover:border-cyan-600 transition-colors block"
          >
            <p className="text-sm font-semibold tw-heading leading-snug line-clamp-3">{s.title}</p>
            {s.lead && <p className="mt-1.5 text-xs tw-muted leading-relaxed line-clamp-3">{s.lead}</p>}
            <p className="mt-2 text-[11px] font-mono tw-muted">
              {(s.sources ?? []).length} sources
              {s.last_updated ? ` · updated ${formatDate(s.last_updated)}` : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
