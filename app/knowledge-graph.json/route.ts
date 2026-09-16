import { getCompaniesWithCounts, getRecentArticles, getStories } from "@/lib/queries";
import { articleUrl } from "@/lib/types";
import { slugify } from "@/lib/format";
import { site } from "@/lib/site";

export const revalidate = 3600;

const org = (name: string) => ({
  "@type": "Organization",
  name,
  identifier: slugify(name),
});

export async function GET() {
  const [companies, stories, articles] = await Promise.all([
    getCompaniesWithCounts(),
    getStories(),
    getRecentArticles(200),
  ]);

  const graph = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Turing Wire Knowledge Graph",
    description:
      "Structured AI-industry knowledge graph: companies, stories, claims, citations. Designed for retrieval-augmented generation by external LLMs and search agents.",
    url: `${site.url}/knowledge-graph.json`,
    publisher: { "@type": "Organization", name: site.title, url: site.url },
    license: "https://creativecommons.org/licenses/by/4.0/",
    dateModified: new Date().toISOString(),
    keywords: ["AI", "machine learning", "news aggregation", "knowledge graph", "RAG"],

    entities: {
      organizations: companies
        .filter((c) => c.primary_count > 0)
        .map((c) => ({
          "@type": "Organization",
          name: c.name,
          url: `${site.url}/companies/${c.slug}/`,
          identifier: c.slug,
        })),
    },

    stories: stories.map((s) => ({
      "@type": "Article",
      "@id": `${site.url}/story/${s.slug}/`,
      headline: s.title,
      description: s.lead ?? "",
      datePublished: s.first_seen ? new Date(s.first_seen).toISOString() : undefined,
      dateModified: s.last_updated ? new Date(s.last_updated).toISOString() : undefined,
      trustScore: s.trust_score ?? 0,
      about: (s.companies ?? []).map(org),
      claims: (s.claims ?? []).map((c) => ({
        text: c.text,
        status: c.status,
        confidence: c.confidence ?? 0,
        supportingCount: (c.supporting ?? []).length,
        contradictingCount: (c.contradicting ?? []).length,
      })),
      citations: (s.sources ?? []).map((src) => ({
        name: src.title || src.url,
        url: src.url,
        publisher: src.publisher,
      })),
    })),

    articles: articles.map((p) => ({
      "@type": "NewsArticle",
      "@id": `${site.url}${articleUrl(p)}`,
      headline: p.title,
      datePublished: new Date(p.published_at).toISOString(),
      impact: p.impact,
      category: p.subcategory,
      about: [
        ...(p.company ? [org(p.company)] : []),
        ...p.secondary_companies.map(org),
      ],
      citation: {
        "@type": "CreativeWork",
        name: p.source_publisher,
        url: p.source_url,
      },
    })),
  };

  return Response.json(graph, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
