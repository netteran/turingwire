/**
 * Quality helpers ported from scripts/quality.py, so Admin-drafted articles
 * are held to the same checks as pipeline output. Here they produce
 * warnings for the editor to review rather than silently dropping the draft.
 */

// Keep in sync with BAN_PHRASES in scripts/quality.py.
export const BAN_PHRASES = [
  "competitive landscape is heating up",
  "heating up",
  "implications could be substantial",
  "implications are substantial",
  "could be substantial",
  "for users, this means",
  "for users, the",
  "looking ahead",
  "crucial to monitor",
  "important to monitor",
  "remains to be seen",
  "game-changer",
  "game changer",
  "in a rapidly evolving",
  "rapidly evolving",
  "only time will tell",
  "it will be crucial",
  "it will be important",
  "this could lead to a cascade",
];

const GUIDE_RE = /\b(guide|how to|how-to|tutorial|step[-\s]?by[-\s]?step|walkthrough)\b/i;
const STEP_RE = /(^\s*\d+[.)]\s)|(\bstep\s*\d)|(^\s*[-*]\s)/im;
const NUM_RE = /\d[\d,]*\.?\d*/g;
const ARXIV_ID_RE = /\b\d{4}\.\d{4,5}\b/g;

const SUPERLATIVE_RE =
  /\b(fastest|largest|strongest|biggest|best|smartest|most powerful|revolutionary|groundbreaking|game[-\s]?chang\w+|unbelievable|insane|mind[-\s]?blowing|you won'?t believe|shocking|stunning|jaw[-\s]?dropping)\b/i;

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** quality.scaled_word_target: length follows the amount of source material. */
export function scaledWordTarget(
  sourceWords: number,
  { minFloor, maxFloor, maxCap, ratio = 0.5 }: { minFloor: number; maxFloor: number; maxCap: number; ratio?: number },
): { minWords: number; maxWords: number } {
  const maxWords = Math.min(maxCap, Math.max(maxFloor, Math.round(sourceWords * ratio)));
  const minWords = Math.max(minFloor, Math.min(maxWords - 50, Math.round(maxWords * 0.32)));
  return { minWords, maxWords };
}

/** quality.clean_headline: null when the headline should be rejected. */
export function cleanHeadline(raw: string): string | null {
  if (!raw) return null;
  let h = raw.trim();
  if (h.toUpperCase().startsWith("TITLE:")) h = h.slice(6).trim();
  h = h.replace(/^["']+|["']+$/g, "").replace(/\s+/g, " ").trim();
  if (h.length < 15 || h.length > 110) return null;
  if (SUPERLATIVE_RE.test(h)) return null;
  return h;
}

/** quality.parse_summary_output: {title, meta, body} from a model response. */
export function parseSummaryOutput(raw: string): { title: string; meta: string; body: string } {
  let text = (raw ?? "").trim();
  if (text.startsWith("```")) text = text.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();

  try {
    const d = JSON.parse(text);
    if (d && typeof d === "object") {
      const body = String(d.body ?? "").trim();
      if (body) {
        return {
          title: String(d.title ?? "").trim(),
          meta: String(d.meta ?? d.description ?? "").trim(),
          body,
        };
      }
    }
  } catch {
    // fall through to the header-line protocol
  }

  const lines = text.split("\n");
  let title = "";
  let meta = "";
  let i = 0;
  while (i < lines.length) {
    const s = lines[i].trim().replace(/^\*+/, "").trim();
    if (s.toUpperCase().startsWith("TITLE:")) {
      title = s.split(":").slice(1).join(":").trim().replace(/^["']|["']$/g, "");
      i++;
    } else if (s.toUpperCase().startsWith("META:")) {
      meta = s.split(":").slice(1).join(":").trim().replace(/^["']|["']$/g, "");
      i++;
    } else if (s === "" && (title || meta)) {
      i++;
      break;
    } else {
      break;
    }
  }
  return { title, meta, body: lines.slice(i).join("\n").trim() };
}

export function findBannedPhrases(text: string): string[] {
  const low = text.toLowerCase();
  return BAN_PHRASES.filter((p) => low.includes(p));
}

export function isDeceptiveHeadline(title: string, body: string): boolean {
  return GUIDE_RE.test(title ?? "") && !STEP_RE.test(body ?? "");
}

/** quality.ungrounded_numbers: figures in the summary that aren't in the source. */
export function ungroundedNumbers(summary: string, sourceBody: string): string[] {
  const src = (sourceBody ?? "").replaceAll(",", "");
  const arxivIds = new Set((summary.match(ARXIV_ID_RE) ?? []).map((m) => m.replaceAll(",", "")));
  const bad: string[] = [];
  for (const m of summary.match(NUM_RE) ?? []) {
    const digits = m.replaceAll(",", "").replace(/\.$/, "");
    const core = digits.replaceAll(".", "");
    if (core.length < 2) continue;
    if (arxivIds.has(digits)) continue;
    if (!src.includes(digits) && !src.includes(core)) bad.push(digits);
  }
  return [...new Set(bad)];
}

/** Every check the pipeline's gate runs, as reviewable warnings. */
export function qualityWarnings(
  { title, body }: { title: string; body: string },
  sourceBody?: string,
): string[] {
  const warnings: string[] = [];
  const banned = findBannedPhrases(body);
  if (banned.length) warnings.push(`Boilerplate phrase(s): ${banned.slice(0, 3).join(", ")}`);
  if (isDeceptiveHeadline(title, body)) {
    warnings.push("Headline promises a guide/tutorial but the body has no steps");
  }
  if (SUPERLATIVE_RE.test(title)) warnings.push("Headline uses a marketing superlative");
  if (sourceBody) {
    const bad = ungroundedNumbers(body, sourceBody);
    if (bad.length) {
      warnings.push(`Figures not found in the source (check them): ${bad.slice(0, 6).join(", ")}`);
    }
  }
  return warnings;
}
