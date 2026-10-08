import Link from "@/components/Link";
import { blended, formatUsd, pctChange, type IndexWeek, type PriceChange } from "@/lib/models";

/** One-paragraph summary of a week's movement, generated from the data. */
export function weekSummary(w: IndexWeek): string {
  const parts: string[] = [];
  const dir = w.change < -0.05 ? "fell" : w.change > 0.05 ? "rose" : "was flat";
  parts.push(
    `The TW Model Price Index ${dir}${Math.abs(w.change) >= 0.05 ? ` ${Math.abs(w.change).toFixed(1)}%` : ""} ${dir === "was flat" ? "at" : "to"} ${w.index.toFixed(1)}`,
  );
  const cuts = w.changes.filter((c) => (blendedOf(c.to) ?? 0) < (c.from ? blendedOf(c.from) ?? 0 : 0));
  const rises = w.changes.length - cuts.length;
  const bits: string[] = [];
  if (cuts.length) bits.push(`${cuts.length} price cut${cuts.length > 1 ? "s" : ""}`);
  if (rises) bits.push(`${rises} increase${rises > 1 ? "s" : ""}`);
  if (w.listings.length) bits.push(`${w.listings.length} newly listed model${w.listings.length > 1 ? "s" : ""}`);
  return `${parts.join("")}${bits.length ? `, with ${bits.join(", ")}` : ""}. ${w.priced} models were priced this week.`;
}

const blendedOf = (p: { input: number | null; output: number | null }) =>
  blended({ input_price: p.input, output_price: p.output });

function ChangeRow({ c }: { c: PriceChange }) {
  const before = c.from ? blendedOf(c.from) : null;
  const after = blendedOf(c.to);
  return (
    <tr className="border-b tw-border last:border-0">
      <td className="px-4 py-2">
        <Link href={`/models/${c.model.slug}/`} className="tw-accent hover:underline">{c.model.name}</Link>
        <span className="block text-xs tw-muted">{c.model.provider}</span>
      </td>
      <td className="px-4 py-2 text-right font-mono text-xs">
        {c.from ? `${formatUsd(c.from.input)} → ` : ""}
        <span className="tw-heading">{formatUsd(c.to.input)}</span>
      </td>
      <td className="px-4 py-2 text-right font-mono text-xs">
        {c.from ? `${formatUsd(c.from.output)} → ` : ""}
        <span className="tw-heading">{formatUsd(c.to.output)}</span>
      </td>
      <td className="px-4 py-2 text-right font-mono text-xs tw-muted">
        {before !== null && after !== null
          ? `${pctChange(before, after) > 0 ? "+" : ""}${pctChange(before, after).toFixed(0)}%`
          : "new"}
      </td>
    </tr>
  );
}

export function ChangesTable({ title, rows }: { title: string; rows: PriceChange[] }) {
  if (rows.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className="text-xs font-mono uppercase tracking-widest tw-muted mb-3">{title}</h2>
      <div className="tw-card border tw-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b tw-border text-left text-xs font-mono tw-muted">
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2 text-right">Input / 1M</th>
              <th className="px-4 py-2 text-right">Output / 1M</th>
              <th className="px-4 py-2 text-right">Blended</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <ChangeRow key={`${c.model.slug}-${c.date}`} c={c} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export const METHODOLOGY =
  "The index tracks the blended list price (3 parts input to 1 part output, per million tokens) of every model on our pricing page. Each week's movement is the geometric mean of price changes across models priced in both that week and the week before, chained onto the previous value and set to 100 in the first week with data. A newly listed model joins without moving the index; only price changes do. In its first months the index covers only a handful of models, so a single price change moves it much more than it would today. Prices come from LiteLLM's public model price list, sampled weekly before October 2026 and daily since.";
