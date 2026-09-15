---
title: "Reroute, Don't Remove: Recoverable Visual Token Routing for Vision-Language Models"
date: 2026-06-10 17:59:57 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12412v1"
arxiv_id: "2606.12412"
authors: ["Cheng-Yu Yang", "Shao-Yuan Lo", "Yu-Lun Liu"]
slug: reroute-don-t-remove-recoverable-visual-token-routing-for-vi
summary_word_count: 399
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Reroute, a recoverable visual token routing method for vision-language models, enhancing efficiency without permanent token removal."
---

**Problem**  
Current visual-token reduction methods in vision-language models (VLMs) predominantly utilize a rank-and-remove strategy, which permanently discards visual tokens deemed less important. This approach is problematic as the relevance of tokens can shift across different layers of the decoder, particularly for grounding-sensitive queries. The authors highlight that existing literature lacks a method that allows for the dynamic adjustment of token importance during inference, which can lead to suboptimal performance in tasks requiring nuanced understanding.

**Method**  
The authors propose Reroute, a training-free plug-in that substitutes the removal of visual tokens with a recoverable routing mechanism. In this method, selected tokens are allowed to pass through decoder blocks, while those deemed less critical can bypass the current stage and re-enter the candidate pool for future routing decisions. This approach leverages existing attention-score ranking rules and maintains the theoretical TFLOPs and KV-cache budget of the original pruning method. The implementation is designed to be compatible with various VLM architectures, specifically tested on LLaVA-1.5 and Qwen backbones, and is integrated into the FastV, PDrop, and Nüwa variants.

**Results**  
Reroute demonstrates significant improvements in grounding performance while aggressively reducing the number of tokens. Specifically, the method achieves a notable enhancement in grounding accuracy compared to traditional rank-and-remove methods, while maintaining comparable performance on general Visual Question Answering (VQA) tasks. The paper reports that Reroute outperforms baseline methods in terms of both efficiency and effectiveness, although specific numerical results and effect sizes are not detailed in the abstract.

**Limitations**  
The authors acknowledge that Reroute is a plug-in solution and may not address all inefficiencies inherent in VLMs. They also note that while the method improves token routing, it does not eliminate the need for careful token selection strategies. Additionally, the paper does not provide extensive empirical comparisons across a wide range of VLM architectures, which could limit the generalizability of the findings. As this work is a preprint, it has not undergone peer review, which may affect the robustness of the claims made.

**Why it matters**  
The introduction of recoverable routing in token reduction presents a paradigm shift in how VLMs can manage visual tokens, suggesting that token importance is not static and can be dynamically adjusted. This has significant implications for the design of more efficient VLMs, particularly in applications requiring real-time processing and nuanced understanding of visual content. The findings encourage further exploration into adaptive token management strategies, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.12412v1).
