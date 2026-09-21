-- ---------------------------------------------------------------
-- Archived articles are public, not hidden.
--
-- `archived` predates this schema. Under Jekyll, moving a post's .md file
-- out of _posts and into an archive folder was how the site kept its build
-- folder (and repo) manageable — Jekyll simply never generated a page for a
-- file outside _posts. That file-location detail got carried over as a
-- status value when the old posts were migrated into `articles` (some as
-- full posts, some as metadata-only stubs), and the public RLS policy
-- below ended up treating `archived` the same as `draft`: excluded from
-- every read the anon client makes — listings, search, the sitemap, and
-- the legacy /post/YYYY/MM/DD/<slug>/ redirect lookup — even though
-- several of those call sites already assumed an archived row would still
-- resolve. There's no build-folder constraint left to justify that:
-- Supabase serves every row from one table regardless of status. So
-- `archived` now reads exactly like `published`; `draft` remains the only
-- status that means "not ready for readers."
-- ---------------------------------------------------------------

alter policy "public read published articles" on public.articles
  rename to "public read non-draft articles";

alter policy "public read non-draft articles" on public.articles
  using (status <> 'draft');

-- Company coverage counts: count archived articles toward a company's
-- totals the same as published ones (see 0002_content_views.sql).
create or replace view public.company_article_counts
with (security_invoker = true) as
select
  c.name,
  c.slug,
  c.description,
  count(a.id) filter (where a.company = c.name) as primary_count,
  count(a.id) filter (where c.name = any(a.secondary_companies)) as mention_count,
  count(a.id) as article_count,
  max(a.published_at) as latest_published_at
from public.companies c
left join public.articles a
  on a.status <> 'draft'
 and (a.company = c.name or c.name = any(a.secondary_companies))
group by c.name, c.slug, c.description;

-- Full-text search over every reader-visible article, archived included
-- (see 0002_content_views.sql).
create or replace function public.search_articles(
  search_query text,
  result_limit int default 50,
  filter_category article_category default null
)
returns setof public.articles
language sql
stable
security invoker
set search_path = ''
as $$
  select a.*
  from public.articles a
  where a.status <> 'draft'
    and a.search_tsv @@ websearch_to_tsquery('english', search_query)
    and (filter_category is null or a.category = filter_category)
  order by ts_rank(a.search_tsv, websearch_to_tsquery('english', search_query)) desc,
           a.published_at desc
  limit least(greatest(result_limit, 1), 200);
$$;

-- Listing/filter indexes were scoped to `published` rows only; widen them
-- to match the new visibility rule so they still cover these queries
-- (see 0001_create_content_schema.sql).
drop index public.articles_published_idx;
drop index public.articles_category_published_idx;
drop index public.articles_impact_published_idx;
drop index public.articles_subcategory_published_idx;
drop index public.articles_company_published_idx;

create index articles_published_idx             on public.articles (published_at desc) where status <> 'draft';
create index articles_category_published_idx    on public.articles (category, published_at desc) where status <> 'draft';
create index articles_impact_published_idx      on public.articles (impact, published_at desc) where status <> 'draft';
create index articles_subcategory_published_idx on public.articles (subcategory, published_at desc) where status <> 'draft';
create index articles_company_published_idx     on public.articles (company, published_at desc) where status <> 'draft';
