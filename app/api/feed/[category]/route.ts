import { NextResponse } from "next/server";
import { getAllArticlesByCategory } from "@/lib/queries";
import { toFeedCard } from "@/lib/feed";

/**
 * Every card in a section, trimmed (lib/feed.ts), for the hub filters.
 *
 * Cached at the CDN by header rather than through ISR: an hour fresh, then
 * served stale while one request refreshes it. That costs no ISR writes, and
 * the function only runs on a cache miss, not on every ingest run.
 */
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (category !== "news" && category !== "research") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const posts = (await getAllArticlesByCategory(category))
    .filter((p) => p.title?.trim())
    .map(toFeedCard);
  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
