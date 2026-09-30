-- ---------------------------------------------------------------
-- Article origin + custom articles written from Admin.
--
-- Until now every article came from the ingest pipeline, and every one was
-- bylined to the editor persona. That claimed a person had written
-- thousands of automated summaries. Bylines now follow who actually
-- produced the piece:
--
--   pipeline   automated summary        → "Turing Wire Newsdesk" /
--                                           "Turing Wire Research Desk"
--   editor     written by the editor,   → the editor persona
--              published as written
--   editor_ai  drafted by the pipeline  → the editor persona, with an
--              prompts from a source      AI-assistance note
--              the editor supplied, then
--              reviewed and edited
--
-- Existing rows are all pipeline output, hence the default.
-- ---------------------------------------------------------------

alter table public.articles
  add column origin text not null default 'pipeline'
    check (origin in ('pipeline', 'editor', 'editor_ai'));

create index articles_origin_idx on public.articles (origin) where origin <> 'pipeline';

-- Admins create custom articles from /admin/articles/new. Until now only
-- the service-role pipeline inserted rows; admins could only update.
create policy "admins insert articles"
  on public.articles for insert to authenticated
  with check (public.is_admin());

-- A custom article can name a company the pipeline hasn't seen yet. Its
-- /companies/<slug>/ page needs the row to exist, so admins may add one
-- (generate_company_pages.py would otherwise only create it on the next
-- ingest run).
create policy "admins insert companies"
  on public.companies for insert to authenticated
  with check (public.is_admin());
