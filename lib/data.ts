import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

/**
 * Curated, hand-maintained datasets that stay in the repo.
 *
 * Only *articles* moved to Supabase. These files are small, versioned
 * alongside the code, and updated by their own scheduled workflows, so
 * reading them from disk at render time keeps that pipeline untouched.
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

export const getStocksSnapshot = (): StocksSnapshot =>
  readJson<StocksSnapshot>("stocks_snapshot.json", {});

export const getAiIndexHistory = (): AiIndexHistory =>
  readJson<AiIndexHistory>("ai_index_history.json", {});

export const getModels = <T = unknown>(): T => readYaml<T>("models.yml", [] as T);
export const getBenchmarks = <T = unknown>(): T => readYaml<T>("benchmarks.yml", [] as T);
export const getConferences = <T = unknown>(): T => readYaml<T>("conferences.yml", [] as T);
export const getTickers = <T = unknown>(): T => readYaml<T>("tickers.yml", [] as T);
