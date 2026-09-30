/**
 * The ingest pipeline's classify → extract → write stages, callable from
 * Admin for custom articles. Mirrors scripts/classify_article.py,
 * scripts/summarize_news.py and scripts/summarize_research.py, and reads
 * the same `prompt.*` rows from `settings`, so edits on /admin/prompts
 * apply here too.
 *
 * Server-only. Runs on the signed-in admin's Supabase session (settings
 * are admin-readable only).
 */

import type { SupabaseClient } from "@supabase/supabase-js";

import { slugify } from "@/lib/slugify";
import type { ArticleCategory, ArticleImpact } from "@/lib/types";
import { callLlm, hasKeyFor } from "./llm";
import {
  cleanHeadline,
  parseSummaryOutput,
  qualityWarnings,
  scaledWordTarget,
  wordCount,
} from "./quality";
import { SUBCATEGORIES } from "./taxonomy";

const IMPACTS: ArticleImpact[] = ["critical", "major", "notable", "minor"];

/** Pipeline constants (scripts/summarize_*.py). */
const LENGTH = {
  news: { minFloor: 120, maxFloor: 500, defaultCap: 1500, capKey: "news_max_words", temperature: 0.3 },
  research: { minFloor: 200, maxFloor: 700, defaultCap: 2200, capKey: "research_max_words", temperature: 0 },
} as const;

/** scripts/classify_article.py always uses this OpenAI model. */
const CLASSIFY_MODEL = "gpt-4o-mini";

/** Source venues that host primary research (scripts/summarize_research.py). */
const PAPER_VENUES = [
  "arxiv", "openreview", "papers with code", "paperswithcode",
  "nature", "jmlr", "neurips", "icml", "iclr", "acl", "aclanthology",
  "proceedings", "pmlr", "semantic scholar", "biorxiv",
];

export interface SourceInput {
  category: ArticleCategory;
  title: string;
  text: string;
  sourceUrl?: string;
  sourcePublisher?: string;
  arxivId?: string;
  authors?: string[];
}

export interface Annotation {
  subcategory: string;
  impact: ArticleImpact;
  company: string | null;
  secondaryCompanies: string[];
  /** Secondary sections from the classifier, e.g. ["stocks"]. */
  tags: string[];
  confidence: number | null;
  rationale: string;
}

export interface Draft extends Annotation {
  title: string;
  description: string;
  body: string;
  warnings: string[];
  model: string;
}

// ── settings & prompts ─────────────────────────────────────────────

async function loadSettings(supabase: SupabaseClient): Promise<Map<string, string>> {
  const { data, error } = await supabase.from("settings").select("key,value");
  if (error) throw error;
  return new Map(
    (data ?? [])
      .filter((r: { value: string | null }) => r.value)
      .map((r: { key: string; value: string }) => [r.key, r.value]),
  );
}

function prompt(settings: Map<string, string>, key: string): string {
  const text = settings.get(key);
  if (!text) {
    throw new Error(`Prompt "${key}" is missing from settings — check /admin/prompts or run the latest migrations.`);
  }
  return text;
}

/**
 * prompts.render(): Python str.format_map with unknown placeholders left
 * intact, and {{ / }} as literal braces.
 */
export function renderPrompt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{\{|\}\}|\{(\w+)\}/g, (match, name: string | undefined) => {
    if (match === "{{") return "{";
    if (match === "}}") return "}";
    return name !== undefined && name in vars ? String(vars[name]) : match;
  });
}

function summarizerModel(settings: Map<string, string>): string {
  return settings.get("summarizer_model") || process.env.SUMMARIZER_MODEL || "gpt-4o-mini";
}

function settingInt(settings: Map<string, string>, key: string, fallback: number): number {
  const n = Number.parseInt(settings.get(key) ?? "", 10);
  return Number.isFinite(n) ? n : fallback;
}

// ── classification ─────────────────────────────────────────────────

async function canonicalCompanies(supabase: SupabaseClient): Promise<Map<string, string>> {
  const { data, error } = await supabase.from("companies").select("slug,name");
  if (error) throw error;
  return new Map((data ?? []).map((r: { slug: string; name: string }) => [r.slug, r.name]));
}

/** supabase_store.canonical_company: one spelling per slug. */
function canonical(names: Map<string, string>, name: string): string {
  return names.get(slugify(name)) ?? name;
}

