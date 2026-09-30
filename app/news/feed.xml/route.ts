import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getArticlesByCategory } from "@/lib/queries";
import { site } from "@/lib/site";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export async function GET() {
  const posts = await getArticlesByCategory("news", { limit: 50 });
  const body = buildRssFeed({
    title: `${site.title} — News`,
    description: `AI industry news from ${site.title}`,
    link: `${site.url}/news/`,
    selfPath: "/news/feed.xml",
    posts,
  });
  return new Response(body, { headers: FEED_HEADERS });
}
