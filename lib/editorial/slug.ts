import { slugify } from "@/lib/slugify";

/**
 * supabase_store.clean_slug(): word-boundary-aware slug capped at 80 chars.
 * Must stay the same shape as pipeline slugs.
 */
const SLUG_MAX = 80;

export function cleanSlug(title: string): string {
  let s = slugify(title) || "untitled";
  if (s.length > SLUG_MAX) {
    let cut = s.slice(0, SLUG_MAX);
    if (cut.includes("-")) {
      const trimmed = cut.slice(0, cut.lastIndexOf("-"));
      if (trimmed.length >= SLUG_MAX / 2) cut = trimmed;
    }
    s = cut.replace(/^-+|-+$/g, "");
  }
  return s.replace(/-{2,}/g, "-") || "untitled";
}
