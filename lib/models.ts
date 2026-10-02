import { getSupabase } from "./supabase";
import { getModelCatalog } from "./data";
import { CARD_COLUMNS, type ArticleCard } from "./types";

/**
 * AI model pricing data (migration 0019): tracked models, their price
 * history, and everything derived from it — blended prices, workload costs,
 * comparisons and the weekly price index. All figures are USD per 1M tokens
 * (provider list price for the first-party API, via LiteLLM's public price
 * list — see scripts/fetch_model_prices.py).
 */

export interface AiModel {
  slug: string;
  name: string;
  provider: string;
  company: string | null;
  litellm_key: string;
  input_price: number | null;
  output_price: number | null;
  cached_input_price: number | null;
  context_tokens: number | null;
  max_output_tokens: number | null;
  supports_vision: boolean | null;
  supports_tools: boolean | null;
  supports_reasoning: boolean | null;
  retired: boolean;
  first_listed: string | null;
  updated_at: string;
}

export interface PricePoint {
  model_slug: string;
  observed_on: string;
  input_price: number | null;
  output_price: number | null;
}

const num = (v: unknown): number | null => (v === null || v === undefined ? null : Number(v));

/**
 * PGRST205 = the table doesn't exist: migration 0019 hasn't been applied.
 * Treat that as "no pricing data yet" so a deploy that lands before the
 * migration still builds (pages render empty and fill in on revalidation)
 * instead of failing the whole build. Any other error is real and throws.
 */
function missingTable(error: { code?: string } | null): boolean {
  if (error?.code !== "PGRST205") return false;
  console.warn("Model pricing tables not found; apply supabase/migrations/0019_model_pricing.sql.");
  return true;
}

function toModel(r: Record<string, unknown>): AiModel {
  return {
    ...(r as unknown as AiModel),
    input_price: num(r.input_price),
    output_price: num(r.output_price),
    cached_input_price: num(r.cached_input_price),
  };
}

// ── queries ─────────────────────────────────────────────────────────

/** Every tracked model, retired ones included (their pages stay up). */
export async function getAllModels(): Promise<AiModel[]> {
  const { data, error } = await getSupabase()
    .from("ai_models")
    .select("*")
    .order("provider")
    .order("name");
  if (missingTable(error)) return [];
  if (error) throw error;
  return (data ?? []).map(toModel);
}

export async function getModel(slug: string): Promise<AiModel | null> {
  const { data, error } = await getSupabase().from("ai_models").select("*").eq("slug", slug).maybeSingle();
  if (missingTable(error)) return null;
  if (error) throw error;
  return data ? toModel(data) : null;
}

/** The full price history (small: one row per model per price change). */
export async function getPriceHistory(): Promise<PricePoint[]> {
  const { data, error } = await getSupabase()
    .from("model_price_history")
    .select("model_slug,observed_on,input_price,output_price")
    .order("observed_on", { ascending: true });
  if (missingTable(error)) return [];
  if (error) throw error;
  return (data ?? []).map((r) => ({
    model_slug: r.model_slug as string,
    observed_on: r.observed_on as string,
    input_price: num(r.input_price),
    output_price: num(r.output_price),
  }));
}

export const historyFor = (history: PricePoint[], slug: string) =>
  history.filter((p) => p.model_slug === slug);

/** Coverage whose headline names the model (whole-word match). */
export async function getModelCoverage(model: AiModel, limit = 6): Promise<ArticleCard[]> {
  const term = model.name.replace(/\s*\(.*\)\s*/, "").trim();
  if (term.length < 2) return [];
  const pattern = `\\m${term.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")}\\M`;
  const { data, error } = await getSupabase()
    .from("articles")
    .select(CARD_COLUMNS)
    .filter("title", "imatch", pattern)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as unknown as ArticleCard[];
}

// ── derived figures ─────────────────────────────────────────────────

/** 3:1 input:output blend — a common single-number price for chat workloads. */
export function blended(m: Pick<AiModel, "input_price" | "output_price">): number | null {
  if (m.input_price === null || m.output_price === null) return null;
  return (3 * m.input_price + m.output_price) / 4;
}

export type PriceBand = "premium" | "mid" | "budget";

export const PRICE_BANDS: Record<PriceBand, { label: string; rule: string }> = {
  premium: { label: "Premium", rule: "blended price of $5 or more per 1M tokens" },
  mid: { label: "Mid-range", rule: "blended price from $1 to $5 per 1M tokens" },
  budget: { label: "Budget", rule: "blended price under $1 per 1M tokens" },
};

export function priceBand(m: Pick<AiModel, "input_price" | "output_price">): PriceBand | null {
  const b = blended(m);
  if (b === null) return null;
  return b >= 5 ? "premium" : b >= 1 ? "mid" : "budget";
}

/** Typical request shapes for "what would this cost me" tables. */
export const WORKLOADS = [
  { key: "chat", label: "Chatbot reply", detail: "2,000 input + 500 output tokens", input: 2_000, output: 500 },
  { key: "rag", label: "RAG / search answer", detail: "8,000 input + 700 output tokens", input: 8_000, output: 700 },
  { key: "doc", label: "Long-document summary", detail: "100,000 input + 2,000 output tokens", input: 100_000, output: 2_000 },
] as const;

/** USD for 1,000 requests of a workload. */
export function workloadCost(
  m: Pick<AiModel, "input_price" | "output_price">,
  w: { input: number; output: number },
): number | null {
  if (m.input_price === null || m.output_price === null) return null;
  return ((w.input * m.input_price + w.output * m.output_price) / 1_000_000) * 1000;
}

export function formatUsd(v: number | null, { per = "" }: { per?: string } = {}): string {
  if (v === null) return "—";
  const digits = v === 0 ? 2 : v < 0.1 ? 3 : 2;
  return `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: digits })}${per}`;
}

