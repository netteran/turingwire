import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Static editorial pages (about, privacy, terms…).
 *
 * These were Jekyll pages with front matter and markdown bodies. They stay as
 * markdown files in the repo — they're hand-written, rarely change, and belong
 * in version control rather than in the articles table.
 */
const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ContentPage {
  /** URL path, from the original Jekyll `permalink`. */
  permalink: string;
  /** Path segments, for generateStaticParams. */
  segments: string[];
  title: string;
  description?: string;
  /** Jekyll `redirect_to` — the page 301s instead of rendering. */
  redirectTo?: string;
  sitemap: boolean;
  html: string;
}

function toSegments(permalink: string): string[] {
  return permalink.split("/").filter(Boolean);
}

export function getContentPages(): ContentPage[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const permalink: string = data.permalink ?? `/${file.replace(/\.md$/, "")}/`;

      return {
        permalink,
        segments: toSegments(permalink),
        title: data.title ?? "",
        description: data.description,
        redirectTo: data.redirect_to,
        sitemap: data.sitemap !== false,
        html: marked.parse(content, { async: false }) as string,
      };
    });
}

export function getContentPage(segments: string[]): ContentPage | null {
  const target = segments.join("/");
  return (
    getContentPages().find((p) => p.segments.join("/") === target) ?? null
  );
}
