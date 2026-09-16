-- ---------------------------------------------------------------
-- Anthropic Claude joins OpenAI and Gemini as a third summarizer provider
-- (scripts/llm.py dispatches claude-* models to it). Update the
-- description so the Admin panel reflects all three; no value change.
--
-- A Claude model additionally requires an ANTHROPIC_API_KEY GitHub Actions
-- secret (added the same way OPENAI_API_KEY / GEMINI_API_KEY already are).
-- ---------------------------------------------------------------

update public.settings
set description = 'Model used for news/research article summaries (not classification or company tagging). Pick from the dropdown, or choose "Custom / other" for any other model id. gemini-* models route to Google Gemini (needs GEMINI_API_KEY); claude-* models route to Anthropic (needs ANTHROPIC_API_KEY); everything else routes to OpenAI (needs OPENAI_API_KEY, already configured). Leave blank to fall back to the SUMMARIZER_MODEL GitHub Actions variable, or gpt-4o-mini if neither is set.'
where key = 'summarizer_model';
