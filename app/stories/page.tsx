import type { Metadata } from "next";
import Link from "next/link";
import { getStories } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Multi-source synthesis with claim-level provenance. Each story links every claim to the articles that support or contradict it.",
  alternates: { canonical: "/stories/" },
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[25px] pb-10">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tw-heading mb-2">
          Stories
        </h1>
        <p className="text-sm tw-muted leading-relaxed max-w-2xl">
          Each story is a multi-source synthesis of an evolving event. Every claim
          is mapped to the articles that support or contradict it, so you see
          disagreement rather than a smoothed single-tone summary.
        </p>
      </header>

      {stories.length === 0 ? (
        <p className="tw-muted text-sm">No synthesized stories yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/story/${story.slug}/`}
              className="tw-card border tw-border rounded-lg p-5 hover:border-cyan-600 transition-colors block"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {story.trust_score != null && (
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    Trust {Math.round(story.trust_score * 100)}%
                  </span>
                )}
                <span className="font-mono text-[11px] tw-muted">
                  {(story.sources ?? []).length} sources ·{" "}
                  {(story.claims ?? []).length} claims
                </span>
              </div>
              <h2 className="tw-heading font-semibold text-base leading-snug mb-1.5">
                {story.title}
              </h2>
              {story.lead && (
                <p className="text-xs tw-muted leading-relaxed">
                  {story.lead.length > 180
                    ? `${story.lead.slice(0, 180)}…`
                    : story.lead}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {(story.companies ?? []).slice(0, 4).map((co) => (
                  <span
                    key={co}
                    className="font-mono text-[10px] tw-muted border tw-border rounded px-1.5 py-0.5"
                  >
                    {co}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
