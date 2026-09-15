---
title: "Knowledge Index of Noah's Ark"
date: 2026-06-03 17:06:49 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.05104v1"
arxiv_id: "2606.05104"
authors: ["Sheng Jin", "Minghao Liu", "Yunze Xiao", "Zeqi Zhou", "Heli Qi", "Yifan Yao"]
slug: knowledge-index-of-noah-s-ark
summary_word_count: 411
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces KINA, a comprehensive benchmark for evaluating LLMs across diverse disciplines, addressing representativeness and ranking stability issues."
---

**Problem**  
The paper addresses significant gaps in the evaluation of large language models (LLMs) by introducing KINA, a benchmark designed to operationalize disciplinary representativeness, which has been inadequately addressed in existing knowledge benchmarks. Current benchmarks suffer from scaling-driven designs that do not reflect the diversity of disciplines, flat-payment annotation methods that lead to lazy consensus, and ranking instability under constrained test budgets. This work is presented as a preprint and has not undergone peer review.

**Method**  
KINA consists of 899 items spanning 261 fine-grained disciplines. The authors propose a coverage-style objective to operationalize disciplinary representativeness through a proxy based on expert-elicited anchors, achieving a (1-1/e) greedy approximation (Proposition 1). Additionally, they introduce a bonus-on-bar tournament mechanism that weakly first-order stochastically dominates flat payment in terms of released-review quality, with an incentive-compatibility threshold defined as B > Delta C / Delta p_min (Theorem 1). The evaluation involved 42 models from 13 different labs, with a focus on the top-performing models and their respective scores.

**Results**  
The evaluation results indicate that the top model, Gemini-3.1-Pro-Preview, achieved a score of 53.17%, followed by Claude-Opus-4.6 at 49.92% and GPT-5.4 at 48.55%. The results reveal a tiered structure in model performance: a small frontier tier above 48%, a dense strong-model tier ranging from approximately 38% to 45%, and lower-performing models slightly above a 10% chance baseline. Tool augmentation was shown to enhance performance by up to 5.17 points across five tool-use evaluations, with performance gains varying significantly among models. The authors also provide bootstrap ranking-stability statistics to clarify the variance in rankings under bounded budgets, discouraging over-interpretation of closely ranked models.

**Limitations**  
The authors acknowledge that the proxy for representativeness does not guarantee population representativeness, which may limit the generalizability of the benchmark. Additionally, the tiered structure of model performance suggests that there is still substantial headroom for improvement, indicating that the benchmark may not fully capture the capabilities of emerging models. The reliance on expert-elicited anchors may also introduce biases that could affect the benchmark's validity.

**Why it matters**  
The introduction of KINA has significant implications for the evaluation of LLMs, as it provides a more nuanced and representative framework for assessing model performance across diverse disciplines. This benchmark can guide future research in LLM evaluation and development, ensuring that models are not only high-performing but also representative of a wide range of knowledge areas. The findings and methodologies presented in this paper can inform subsequent work in the field, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.05104v1).
