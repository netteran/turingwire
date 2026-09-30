import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getRecentArticles } from "@/lib/queries";
import { site } from "@/lib/site";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export async function GET() {
  const posts = await getRecentArticles(50);
  const body = buildRssFeed({
    title: site.title,
    description: site.description,
    link: site.url,
    selfPath: "/feed.xml",
    posts,
  });
  return new Response(body, { headers: FEED_HEADERS });
}
