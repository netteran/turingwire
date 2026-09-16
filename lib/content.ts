import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Static editorial pages.
 *
 * Two kinds, both kept in the repo rather than the articles table because
 * they're hand-written and rarely change:
 *
 *   content/*.md        prose pages (about, privacy, terms…), rendered via marked
 *   content/html/*.html pages whose original markup was worth preserving
 *                       verbatim (the Alan Turing profile, the contact form,
 *                       the Missions tool). Their inline <script> blocks were
 *                       extracted to public/assets/js/page-<name>.js, since
 *                       markup injected as HTML never executes scripts.
 */
const CONTENT_DIR = path.join(process.cwd(), "content");
const HTML_DIR = path.join(CONTENT_DIR, "html");

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
  /** Extracted script to load after hydration, if the page had one. */
  script?: string | null;
  /** True when the markup carries a share-button placeholder. */
  hasShareSlot?: boolean;
  /** HTML pages get the page chrome; prose pages get the heading block. */
  raw?: boolean;
}

export const SHARE_SLOT = '<div data-share-slot="1"></div>';

function toSegments(permalink: string): string[] {
  return permalink.split("/").filter(Boolean);
}

function readMarkdownPages(): ContentPage[] {
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
        raw: false,
      };
    });
}

interface HtmlManifestEntry {
  permalink: string;
  title: string;
  description: string;
  script: string | null;
}

function readHtmlPages(): ContentPage[] {
  const manifestPath = path.join(HTML_DIR, "manifest.json");
  if (!fs.existsSync(manifestPath)) return [];

  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, "utf8"),
  ) as Record<string, HtmlManifestEntry>;

  return Object.entries(manifest).map(([name, entry]) => {
    const html = fs.readFileSync(path.join(HTML_DIR, `${name}.html`), "utf8");
    return {
      permalink: entry.permalink,
      segments: toSegments(entry.permalink),
      title: entry.title,
      description: entry.description,
      sitemap: true,
      html,
      script: entry.script,
      hasShareSlot: html.includes(SHARE_SLOT),
      raw: true,
    };
  });
}

export function getContentPages(): ContentPage[] {
  return [...readMarkdownPages(), ...readHtmlPages()];
}

export function getContentPage(segments: string[]): ContentPage | null {
  const target = segments.join("/");
  return getContentPages().find((p) => p.segments.join("/") === target) ?? null;
}
