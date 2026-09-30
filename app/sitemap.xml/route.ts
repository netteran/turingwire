import { sitemapIndexResponse } from "@/lib/sitemaps";

/**
 * Sitemap index. Kept at /sitemap.xml so the URL already submitted in Search
 * Console and listed in robots.txt keeps working; the per-type sitemaps it
 * points to are app/sitemap-<type>.xml/route.ts.
 */
// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export function GET() {
  return sitemapIndexResponse();
}
