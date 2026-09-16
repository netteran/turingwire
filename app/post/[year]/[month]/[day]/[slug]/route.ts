import { permanentRedirect, notFound } from "next/navigation";
import { resolveLegacyPath } from "@/lib/queries";
import { articleUrl } from "@/lib/types";

/**
 * 301s the old Jekyll permalink scheme to the new section-based URLs.
 *
 *   /post/2026/09/15/<old-60-char-slug>/  ->  /news/<full-slug>/
 *
 * Every migrated row carries its original permalink in `legacy_path`, so this
 * is a single indexed lookup rather than 5,196 entries in next.config.
 */
export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string; month: string; day: string; slug: string }> },
) {
  const { year, month, day, slug } = await params;
  const legacyPath = `/post/${year}/${month}/${day}/${slug}/`;

  const target = await resolveLegacyPath(legacyPath);
  if (!target) notFound();

  permanentRedirect(articleUrl(target));
}
