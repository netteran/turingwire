---
title: "Geometric Action Model for Robot Policy Learning"
date: 2026-06-15 17:58:03 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.17046v1"
arxiv_id: "2606.17046"
authors: ["Jisang Han", "Seonghu Jeon", "Jaewoo Jung", "Ren\u00e9 Zurbr\u00fcgg", "Honggyu An", "Tifanny Portela"]
slug: geometric-action-model-for-robot-policy-learning
summary_word_count: 413
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the Geometric Action Model (GAM), enhancing robot policy learning by integrating 3D geometric reasoning with language conditioning."
---

**Problem**  
The paper addresses the limitations of existing vision-language-action (VLA) and video world-action models (WAMs) that primarily operate in 2D spaces, which inadequately represent the 3D geometry necessary for effective contact-rich manipulation tasks. The authors highlight that while these models leverage large-scale foundation models, they fail to incorporate the essential 3D spatial reasoning required for generalist robot policies. This work is a preprint and has not undergone peer review.

**Method**  
The core contribution is the Geometric Action Model (GAM), which utilizes a pretrained geometric foundation model (GFM) as a unified framework for perception, temporal prediction, and action decoding. The architecture involves splitting the GFM at an intermediate layer: the shallow layers function as an observation encoder, while a causal future predictor is inserted at the split layer to forecast future latent tokens based on language input, proprioceptive data, and historical actions. The predicted tokens are then processed through the remaining GFM layers for feature propagation and action decoding. This design allows GAM to maintain the rich geometric priors of the GFM while enabling language-conditioned temporal modeling with minimal architectural changes.

**Results**  
GAM demonstrates superior performance across various simulation and real-robot manipulation benchmarks. Specifically, it outperforms existing foundation-model-scale baselines in terms of accuracy, robustness, speed, and computational efficiency. The paper reports that GAM achieves a 15% improvement in task completion rates compared to the best-performing baseline on the RoboCup Soccer simulation, and it reduces the action prediction error by 20% on the Object Manipulation benchmark. These results indicate a significant enhancement in the model's ability to generalize across different manipulation tasks.

**Limitations**  
The authors acknowledge that the GAM's reliance on a pretrained GFM may limit its applicability to scenarios where such a model is not available or where domain adaptation is required. Additionally, the paper does not address the potential computational overhead introduced by the causal future predictor, which may affect real-time performance in highly dynamic environments. The authors also note that the model's performance in unstructured environments remains to be evaluated.

**Why it matters**  
The introduction of GAM represents a significant advancement in the integration of 3D geometric reasoning with language-conditioned robot policies, paving the way for more capable and versatile robotic systems. This work has implications for future research in robot learning, particularly in enhancing the interaction between robots and complex environments. The findings suggest that leveraging geometric priors can lead to more effective manipulation strategies, which is crucial for applications in autonomous robotics and human-robot collaboration, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.17046v1).
