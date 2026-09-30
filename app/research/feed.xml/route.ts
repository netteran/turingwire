import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getArticlesByCategory } from "@/lib/queries";
import { site } from "@/lib/site";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export async function GET() {
  const posts = await getArticlesByCategory("research", { limit: 50 });
  const body = buildRssFeed({
    title: `${site.title} — Research`,
    description: `AI research summaries from ${site.title}`,
    link: `${site.url}/research/`,
    selfPath: "/research/feed.xml",
    posts,
  });
  return new Response(body, { headers: FEED_HEADERS });
}
