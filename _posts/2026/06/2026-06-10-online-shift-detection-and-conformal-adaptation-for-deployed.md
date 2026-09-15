---
title: "Online Shift Detection and Conformal Adaptation for Deployed Safety Classifiers"
date: 2026-06-10 11:24:25 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11949v1"
arxiv_id: "2606.11949"
authors: ["Jun Wen Leong"]
slug: online-shift-detection-and-conformal-adaptation-for-deployed
summary_word_count: 432
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces an online monitoring system for detecting distributional shifts in safety classifiers, enhancing their adaptability through conformal abstention."
---

**Problem**  
This work addresses the gap in real-time monitoring and adaptation of deployed safety classifiers in the presence of distributional shifts, a critical issue for maintaining classifier reliability in dynamic environments. The authors highlight the lack of existing frameworks that effectively detect shifts and adapt decision thresholds accordingly. This paper is a preprint and has not undergone peer review.

**Method**  
The proposed system employs calibrated sequential statistics to monitor classifiers for distributional shifts. Upon detection, it utilizes a conformal abstention layer to adjust decision thresholds, aiming to maintain a target error rate of ε=0.1. The evaluation framework consists of a factorial design involving four classifiers, five shift conditions, and 20 random seeds, resulting in 800 experimental cells. The classifiers evaluated include DeBERTa, Llama Guard, and ShieldGemma, among others. The system's performance is assessed through metrics such as valid detection rates and latency, with a focus on the impact of different shift types and classifier characteristics on detection efficacy.

**Results**  
The system achieves a valid detection rate of 86.6% (693 out of 800, 95% CI [84.1%, 88.8%]) with a mean latency of 39.5 steps across all conditions. Detection performance is consistent across three ground-truth regimes: synthetic onset (86.6%), real temporal jailbreaks (85%, 17 out of 20), and GCG adversarial attacks. Notably, the weighted conformal prediction method recovers up to 39 percentage points (pp) of lost coverage for DeBERTa (effective sample size, ESS=46/300), while it fails for other classifiers (ESS~300). Logistic density ratio estimation demonstrates perfect source/target separability in high-dimensional embedding spaces, but this leads to a collapse in importance weights. PCA reduction to 32 dimensions mitigates this collapse, recovering 33 pp for Llama Guard and 21 pp for ShieldGemma. Variance decomposition indicates that classifier type (η²=0.243), shift type (η²=0.237), and their interaction (η²=0.185) significantly contribute to detection latency variance (all p<0.001).

**Limitations**  
The authors acknowledge that the performance of the conformal abstention layer varies significantly across classifiers, with some experiencing total collapse under certain conditions. Additionally, the reliance on PCA for dimensionality reduction may not generalize across all classifiers or shift types. The study's factorial design, while comprehensive, may not capture all real-world complexities, and the results are limited to the specific classifiers and shifts tested.

**Why it matters**  
This research provides a foundational framework for real-time monitoring and adaptation of safety classifiers, which is crucial for applications in safety-critical domains. The findings underscore the importance of tailored monitoring profiles for different classifiers, suggesting avenues for future work in adaptive machine learning systems. This work is significant for researchers and engineers aiming to enhance the robustness of deployed models, as published in [arXiv](https://arxiv.org/abs/2606.11949v1).
