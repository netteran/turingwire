---
title: "Tying the Loop -- Tied Expert Layers in Mixture-of-Experts Language Models"
date: 2026-06-15 15:08:09 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16825v1"
arxiv_id: "2606.16825"
authors: ["Martin Jaggi"]
slug: tying-the-loop-tied-expert-layers-in-mixture-of-experts-lang
summary_word_count: 391
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Expert Tying, an architectural modification for Mixture-of-Experts models that significantly reduces memory usage without sacrificing performance."
---

**Problem**  
This work addresses the substantial memory overhead associated with Mixture-of-Experts (MoE) architectures in Large Language Models (LLMs). While MoE models activate only a subset of experts per token, the full parameter count, primarily from the expert parameters, must still be maintained in memory during training and inference. The authors propose a solution to this issue through an architectural modification called Expert Tying, which is not only novel but also unreviewed, as it is presented in a preprint format.

**Method**  
The core technical contribution is the Expert Tying mechanism, which involves sharing expert parameters across consecutive transformer layers while maintaining independent routing and attention mechanisms for each layer. This allows for a reduction in the number of unique parameters that need to be stored, effectively halving the memory footprint. The authors evaluate this method on several state-of-the-art MoE architectures, including OLMoE, Qwen3, and DeepSeek-style MoEs. The training process and compute requirements are not explicitly detailed, but the focus on parameter sharing suggests a significant reduction in the overall memory requirements during both training and inference.

**Results**  
The experiments demonstrate that Expert Tying can reduce the memory footprint by nearly 2x compared to traditional MoE architectures, with minimal degradation in performance metrics such as perplexity and downstream task quality. The paper does not provide specific numerical results for perplexity or downstream performance but emphasizes that the trade-off between compute and memory is highly favorable, indicating that the method maintains competitive performance while significantly lowering resource requirements.

**Limitations**  
The authors acknowledge that while Expert Tying effectively reduces memory usage, it may introduce complexities in the routing mechanisms that could affect model interpretability. Additionally, the paper does not explore the potential impacts of this architectural change on training dynamics or convergence rates, which could be critical for practical applications. Furthermore, the evaluation is limited to specific architectures, and the generalizability of the method to other MoE configurations remains to be established.

**Why it matters**  
The implications of this work are significant for the efficient scaling of LLMs, particularly in resource-constrained environments. By reducing memory requirements without compromising performance, Expert Tying could facilitate the deployment of larger models on existing hardware, thereby accelerating advancements in natural language processing. This research contributes to the ongoing discourse on optimizing LLM architectures, as highlighted in related works on MoE efficiency and scaling strategies, and is available on [arXiv](https://arxiv.org/abs/2606.16825v1).
