import { site, absoluteUrl } from "./site";
import type { ArticleCategory, ArticleOrigin } from "./types";

/**
 * Who an article is credited to, derived from its origin (migration 0017).
 *
 * Automated summaries are credited to the desk, an organisation; only
 * articles the editor wrote or edited in Admin carry the editor persona.
 * Putting a person's name on thousands of automated summaries was the
 * trust problem this replaces.
 */
export interface Byline {
  kind: "desk" | "editor";
  name: string;
  href: string;
  /** Reader-facing note on how the piece was produced; null when none applies. */
  disclosure: string | null;
  /** schema.org `author` value. */
  schema: Record<string, unknown>;
}

export function deskName(category: ArticleCategory): string {
  return category === "research" ? site.desks.research : site.desks.news;
}

export function deskSchema(category: ArticleCategory): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#${category === "research" ? "research-desk" : "newsdesk"}`,
    name: deskName(category),
    url: absoluteUrl(site.desks.url),
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export const editorSchema = {
  "@type": "Person",
  "@id": `${site.url}/about/editor/#editor`,
  name: site.editor.name,
  url: absoluteUrl(site.editor.url),
};

export function bylineFor(article: {
  category: ArticleCategory;
  origin?: ArticleOrigin | null;
}): Byline {
  const origin = article.origin ?? "pipeline";

  if (origin === "editor" || origin === "editor_ai") {
    return {
      kind: "editor",
      name: site.editor.name,
      href: site.editor.url,
      disclosure:
        origin === "editor_ai"
          ? `Drafted with AI assistance from the source material, then reviewed and edited by ${site.editor.name}.`
          : null,
      schema: editorSchema,
    };
  }

  return {
    kind: "desk",
    name: deskName(article.category),
    href: site.desks.url,
    disclosure:
      "An automated summary of the primary source, produced with AI under Turing Wire's editorial standards. Turing Wire is not a primary source — read the original for the authoritative account.",
    schema: deskSchema(article.category),
  };
}
