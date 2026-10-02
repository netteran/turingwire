-- ---------------------------------------------------------------
-- Adds a Google News search for coverage of BDH ("Dragon Hatchling"),
-- Pathway's post-transformer architecture, whether or not the article
-- names Pathway. Complements "Google News · Pathway" (0014), which
-- requires "Pathway" AND (BDH OR "Dragon Hatchling") and so misses
-- coverage that only talks about the architecture itself. Overlap
-- between the two feeds is handled by the normal dedup step.
--
-- "BDH" alone is ambiguous (BDH Chemicals, Bangladesh-related acronyms,
-- ...), so it only counts alongside an AI term; "Dragon Hatchling" is
-- specific enough to stand on its own.
--
-- company='Pathway' because BDH is Pathway's technology, so these
-- articles belong on /companies/pathway/ alongside the other two
-- Pathway sources.
-- ---------------------------------------------------------------

insert into public.ingest_sources
  (name, url, kind, type, priority, category_hint, company, requires_full_text_fetch, active_months)
values
  (
    'Google News · BDH (Dragon Hatchling)',
    'https://news.google.com/rss/search?q=%22Dragon+Hatchling%22+OR+%28%22BDH%22+%28AI+OR+transformer+OR+transformers+OR+LLM+OR+%22language+model%22+OR+architecture%29%29&hl=en-US&gl=US&ceid=US:en',
    'news', 'rss', 2, 'news', 'Pathway', true, '{}'
  )
on conflict (url) do nothing;
