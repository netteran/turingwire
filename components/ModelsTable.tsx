"use client";

import { useMemo, useState } from "react";

/** Ported from pages/models.html — filters and sorting are React state now. */

export interface ModelRow {
  id: string;
  name: string;
  provider: string;
  tier: string;
  input_mtok: number;
  output_mtok: number;
  context_k: number;
  multimodal?: boolean;
  function_calling?: boolean;
  json_mode?: boolean;
  streaming?: boolean;
  batch_available?: boolean;
  reasoning?: boolean;
  open_source?: boolean;
  release_date?: string;
  api_id?: string;
  deprecated?: boolean;
  notes?: string;
}

const PROVIDERS = ["all", "Anthropic", "OpenAI", "Google", "Meta", "Mistral"];
const TIERS = [
  ["all", "All"],
  ["flagship", "Flagship"],
  ["standard", "Standard"],
  ["economy", "Economy"],
] as const;
const CAPS = [
  ["all", "All"],
  ["multimodal", "Multimodal"],
  ["reasoning", "Reasoning"],
  ["open_source", "Open Source"],
] as const;

const providerClass = (p: string) =>
  `tw-provider-badge tw-provider-${p.toLowerCase().replace(/ /g, "-")}`;

const priceClass = (value: number, mid: number, high: number) =>
  value < mid ? "tw-price-low" : value < high ? "tw-price-mid" : "tw-price-high";

const formatContext = (k: number) => (k >= 1000 ? `${k / 1000}M` : `${k}k`);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Capabilities({ m }: { m: ModelRow }) {
  return (
    <div className="flex flex-wrap gap-1">
      {m.multimodal && (
        <span className="tw-cap-badge tw-cap-multi" title="Multimodal (vision)">
          MULTI
        </span>
      )}
      {m.function_calling && (
        <span className="tw-cap-badge tw-cap-func" title="Function calling / tool use">
          TOOLS
        </span>
      )}
      {m.reasoning && (
        <span className="tw-cap-badge tw-cap-reason" title="Extended reasoning / thinking">
          REASON
        </span>
      )}
      {m.batch_available && (
        <span className="tw-cap-badge tw-cap-batch" title="Batch API available">
          BATCH
        </span>
      )}
      {m.open_source && (
        <span className="tw-cap-badge tw-cap-oss" title="Open-source weights">
          OSS
        </span>
      )}
    </div>
  );
}

