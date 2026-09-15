---
title: "Layer-Resolved Optimal Transport for Hallucination Detection in NMT and Abstractive Summarization"
date: 2026-06-11 11:30:08 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13216v1"
arxiv_id: "2606.13216"
authors: ["Mariia Onyshchuk", "Maksym-Vasyl Tarnavskyi", "Marta Sumyk"]
slug: layer-resolved-optimal-transport-for-hallucination-detection
summary_word_count: 417
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a layer-resolved optimal transport method for detecting hallucinations in neural machine translation and summarization tasks."
---

**Problem**  
This work addresses the gap in unsupervised methods for detecting hallucinations in neural machine translation (NMT) and abstractive summarization, specifically focusing on the limitations of existing detection techniques. The authors highlight that while optimal transport (OT) has been effective in NMT, its application to summarization remains underexplored. The paper is a preprint and has not undergone peer review.

**Method**  
The authors extend the use of optimal transport to analyze the cross-attention distributions across all six decoder layers of the Fairseq DE-EN model, utilizing a dataset of 3,414 translations. They propose two complementary OT metrics: Wass-to-Unif and Wass-to-Data, which specialize in detecting different types of hallucinations. The analysis reveals that hallucination detection is concentrated in the first four layers (L1-L4), while layer L5 exhibits anti-predictive behavior for subtler hallucination types. The authors also evaluate the transferability of the geometric signal to abstractive summarization using an unsupervised OT detector on the AggreFact dataset (1,116 summaries), achieving balanced accuracies of 57.2% and 57.6% on CNN and XSum, respectively. This performance is compared against the supervised MiniCheck-Flan-T5-L, which achieves 69.9% and 74.3%.

**Results**  
The proposed OT-based detection method demonstrates that hallucinated translations lack the exploratory attention phase present in correct translations, indicating a structural difference in attention patterns. The results show that the OT metrics can effectively identify hallucinations in NMT, particularly when the failure mode involves disengagement from the source. However, the performance on summarization tasks is significantly lower than that of supervised methods, highlighting the inherent challenges in detecting unfaithful summaries that may still attend correctly to source tokens.

**Limitations**  
The authors acknowledge that their method is limited in detecting faithfulness failures in summarization, as these failures can occur downstream of attention mechanisms, making them invisible to concentration-based OT metrics. Additionally, the reliance on unsupervised methods may not capture the full complexity of summarization errors compared to supervised approaches. The study also does not explore the impact of different model architectures beyond Fairseq or the generalizability of the findings across other NMT and summarization frameworks.

**Why it matters**  
This research provides a novel approach to hallucination detection in NMT and summarization, establishing optimal transport as a reliable interpretability tool for understanding attention mechanisms. The findings have implications for improving the robustness of NMT systems and enhancing the faithfulness of abstractive summarization models. The work encourages further exploration of unsupervised detection methods and their potential applications across various NLP tasks, as discussed in the context of existing literature on attention mechanisms and model interpretability, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13216v1).
