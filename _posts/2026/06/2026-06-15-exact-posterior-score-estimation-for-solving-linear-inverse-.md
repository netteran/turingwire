---
title: "Exact Posterior Score Estimation for Solving Linear Inverse Problems"
date: 2026-06-15 17:58:22 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.17048v1"
arxiv_id: "2606.17048"
authors: ["Abbas Mammadov", "Ozgur Kara", "Kaan Oktay", "Iskander Azangulov", "Adil Kaan Akan", "Hyungjin Chung"]
slug: exact-posterior-score-estimation-for-solving-linear-inverse-
summary_word_count: 369
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents Exact Posterior Score (EPS) for linear inverse problems, enabling efficient posterior sampling from pretrained denoisers."
---

**Problem**  
This work addresses the challenge of posterior sampling in linear inverse problems, specifically the gap in existing methods that either rely on fixed pretrained denoisers with approximate corrections or abandon the denoising structure entirely. The authors highlight that current approaches do not provide a mechanism for exact posterior score estimation, which is crucial for effective sampling in Gaussian inverse problems. This paper is a preprint and has not undergone peer review.

**Method**  
The authors derive the exact posterior score in closed form for linear Gaussian inverse problems, utilizing general Gaussian interpolants. They introduce the Exact Posterior Score (EPS) as a denoising training objective that maintains the input/output structure of standard denoising pretraining. EPS can be trained from scratch or fine-tuned from an existing pretrained denoiser. The inference process leverages the same sampling mechanism as the underlying backbone, eliminating the need for likelihood gradients or projections. The method is evaluated across five linear inverse problems, specifically on datasets FFHQ and ImageNet.

**Results**  
EPS demonstrates superior performance compared to both training-free and training-based baselines across multiple metrics, including fidelity, perceptual quality, and distributional accuracy. Notably, EPS achieves these results while requiring approximately an order of magnitude fewer denoiser evaluations than traditional gradient-based posterior samplers. The paper provides quantitative comparisons, although specific numerical results are not detailed in the abstract.

**Limitations**  
The authors acknowledge that their method is specifically tailored for linear Gaussian inverse problems, which may limit its applicability to non-linear or non-Gaussian scenarios. Additionally, while EPS significantly reduces the number of denoiser evaluations, the computational cost of training the denoiser itself is not addressed. The paper does not explore the scalability of EPS to high-dimensional data or its performance in real-world applications beyond the tested datasets.

**Why it matters**  
The introduction of EPS has significant implications for the field of inverse problems and generative modeling, as it provides a robust framework for posterior sampling that retains the advantages of pretrained denoisers. This work could pave the way for more efficient algorithms in various applications, including image reconstruction and signal processing. The findings contribute to the ongoing discourse on improving sampling efficiency in generative models, as discussed in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.17048v1).
