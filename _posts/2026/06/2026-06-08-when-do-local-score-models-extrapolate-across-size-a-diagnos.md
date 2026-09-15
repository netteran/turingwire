---
title: "When Do Local Score Models Extrapolate Across Size? A Diagnostic Theory and Benchmark"
date: 2026-06-08 16:24:31 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09705v1"
arxiv_id: "2606.09705"
authors: ["Wenjie Xi"]
slug: when-do-local-score-models-extrapolate-across-size-a-diagnos
summary_word_count: 404
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the conditions under which local score models can successfully extrapolate across system sizes, introducing a diagnostic benchmark for evaluation."
---

**Problem**  
This work addresses the gap in understanding the conditions necessary for local score models to achieve stable size extrapolation in generative modeling. While existing literature acknowledges the importance of translation-invariant architectures, it lacks a comprehensive analysis of how architectural locality interacts with the quasi-locality of Gaussian-smoothed scores. The authors highlight that architectural locality alone is insufficient for reliable size transfer, a critical issue in scientific generative modeling. This paper is a preprint and has not undergone peer review.

**Method**  
The authors introduce a theoretical framework based on Tweedie's formula, which elucidates how far-away perturbations can affect local score components through posterior covariance. They formalize this relationship by proving a size-uniform comparison theorem for local marginals under reverse diffusion. The core technical contribution is the Finite-Depth Local Flow (FDLF), a diagnostic benchmark that provides exact scores, densities, and controllable response ranges. The FDLF allows for empirical validation of the interplay between spatial mixing, smoothed-score quasi-locality, and model receptive fields. The experiments conducted utilize various local score models to assess their performance under different spatial mixing conditions.

**Results**  
The empirical results demonstrate that under conditions of strong spatial mixing, the smoothed score retains quasi-locality relative to the model's receptive field, leading to successful size extrapolation. Conversely, when spatial mixing is weakened, the locality of the score degrades significantly, resulting in failure of size transfer. The paper quantitatively illustrates these findings, although specific numerical results and comparisons to named baselines are not detailed in the abstract.

**Limitations**  
The authors acknowledge that their framework primarily focuses on the theoretical aspects of size extrapolation and may not account for all practical scenarios encountered in real-world applications. Additionally, the reliance on Gaussian smoothing may limit the generalizability of the findings to other types of score models. The paper does not explore the implications of model architecture variations beyond the local score context, which could be a significant factor in extrapolation performance.

**Why it matters**  
This research has significant implications for the development of generative models in scientific applications, particularly in fields where size transfer is essential, such as materials science and molecular modeling. By clarifying the conditions under which local score models can effectively extrapolate, this work provides a foundation for future research aimed at improving model robustness and performance across varying system sizes. The introduction of the FDLF benchmark also offers a valuable tool for evaluating and refining generative models in this context, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.09705v1).
