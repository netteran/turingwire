---
title: "Operadic consistency: a label-free signal for compositional reasoning failures in LLMs"
date: 2026-06-11 17:50:40 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13649v1"
arxiv_id: "2606.13649"
authors: ["Nathaniel Bottman", "Yinhong Liu", "Kyle Richardson"]
slug: operadic-consistency-a-label-free-signal-for-compositional-r
summary_word_count: 448
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces operadic consistency (OC) as a label-free diagnostic for identifying reasoning failures in large language models (LLMs)."
---

**Problem** — The paper addresses the lack of effective, label-free methods for detecting reasoning failures in large language models (LLMs) during inference. Existing confidence baselines, such as self-consistency and semantic entropy, rely on ground-truth labels or within-question sampling, which may not be feasible in all scenarios. The authors propose operadic consistency (OC) as a novel diagnostic tool that leverages operad theory to evaluate the coherence of model outputs in response to compositional queries. This work is a preprint and has not undergone peer review.

**Method** — The authors define operadic consistency (OC) as a measure of agreement between a model's direct answer to a compositional query and the answer derived from a stated decomposition of that query. They evaluate OC across twelve instruction-tuned LLMs, ranging from 4 billion to 671 billion parameters, on four multi-hop question-answering (QA) datasets. The evaluation includes both open-weight and closed-source models. The correlation of OC with accuracy is quantified using Pearson's correlation coefficient, with a focus on its robustness across datasets. The authors also compare OC against chain-of-thought self-consistency (CoT-SC) and semantic entropy, controlling for decomposition-aware baselines.

**Results** — OC demonstrates a strong correlation with accuracy across all evaluated datasets, achieving Pearson correlation coefficients between 0.86 and 0.94 (all p-values ≤ 0.0004). Notably, OC is the only evaluated signal that maintains a correlation of r ≥ 0.85 across all datasets. While CoT-SC matches OC on HotpotQA and DROP (r = 0.93 and 0.87, respectively), its performance declines significantly on MuSiQue and StrategyQA (r ≈ 0.45). OC provides additional information beyond CoT-SC and semantic entropy, with cluster-robust p-values indicating strong statistical significance (p ≤ 10^{-16}). Furthermore, OC leads to selective-prediction improvements over a tuned CoT-SC baseline, with area under the average receiver operating characteristic (AUROC) and area under the average recall curve (AUARC) showing significant lifts (AUARC +0.086 to +0.096; AUROC +0.092 to +0.164) at a fixed coverage budget of K = 3. The results are consistent across five frontier thinking models, with positive selective-prediction point estimates in 12 out of 16 tested scenarios.

**Limitations** — The authors acknowledge that OC's effectiveness may vary with different model architectures and datasets, and they do not explore the implications of OC in real-world applications or its scalability. Additionally, the reliance on compositional queries may limit the generalizability of the findings to other types of reasoning tasks.

**Why it matters** — The introduction of operadic consistency as a diagnostic tool for LLMs has significant implications for improving model reliability and interpretability in complex reasoning tasks. By providing a label-free method to detect reasoning failures, OC can enhance the development of more robust LLMs and inform future research on compositional reasoning in AI systems, as published in [arXiv](https://arxiv.org/abs/2606.13649v1).
