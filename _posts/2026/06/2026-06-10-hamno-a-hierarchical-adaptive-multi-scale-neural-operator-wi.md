---
title: "HAMNO: A Hierarchical Adaptive Multi-scale Neural Operator with Physics-Informed Learning for Dynamical Systems"
date: 2026-06-10 11:42:34 +0000
category: research
subcategory: other
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11963v1"
arxiv_id: "2606.11963"
authors: ["Mostafa Bamdad", "Mohammad Sadegh Eshaghi", "Timon Rabczuk"]
slug: hamno-a-hierarchical-adaptive-multi-scale-neural-operator-wi
summary_word_count: 392
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents HAMNO, a novel neural operator architecture that enhances the modeling of nonlinear dynamical systems with physics-informed learning."
---

**Problem**  
Existing neural operator architectures struggle to effectively model nonlinear time-dependent systems characterized by multi-scale structures, long-range interactions, and stable long-term evolution. This paper addresses these limitations by introducing a new architecture, HAMNO, which is designed to improve the representation of such complex dynamical systems. The work is presented as a preprint and has not yet undergone peer review.

**Method**  
HAMNO integrates local convolutional representations with global spectral operators and employs a hierarchical encoder-decoder structure. A key innovation is the data-dependent gating mechanism that adaptively balances local and global information at each spatial location, enabling the model to capture fine-scale features while maintaining long-range dependencies. The authors also propose a physics-informed variant, PI-HAMNO, which utilizes a multi-objective loss function. This loss function combines data fitting with strong- and weak-form physics constraints: the strong-form term penalizes the domain-integrated squared PDE residual, while the weak-form term incorporates finite-element test functions to evaluate element integrals using centroid-based tetrahedral quadrature. The architecture is evaluated on the non-periodic Allen-Cahn, Cahn-Hilliard, and Swift-Hohenberg equations defined on cubic domains.

**Results**  
HAMNO demonstrates significant improvements in predictive accuracy compared to standard neural operator baselines across various scenarios, including long-horizon rollouts, data-limited training, out-of-distribution initial-condition shifts, and random-seed variations. The authors report that PI-HAMNO further enhances model stability, physical consistency, and data efficiency. Specific performance metrics are not disclosed in the abstract, but the improvements are emphasized in the context of the evaluated equations.

**Limitations**  
The authors acknowledge that while HAMNO and PI-HAMNO improve predictive performance and stability, the reliance on physics-informed learning may limit the model's applicability to systems where such physics can be accurately defined. Additionally, the performance metrics provided are qualitative, and further quantitative comparisons with other state-of-the-art methods are necessary to fully establish the advantages of HAMNO. The implementation is publicly available, which allows for independent verification and further experimentation.

**Why it matters**  
The introduction of HAMNO and its physics-informed extension, PI-HAMNO, represents a significant advancement in the modeling of complex dynamical systems using neural operators. By effectively addressing the challenges of multi-scale and long-range interactions, this work opens avenues for more accurate simulations in various scientific and engineering applications. The findings have implications for future research in physics-informed machine learning and the development of robust models for nonlinear PDEs, as discussed in related literature on neural operators and physics-informed neural networks, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.11963v1).
