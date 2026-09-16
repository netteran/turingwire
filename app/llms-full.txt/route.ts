import { getRecentArticles, getStories } from "@/lib/queries";
import { stripMarkdown, truncateWords } from "@/lib/format";
import { articleUrl } from "@/lib/types";
import { site } from "@/lib/site";

export const revalidate = 3600;

const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "—");

export async function GET() {
  const [stories, articles] = await Promise.all([
    getStories(),
    getRecentArticles(100),
  ]);

  const storyBlocks = stories
    .map((s) => {
      const claims = (s.claims ?? [])
        .map(
          (c) =>
            `- [${c.status}] (conf ${Math.round((c.confidence ?? 0) * 100)}%) ${c.text}` +
            (c.note ? ` — Note: ${c.note}` : ""),
        )
        .join("\n");
      const sources = (s.sources ?? [])
        .map((src) => `- ${src.publisher} — ${src.title} (${src.url})`)
        .join("\n");

      return `### ${s.title}

URL: ${site.url}/story/${s.slug}/
First seen: ${day(s.first_seen)}
Last updated: ${day(s.last_updated)}
Trust score: ${Math.round((s.trust_score ?? 0) * 100)}%
Companies: ${(s.companies ?? []).join(", ")}
Sources: ${(s.sources ?? []).length} · Claims: ${(s.claims ?? []).length}

Lead: ${s.lead ?? ""}

Claims:
${claims}

Sources:
${sources}

---
`;
    })
    .join("\n");

  const articleBlocks = articles
    .map((p) => {
      const also =
        p.secondary_companies.length > 0
          ? ` (also: ${p.secondary_companies.join(", ")})`
          : "";
      const text = truncateWords(stripMarkdown(p.excerpt ?? p.description ?? ""), 220);

      return `### ${p.title}

URL: ${site.url}${articleUrl(p)}
Published: ${day(p.published_at)}
Impact: ${p.impact} · Category: ${p.subcategory}
Company: ${p.company ?? ""}${also}
Original source: ${p.source_publisher} — ${p.source_url}

${text}

---
`;
    })
    .join("\n");

  const body = `# Turing Wire — full content for LLM consumption

Generated: ${new Date().toISOString()}

This file is a flat-text export of Turing Wire's recent content, intended for ingestion by LLMs and retrieval systems. For the structured machine-readable graph, use \`/knowledge-graph.json\`.

---

## STORIES (multi-source verifiable synthesis)

${storyBlocks}

## RECENT ARTICLES

${articleBlocks}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