async function classify(
  supabase: SupabaseClient,
  settings: Map<string, string>,
  input: SourceInput,
): Promise<Annotation & { routedTo: string[] }> {
  // Classification runs on gpt-4o-mini like the pipeline; if the site has
  // no OpenAI key, fall back to the summarizer model rather than failing.
  const model = hasKeyFor(CLASSIFY_MODEL) ? CLASSIFY_MODEL : summarizerModel(settings);
  const raw = await callLlm(
    model,
    prompt(settings, "prompt.classify.system"),
    renderPrompt(prompt(settings, "prompt.classify.user"), {
      title: input.title,
      body: input.text.slice(0, 3000),
      source_name: input.sourcePublisher || "Turing Wire",
      category_hint: input.category,
    }),
    { temperature: 0, jsonMode: true },
  );

  let result: Record<string, unknown> = {};
  try {
    result = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ""));
  } catch {
    throw new Error("The classifier returned something that isn't JSON. Try again.");
  }

  const cat = result.category;
  const routedTo = (Array.isArray(cat) ? cat : [cat]).map(String).filter((c) => c && c !== "skip");

  const impact = String(result.impact ?? "notable").toLowerCase() as ArticleImpact;
  const confidence = Number(result.confidence);
  const names = await canonicalCompanies(supabase);
  const secondary = Array.isArray(result.secondary_companies)
    ? result.secondary_companies
    : result.secondary_companies
      ? [result.secondary_companies]
      : [];

  const company = result.company ? canonical(names, String(result.company)) : null;

  return {
    subcategory: String(result.subcategory || "other"),
    impact: IMPACTS.includes(impact) ? impact : "notable",
    company,
    secondaryCompanies: [...new Set(secondary.map((c) => canonical(names, String(c))))].filter(
      (c) => c && c !== company,
    ),
    // Same rule as build_row: other sections the classifier routed to
    // become tags ("stocks" puts the article on /aistocks/).
    tags: routedTo.filter((c) => c !== input.category && c !== "news" && c !== "research"),
    confidence: Number.isFinite(confidence) ? Math.min(Math.max(confidence, 0), 1) : null,
    rationale: String(result.rationale ?? ""),
    routedTo,
  };
}

function annotationOf(a: Annotation & { routedTo: string[] }): Annotation {
  return {
    subcategory: a.subcategory,
    impact: a.impact,
    company: a.company,
    secondaryCompanies: a.secondaryCompanies,
    tags: a.tags,
    confidence: a.confidence,
    rationale: a.rationale,
  };
}

function classifierWarnings(
  a: { routedTo: string[]; confidence: number | null; subcategory: string },
  category: ArticleCategory,
): string[] {
  const w: string[] = [];
  if (!SUBCATEGORIES[category].includes(a.subcategory)) {
    w.push(`Subcategory "${a.subcategory}" isn't a ${category} subcategory — pick one below.`);
  }
  if (a.routedTo.length === 0) {
    w.push("The classifier considers this off-topic (it would have been skipped by the pipeline).");
  }
  if (a.confidence !== null && a.confidence < 0.6) {
    w.push(`Low classification confidence (${a.confidence.toFixed(2)}) — check subcategory, company and impact.`);
  }
  return w;
}

// ── public entry points ────────────────────────────────────────────

/**
 * Mode "as written": the editor's own text is published unchanged; only
 * the automatic annotation (subcategory, impact, companies) is added.
 */
export async function annotateText(
  supabase: SupabaseClient,
  input: SourceInput & { description?: string },
): Promise<Draft> {
  const settings = await loadSettings(supabase);
  const a = await classify(supabase, settings, input);
  return {
    ...annotationOf(a),
    title: input.title.trim(),
    description: input.description?.trim() ?? "",
    body: input.text.trim(),
    warnings: [
      ...classifierWarnings(a, input.category),
      ...qualityWarnings({ title: input.title, body: input.text }),
    ],
    model: hasKeyFor(CLASSIFY_MODEL) ? CLASSIFY_MODEL : summarizerModel(settings),
  };
}

async function relatedContext(
  supabase: SupabaseClient,
  company: string | null,
  subcategory: string,
  title: string,
): Promise<string> {
  // summarize_news.related_context(), over the same 400-article window.
  const { data } = await supabase
    .from("articles")
    .select("title,published_at,company,subcategory")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(400);
  const index = (data ?? []) as { title: string; published_at: string; company: string | null; subcategory: string }[];
  const same = title.trim().toLowerCase();
  const companyL = (company ?? "").toLowerCase();

  let picks = companyL
    ? index.filter((e) => (e.company ?? "").toLowerCase() === companyL && e.title.trim().toLowerCase() !== same)
    : [];
  if (picks.length < 2 && subcategory) {
    const more = index.filter((e) => e.subcategory === subcategory && e.title.trim().toLowerCase() !== same);
    picks = [...picks, ...more];
  }
  picks = picks.slice(0, 5);

  if (picks.length === 0) {
    return "If this clearly continues an earlier development, note that in one clause; otherwise do not speculate about history.";
  }
  const lines = picks.map((e) => `  - ${e.title} (${e.published_at.slice(0, 10)})`).join("\n");
  return (
    "Turing Wire has covered related stories before. Where genuinely relevant, connect this " +
    "to that timeline in one specific clause (e.g. 'this follows ...'). Do NOT force a " +
    "connection if none is real.\nPrior coverage:\n" +
    lines
  );
}

