---
title: "Quality Adaptive Angular Margin Learning for Respiratory Sound Classification"
date: 2026-06-10 10:48:42 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11915v1"
arxiv_id: "2606.11915"
authors: ["Yoon Tae Kim", "Heejoon Koo", "Miika Toikkanen", "June-Woo Kim"]
slug: quality-adaptive-angular-margin-learning-for-respiratory-sou
summary_word_count: 378
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces QLung, a quality-adaptive angular-margin learning framework that enhances respiratory sound classification performance."
---

**Problem**  
This work addresses the challenge of respiratory sound classification, particularly focusing on the limitations of existing methods in handling varying audio quality and class imbalance. The authors highlight a gap in the literature regarding the integration of audio quality metrics into classification frameworks, which is crucial for improving model robustness and generalization. Notably, this is a preprint and has not undergone peer review.

**Method**  
The proposed framework, QLung, employs a quality-adaptive angular-margin learning approach. It introduces a no-reference audio quality margin based on spectral entropy and root-mean-square energy, which allows for the dynamic adjustment of angular margins according to the quality of the audio recordings. The architecture utilizes a log-scaled angular margin to stabilize training, particularly under conditions of severe class imbalance. The angular classifier normalizes both features and class weights, ensuring that margin penalties are consistently applied on the unit hypersphere. This design choice enhances intra-class compactness and inter-class separability, which are critical for effective classification.

**Results**  
QLung demonstrates a notable improvement in performance on the ICBHI dataset, achieving a 2.46% increase in in-distribution accuracy over a baseline model using cross-entropy loss. Furthermore, it outperforms previous state-of-the-art methods on the SPRSound dataset, particularly in out-of-distribution scenarios, showcasing its robustness against variations in audio quality. The specific performance metrics and comparisons to named baselines are not detailed in the abstract but are critical for evaluating the effectiveness of the proposed method.

**Limitations**  
The authors acknowledge that the framework's reliance on audio quality metrics may limit its applicability in scenarios where such metrics are not easily computable. Additionally, the performance gains are primarily demonstrated on specific datasets (ICBHI and SPRSound), which may not generalize to other respiratory sound classification tasks. The paper does not address potential computational overhead introduced by the quality-adaptive mechanisms, which could impact real-time applications.

**Why it matters**  
The introduction of QLung has significant implications for the field of respiratory sound classification, particularly in clinical settings where audio quality can vary widely. By integrating quality metrics into the learning process, this framework not only enhances classification accuracy but also promotes the development of more robust models capable of operating under diverse conditions. This work paves the way for future research to explore quality-adaptive techniques in other domains of audio classification, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11915v1).
