-- ---------------------------------------------------------------
-- Read helpers for the Next.js front end.
--
-- security_invoker = true keeps the caller's RLS in force, so these
-- surface published articles only when queried with the anon key.
-- ---------------------------------------------------------------

-- Company coverage counts, counting both primary and secondary mentions.
-- Backs /companies/ and the homepage company rail, which previously came from
-- `site.posts | map: "company" | compact | uniq | sort` in Liquid.
create view public.company_article_counts
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
  on a.status = 'published'
 and (a.company = c.name or c.name = any(a.secondary_companies))
group by c.name, c.slug, c.description;

-- Full-text search over published articles, backing /search/.
create function public.search_articles(
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
  where a.status = 'published'
    and a.search_tsv @@ websearch_to_tsquery('english', search_query)
    and (filter_category is null or a.category = filter_category)
  order by ts_rank(a.search_tsv, websearch_to_tsquery('english', search_query)) desc,
           a.published_at desc
  limit least(greatest(result_limit, 1), 200);
$$;
