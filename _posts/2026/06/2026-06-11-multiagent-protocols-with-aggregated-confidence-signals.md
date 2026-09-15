---
title: "Multiagent Protocols with Aggregated Confidence Signals"
date: 2026-06-11 17:12:11 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13591v1"
arxiv_id: "2606.13591"
authors: ["Ali Elahi", "Barbara Di Eugenio"]
slug: multiagent-protocols-with-aggregated-confidence-signals
summary_word_count: 426
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces protocols for aggregating confidence signals in multiagent systems, enhancing output reliability and decision-making in NLP tasks."
---

**Problem**  
The paper addresses a significant gap in the literature regarding the aggregation of confidence signals in multiagent systems, particularly in Natural Language Processing (NLP). While prior work has explored confidence in the context of multiagent debate (MAD) for weighting messages and calibrating agents, it has not produced a unified confidence metric for the system's output. This lack of a systematic approach to aggregate confidence signals limits the reliability and oversight of multiagent systems. The authors present their work as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose three distinct protocols for generating a final output alongside an aggregated confidence score. The methodology involves transforming raw confidence signals from individual agents to ensure comparability across different models. This transformation is followed by two aggregation techniques: soft voting and a novel probability fusion method termed Bayesian fusion. The study evaluates the effectiveness of these protocols using two confidence estimators—sequence probability and self-report—alongside both parametric and non-parametric calibration methods. The training and evaluation encompass six homogeneous and heterogeneous debating pairs across five benchmarks and four task types, although specific details on training compute are not disclosed.

**Results**  
The proposed protocols yield a significantly more discriminative aggregated confidence metric, measured by the Area Under the Aggregated Receiver Operating Characteristic (AUARC), compared to the best-performing single agent and standard debate baselines. The authors report that the aggregated confidence improves the system's performance while maintaining a stable F1-score, effectively recovering losses incurred by MAD in ambiguous tasks. The results indicate that calibration enhances F1-scores for both confidence estimators, while AUARC demonstrates robustness and less dependency on calibration. Specific performance metrics are not detailed in the summary, but the improvements are statistically significant against established baselines.

**Limitations**  
The authors acknowledge that their approach may not generalize across all types of multiagent systems, particularly those with highly heterogeneous agents or in scenarios with extreme ambiguity. Additionally, the reliance on calibration methods may introduce variability in performance, which could be a concern in real-world applications. The paper does not address potential computational overhead introduced by the aggregation process, which could impact scalability in larger systems.

**Why it matters**  
This work has significant implications for enhancing the reliability of multiagent systems in NLP, particularly in applications requiring robust decision-making under uncertainty. By providing a systematic method for aggregating confidence signals, the proposed protocols can improve the interpretability and trustworthiness of outputs from multiagent systems. This advancement is crucial for downstream applications in areas such as automated dialogue systems, collaborative AI, and decision support systems, as published in [arXiv](https://arxiv.org/abs/2606.13591v1).
