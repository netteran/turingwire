---
title: "Circuit Synchronization Precedes Generalization: Causal Evidence from Fourier Structure in Grokking Transformers"
date: 2026-06-11 06:52:10 +0000
category: research
subcategory: theory
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.12966v1"
arxiv_id: "2606.12966"
authors: ["Achyuthan Sivasankar"]
slug: circuit-synchronization-precedes-generalization-causal-evide
summary_word_count: 458
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the Frequency Synchronization Degree (FSD) as a predictor for grokking in transformers, revealing causal relationships in Fourier circuit behavior."
---

**Problem**  
The phenomenon of grokking in transformers, where models transition from near-chance to near-perfect performance on modular arithmetic tasks, lacks a comprehensive understanding of its timing, causal structure, and controllability. This paper addresses these gaps by providing a novel metric, the Frequency Synchronization Degree (FSD), to analyze Fourier circuit synchronization without requiring prior knowledge of the circuit. The work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose the Frequency Synchronization Degree (FSD), a normalized and permutation-tested metric designed to quantify the synchronization of Fourier circuits. The study evaluates FSD across nine modular addition configurations involving prime numbers (p in {53, 71, 97, 113, 131}) and utilizes three random seeds for robustness. The experiments reveal that FSD synchronizes between 500 to 3,000 steps prior to the grokking event, with a mean lead of +1,722 steps (sign-test p~0.004). The authors also establish a causal relationship between FSD and grokking by forking training at the FSD-ceiling step and varying the weight decay parameter (λ), demonstrating that earlier grokking is strictly monotonic with respect to λ. The relationship is captured as Delta_t ~ C/λ, with high R² values (1.00 and 0.99) across different primes. Additionally, architecture ablations indicate that an attention-only model exhibits a strong FSD precursor, while a multi-layer perceptron (MLP) model fails to grok, and a single-layer model's FSD lags behind.

**Results**  
The findings indicate that FSD serves as an early predictor of grokking, consistently leading the restricted-logit loss baseline proposed by Nanda et al. across all nine configurations. The significant effect sizes are underscored by the mean lead of +1,722 steps in FSD synchronization before grokking occurs, with all nine configurations showing positive results. The causal relationship established through the manipulation of weight decay (λ) further supports the predictive power of FSD, with the derived law of Delta_t being proportional to 1/λ.

**Limitations**  
The authors acknowledge that their findings are based on a limited set of modular addition tasks and specific prime numbers, which may restrict the generalizability of the results. Additionally, the reliance on a preprint status means that the conclusions drawn have not yet been validated through peer review. The study also does not explore the implications of FSD in non-modular contexts or with different transformer architectures beyond those tested.

**Why it matters**  
This research provides critical insights into the mechanisms underlying grokking in transformers, suggesting that synchronization in Fourier circuits is a key precursor to generalization. The introduction of FSD as a predictive metric opens avenues for further exploration of causal relationships in neural network training dynamics. These findings could inform future work on model interpretability and optimization strategies, particularly in the context of transformer architectures. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.12966v1).
