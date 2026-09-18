-- ---------------------------------------------------------------
-- Removes existing event-scope Stories that are single-company threads
-- rather than the general, cross-company trend signal the section is
-- meant to surface. Flagged by inspection of the live site; the stricter
-- event-cluster bar added in 0011's accompanying code change (3 articles
-- from 3 publishers, up from 2/2) makes this kind of story rarer going
-- forward, but does not retroactively remove what already qualified
-- under the old bar.
-- ---------------------------------------------------------------

delete from public.stories
where slug in (
  'openai-other',
  'openai-safety-alignment',
  'meta-other',
  'meta-product-launch',
  'google-product-launch',
  'nvidia-other',
  'xai-trained-on-openai',
  'atlassian-ai-search-revenue'
);
