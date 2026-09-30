-- ---------------------------------------------------------------
-- Market data moves out of git.
--
-- The Ingest workflow used to commit _data/stocks_snapshot.json,
-- ai_index_history.json and benchmarks.yml back to main every run. Each of
-- those commits triggered a Vercel deployment, and every deployment starts
-- with an empty ISR cache — so the whole site was re-rendered (and billed as
-- ISR writes) six times a weekday. The data now lives here instead: the
-- pipeline upserts one row per dataset and then asks the site to revalidate
-- the handful of pages that show it.
--
-- `key` is the dataset's old file name, without extension.
-- ---------------------------------------------------------------

create table public.market_data (
  key        text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.market_data enable row level security;

create policy "public read market data"
  on public.market_data for select to anon, authenticated
  using (true);
