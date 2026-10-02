-- ---------------------------------------------------------------
-- Adds a Google News search for coverage of Typesafe (typesafe.ai).
-- Mirrors the "Google News · Pathway" row in 0014 exactly: type='rss',
-- no scraping involved, and fetch_feeds.py already resolves
-- news.google.com redirect links to the real publisher URL.
--
-- Query is "Typesafe AI" OR "typesafe.ai" rather than bare "Typesafe":
-- Typesafe was also Lightbend's former name (Scala/Akka), and "typesafe"
-- is a common programming term, so the bare word would flood this source
-- with unrelated Scala and type-system articles.
--
-- company is set on the source rather than added to
-- feeds/company_aliases.yml, for the same reason as Pathway (see 0013):
-- that file's alias scan runs across every article from every source,
-- and "typesafe" would mistag ordinary programming coverage. Setting it
-- here also seeds /companies/typesafe/ via generate_company_pages.py once
-- an article publishes.
-- ---------------------------------------------------------------

insert into public.ingest_sources
  (name, url, kind, type, priority, category_hint, company, requires_full_text_fetch, active_months)
values
  (
    'Google News · Typesafe',
    'https://news.google.com/rss/search?q=%22Typesafe+AI%22+OR+%22typesafe.ai%22&hl=en-US&gl=US&ceid=US:en',
    'news', 'rss', 2, 'news', 'Typesafe', true, '{}'
  )
on conflict (url) do nothing;
