---
title: "Quantifying Uncertainty In Wide Two-Layer Neural Networks: On The Law Of The Limiting Fluctuation Process"
date: 2026-06-04 10:25:23 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.05982v1"
arxiv_id: "2606.05982"
authors: ["Arnaud Descours", "Arnaud Guillin", "Geoffrey Lacour", "Manon Michel", "Boris Nectoux", "Paul Stos"]
slug: quantifying-uncertainty-in-wide-two-layer-neural-networks-on
summary_word_count: 437
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel method for uncertainty quantification in wide two-layer neural networks using PDEs, reducing the need for deep ensembles."
---

**Problem**  
The paper addresses the gap in efficient uncertainty quantification methods for neural network predictions, particularly in the context of wide two-layer networks. Traditional approaches, such as deep ensembles, require training multiple networks, leading to high computational costs. This work is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a method that leverages partial differential equations (PDEs) to evaluate uncertainty directly, focusing on the asymptotic variance of the network outputs. They analyze the law of the limiting fluctuation process around the mean-field limit of wide two-layer neural networks trained via stochastic gradient descent in a weak-noise regime. Utilizing a recent trajectorial central limit theorem, they characterize the limiting process as a weak solution to a linear stochastic evolution equation. The law of this process is identified as a centered Gaussian process in the dual of a weighted Sobolev space. The authors derive a closed covariance representation for the finite-dimensional distributions by testing against smooth functions, which is expressed through the solution of a backward transport equation with a nonlocal source term influenced by the mean-field trajectory. This framework allows for the computation of the limiting variance of network-output fluctuations by evaluating the activation function at fixed inputs.

**Results**  
The authors illustrate their theoretical findings with numerical experiments on a one-dimensional regression task. They demonstrate that their method can effectively quantify uncertainty with significantly reduced computational overhead compared to deep ensemble methods. While specific numerical results are not detailed in the abstract, the implication is that their approach yields accurate uncertainty estimates that align with the theoretical predictions derived from the covariance representation.

**Limitations**  
The authors acknowledge that their approach is limited to wide two-layer networks and may not generalize to deeper architectures or other types of neural networks. Additionally, the reliance on the weak-noise regime may restrict the applicability of their findings in scenarios with high noise levels. The paper does not address potential challenges in extending this method to more complex network architectures or real-world datasets with varying distributions.

**Why it matters**  
This work has significant implications for the field of uncertainty quantification in machine learning, particularly in applications where reliable predictions are critical, such as in healthcare or autonomous systems. By providing a computationally efficient alternative to deep ensembles, this method could facilitate the deployment of neural networks in scenarios requiring real-time uncertainty estimates. The theoretical foundation laid out in this paper may also inspire further research into the application of PDEs in neural network analysis, as discussed in related works on uncertainty quantification in neural networks, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.05982v1).
