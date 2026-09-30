import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { getSupabase } from "./supabase";

/**
 * Reference datasets.
 *
 * `models.yml` and `tickers.yml` are hand-maintained and stay in the repo;
 * reading them from disk is enough, since they only change with a deploy.
 *
 * The datasets the Ingest workflow refreshes — stock quotes, the AI index and
 * benchmarks — live in the `market_data` table instead. Committing them to
 * git redeployed the site on every run, which emptied the ISR cache each
 * time. The workflow revalidates the pages that show them after it writes
 * (app/api/revalidate). The copies in _data/ are the fallback for a
 * dataset with no row yet.
 */
const DATA_DIR = path.join(process.cwd(), "_data");

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function readYaml<T>(file: string, fallback: T): T {
  try {
    return (yaml.load(fs.readFileSync(path.join(DATA_DIR, file), "utf8")) ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export interface StockQuote {
  symbol: string;
  name: string;
  price?: number;
  change_pct: number;
  [key: string]: unknown;
}

export interface StocksSnapshot {
  quotes?: Record<string, StockQuote>;
  updated_at?: string;
  [key: string]: unknown;
}

export interface AiIndexPoint {
  date: string;
  value: number;
  change_pct: number;
}

export interface AiIndexHistory {
  base_date?: string;
  latest?: AiIndexPoint;
  series?: AiIndexPoint[];
  [key: string]: unknown;
}

/** A `market_data` row by key, or null when it's missing or unreadable. */
async function readMarketData<T>(key: string): Promise<T | null> {
  try {
    const { data, error } = await getSupabase()
      .from("market_data")
      .select("data")
      .eq("key", key)
      .maybeSingle();
    if (error || !data) return null;
    return data.data as T;
  } catch {
    return null;
  }
}

export const getStocksSnapshot = async (): Promise<StocksSnapshot> =>
  (await readMarketData<StocksSnapshot>("stocks_snapshot")) ??
  readJson<StocksSnapshot>("stocks_snapshot.json", {});

export const getAiIndexHistory = async (): Promise<AiIndexHistory> =>
  (await readMarketData<AiIndexHistory>("ai_index_history")) ??
  readJson<AiIndexHistory>("ai_index_history.json", {});

export const getBenchmarks = async <T = unknown>(): Promise<T> =>
  (await readMarketData<T>("benchmarks")) ?? readYaml<T>("benchmarks.yml", [] as T);

export const getModels = <T = unknown>(): T => readYaml<T>("models.yml", [] as T);
export const getTickers = <T = unknown>(): T => readYaml<T>("tickers.yml", [] as T);
