import type { AiIndexHistory, StocksSnapshot } from "@/lib/data";

/**
 * Hands the snapshot and index history to assets/js/stocks.js, which reads
 * them off `window`. Rendered as an inline script so it executes during parse,
 * before the afterInteractive chart scripts run.
 */
export function StocksBootstrap({
  snapshot,
  indexHistory,
}: {
  snapshot: StocksSnapshot;
  indexHistory: AiIndexHistory;
}) {
  const payload = `window._twStockData=${JSON.stringify(snapshot)};window._twIndexHistory=${JSON.stringify(indexHistory)};`;
  return <script dangerouslySetInnerHTML={{ __html: payload }} />;
}
