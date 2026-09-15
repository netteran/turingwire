---
title: "Unstable Features, Reproducible Subspaces: Understanding Seed Dependence in Sparse Autoencoders"
date: 2026-06-10 14:32:57 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12138v1"
arxiv_id: "2606.12138"
authors: ["Gleb Gerasimov", "Timofei Rusalev", "Nikita Balagansky", "Daniil Laptev", "Vadim Kurochkin", "Daniil Gavrilov"]
slug: unstable-features-reproducible-subspaces-understanding-seed-
summary_word_count: 435
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates feature stability in sparse autoencoders, revealing the relationship between seed dependence and feature reproducibility."
---

**Problem**  
Sparse autoencoders (SAEs) are commonly employed for interpreting neural network representations, yet their effectiveness hinges on the reproducibility of learned features across different training runs. This paper addresses the gap in understanding feature stability in SAEs, particularly focusing on how seed dependence affects the reproducibility of features. The authors conduct a large-scale study to quantify the stability of features across various configurations, including different seeds, models, layers, and dictionary sizes. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors introduce a novel metric termed "feature stability," which quantifies the probability of a feature reappearing in independently trained SAEs. This metric allows for a scalable assessment of features, distinguishing between stable and unstable ones. The study employs a controlled synthetic model to elucidate the underlying mechanisms of feature stability, demonstrating that low-rank ground-truth features can be recovered at the subspace level, even when individual features remain non-identifiable across different seeds. The authors also propose a method for constructing more stable SAEs by pooling unique cross-seed features while maintaining the explained variance.

**Results**  
The findings reveal a significant functional asymmetry: stable features are responsible for the majority of reconstruction and prediction signals, while unstable features contribute minimally and are primarily influenced by low-frequency surface-form triggers. The study reports that stable features account for approximately 80% of the relevant signal in reconstruction tasks, while unstable features contribute less than 20%. This was observed across various configurations, indicating a consistent pattern of feature stability. The authors demonstrate that unstable features, although non-reproducible individually, cluster within reproducible lower-rank subspaces, suggesting a structured relationship between seed dependence and feature representation.

**Limitations**  
The authors acknowledge that their approach may not fully capture the complexity of feature interactions in more intricate models or datasets. Additionally, the reliance on synthetic models to illustrate the mechanisms of feature stability may limit the generalizability of the findings to real-world applications. The study also does not explore the implications of feature stability on downstream tasks beyond reconstruction and prediction, which could provide further insights into the practical utility of stable versus unstable features.

**Why it matters**  
This research has significant implications for the design and interpretation of sparse autoencoders in machine learning. By elucidating the nature of feature stability and its relationship with seed dependence, the findings encourage a reevaluation of how features are utilized in neural network interpretations. The ability to construct more stable SAEs could enhance the robustness and reliability of feature representations, ultimately improving model performance in various applications. This work contributes to the ongoing discourse on feature interpretability in deep learning, as published in [arXiv](https://arxiv.org/abs/2606.12138v1).
