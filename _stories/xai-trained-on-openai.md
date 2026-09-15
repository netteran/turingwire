---
title: "Did xAI train Grok on OpenAI models?"
slug: xai-trained-on-openai
first_seen: 2026-05-01 09:00:00 +0000
last_updated: 2026-05-02 14:00:00 +0000
date: 2026-05-01 09:00:00 +0000
trust_score: 0.62
companies: ["xAI", "OpenAI"]
lead: "Multiple outlets report Elon Musk acknowledged xAI used OpenAI models during early Grok training. Sources diverge on scope, timing, and whether the practice violated OpenAI's terms of service."
sources:
  - title: "Elon Musk admits xAI used OpenAI models — sparks debate over AI training ethics"
    url: "https://example.com/article-a"
    publisher: "TechCrunch"
    date: 2026-05-01
    bias: center
  - title: "Elon Musk admits xAI used OpenAI models to train Grok during early development"
    url: "https://example.com/article-b"
    publisher: "The Verge"
    date: 2026-05-01
    bias: center
  - title: "Elon Musk says xAI partly used OpenAI models in AI training pipeline"
    url: "https://example.com/article-c"
    publisher: "Reuters"
    date: 2026-05-02
    bias: center
  - title: "OpenAI considers legal review of competitor training practices"
    url: "https://example.com/article-d"
    publisher: "The Information"
    date: 2026-05-02
    bias: business
claims:
  - text: "Elon Musk publicly acknowledged that xAI used OpenAI models during early Grok training."
    status: corroborated
    confidence: 0.92
    supporting: [0, 1, 2]
    contradicting: []
  - text: "The use was limited to bootstrapping evaluations, not direct fine-tuning on OpenAI outputs."
    status: disputed
    confidence: 0.55
    supporting: [1]
    contradicting: [0, 2]
    note: "TechCrunch and Reuters describe usage that goes beyond evaluation; The Verge characterizes it as evaluation-only."
  - text: "OpenAI is considering a formal legal review of competitor training practices."
    status: single_source
    confidence: 0.50
    supporting: [3]
    contradicting: []
    note: "Reported by The Information; not yet confirmed by other outlets at time of synthesis."
  - text: "xAI's terms-of-service compliance during training has not been independently audited."
    status: corroborated
    confidence: 0.80
    supporting: [0, 2, 3]
    contradicting: []
---

The dispute centres on **what "used OpenAI models" means in practice**. Two readings co-exist in the source pool:

1. **Evaluation-only**: xAI ran OpenAI models as benchmarks against early Grok checkpoints. This is uncontroversial under typical API terms.
2. **Output-derived training data**: xAI generated samples from OpenAI models and used them as training signal. This would conflict with OpenAI's terms-of-service prohibition on using its outputs to train competing models.

The source pool does not yet allow a confident verdict between these readings. Until a primary document (a model card, an internal memo, or a legal filing) is published, the synthesis flags the scope claim as **disputed** rather than picking a side.

What to watch: a formal statement from OpenAI's legal team, a clarifying post from Musk or xAI engineering leadership, or a published audit of Grok's training pipeline.
