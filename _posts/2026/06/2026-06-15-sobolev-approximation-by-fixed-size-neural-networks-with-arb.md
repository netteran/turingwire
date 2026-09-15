---
title: "Sobolev Approximation by Fixed-Size Neural Networks with Arbitrary Accuracy"
date: 2026-06-15 17:12:47 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.16975v1"
arxiv_id: "2606.16975"
authors: ["Baicheng Li", "Haizhao Yang", "Shijun Zhang"]
slug: sobolev-approximation-by-fixed-size-neural-networks-with-arb
summary_word_count: 385
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents new activation functions enabling fixed-size neural networks to achieve arbitrary Sobolev approximation accuracy."
---

**Problem**  
This work addresses the gap in the literature regarding the capability of fixed-size neural networks to achieve arbitrary accuracy in Sobolev approximation, specifically for functions in Sobolev spaces \(W^{s,\infty}((a,b)^d)\). The authors highlight that existing methods often require either increasing network size or do not guarantee arbitrary accuracy. This paper is a preprint and has not undergone peer review.

**Method**  
The authors introduce two novel activation functions: the Elementary Universal Activation Function (EUAF) and the Differentiable Universal Activation Function (DUAF). They demonstrate that any function in \(W^{2,\infty}((a,b)^d)\) can be approximated with arbitrary accuracy in the \(W^{1,\infty}\)-norm using a fixed-size neural network with the EUAF. To extend this result to higher Sobolev spaces \(W^{s,\infty}((a,b)^d)\) for \(s \in \mathbb{N}\), they propose the smooth activation DUAF, which allows for approximation in the \(W^{s-1,\infty}\)-norm. The authors also construct sigmoidal variants of the DUAF, denoted as \(\widetilde{\mathrm{DUAF}}_n\), which maintain the approximation properties for \(1 \leq s \leq n\). The paper provides explicit bounds on the width and depth of the networks required for these approximations.

**Results**  
The authors claim that fixed-size neural networks using the EUAF can approximate any function in \(W^{2,\infty}((a,b)^d)\) with arbitrary accuracy in the \(W^{1,\infty}\)-norm. For the DUAF, they assert that any function in \(W^{s,\infty}((a,b)^d)\) can be approximated with arbitrary accuracy in the \(W^{s-1,\infty}\)-norm. The paper does not provide specific numerical results or comparisons against established baselines, focusing instead on theoretical guarantees and explicit construction of the activation functions.

**Limitations**  
The authors acknowledge that their results are primarily theoretical and do not include empirical validation on real-world datasets or benchmarks. They do not discuss the computational efficiency or practical implementation challenges of using the proposed activation functions in large-scale neural networks. Additionally, the implications of the fixed-size constraint on the expressiveness of the networks are not fully explored.

**Why it matters**  
This work has significant implications for the design of neural networks aimed at function approximation in Sobolev spaces, particularly in applications requiring high accuracy in function representation. The introduction of fixed-size networks capable of arbitrary accuracy could lead to more efficient models in terms of memory and computation, which is crucial for deployment in resource-constrained environments. The findings contribute to the theoretical understanding of neural network capabilities in approximation theory, as discussed in related literature on Sobolev spaces and neural network expressiveness, as published in [arXiv](https://arxiv.org/abs/2606.16975v1).
