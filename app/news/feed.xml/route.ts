import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getArticlesByCategory } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 600;

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
