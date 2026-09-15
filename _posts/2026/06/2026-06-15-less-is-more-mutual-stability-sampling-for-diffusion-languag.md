---
title: "LESS Is More: Mutual-Stability Sampling for Diffusion Language Models"
date: 2026-06-15 16:15:45 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16908v1"
arxiv_id: "2606.16908"
authors: ["Amr Mohamed", "Guokan Shang", "Michalis Vazirgiannis"]
slug: less-is-more-mutual-stability-sampling-for-diffusion-languag
summary_word_count: 413
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces LESS, a training-free adaptive sampler for diffusion language models that significantly reduces reverse denoising steps while improving accuracy."
---

**Problem**  
The paper addresses the inefficiencies in current sampling procedures for diffusion large language models (dLLMs), which typically rely on a fixed number of reverse denoising steps. This approach often leads to wasted computation on stable token positions and premature commitments to unstable tokens. The authors highlight that existing methods do not adaptively optimize the number of reverse steps based on the stability of token predictions, which can hinder performance. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose \textsc{LESS}, a model-agnostic adaptive sampler that treats token commitment as an online stopping problem. The core innovation is the mutual-stability sampling mechanism, which employs a joint stability rule to determine when a masked position can be unmasked. Specifically, a token is eligible for unmasking if: (1) its top-1 prediction exhibits high confidence, (2) the top-1 token remains consistent across recent reverse steps, and (3) the predictive distribution shows stability as measured by the top-$K$ inter-step Jensen–Shannon divergence. This method does not require additional training, making it applicable across various dLLM architectures.

**Results**  
\textsc{LESS} was evaluated on three models: Dream-7B, LLaDA-8B, and LLaDA-1.5-8B, across seven benchmarks that include tasks in general knowledge, mathematics, and programming code. The results indicate that \textsc{LESS} achieves an average accuracy improvement over existing training-free adaptive samplers while utilizing 72.1% fewer reverse steps compared to fixed-budget decoding methods. This reduction in reverse steps translates to fewer forward evaluations of the Transformer model, resulting in lower wall-clock latency and reduced inference compute requirements.

**Limitations**  
The authors acknowledge that while \textsc{LESS} improves efficiency and accuracy, it may not generalize equally well across all dLLM architectures, as its performance is contingent on the stability of predictions. Additionally, the reliance on the top-1 prediction may introduce biases in certain contexts, potentially affecting the diversity of generated outputs. The paper does not explore the impact of varying the parameters of the stability rule, which could be a potential avenue for further research.

**Why it matters**  
The introduction of \textsc{LESS} has significant implications for the efficiency of inference in dLLMs, particularly in applications requiring real-time processing or resource-constrained environments. By reducing the number of reverse steps needed for stable token commitments, this method can enhance the practicality of deploying dLLMs in various domains, including conversational agents and automated coding assistants. The findings contribute to the ongoing discourse on optimizing sampling strategies in generative models, as discussed in related works on adaptive sampling techniques in language modeling, available on [arXiv](https://arxiv.org/abs/2606.16908v1).
