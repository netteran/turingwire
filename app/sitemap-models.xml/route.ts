import { sitemapEntries, urlsetResponse } from "@/lib/sitemaps";

// Refreshed daily by this timer; deliberately not revalidated on every ingest
// run, which would cost ISR writes for little gain (app/api/revalidate).
export const revalidate = 86400;

export async function GET() {
  return urlsetResponse(await sitemapEntries("models"));
}
