-- ---------------------------------------------------------------
-- summarize_news.py / summarize_research.py now dispatch to either OpenAI
-- or Google Gemini, chosen purely by this value's prefix
-- (gemini-* -> Gemini, everything else -> OpenAI — see scripts/llm.py).
-- The Admin settings page renders this key as a grouped dropdown
-- (components/admin/ModelPicker.tsx) instead of a free-text field.
--
-- A Gemini model additionally requires a GEMINI_API_KEY GitHub Actions
-- secret (added the same way OPENAI_API_KEY already is) — this migration
-- only updates the description so the panel says so; no value change.
-- ---------------------------------------------------------------

update public.settings
set description = 'Model used for news/research article summaries (not classification or company tagging). Pick from the dropdown, or choose "Custom / other" for any other model id. gemini-* models route to Google Gemini and require a GEMINI_API_KEY GitHub Actions secret; every other value routes to OpenAI and uses OPENAI_API_KEY (already configured). Leave blank to fall back to the SUMMARIZER_MODEL GitHub Actions variable, or gpt-4o-mini if neither is set.'
where key = 'summarizer_model';
