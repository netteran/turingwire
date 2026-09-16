-- ---------------------------------------------------------------
-- Turing Wire content schema
-- Replaces Jekyll _posts/**.md as the source of truth for articles.
-- URL contract: /news/<slug>/ and /research/<slug>/
-- ---------------------------------------------------------------

create type article_category as enum ('news', 'research');
create type article_impact   as enum ('critical', 'major', 'notable', 'minor');
create type article_status   as enum ('published', 'archived', 'draft');

create table public.articles (
  id            bigint generated always as identity primary key,

  -- URL identity: /<category>/<slug>/
  slug          text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category      article_category not null,
  tags          text[] not null default '{}',   -- secondary categories, e.g. {stocks}
  status        article_status not null default 'published',

  -- content
  title         text not null,
  description   text,
  body          text,                            -- markdown; null for metadata-only archive rows
  published_at  timestamptz not null,

  -- Cheap card excerpt so listing queries never have to select body.
  -- Markdown is stripped at render time; this just caps the payload.
  excerpt text generated always as (
    case when body is null then null
         else left(regexp_replace(body, '\s+', ' ', 'g'), 400)
    end
  ) stored,

  -- classification
  subcategory   text not null default 'other',
  impact        article_impact not null default 'notable',
  company       text,
  secondary_companies text[] not null default '{}',
  classification_confidence numeric(3,2) check (classification_confidence between 0 and 1),

  -- provenance
  source_publisher text not null,
  source_url       text not null,
  source_truncated boolean not null default false,

  -- research-specific
  arxiv_id      text,
  authors       text[] not null default '{}',

  -- editorial signals
  summary_word_count int not null default 0,
  quality       text check (quality in ('high')),

  -- migration / redirect bookkeeping
  legacy_slug   text,   -- original 60-char truncated slug
  legacy_path   text,   -- original /post/YYYY/MM/DD/<slug>/ permalink
  archived_from text,
  archived_at   timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- a published article must actually have a body
  constraint published_requires_body
    check (status <> 'published' or (body is not null and length(btrim(body)) > 0))
);

-- URL uniqueness is per-section, matching /<category>/<slug>/
create unique index articles_category_slug_key on public.articles (category, slug);

-- redirect lookups from the old Jekyll permalinks
create unique index articles_legacy_path_key on public.articles (legacy_path) where legacy_path is not null;

-- listing / filtering paths used by the site
create index articles_published_idx             on public.articles (published_at desc) where status = 'published';
create index articles_category_published_idx    on public.articles (category, published_at desc) where status = 'published';
create index articles_impact_published_idx      on public.articles (impact, published_at desc) where status = 'published';
create index articles_subcategory_published_idx on public.articles (subcategory, published_at desc) where status = 'published';
create index articles_company_published_idx     on public.articles (company, published_at desc) where status = 'published';
create index articles_secondary_companies_idx   on public.articles using gin (secondary_companies);
create index articles_tags_idx                  on public.articles using gin (tags);
create index articles_arxiv_id_idx              on public.articles (arxiv_id) where arxiv_id is not null;

-- full-text search (powers /search/)
alter table public.articles add column search_tsv tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(company, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'C')
  ) stored;
create index articles_search_idx on public.articles using gin (search_tsv);

-- ---------------------------------------------------------------

create table public.companies (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  name        text not null unique,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------

create table public.stories (
  id           bigint generated always as identity primary key,
  slug         text not null unique,
  title        text not null,
  lead         text,
  trust_score  numeric(3,2),
  companies    text[] not null default '{}',
  sources      jsonb not null default '[]'::jsonb,
  claims       jsonb not null default '[]'::jsonb,
  first_seen   timestamptz,
  last_updated timestamptz,
  status       article_status not null default 'published',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index stories_last_updated_idx on public.stories (last_updated desc) where status = 'published';

-- ---------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_set_updated_at  before update on public.articles  for each row execute function public.set_updated_at();
create trigger companies_set_updated_at before update on public.companies for each row execute function public.set_updated_at();
create trigger stories_set_updated_at   before update on public.stories   for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- RLS: the site is public read-only; the ingest pipeline writes with
-- the service role, which bypasses RLS.
-- ---------------------------------------------------------------

alter table public.articles  enable row level security;
alter table public.companies enable row level security;
alter table public.stories   enable row level security;

create policy "public read published articles"
  on public.articles for select to anon, authenticated
  using (status = 'published');

create policy "public read companies"
  on public.companies for select to anon, authenticated
  using (true);

create policy "public read published stories"
  on public.stories for select to anon, authenticated
  using (status = 'published');
