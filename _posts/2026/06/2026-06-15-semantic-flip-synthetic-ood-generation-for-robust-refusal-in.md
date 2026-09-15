---
title: "Semantic Flip: Synthetic OOD Generation for Robust Refusal in Embodied Question Answering and Spatial Localization"
date: 2026-06-15 16:07:24 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16898v1"
arxiv_id: "2606.16898"
authors: ["Dongbin Na", "Chanwoo Kim", "Giyun Choi", "Dooyoung Hong"]
slug: semantic-flip-synthetic-ood-generation-for-robust-refusal-in
summary_word_count: 430
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Semantic Flip, a framework for generating synthetic out-of-distribution samples to enhance refusal capabilities in embodied question answering."
---

**Problem**  
The paper addresses the critical gap in the ability of vision-language models (VLMs) to appropriately refuse unanswerable queries in embodied agents, particularly in scenarios where overconfidence can lead to misleading information or unsafe navigation guidance. Despite the importance of this capability, prior research has largely overlooked the mechanisms by which VLMs should signal uncertainty or refusal, especially in the context of embodied question answering and spatial localization. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose the Semantic Flip framework, which synthesizes auxiliary out-of-distribution (OOD) samples to facilitate robust refusal responses without the need for external OOD annotations. The core innovation lies in the independent transformation of both the user query and the visual memory, resulting in OOD pairs that lack sufficient visual grounding. This approach allows for the training of a lightweight rejection module that can be integrated into existing VLM pipelines without necessitating retraining of the underlying model. The rejection module is designed to operate on top of a frozen pretrained VLM, thus maintaining the integrity of the original model while enhancing its refusal capabilities.

**Results**  
Semantic Flip was evaluated across two benchmarks, demonstrating superior performance compared to strong prompting baselines. Specifically, on the newly introduced SpaceReject benchmark for spatial localization, which features deliberately unanswerable queries over extended video memory, Semantic Flip achieved an F1 score of 0.9559. This performance indicates a significant improvement in the model's ability to recognize and appropriately refuse unanswerable queries, showcasing the effectiveness of the synthetic OOD generation approach.

**Limitations**  
The authors acknowledge that the framework relies on the quality of the transformations applied to the queries and visual memory, which may vary in effectiveness depending on the specific context or dataset. Additionally, while the rejection module is lightweight, its integration into existing systems may still require careful consideration of the overall architecture and performance trade-offs. The paper does not address potential limitations related to the generalizability of the synthetic OOD samples across diverse real-world scenarios or the potential for adversarial queries that could exploit the refusal mechanism.

**Why it matters**  
The implications of this work are significant for the deployment of embodied agents in real-world applications, where the ability to refuse unanswerable queries is crucial for user safety and trust. By providing a method to enhance refusal capabilities without extensive retraining, Semantic Flip paves the way for more reliable and responsible AI systems in embodied contexts. This research contributes to the growing body of literature focused on improving the robustness of VLMs in practical applications, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.16898v1).
