-- ---------------------------------------------------------------
-- Distinguishes cross-company trend Stories (build_stories.py's fixed
-- THEME_SUBCATEGORIES clusters — Safety Exodus, Model Welfare, etc.) from
-- single-company event Stories (everything else), so the front end can
-- lead with the general trend signal and group company-specific coverage
-- separately. See scripts/build_stories.py.
-- ---------------------------------------------------------------

alter table public.stories
  add column scope text not null default 'event' check (scope in ('theme', 'event'));

update public.stories
set scope = 'theme'
where slug in ('safety-exodus', 'model-welfare', 'power-and-grid', 'agi-countdown', 'ai-slop-watch');
