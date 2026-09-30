import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On-demand revalidation, called by the Ingest workflow once a run has
 * written its articles and market data.
 *
 * Pages are cached for a day and refreshed here when their content actually
 * changes, instead of re-rendering on a short timer. Every re-render is an
 * ISR write, so a timer that fires hourly across every crawled article is
 * what used to exhaust the plan's quota.
 *
 * New article pages need nothing: they have no cached copy until their first
 * visit. Edits made in /admin revalidate their own pages (app/admin/actions.ts).
 *
 * POST with `Authorization: Bearer $REVALIDATE_SECRET`.
 */

// Listings, feeds and generated files that show the newest articles or the
// market data.
const PATHS = [
  "/",
  "/publications/",
  "/stories/",
  "/aistocks/",
  "/benchmarks/",
  "/feed.xml",
  "/feed-major.xml",
  "/news/feed.xml",
  "/research/feed.xml",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
  "/knowledge-graph.json",
];

// Detail pages whose content grows with each run: a company page lists its
// articles, a story page gains the articles clustered into it. Revalidating
// the route marks every cached copy stale; only the ones visited afterwards
// are re-rendered.
const ROUTES = ["/companies/[slug]", "/story/[slug]"];

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  for (const path of PATHS) revalidatePath(path);
  for (const route of ROUTES) revalidatePath(route, "page");

  return NextResponse.json({ revalidated: [...PATHS, ...ROUTES] });
}
