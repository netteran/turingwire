/**
 * Slugify matching the Python `python-slugify` output the pipeline used to
 * generate company page filenames, so `/companies/<slug>/` links resolve.
 *
 * Diacritics are transliterated (Ü -> U) rather than dropped, which is where
 * Jekyll's built-in `slugify` filter and python-slugify used to disagree.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}
