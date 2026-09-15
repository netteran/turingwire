---
title: "ARM: An AutoRegressive Large Multimodal Model with Unified Discrete Representations"
date: 2026-06-09 17:59:28 +0000
category: research
subcategory: multimodal
company: "ARM"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11188v1"
arxiv_id: "2606.11188"
authors: ["Junke Wang", "Xiao Wang", "Jiacheng Pan", "Xuefeng Hu", "Feng Li", "Jingxiang Sun"]
slug: arm-an-autoregressive-large-multimodal-model-with-unified-di
summary_word_count: 370
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ARM, a unified autoregressive multimodal model that enhances image understanding, generation, and editing through discrete representations."
---

**Problem**  
This work addresses the gap in multimodal models that effectively integrate image understanding, generation, and editing within a unified framework. Prior models often treat these tasks separately, lacking a cohesive approach that leverages shared representations. The authors propose ARM as a solution, emphasizing the need for a model that can handle diverse tasks in a shared latent space. Notably, this is a preprint and has not undergone peer review.

**Method**  
ARM employs a discrete representation-based architecture, beginning with a novel semantic visual tokenizer that converts images into compact token sequences. This tokenizer is trained with multiple objectives to enhance semantic discriminability, language alignment, and faithful reconstruction. The core model is a 7 billion parameter autoregressive transformer that processes large-scale sequences of text and image tokens. To optimize performance for tasks such as text-to-image generation and instruction-guided editing, the authors implement reinforcement learning (RL) to refine task-level objectives, including visual quality, instruction adherence, and edit consistency. The RL framework is designed to improve the model's preference-aligned behavior, facilitating cross-task synergy.

**Results**  
ARM demonstrates significant performance improvements over established baselines. For instance, it raises the WISE overall score from 0.50 to 0.56 and the GEdit-Bench-EN G_O score from 5.75 to 6.68. These results indicate that the integration of autoregressive modeling with robust representations and RL optimization not only enhances individual task performance but also fosters beneficial interactions between text-to-image generation and editing tasks.

**Limitations**  
The authors acknowledge several limitations, including the potential for overfitting due to the large model size and the reliance on extensive training data. They also note that while RL improves performance, it may introduce additional complexity in training and hyperparameter tuning. Furthermore, the model's performance on less common or niche tasks remains untested, which could limit its applicability in certain domains.

**Why it matters**  
The implications of ARM's findings are significant for the field of multimodal AI, as they suggest that autoregressive models can serve as a scalable foundation for developing integrated vision-language systems. The demonstrated cross-task synergy opens avenues for future research in multimodal learning, particularly in enhancing the efficiency and effectiveness of models that require simultaneous understanding and generation capabilities. This work contributes to the ongoing discourse on multimodal intelligence, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11188v1).
