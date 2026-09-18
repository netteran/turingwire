-- ---------------------------------------------------------------
-- Adds Pathway's blog as a scraped source (no working RSS/Atom feed was
-- given, only the listing page). type='scrape' + company='Pathway' is
-- read by scripts/generate_scraped_feeds.py / fetch_feeds.py / the
-- source_company fallback in supabase_store.py — see feeds/scrape_targets.yml
-- for the per-source scraping rule.
--
-- company is set here rather than added to feeds/company_aliases.yml:
-- that file's alias matching is a text scan across *every* article from
-- *every* source, and "Pathway" is an ordinary English word — scanning
-- for it would risk mistagging unrelated articles that merely contain the
-- word "pathway". Setting it on the source instead only ever applies to
-- articles that actually came from this feed, and separately doubles as
-- the seed for generate_company_pages.py to create /companies/pathway/
-- automatically once an article publishes.
-- ---------------------------------------------------------------

insert into public.ingest_sources
  (name, url, kind, type, priority, category_hint, company, requires_full_text_fetch, active_months)
values
  ('Pathway Blog', 'https://pathway.com/blog', 'news', 'scrape', 1, 'news', 'Pathway', false, '{}')
on conflict (url) do nothing;
