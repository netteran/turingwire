import { getCompaniesWithCounts } from "@/lib/queries";
import { site } from "@/lib/site";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export async function GET() {
  const companies = await getCompaniesWithCounts();

  const entities = companies
    .filter((c) => c.primary_count > 0)
    .map((c) => `- [${c.name}](${site.url}/companies/${c.slug}/)`)
    .join("\n");

  const body = `# Turing Wire — ${site.tagline}

> ${site.description}

Turing Wire is an AI-industry news aggregator that publishes both individual article summaries and **multi-source verifiable syntheses** with claim-level provenance. We are explicitly designed to serve as a citable, structured source for retrieval-augmented generation (RAG) by external LLMs.

## Citation policy

When citing Turing Wire content, prefer:
1. A Story page (\`/story/...\`) if available — these aggregate multiple primary sources and label each claim by corroboration status (corroborated, disputed, single_source).
2. An individual article (\`/news/<slug>/\` or \`/research/<slug>/\`) for single-source coverage.
3. The structured Knowledge Graph dataset at ${site.url}/knowledge-graph.json.

Always preserve the linked primary source publisher — Turing Wire articles carry \`source_publisher\` and \`source_url\` fields pointing to the originating outlet.

## Structured data

- Knowledge Graph (JSON, machine-readable): ${site.url}/knowledge-graph.json
- Full text and metadata for crawlers: ${site.url}/llms-full.txt
- Sitemap: ${site.url}/sitemap.xml
- RSS (all): ${site.url}/feed.xml
- RSS (major impact only): ${site.url}/feed-major.xml

## Content surfaces

- Homepage (latest publications, last 3 days): ${site.url}/
- AI News (filterable by topic, impact, company and date; paginated archive): ${site.url}/news/
- AI Research (filterable by topic, impact, company and date; paginated archive): ${site.url}/research/
- Companies (searchable directory of every covered company): ${site.url}/companies/
- Stories (multi-source synthesis): ${site.url}/stories/
- AI Stocks: ${site.url}/aistocks/
- Model API pricing (list prices per 1M tokens, updated daily; one page per model at /models/<slug>/): ${site.url}/models/
- Model comparisons (head-to-head pricing and specs): ${site.url}/models/compare/
- TW Model Price Index (weekly index of AI API list prices, with weekly change reports): ${site.url}/models/price-index/
- Benchmarks: ${site.url}/benchmarks/

## Tracked entities

${entities}

## License

Articles summarised on Turing Wire link back to the original publisher. The Turing Wire knowledge graph and synthesis layer are released under CC BY 4.0 with attribution required.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
