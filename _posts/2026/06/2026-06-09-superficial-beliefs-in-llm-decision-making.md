---
title: "Superficial Beliefs in LLM Decision-Making"
date: 2026-06-09 15:54:35 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11016v1"
arxiv_id: "2606.11016"
authors: ["Gabriel Freedman", "Francesca Toni"]
slug: superficial-beliefs-in-llm-decision-making
summary_word_count: 413
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the decision-making processes of large language models, revealing a phenomenon termed \"superficial belief\" in their attribute-based choices."
---

**Problem** — This work addresses the gap in understanding whether large language models (LLMs) possess a systematic decision-making structure or merely imitate rationales when making choices. The authors highlight that existing literature lacks clarity on the relationship between LLM outputs and the underlying decision processes, particularly in synthetic binary decision contexts. This preprint seeks to elucidate the nature of LLM decision-making by examining the alignment between model outputs and the attributes influencing those decisions.

**Method** — The authors employ a synthetic binary decision framework where LLMs choose between profiles defined by graded attributes. They compare the attribute that the model claims is most significant with the attribute that best explains its choices, as inferred from a behavioral model fitted to prior decisions. The behavioral model is designed to predict held-out choices, demonstrating that model behavior is systematically related to visible attributes rather than being random. The study includes various experimental conditions, such as prompt-order and sampling perturbations, and utilizes targeted occlusion analyses to assess the robustness of their findings. The authors do not disclose specific training compute or architecture details for the LLMs used in their experiments.

**Results** — The behavioral model shows strong predictive performance on held-out choices, indicating a systematic relationship between model behavior and the attributes. However, the direct self-reports from the models and a separate score-based judge only partially recover the behaviorally inferred drivers. This suggests that while the models exhibit structured decision-making, their explicit verbalizations do not fully capture the underlying attributes influencing their choices. The qualitative pattern of "superficial belief" persists across various experimental manipulations, reinforcing the notion that LLMs operate with probabilistic local priorities over attributes.

**Limitations** — The authors acknowledge that their findings are based on synthetic decision settings, which may not fully represent real-world decision-making scenarios. Additionally, the partial recovery of the inferred drivers from self-reports indicates a limitation in the models' ability to articulate their decision-making processes. The study does not explore the implications of these findings on the interpretability of LLMs in more complex, real-world applications.

**Why it matters** — Understanding the decision-making processes of LLMs is crucial for improving their interpretability and reliability in practical applications. The concept of "superficial belief" suggests that while LLMs can make structured decisions, their lack of explicit reasoning may hinder their deployment in critical domains requiring transparency. This work lays the groundwork for future research aimed at enhancing the interpretability of LLMs and understanding the cognitive mechanisms underlying their decision-making, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11016v1).
