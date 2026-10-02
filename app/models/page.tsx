import type { Metadata } from "next";
import Link from "next/link";
import { ModelsTable, type ModelRow } from "@/components/ModelsTable";
import { ShareButtons } from "@/components/ShareButtons";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import {
  PRICE_BANDS,
  computePriceIndex,
  getAllModels,
  getComparisons,
  getPriceHistory,
  priceBand,
  type PriceBand,
} from "@/lib/models";

// Refreshed on demand after each ingest run (app/api/revalidate); the timer
// is only a fallback.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Model API Pricing Compared",
  description:
    "Current API prices for the leading AI models from OpenAI, Anthropic, Google, xAI, DeepSeek, Mistral and more: input and output cost per million tokens, context windows and price history, updated daily.",
  alternates: { canonical: "/models/" },
};

const BAND_TO_TIER: Record<PriceBand, string> = { premium: "flagship", mid: "standard", budget: "economy" };

export default async function ModelsPage() {
  const [models, history] = await Promise.all([getAllModels(), getPriceHistory()]);
  const active = models.filter((m) => !m.retired && m.input_price !== null);
  const rows: ModelRow[] = active.map((m) => ({
    id: m.slug,
    name: m.name,
    provider: m.provider,
    tier: BAND_TO_TIER[priceBand(m) ?? "mid"],
    input_mtok: m.input_price ?? 0,
    output_mtok: m.output_price ?? 0,
    context_k: (m.context_tokens ?? 0) / 1000,
    multimodal: m.supports_vision ?? false,
    function_calling: m.supports_tools ?? false,
    reasoning: m.supports_reasoning ?? false,
    api_id: m.litellm_key.replace(/^[a-z-]+\//, ""),
    release_date: m.first_listed ? formatDate(m.first_listed) : undefined,
  }));

  const index = computePriceIndex(models, history);
  const latest = index[index.length - 1];
  const yearAgo = index[Math.max(0, index.length - 53)];
  const comparisons = getComparisons(models).length;
  const updated = models.reduce((d, m) => (m.updated_at > d ? m.updated_at : d), "");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold tw-heading font-mono">AI Model API Pricing</h1>
            <p className="tw-muted text-sm mt-1 max-w-3xl leading-relaxed">
              List prices for {active.length} AI models across {new Set(active.map((m) => m.provider)).size}{" "}
              providers, per million tokens, with context windows and capabilities. Click a model for its price
              history and what a typical workload costs, or see {comparisons} head-to-head comparisons.
            </p>
          </div>
          <div className="flex items-start gap-3 flex-shrink-0">
            {updated && (
              <p className="text-xs tw-muted font-mono text-right">Updated {formatDate(updated)}</p>
            )}
            <ShareButtons
              url={absoluteUrl("/models/")}
              title="AI Model API Pricing"
              summary="Current API prices for the leading AI models, updated daily."
              variant="popover"
              align="right"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          <Link href="/models/price-index/" className="tw-card rounded-lg border tw-border p-4 hover:border-cyan-600 transition-colors">
            <p className="text-xs font-mono tw-muted uppercase tracking-widest">TW Model Price Index</p>
            <p className="text-2xl font-semibold tw-heading font-mono mt-1">{latest ? latest.index.toFixed(1) : "—"}</p>
            {latest && yearAgo && latest !== yearAgo && (
              <p className="text-xs font-mono tw-muted mt-1">
                {latest.index >= yearAgo.index ? "+" : ""}
                {(((latest.index - yearAgo.index) / yearAgo.index) * 100).toFixed(1)}% over 12 months →
              </p>
            )}
          </Link>
          <Link href="/models/compare/" className="tw-card rounded-lg border tw-border p-4 hover:border-cyan-600 transition-colors">
            <p className="text-xs font-mono tw-muted uppercase tracking-widest">Comparisons</p>
            <p className="text-2xl font-semibold tw-heading font-mono mt-1">{comparisons}</p>
            <p className="text-xs font-mono tw-muted mt-1">head-to-head price and spec pages →</p>
          </Link>
          <div className="tw-card rounded-lg border tw-border p-4">
            <p className="text-xs font-mono tw-muted uppercase tracking-widest">Price bands</p>
            <ul className="text-xs tw-muted mt-2 space-y-0.5">
              {(Object.keys(PRICE_BANDS) as PriceBand[]).map((b) => (
                <li key={b}>
                  <span className="tw-heading">{PRICE_BANDS[b].label}:</span> {PRICE_BANDS[b].rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tw-card rounded-lg border tw-border px-4 py-3 text-xs tw-muted leading-relaxed">
          <strong className="tw-heading">Prices in USD per million tokens</strong>, first-party API list prices
          from LiteLLM&apos;s public model price list, refreshed daily. &quot;Blended&quot; prices weight input and
          output 3:1. Discounts (batch, caching, committed use) and regional pricing aren&apos;t reflected; check
          the provider before estimating production costs.
        </div>
      </div>

      <ModelsTable models={rows} />
    </div>
  );
}
