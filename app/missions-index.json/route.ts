import { getRecentArticles, getStories } from "@/lib/queries";
import { stripMarkdown, truncateWords } from "@/lib/format";
import { articleUrl } from "@/lib/types";

export const revalidate = 600;

/** Flat index consumed by the client-side Missions tool. */
export async function GET() {
  const [articles, stories] = await Promise.all([
    getRecentArticles(500),
    getStories(),
  ]);

  const items = [
    ...articles.map((p) => ({
      type: "post" as const,
      title: p.title,
      url: articleUrl(p),
      date: new Date(p.published_at).toISOString(),
      company: p.company ?? "",
      secondary_companies: p.secondary_companies,
      companies: [] as string[],
      impact: p.impact,
      subcategory: p.subcategory,
      category: p.category,
      summary: truncateWords(stripMarkdown(p.excerpt ?? p.description ?? ""), 60),
      trust_score: 0,
    })),
    ...stories.map((s) => ({
      type: "story" as const,
      title: s.title,
      url: `/story/${s.slug}/`,
      date: new Date(s.last_updated ?? s.first_seen ?? Date.now()).toISOString(),
      company: "",
      secondary_companies: [] as string[],
      companies: s.companies ?? [],
      impact: "",
      subcategory: "",
      category: "stories",
      summary: truncateWords(s.lead ?? "", 60),
      trust_score: s.trust_score ?? 0,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return Response.json(items, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