function isRealPaper(input: SourceInput): boolean {
  if (input.arxivId?.trim()) return true;
  const src = (input.sourcePublisher ?? "").toLowerCase();
  const url = (input.sourceUrl ?? "").toLowerCase();
  return PAPER_VENUES.some((v) => src.includes(v) || url.includes(v));
}

/**
 * Mode "digest": run the source text through the same two-stage prompts
 * as the ingest pipeline (extract facts → write article), plus
 * classification, and return an editable draft.
 */
export async function digestSource(supabase: SupabaseClient, input: SourceInput): Promise<Draft> {
  const settings = await loadSettings(supabase);
  const model = summarizerModel(settings);
  const a = await classify(supabase, settings, input);

  const len = LENGTH[input.category];
  const { minWords, maxWords } = scaledWordTarget(wordCount(input.text), {
    minFloor: len.minFloor,
    maxFloor: len.maxFloor,
    maxCap: settingInt(settings, len.capKey, len.defaultCap),
  });
  const sourceName = input.sourcePublisher ?? "";
  const url = input.sourceUrl ?? "";

  let writeSystem: string;
  let writeUser: string;

  if (input.category === "news") {
    const extracted = await callLlm(
      model,
      prompt(settings, "prompt.news_extract.system"),
      renderPrompt(prompt(settings, "prompt.news_extract.user"), { title: input.title, body: input.text }),
      { temperature: 0 },
    );
    writeSystem = prompt(settings, "prompt.news_write.system");
    writeUser = renderPrompt(prompt(settings, "prompt.news_write.user"), {
      min_words: minWords,
      max_words: maxWords,
      title: input.title,
      body: extracted,
      context_block: await relatedContext(supabase, a.company, a.subcategory, input.title),
      source_name: sourceName,
      url,
    });
  } else {
    const authors =
      (input.authors ?? []).slice(0, 8).join(", ") + ((input.authors ?? []).length > 8 ? " et al." : "");
    if (isRealPaper(input)) {
      const extracted = await callLlm(
        model,
        prompt(settings, "prompt.research_extract.system"),
        renderPrompt(prompt(settings, "prompt.research_extract.user"), {
          title: input.title,
          authors: authors || "unknown",
          body: input.text,
        }),
        { temperature: 0 },
      );
      writeUser = renderPrompt(prompt(settings, "prompt.research_write.user"), {
        min_words: minWords,
        max_words: maxWords,
        title: input.title,
        authors: authors || "unknown",
        body: extracted,
        source_name: sourceName,
        url,
        arxiv_id: input.arxivId ?? "",
      });
    } else {
      // News about research: generic extractor + the softer reporting
      // template, so no Method/Results metrics get invented.
      const extracted = await callLlm(
        model,
        prompt(settings, "prompt.news_extract.system"),
        renderPrompt(prompt(settings, "prompt.news_extract.user"), { title: input.title, body: input.text }),
        { temperature: 0 },
      );
      writeUser = renderPrompt(prompt(settings, "prompt.research_reporting_write.user"), {
        min_words: minWords,
        max_words: maxWords,
        title: input.title,
        body: extracted,
        source_name: sourceName,
        url,
      });
    }
    writeSystem = prompt(settings, "prompt.research_write.system");
  }

  const raw = await callLlm(model, writeSystem, writeUser, {
    temperature: len.temperature,
    jsonMode: true,
  });
  const out = parseSummaryOutput(raw);
  if (!out.body) throw new Error("The model returned an empty article. Try again or shorten the source text.");

  // News headlines are rewritten when clean (as in summarize_news.py);
  // research keeps the source title.
  const title = (input.category === "news" && cleanHeadline(out.title)) || input.title.trim();

  const warnings = [...classifierWarnings(a, input.category), ...qualityWarnings({ title, body: out.body }, input.text)];
  if (wordCount(out.body) < 100) warnings.push("Very short draft (under 100 words) — the pipeline would have skipped it.");

  return {
    ...annotationOf(a),
    title,
    description: out.meta,
    body: out.body,
    warnings,
    model,
  };
}