export function ModelsTable({ models }: { models: ModelRow[] }) {
  const [provider, setProvider] = useState("all");
  const [tier, setTier] = useState("all");
  const [cap, setCap] = useState("all");
  const [sort, setSort] = useState("provider");

  const visible = useMemo(() => {
    const rows = models
      .filter((m) => !m.deprecated)
      .filter((m) => provider === "all" || m.provider === provider)
      .filter((m) => tier === "all" || m.tier === tier)
      .filter((m) => {
        if (cap === "all") return true;
        if (cap === "multimodal") return !!m.multimodal;
        if (cap === "reasoning") return !!m.reasoning;
        if (cap === "open_source") return !!m.open_source;
        return true;
      });

    const sorted = [...rows];
    switch (sort) {
      case "input_asc":
        sorted.sort((a, b) => a.input_mtok - b.input_mtok);
        break;
      case "input_desc":
        sorted.sort((a, b) => b.input_mtok - a.input_mtok);
        break;
      case "output_asc":
        sorted.sort((a, b) => a.output_mtok - b.output_mtok);
        break;
      case "output_desc":
        sorted.sort((a, b) => b.output_mtok - a.output_mtok);
        break;
      case "context_desc":
        sorted.sort((a, b) => b.context_k - a.context_k);
        break;
      default:
        sorted.sort(
          (a, b) => a.provider.localeCompare(b.provider) || a.name.localeCompare(b.name),
        );
    }
    return sorted;
  }, [models, provider, tier, cap, sort]);

  return (
    <>
      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs tw-muted font-mono uppercase tracking-widest mr-1">
            Provider
          </span>
          {PROVIDERS.map((p) => (
            <button
              key={p}
              className={`tw-filter-chip${provider === p ? " active" : ""}`}
              onClick={() => setProvider(p)}
            >
              {p === "all" ? "All" : p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs tw-muted font-mono uppercase tracking-widest mr-1">
            Tier
          </span>
          {TIERS.map(([value, label]) => (
            <button
              key={value}
              className={`tw-filter-chip${tier === value ? " active" : ""}`}
              onClick={() => setTier(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs tw-muted font-mono uppercase tracking-widest mr-1">
            Capabilities
          </span>
          {CAPS.map(([value, label]) => (
            <button
              key={value}
              className={`tw-filter-chip${cap === value ? " active" : ""}`}
              onClick={() => setCap(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs tw-muted font-mono">Sort by</span>
        <select
          className="tw-input text-xs py-1 px-2"
          style={{ width: "auto" }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort models"
        >
          <option value="provider">Provider</option>
          <option value="input_asc">Input price ↑</option>
          <option value="input_desc">Input price ↓</option>
          <option value="output_asc">Output price ↑</option>
          <option value="output_desc">Output price ↓</option>
          <option value="context_desc">Context window ↓</option>
        </select>
        <span className="text-xs tw-muted font-mono ml-auto">
          {visible.length} model{visible.length !== 1 && "s"}
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-16 tw-muted">
          <p className="text-lg font-mono">No models match the selected filters.</p>
        </div>
      ) : (
        <>
          <div className="tw-card rounded-xl border tw-border overflow-hidden hidden sm:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="border-b tw-border"
                    style={{
                      background: "color-mix(in srgb, var(--border) 30%, transparent)",
                    }}
                  >
                    {["Model", "Provider", "Tier"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                    {["Input $/1M", "Output $/1M", "Context"].map((h) => (
                      <th
                        key={h}
                        className="text-right px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                    {["Features", "API ID"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-mono uppercase tracking-widest tw-muted font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b tw-border hover:tw-card transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold tw-heading text-sm">{m.name}</div>
                        {m.notes && (
                          <div className="text-xs tw-muted mt-0.5">{m.notes}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={providerClass(m.provider)}>{m.provider}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`tw-tier-badge tw-tier-${m.tier}`}>
                          {capitalize(m.tier)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        <span className={priceClass(m.input_mtok, 1, 5)}>
                          ${m.input_mtok}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        <span className={priceClass(m.output_mtok, 5, 20)}>
                          ${m.output_mtok}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono tw-muted">
                        {formatContext(m.context_k)}
                      </td>
                      <td className="px-4 py-3">
                        <Capabilities m={m} />
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs tw-muted font-mono">{m.api_id}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="sm:hidden space-y-3">
            {visible.map((m) => (
              <div key={m.id} className="tw-card rounded-xl border tw-border p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="font-semibold tw-heading">{m.name}</div>
                    <div className="flex gap-1.5 mt-1">
                      <span className={providerClass(m.provider)}>{m.provider}</span>
                      <span className={`tw-tier-badge tw-tier-${m.tier}`}>
                        {capitalize(m.tier)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs tw-muted font-mono">Input</div>
                    <div className="font-mono font-semibold tw-heading">
                      ${m.input_mtok}
                      <span className="text-xs tw-muted">/1M</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <div className="tw-muted">Output</div>
                    <div className="font-mono font-semibold tw-heading">
                      ${m.output_mtok}
                    </div>
                  </div>
                  <div>
                    <div className="tw-muted">Context</div>
                    <div className="font-mono font-semibold tw-heading">
                      {formatContext(m.context_k)}
                    </div>
                  </div>
                  <div>
                    <div className="tw-muted">Released</div>
                    <div className="font-mono tw-heading">{m.release_date}</div>
                  </div>
                </div>
                <Capabilities m={m} />
                {m.notes && <p className="text-xs tw-muted mt-2">{m.notes}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
