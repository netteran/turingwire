import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getArticlesByCategory } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 600;

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
