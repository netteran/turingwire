---
title: "Depth-Attention: Cross-Layer Value Mixing for Language Models"
date: 2026-06-03 15:33:45 +0000
category: research
subcategory: efficiency_inference
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.05014v1"
arxiv_id: "2606.05014"
authors: ["Boyi Zeng", "Yiqin Hao", "Zitong Wang", "Shixiang Song", "He Li", "Feichen Song"]
slug: depth-attention-cross-layer-value-mixing-for-language-models
summary_word_count: 381
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Depth-Attention, a novel mechanism for cross-layer value mixing in Transformers, enhancing performance without increasing parameter count."
---

**Problem**  
The paper addresses the limitation of traditional Transformer architectures, where information flow across layers is restricted to simple residual connections. This results in later layers being unable to selectively leverage representations from earlier layers. Existing cross-layer methods improve this flow but do so outside the attention mechanism, leading to increased computational costs and persistent state management issues during inference. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose Depth-Attention, which integrates cross-layer value mixing directly within the self-attention module. Specifically, before a layer computes its attention over the sequence, its query attends to the keys of earlier layers at the same token position. This allows the layer to mix values from earlier layers into the value that self-attention subsequently processes. Depth-Attention maintains the standard attention architecture, utilizing existing queries, keys, and value-cache slots, thus avoiding the introduction of additional parameters or persistent inference states beyond the conventional key-value cache. The method is evaluated on Qwen3-style decoders with 1.5B and 3B parameters, demonstrating its efficiency and effectiveness.

**Results**  
Depth-Attention achieves significant performance improvements over the vanilla Transformer architecture and existing cross-layer methods. On the evaluated models, it reduces perplexity and enhances average downstream accuracy, achieving up to 2.3 accuracy points higher than the baseline. The method shows consistent gains across model sizes from 360M to 3B parameters, while adding less than 0.01% extra arithmetic FLOPs. Notably, it outperforms strong cross-layer baselines in both perplexity and average accuracy metrics.

**Limitations**  
The authors acknowledge that while Depth-Attention improves performance without increasing parameter count, it may not address all potential inefficiencies in larger architectures or more complex tasks. Additionally, the method's effectiveness in extremely large models or in scenarios with highly diverse input distributions remains to be evaluated. The paper does not discuss potential impacts on training dynamics or convergence behavior.

**Why it matters**  
Depth-Attention represents a significant advancement in the design of Transformer architectures, enabling more effective information reuse across layers without incurring additional computational costs. This innovation could lead to more efficient training and inference in large language models, making it a valuable contribution to the field of natural language processing. The implications of this work extend to future research on optimizing Transformer architectures and enhancing their performance on various downstream tasks, as published in [arXiv](https://arxiv.org/abs/2606.05014v1).
