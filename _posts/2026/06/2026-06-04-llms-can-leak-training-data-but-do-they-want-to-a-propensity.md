---
title: "LLMs Can Leak Training Data But Do They Want To? A Propensity-Aware Evaluation of Memorization in LLMs"
date: 2026-06-04 15:25:24 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06286v1"
arxiv_id: "2606.06286"
authors: ["Gianluca Barmina", "Peter Schneider-Kamp", "Lukas Galke Poech"]
slug: llms-can-leak-training-data-but-do-they-want-to-a-propensity
summary_word_count: 429
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces PropMe, a framework for evaluating memorization in LLMs, revealing discrepancies between capability and propensity in data leakage."
---

**Problem**  
Existing evaluations of memorization in large language models (LLMs) primarily focus on the models' ability to reproduce training data under adversarial conditions, rather than assessing their propensity to do so in typical usage scenarios. This gap in the literature is significant, as it does not account for the likelihood of models leaking training data during ordinary interactions. The authors present a preprint that addresses this issue by introducing a new framework for evaluating memorization propensity.

**Method**  
The authors propose PropMe, a propensity-aware framework that contrasts prefix-based capability attacks with non-adversarial evaluations. They introduce a metric transformation that allows existing memorization metrics to be adapted into propensity metrics. Additionally, they develop SimpleTrace, a lightweight tracing pipeline based on infini-gram, which deterministically attributes model outputs to large-scale training datasets. This pipeline computes various memorization metrics, including verbatim, near-verbatim, and propensity-transformed scores. The evaluation is conducted on two fully-open models, Comma and DFM Decoder, using two datasets, Common Pile and Dynaword, across two languages.

**Results**  
The findings reveal a significant discrepancy between capability and propensity metrics. Specifically, prefix attacks elicit memorization signals that are substantially stronger than those observed with generic or dataset-specific prompts. The propensity scores for both models remain low overall, indicating that while models can reveal training data when directly prompted, they do not do so frequently in non-adversarial contexts. Notably, DFM Decoder, which is continually pre-trained from Comma, shows reduced memorization and memorization propensity for the Common Pile dataset, suggesting that ongoing training with different data can diminish memorization capability. The authors provide quantitative results, demonstrating that the propensity scores are consistently lower than the capability scores, emphasizing the need for dual reporting in memorization audits.

**Limitations**  
The authors acknowledge that their framework may not capture all nuances of memorization behavior, particularly in highly specialized or adversarial contexts. They also note that the evaluation is limited to two specific models and datasets, which may not generalize across all LLMs or training corpora. Furthermore, the reliance on prefix-based attacks may not fully represent the diversity of user interactions with LLMs.

**Why it matters**  
This work has significant implications for the understanding of data leakage in LLMs, suggesting that traditional memorization evaluations may overestimate the risk of data exposure in real-world applications. By advocating for the inclusion of both worst-case extractability and ordinary leakage propensity in memorization audits, the authors contribute to a more nuanced understanding of LLM behavior. This is crucial for developing safer AI systems and informs future research on mitigating data leakage risks, as discussed in related works on model interpretability and safety, available on [arXiv](https://arxiv.org/abs/2606.06286v1).
