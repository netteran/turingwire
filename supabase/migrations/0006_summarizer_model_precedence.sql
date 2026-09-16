-- ---------------------------------------------------------------
-- `summarizer_model` was seeded in 0004 but nothing ever read it — the
-- summarizers only looked at the SUMMARIZER_MODEL env var (a GitHub Actions
-- repo variable), so editing this row in Admin silently did nothing.
--
-- summarize_news.py / summarize_research.py now call
-- get_setting("summarizer_model", MODEL) in main(), so this row wins when
-- set; the env var (and gpt-4o-mini beneath that) is only the fallback for
-- when this is left blank. Update the description so the panel reflects
-- that precedence — no value change needed, gpt-4o-mini is still a sane
-- default either way this is read.
-- ---------------------------------------------------------------

update public.settings
set description = 'OpenAI model used for news/research article summaries (not classification or company tagging). Takes priority over the SUMMARIZER_MODEL GitHub Actions variable when set; leave blank to fall back to that variable, or gpt-4o-mini if neither is set.'
where key = 'summarizer_model';
