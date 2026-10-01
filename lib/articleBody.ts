import { marked } from "marked";

/**
 * Article bodies are LLM-written Markdown whose section labels come in a few
 * shapes rather than as `##` headings:
 *
 *   **Problem**                      a bold line of its own, text on the next line
 *   **Why it matters:** The new …    a short bold lead-in with a separator
 *   Glow Security's Findings         a short unpunctuated plain line, text below
 *
 * The stylesheet used to guess at these with `.tw-prose strong:first-child`,
 * but `:first-child` ignores text nodes, so any bold phrase that happened to
 * be a paragraph's first *element* — even mid-sentence — was pulled out into
 * a block-level uppercase label. Labels are now recognised here, where the
 * surrounding text is visible, and emitted as real headings; every other
 * <strong> stays inline.
 */

/** Longest run of words still read as a label rather than a sentence. */
const MAX_LABEL_WORDS = 6;
const MAX_PLAIN_HEADING_WORDS = 8;

const label = (text: string) => `<h3 class="tw-section-label">${text}</h3>`;
const para = (html: string) => (html.trim() ? `<p>${html.trim()}</p>` : "");

function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, "").trim().split(/\s+/).filter(Boolean).length;
}

function splitLabel(inner: string): string | null {
  // **Label** alone, or followed by a line break.
  const own = inner.match(/^<strong>([^<]+?)<\/strong>\s*(?:<br\s*\/?>|\n|$)([\s\S]*)$/);
  if (own && wordCount(own[1]) <= MAX_LABEL_WORDS) {
    return label(own[1].replace(/[:.]\s*$/, "")) + para(own[2]);
  }

  // **Label:** text, **Label** — text, **Label**: text
  const runIn = inner.match(/^<strong>([^<]+?)<\/strong>\s*([:—–]|-\s)?\s*([\s\S]+)$/);
  if (runIn) {
    const [, text, sep, rest] = runIn;
    const endsWithColon = /:\s*$/.test(text);
    if ((sep || endsWithColon) && wordCount(text) <= MAX_LABEL_WORDS) {
      return label(text.replace(/:\s*$/, "")) + para(rest);
    }
  }

  // Short plain-text line with no closing punctuation, then a line break.
  const plain = inner.match(/^([^<\n]+?)\n([\s\S]+)$/);
  if (
    plain &&
    wordCount(plain[1]) <= MAX_PLAIN_HEADING_WORDS &&
    !/[.,;:!?…"”)]\s*$/.test(plain[1])
  ) {
    return label(plain[1]) + para(plain[2]);
  }

  return null;
}

export function renderArticleBody(markdown: string): string {
  const html = marked.parse(markdown, { async: false }) as string;
  return html.replace(/<p>([\s\S]*?)<\/p>/g, (match, inner: string) => {
    return splitLabel(inner.trim()) ?? match;
  });
}
