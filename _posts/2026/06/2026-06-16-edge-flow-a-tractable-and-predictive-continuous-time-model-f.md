---
title: "Edge Flow: A Tractable and Predictive Continuous-Time Model for Gradient Descent at the Edge of Stability"
date: 2026-06-16 15:45:47 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.18080v1"
arxiv_id: "2606.18080"
authors: ["Pierre Marion"]
slug: edge-flow-a-tractable-and-predictive-continuous-time-model-f
summary_word_count: 434
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Edge Flow, a continuous-time model for gradient descent dynamics at the edge of stability, enhancing predictive capabilities and stability analysis."
---

**Problem**  
The paper addresses a significant gap in the understanding of gradient descent dynamics when operating at the edge of stability (EoS), where the largest eigenvalue of the loss Hessian approaches the stability threshold of \(2/\eta\) (with \(\eta\) being the learning rate). Traditional analysis methods, such as gradient flow and the descent lemma, are ineffective in this regime. The authors propose a continuous-time model, Edge Flow, to provide a tractable and predictive framework for analyzing gradient descent dynamics in this critical area. This work is presented as a preprint and has not undergone peer review.

**Method**  
Edge Flow is formulated as a system of three coupled ordinary differential equations (ODEs) that decompose the dynamics of gradient descent into three components: a center, an oscillation direction, and an oscillation magnitude. The center follows a modified gradient flow on a symmetrized loss function, while the oscillation direction is governed by the dynamics of a top eigenvector of the Hessian, utilizing Rayleigh quotient dynamics. The oscillation magnitude is modulated exponentially based on whether the sharpness of the loss landscape exceeds or falls below the threshold \(2/\eta\). A key feature of Edge Flow is the emergence of sharpness stabilization through a self-stabilization feedback loop inherent in the coupled dynamics. The discretization of Edge Flow is computationally efficient, requiring only two gradient evaluations and one Hessian-vector product per iteration.

**Results**  
Empirical evaluations demonstrate that Edge Flow effectively tracks the dynamics of gradient descent, achieving performance comparable to existing continuous-time EoS models. Notably, it resolves the oscillation of sharpness at the onset of EoS, which previous models failed to address. The authors provide quantitative comparisons against named baselines, although specific numerical results and benchmarks are not detailed in the abstract. The model's ability to mitigate instabilities in the EoS regime is highlighted as a significant advancement.

**Limitations**  
The authors acknowledge that while Edge Flow provides a more comprehensive understanding of gradient descent dynamics at EoS, it is still a theoretical model that may require further empirical validation across diverse datasets and architectures. Additionally, the reliance on Hessian-vector products may limit scalability in very large models, and the model's performance in highly non-convex landscapes remains to be fully explored.

**Why it matters**  
The introduction of Edge Flow has important implications for the optimization of deep learning models, particularly in scenarios where stability is critical. By providing a predictive framework for understanding gradient descent dynamics at EoS, this work can inform the design of more robust training algorithms and enhance the stability of learning processes. The findings contribute to the broader discourse on optimization techniques in machine learning, as published in [arXiv](https://arxiv.org/abs/2606.18080v1).
