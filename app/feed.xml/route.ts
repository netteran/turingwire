import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getRecentArticles } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 600;

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
