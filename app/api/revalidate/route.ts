import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On-demand revalidation, called by the Ingest workflow once a run has
 * written its articles and market data.
 *
 * Pages are cached for a day and refreshed here when their content actually
 * changes, instead of re-rendering on a short timer. Every re-render is an
 * ISR write, so a timer that fires hourly across every crawled article is
 * what used to exhaust the plan's quota. For the same reason only pages
 * whose freshness matters within the day are listed below.
 *
 * New article pages need nothing: they have no cached copy until their first
 * visit. Edits made in /admin revalidate their own pages (app/admin/actions.ts).
 *
 * POST with `Authorization: Bearer $REVALIDATE_SECRET`.
 */

// Listings and feeds that show the newest articles or the market data, and
// the sitemaps that announce new articles. Everything else (company, model
// and archive pages, llms*.txt, the knowledge graph) refreshes on its daily
// timer: each path here is re-rendered up to six times a weekday,
// and every re-render is billed as ISR writes by size (8 KB units).
const PATHS = [
  "/",
  "/stories/",
  "/aistocks/",
  "/feed.xml",
  "/feed-major.xml",
  "/news/feed.xml",
  "/research/feed.xml",
  "/news/",
  "/research/",
  "/sitemap.xml",
  "/sitemap-news.xml",
  "/sitemap-research.xml",
  "/sitemap-stories.xml",
];

// Story pages gain sources on any run, and the homepage's story cards link
// to them, so they shouldn't lag a day behind. Revalidating the route marks
// every cached copy stale; only the ones visited afterwards re-render.
const ROUTES = ["/story/[slug]"];

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  for (const path of PATHS) revalidatePath(path);
  for (const route of ROUTES) revalidatePath(route, "page");

  return NextResponse.json({ revalidated: [...PATHS, ...ROUTES] });
}
