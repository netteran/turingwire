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
  /**
   * Attribution line under the byline: who summarised or edited it and from
   * what; null when there is nothing to attribute (original writing). The
   * byline's "How we work" link (/about/#bylines) explains how each kind of
   * article is produced.
   */
  note: string | null;
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

/** "TechCrunch's reporting" / "the original report", for attribution lines. */
function sourceLabel(article: { source_publisher?: string | null; source_url?: string | null }): string | null {
  if (!article.source_url) return null;
  const pub = article.source_publisher?.trim();
  return pub && pub !== "Unknown" && pub !== site.title ? pub : null;
}

export function bylineFor(article: {
  category: ArticleCategory;
  origin?: ArticleOrigin | null;
  source_publisher?: string | null;
  source_url?: string | null;
  arxiv_id?: string | null;
}): Byline {
  const origin = article.origin ?? "pipeline";
  const publisher = sourceLabel(article);

  if (origin === "editor" || origin === "editor_ai") {
    return {
      kind: "editor",
      name: site.editor.name,
      href: site.editor.url,
      note:
        origin === "editor_ai" && article.source_url
          ? `Based on ${publisher ? `reporting by ${publisher}` : "the original report"}, edited by ${site.editor.name}.`
          : null,
      schema: editorSchema,
    };
  }

  return {
    kind: "desk",
    name: deskName(article.category),
    href: site.desks.url,
    note: deskNote(article.category, publisher, Boolean(article.arxiv_id)),
    schema: deskSchema(article.category),
  };
}

function deskNote(category: ArticleCategory, publisher: string | null, isPaper: boolean): string {
  if (category === "research") {
    const from = isPaper ? "the paper" : publisher ? `${publisher}'s coverage` : "the original work";
    return `Summarised from ${from} by the ${site.desks.research}. The full paper has the complete methods and results.`;
  }
  const from = publisher ? `${publisher}'s original report` : "the original report";
  return `Summarised from ${from} by the ${site.desks.news}. Read the original for the full story.`;
}
