import { sitemapEntries, urlsetResponse } from "@/lib/sitemaps";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export async function GET() {
  return urlsetResponse(await sitemapEntries("pages"));
}
