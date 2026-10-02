import Link from "next/link";
import { getRecentStories } from "@/lib/queries";
import { formatDate } from "@/lib/format";

/**
 * The latest multi-source stories, featured above the feed on the homepage
 * and the /news/ and /research/ hubs. Stories are the site's most original
 * format (claims cross-checked across sources), so they lead.
 *
 * The lead card is the story with the most sources among the recently
 * updated ones — the most widely covered thread right now. On phones only
 * that card shows (compact), so the day's feed stays above the fold; from
 * the sm breakpoint up, three cards sit side by side.
 */
const CANDIDATES = 6;

export async function DevelopingStories({ limit = 3 }: { limit?: number }) {
  const recent = await getRecentStories(CANDIDATES);
  if (recent.length === 0) return null;

  const lead = recent.reduce((best, s) =>
    (s.sources ?? []).length > (best.sources ?? []).length ? s : best,
  );
  const stories = [lead, ...recent.filter((s) => s.slug !== lead.slug)].slice(0, limit);

  return (
    <section className="mb-6 sm:mb-8" aria-labelledby="developing-stories">
      <div className="flex items-baseline justify-between gap-3 mb-2 sm:mb-3">
        <h2 id="developing-stories" className="text-xs font-mono uppercase tracking-widest tw-muted">
          <span className="sm:hidden">Top story</span>
          <span className="hidden sm:inline">Developing stories</span>
        </h2>
        <Link href="/stories/" className="text-xs font-mono tw-muted hover:tw-accent transition-colors">
          All stories →
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {stories.map((s, i) => (
          <Link
            key={s.slug}
            href={`/story/${s.slug}/`}
            className={`tw-card border tw-border rounded-lg p-3 sm:p-4 hover:border-cyan-600 transition-colors ${
              i === 0 ? "block" : "hidden sm:block"
            }`}
          >
            <p className="text-sm font-semibold tw-heading leading-snug line-clamp-2 sm:line-clamp-3">{s.title}</p>
            {s.lead && (
              <p className="hidden sm:block mt-1.5 text-xs tw-muted leading-relaxed line-clamp-3">{s.lead}</p>
            )}
            <p className="mt-1.5 sm:mt-2 text-[11px] font-mono tw-muted">
              {(s.sources ?? []).length} sources
              {s.last_updated ? ` · updated ${formatDate(s.last_updated)}` : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
