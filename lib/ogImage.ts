import { absoluteUrl } from "./site";

/**
 * Absolute URL of the generated 1200×630 share card (app/og/[kind]/[slug]).
 * Trailing slash matches `trailingSlash: true`, so crawlers don't take a
 * redirect hop to fetch it.
 */
export function ogImageUrl(kind: "news" | "research" | "story", slug: string): string {
  return absoluteUrl(`/og/${kind}/${encodeURIComponent(slug)}/`);
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
