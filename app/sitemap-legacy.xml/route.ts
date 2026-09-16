import { getAllLegacyPaths } from "@/lib/queries";
import { site } from "@/lib/site";

/**
 * Temporary sitemap of pre-migration Jekyll permalinks (/post/YYYY/MM/DD/<slug>/),
 * every one of which 301s to its current /<category>/<slug>/ address (see
 * app/post/[year]/[month]/[day]/[slug]/route.ts).
 *
 * Search Console's Page Indexing report showed ~5,200 of these sitting as
 * "Discovered/Crawled — currently not indexed": Google knew the URLs from the
 * old site but had no current signal telling it they now redirect, so it
 * wasn't prioritizing crawling them. Listing known-redirecting URLs in a
 * sitemap isn't how sitemaps are meant to be used long-term, but Google's own
 * site-move guidance endorses it as a temporary accelerant during a large
 * migration. Retire this route (and its robots.txt entry) once Search
 * Console's "Page with redirect" count for these has absorbed the backlog —
 * expect a few months, not weeks.
 */
export const revalidate = 86400;

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });
}

export async function GET() {
  const paths = await getAllLegacyPaths();

  const urls = paths
    .map((p) => `<url><loc>${escapeXml(`${site.url}${p}`)}</loc></url>`)
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
