-- ---------------------------------------------------------------
-- Admin + ingest control plane.
--
-- Moves feed configuration and pipeline state out of the repo and into
-- Postgres, so the ingest workflow no longer commits to git and the admin
-- page has something to administer.
--
--   feeds/*.yml              -> ingest_sources
--   _data/etag_cache.json    -> ingest_sources.etag / last_modified
--   _data/seen_articles.json -> seen_articles
--
-- Writes are restricted to admins; the service role (the pipeline) bypasses
-- RLS entirely.
-- ---------------------------------------------------------------

-- ── Admin identity ──────────────────────────────────────────────

create table public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- security definer so the policy can read the table it is protecting
-- without recursing through its own RLS.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create policy "admins read admin_users"
  on public.admin_users for select to authenticated
  using (public.is_admin());

-- ── Ingest sources (replaces feeds/*.yml) ───────────────────────

create type source_kind as enum ('news', 'research');

create table public.ingest_sources (
  id            bigint generated always as identity primary key,
  name          text not null,
  url           text not null unique,
  kind          source_kind not null default 'news',
  type          text not null default 'rss',
  active        boolean not null default true,
  priority      int not null default 2 check (priority between 1 and 3),
  category_hint text,
  company       text,
  requires_full_text_fetch boolean not null default false,
  -- Some research venues only publish around their conference dates.
  active_months int[] not null default '{}',

  -- Conditional-GET cache, previously _data/etag_cache.json.
  etag          text,
  last_modified text,

  -- Per-source telemetry, so the admin page can show which feeds are failing.
  last_run_at     timestamptz,
  last_status     text check (last_status in ('ok','error','skipped','not_modified')),
  last_error      text,
  last_item_count int,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index ingest_sources_active_idx on public.ingest_sources (kind, priority) where active;

alter table public.ingest_sources enable row level security;

create policy "admins read sources"  on public.ingest_sources for select to authenticated using (public.is_admin());
create policy "admins write sources" on public.ingest_sources for all    to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Dedupe state (replaces _data/seen_articles.json) ────────────
-- No policies: only the service role touches this.

create table public.seen_articles (
  guid          text primary key,
  first_seen_at timestamptz not null default now()
);

alter table public.seen_articles enable row level security;

-- Novelty check as an RPC rather than a `guid=in.(…)` query string.
-- With ~70-char GUIDs a 500-item batch builds a 36KB URL, well past the
-- usual 8KB limit, and 118 of the existing GUIDs contain commas, which
-- would corrupt the in.() list regardless of batch size. A POSTed array
-- has neither problem.
create function public.unseen_guids(candidates text[])
returns setof text
language sql
stable
security invoker
set search_path = ''
as $fn$
  select c
  from unnest(candidates) as c
  where not exists (select 1 from public.seen_articles s where s.guid = c);
$fn$;

-- ── Run history ─────────────────────────────────────────────────

create table public.ingest_runs (
  id             bigint generated always as identity primary key,
  started_at     timestamptz not null default now(),
  finished_at    timestamptz,
  status         text not null default 'running' check (status in ('running','success','failed')),
  trigger        text not null default 'schedule' check (trigger in ('schedule','manual','admin')),
  github_run_id  text,
  github_run_url text,
  -- {fetched, deduped, classified, news_published, research_published, skipped}
  stats          jsonb not null default '{}'::jsonb,
  error          text
);

create index ingest_runs_started_idx on public.ingest_runs (started_at desc);

alter table public.ingest_runs enable row level security;

create policy "admins read runs" on public.ingest_runs for select to authenticated using (public.is_admin());

-- ── Settings ────────────────────────────────────────────────────

create table public.settings (
  key         text primary key,
  value       text,
  description text,
  updated_at  timestamptz not null default now()
);

alter table public.settings enable row level security;

create policy "admins read settings"  on public.settings for select to authenticated using (public.is_admin());
create policy "admins write settings" on public.settings for all    to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Admins may also edit articles from the admin page ───────────

create policy "admins read all articles"  on public.articles for select to authenticated using (public.is_admin());
create policy "admins write articles"     on public.articles for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── updated_at triggers ─────────────────────────────────────────

create trigger ingest_sources_set_updated_at before update on public.ingest_sources
  for each row execute function public.set_updated_at();
create trigger settings_set_updated_at before update on public.settings
  for each row execute function public.set_updated_at();

-- ── Seed: the 47 feeds previously in feeds/*.yml ────────────────

insert into public.ingest_sources
  (name, url, kind, type, priority, category_hint, company, requires_full_text_fetch, active_months)
values
  ('OpenAI Blog', 'https://openai.com/blog/rss.xml', 'news', 'rss', 1, 'news', 'OpenAI', false, '{}'),
  ('Anthropic News', 'https://www.anthropic.com/news/rss.xml', 'news', 'rss', 1, 'news', 'Anthropic', false, '{}'),
  ('Google DeepMind Blog', 'https://deepmind.google/blog/rss.xml', 'news', 'rss', 1, 'news', 'Google DeepMind', true, '{}'),
  ('Google AI Blog', 'https://blog.research.google/feeds/posts/default', 'news', 'atom', 1, 'news', 'Google', false, '{}'),
  ('Meta AI Blog', 'https://ai.meta.com/blog/rss/', 'news', 'rss', 1, 'news', 'Meta', false, '{}'),
  ('Mistral AI Blog', 'https://mistral.ai/news/rss', 'news', 'rss', 1, 'news', 'Mistral', false, '{}'),
  ('NVIDIA Blog', 'https://blogs.nvidia.com/feed/', 'news', 'rss', 1, 'news', 'NVIDIA', false, '{}'),
  ('AMD Newsroom', 'https://www.amd.com/en/newsroom/rss-feed.xml', 'news', 'rss', 1, 'news', 'AMD', false, '{}'),
  ('Intel Newsroom', 'https://newsroom.intel.com/feed/', 'news', 'rss', 1, 'news', 'Intel', false, '{}'),
  ('TSMC News', 'https://pr.tsmc.com/english/news/rss', 'news', 'rss', 1, 'news', 'TSMC', false, '{}'),
  ('Perplexity Blog', 'https://blog.perplexity.ai/rss', 'news', 'rss', 1, 'news', 'Perplexity', false, '{}'),
  ('Databricks Blog', 'https://www.databricks.com/blog/feed', 'news', 'rss', 1, 'news', 'Databricks', false, '{}'),
  ('Hugging Face Blog', 'https://huggingface.co/blog/feed.xml', 'news', 'rss', 1, 'news', 'Hugging Face', false, '{}'),
  ('Cohere Blog', 'https://cohere.com/blog/rss', 'news', 'rss', 1, 'news', 'Cohere', false, '{}'),
  ('Stability AI News', 'https://stability.ai/news/rss', 'news', 'rss', 1, 'news', 'Stability AI', false, '{}'),
  ('Runway Blog', 'https://runwayml.com/blog/rss', 'news', 'rss', 1, 'news', 'Runway', false, '{}'),
  ('ElevenLabs Blog', 'https://elevenlabs.io/blog/rss', 'news', 'rss', 1, 'news', 'ElevenLabs', false, '{}'),
  ('Cognition Labs Blog', 'https://cognition.ai/blog/rss', 'news', 'rss', 1, 'news', 'Cognition', false, '{}'),
  ('Suno Blog', 'https://suno.com/blog/rss', 'news', 'rss', 1, 'news', 'Suno', false, '{}'),
  ('Alibaba Qwen Blog', 'https://qwenlm.github.io/feed.xml', 'news', 'atom', 1, 'news', 'Alibaba', false, '{}'),
  ('TechCrunch AI', 'https://techcrunch.com/category/artificial-intelligence/feed/', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('The Verge AI', 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('Ars Technica AI', 'https://feeds.arstechnica.com/arstechnica/technology-lab', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('MIT Technology Review', 'https://www.technologyreview.com/feed/', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('Semafor Tech', 'https://www.semafor.com/rss/technology.rss', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('Stratechery (free)', 'https://stratechery.com/feed/', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('VentureBeat AI', 'https://venturebeat.com/ai/feed/', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('The Decoder', 'https://the-decoder.com/feed/', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('404 Media', 'https://www.404media.co/rss', 'news', 'rss', 2, 'news', null, false, '{}'),
  ('Hacker News (AI filtered)', 'https://hnrss.org/newest?q=artificial+intelligence+OR+LLM+OR+machine+learning&points=100', 'news', 'rss', 3, 'news', null, true, '{}'),
  ('Google News · xAI / Grok', 'https://news.google.com/rss/search?q=%22xAI%22+%28Grok+OR+model+OR+API+OR+release+OR+safety+OR+benchmark+OR+reasoning%29&hl=en-US&gl=US&ceid=US:en', 'news', 'rss', 2, 'news', 'xAI', true, '{}'),
  ('Google News · DeepSeek', 'https://news.google.com/rss/search?q=%22DeepSeek%22+%28AI+OR+model+OR+LLM+OR+research+OR+reasoning+OR+release+OR+benchmark%29&hl=en-US&gl=US&ceid=US:en', 'news', 'rss', 2, 'news', 'DeepSeek', true, '{}'),
  ('Google News · MiniMax', 'https://news.google.com/rss/search?q=%22MiniMax+AI%22+OR+%22Hailuo+AI%22+OR+%28%22MiniMax%22+%28model+OR+video+OR+AI+OR+chatbot+OR+release%29%29&hl=en-US&gl=US&ceid=US:en', 'news', 'rss', 2, 'news', 'MiniMax', true, '{}'),
  ('Google News · Scale AI', 'https://news.google.com/rss/search?q=%22Scale+AI%22+%28model+OR+data+OR+labeling+OR+enterprise+OR+contract+OR+funding+OR+release%29&hl=en-US&gl=US&ceid=US:en', 'news', 'rss', 2, 'news', 'Scale AI', true, '{}'),
  ('Google News · Character.AI', 'https://news.google.com/rss/search?q=%22Character.AI%22+OR+%22Character+AI%22+%28model+OR+chatbot+OR+safety+OR+update+OR+release+OR+funding%29&hl=en-US&gl=US&ceid=US:en', 'news', 'rss', 2, 'news', 'Character.AI', true, '{}'),
  ('arXiv cs.AI', 'https://export.arxiv.org/api/query', 'research', 'api', 1, 'research', null, false, '{}'),
  ('arXiv cs.LG', 'https://export.arxiv.org/api/query', 'research', 'api', 1, 'research', null, false, '{}'),
  ('arXiv cs.CL', 'https://export.arxiv.org/api/query', 'research', 'api', 1, 'research', null, false, '{}'),
  ('arXiv cs.CV', 'https://export.arxiv.org/api/query', 'research', 'api', 1, 'research', null, false, '{}'),
  ('arXiv cs.NE', 'https://export.arxiv.org/api/query', 'research', 'api', 1, 'research', null, false, '{}'),
  ('Nature Machine Intelligence', 'https://www.nature.com/natmachintell.rss', 'research', 'rss', 1, 'research', null, false, '{}'),
  ('JMLR', 'https://jmlr.org/jmlr.xml', 'research', 'rss', 2, 'research', null, false, '{}'),
  ('Science (AI abstracts)', 'https://www.science.org/rss/news_current.xml', 'research', 'rss', 2, 'research', null, false, '{}'),
  ('Papers with Code (trending)', 'https://paperswithcode.com/latest/rss', 'research', 'rss', 2, 'research', null, false, '{}'),
  ('NeurIPS Proceedings', 'https://proceedings.neurips.cc/rss.xml', 'research', 'rss', 1, 'research', null, false, '{12}'),
  ('ICML Proceedings', 'https://proceedings.mlr.press/rss.xml', 'research', 'rss', 1, 'research', null, false, '{7,8}'),
  ('ICLR OpenReview', 'https://openreview.net/rss?venue=ICLR.cc', 'research', 'rss', 1, 'research', null, false, '{5,6}')
on conflict (url) do nothing;

-- ── Seed: default settings ──────────────────────────────────────

insert into public.settings (key, value, description) values
  ('summarizer_model',    'gpt-4o-mini', 'OpenAI model used for article summaries'),
  ('max_posts_per_run',   '50',          'Upper bound on articles published in one ingest run'),
  ('require_quality_flag','true',        'Only index articles the pipeline marked quality: high')
on conflict (key) do nothing;