export function formatTokens(n: number | null): string {
  if (!n) return "—";
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(2)}M`;
  return `${Math.round(n / 1000)}K`;
}

export function pctChange(from: number, to: number): number {
  return from === 0 ? 0 : ((to - from) / from) * 100;
}

// ── comparisons ─────────────────────────────────────────────────────

export const comparisonSlug = (a: string, b: string) => `${a}-vs-${b}`;

/** Curated pairs whose models are both tracked. */
export function getComparisons(models: AiModel[]): [AiModel, AiModel][] {
  const bySlug = new Map(models.map((m) => [m.slug, m]));
  return getModelCatalog()
    .comparisons.map(([a, b]) => [bySlug.get(a), bySlug.get(b)] as const)
    .filter((p): p is readonly [AiModel, AiModel] => Boolean(p[0] && p[1]))
    .map(([a, b]) => [a, b]);
}

/** Resolve "a-vs-b"; `reversed` means the canonical URL is the other order. */
export function findComparison(
  models: AiModel[],
  pair: string,
): { a: AiModel; b: AiModel; reversed: boolean } | null {
  for (const [a, b] of getComparisons(models)) {
    if (pair === comparisonSlug(a.slug, b.slug)) return { a, b, reversed: false };
    if (pair === comparisonSlug(b.slug, a.slug)) return { a, b, reversed: true };
  }
  return null;
}

// ── weekly price index ──────────────────────────────────────────────

/** ISO-8601 week of a YYYY-MM-DD date: { year, week, key: "2026-w39", start: Monday }. */
export function isoWeek(dateStr: string): { year: number; week: number; key: string; start: string } {
  const d = new Date(`${dateStr.slice(0, 10)}T00:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7; // Monday = 0
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - day);
  const thursday = new Date(monday);
  thursday.setUTCDate(monday.getUTCDate() + 3);
  const year = thursday.getUTCFullYear();
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const week1Monday = new Date(jan4);
  week1Monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7));
  const week = Math.round((monday.getTime() - week1Monday.getTime()) / (7 * 86_400_000)) + 1;
  return { year, week, key: `${year}-w${String(week).padStart(2, "0")}`, start: monday.toISOString().slice(0, 10) };
}

export interface PriceChange {
  model: AiModel;
  date: string;
  from: { input: number | null; output: number | null } | null; // null = newly listed
  to: { input: number | null; output: number | null };
}

export interface IndexWeek {
  key: string;
  start: string;
  /** Chain-linked index, 100 at the first week with two priced models. */
  index: number;
  /** Week-over-week change of the index, in percent. */
  change: number;
  /** Models with a price in this week. */
  priced: number;
  changes: PriceChange[];
  listings: PriceChange[];
}

/**
 * The TW Model Price Index.
 *
 * For each ISO week, every tracked model's price is its latest recorded
 * price on or before the week's end. The week-over-week movement is the
 * geometric mean of blended-price ratios across models priced in *both*
 * weeks, chained onto the previous week's value. Chaining means a newly
 * listed model joins the index without causing a jump; only genuine price
 * changes move it.
 */
export function computePriceIndex(models: AiModel[], history: PricePoint[]): IndexWeek[] {
  if (history.length === 0) return [];
  const bySlug = new Map(models.map((m) => [m.slug, m]));
  const points = history.filter((p) => bySlug.has(p.model_slug));

  const firstWeek = isoWeek(points[0].observed_on).start;
  const lastWeek = isoWeek(new Date().toISOString().slice(0, 10)).start;

  const weeks: IndexWeek[] = [];
  const current = new Map<string, { input: number | null; output: number | null }>();
  let cursor = 0;
  let prevBlended = new Map<string, number>();
  let index = 100;
  let started = false;

  for (let t = Date.parse(`${firstWeek}T00:00:00Z`); t <= Date.parse(`${lastWeek}T00:00:00Z`); t += 7 * 86_400_000) {
    const start = new Date(t).toISOString().slice(0, 10);
    const end = new Date(t + 6 * 86_400_000).toISOString().slice(0, 10);
    const changes: PriceChange[] = [];
    const listings: PriceChange[] = [];

    while (cursor < points.length && points[cursor].observed_on <= end) {
      const p = points[cursor++];
      const model = bySlug.get(p.model_slug)!;
      const to = { input: p.input_price, output: p.output_price };
      const from = current.get(p.model_slug) ?? null;
      (from ? changes : listings).push({ model, date: p.observed_on, from, to });
      current.set(p.model_slug, to);
    }

    const nowBlended = new Map<string, number>();
    for (const [slug, price] of current) {
      const b = blended({ input_price: price.input, output_price: price.output });
      if (b !== null && b > 0) nowBlended.set(slug, b);
    }

    let change = 0;
    if (!started && nowBlended.size >= 2) {
      started = true;
    } else if (started) {
      const logs: number[] = [];
      for (const [slug, b] of nowBlended) {
        const prev = prevBlended.get(slug);
        if (prev) logs.push(Math.log(b / prev));
      }
      if (logs.length) {
        const ratio = Math.exp(logs.reduce((s, x) => s + x, 0) / logs.length);
        const next = index * ratio;
        change = pctChange(index, next);
        index = next;
      }
    }
    prevBlended = nowBlended;

    if (started) {
      weeks.push({ key: isoWeek(start).key, start, index, change, priced: nowBlended.size, changes, listings });
    }
  }
  return weeks;
}

/** Weeks worth a page of their own: something changed or was listed. */
export const eventfulWeeks = (weeks: IndexWeek[]) =>
  weeks.filter((w) => w.changes.length > 0 || w.listings.length > 0);
