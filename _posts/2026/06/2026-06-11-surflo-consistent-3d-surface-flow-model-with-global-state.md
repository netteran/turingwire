---
title: "Surflo: Consistent 3D Surface Flow Model with Global State"
date: 2026-06-11 17:48:38 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13644v1"
arxiv_id: "2606.13644"
authors: ["Antoine Gu\u00e9don", "Shu Nakamura", "Nicolas Dufour", "Jiahui Lei", "Ko Nishino", "Angjoo Kanazawa"]
slug: surflo-consistent-3d-surface-flow-model-with-global-state
summary_word_count: 398
classification_confidence: 0.70
source_truncated: false
layout: post
description: "Surflo introduces a novel 3D surface flow model that leverages global state representation for efficient and consistent surface reconstruction from RGB views."
---

**Problem**  
This paper addresses the limitations of existing 3D reconstruction methods that either rely on per-view processing, resulting in overlapping and unaligned pointmaps, or on global-latent approaches that yield fixed, low-resolution outputs. The authors highlight that current feed-forward models do not effectively utilize the geometric invariance of 3D structures across multiple viewpoints. This work is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
Surflo introduces a novel architecture that compresses a variable number of unposed RGB images into K latent tokens, representing a single global state. The model decodes oriented 3D surface points by transporting them from noise onto the surface using flow matching techniques. This approach allows for flexible output resolution, enabling the generation of anywhere from a few thousand to a million points in a single forward pass without being constrained by a fixed grid or token budget. To mitigate local inconsistencies during decoding, the authors incorporate an inference-time guidance term that correlates nearby points by injecting a photometric gradient during the ODE integration process.

**Results**  
Surflo demonstrates competitive performance against existing feed-forward baselines on various surface metrics. Specifically, it matches or surpasses the performance of traditional methods while achieving a significant speed advantage—running an order of magnitude faster than optimization-based techniques that typically require hundreds of views for reconstruction. The paper provides quantitative results, although specific numerical values and benchmark names are not detailed in the abstract.

**Limitations**  
The authors acknowledge that while Surflo improves upon existing methods, it may still face challenges in scenarios with highly complex geometries or occlusions that could affect the quality of the reconstructed surfaces. Additionally, the reliance on a global latent representation may limit the model's ability to capture fine-grained details in certain contexts. The paper does not discuss the computational cost associated with training the model or the potential need for extensive datasets to achieve optimal performance.

**Why it matters**  
The introduction of Surflo has significant implications for the field of 3D reconstruction, particularly in applications requiring real-time processing and high-resolution outputs. By effectively combining global latent representations with flexible decoding capabilities, Surflo paves the way for advancements in computer vision tasks such as augmented reality, robotics, and scene understanding. This work contributes to the ongoing discourse on improving the efficiency and accuracy of 3D surface modeling, as discussed in related literature on the subject, available on [arXiv](https://arxiv.org/abs/2606.13644v1).
