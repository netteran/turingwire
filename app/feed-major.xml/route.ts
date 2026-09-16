import { buildRssFeed, FEED_HEADERS } from "@/lib/rss";
import { getArticlesByImpact } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 600;

export async function GET() {
  const posts = await getArticlesByImpact(["critical", "major"], 50);
  const body = buildRssFeed({
    title: `${site.title} — Major+ Feed`,
    description: `Critical and major AI news and research from ${site.title}`,
    link: site.url,
    selfPath: "/feed-major.xml",
    posts,
    includeImpact: true,
  });
  return new Response(body, { headers: FEED_HEADERS });
}
