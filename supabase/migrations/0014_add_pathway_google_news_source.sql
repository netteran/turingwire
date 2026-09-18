-- ---------------------------------------------------------------
-- Adds a Google News search for third-party coverage of Pathway,
-- complementing the "Pathway Blog" scrape source (which only picks up
-- Pathway's own /blog/ and /research/ posts, never the press coverage
-- linked from their site — WSJ, Forbes, AWS, TechCrunch, etc. — since
-- generate_scraped_feeds.py's same-origin check correctly excludes all of
-- that). Mirrors the existing Google News · xAI/DeepSeek/MiniMax/Scale AI/
-- Character.AI rows exactly: type='rss', no scraping involved, and
-- fetch_feeds.py already resolves news.google.com redirect links to the
-- real publisher URL for every row of this shape.
--
-- Query requires "Pathway" AND ("BDH" OR "Dragon Hatchling") rather than
-- the OR-of-keywords pattern the other rows use: "Pathway" alone is an
-- ordinary English word (career pathway, biological pathway, ...), where
-- xAI/DeepSeek/MiniMax/Scale AI/Character.AI aren't, so an OR-keyword
-- pattern that's safe for those would flood this one with unrelated
-- results. BDH ("Dragon Hatchling") is Pathway's own architecture name and
-- tags nearly every one of their own posts, so requiring it is a strong,
-- specific disambiguator rather than a loose OR term.
-- ---------------------------------------------------------------

insert into public.ingest_sources
  (name, url, kind, type, priority, category_hint, company, requires_full_text_fetch, active_months)
values
  (
    'Google News · Pathway',
    'https://news.google.com/rss/search?q=%22Pathway%22+%28%22BDH%22+OR+%22Dragon+Hatchling%22%29&hl=en-US&gl=US&ceid=US:en',
    'news', 'rss', 2, 'news', 'Pathway', true, '{}'
  )
on conflict (url) do nothing;
