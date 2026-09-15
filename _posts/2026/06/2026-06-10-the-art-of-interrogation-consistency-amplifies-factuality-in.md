---
title: "The Art of Interrogation: Consistency Amplifies Factuality in Spatial Reasoning"
date: 2026-06-10 10:50:06 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11918v1"
arxiv_id: "2606.11918"
authors: ["Theo Uscidda", "Marta Tintore Gazulla", "Maks Ovsjanikov", "Federico Tombari", "Leonidas Guibas"]
slug: the-art-of-interrogation-consistency-amplifies-factuality-in
summary_word_count: 439
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a self-supervised reinforcement learning framework to enhance spatial reasoning in large reasoning models without ground-truth annotations."
---

**Problem**  
Current Large Reasoning Models (LRMs) demonstrate significant deficiencies in spatial reasoning tasks, which are often attributed to a lack of knowledge. Existing methodologies primarily rely on supervised fine-tuning (SFT) with labeled spatial data from external sources or synthetic engines. This paper addresses the gap in the literature regarding the enhancement of spatial reasoning capabilities in LRMs by proposing an alternative approach that leverages the inherent reasoning potential of pre-trained models. The authors argue that spatial reasoning can be improved through alignment with geometric and semantic constraints, rather than solely through additional labeled data. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose a self-supervised reinforcement learning framework that utilizes consistency verifiers as reward functions to enhance spatial reasoning. These verifiers assess geometric and semantic consistency under various transformations, including image manipulations (e.g., flipping) and textual alterations (e.g., reordering objects in questions). The core technical contribution is the introduction of an optimal transport-based reinforcement learning strategy, termed OT-GRPO, which is a minimal-matching variant of group relative policy optimization specifically designed for pairwise verifiers. This approach allows the model to refine its reasoning capabilities without the need for ground-truth annotations, focusing instead on internal consistency.

**Results**  
The proposed method demonstrates competitive performance against traditional SFT approaches. The authors report that their consistency training method achieves accuracy levels approaching those of models trained with ground-truth supervision. Specifically, the model exhibits improved generalization across various spatial reasoning tasks and data domains, although exact numerical results and comparisons to specific baseline models are not detailed in the abstract. The effectiveness of the OT-GRPO strategy is highlighted, indicating a significant enhancement in spatial reasoning capabilities.

**Limitations**  
The authors acknowledge that their approach may not fully address all aspects of spatial reasoning and that the reliance on transformations could introduce biases or limitations in certain contexts. Additionally, the lack of ground-truth annotations, while a core feature of the proposed method, may also hinder the ability to evaluate the model's performance comprehensively. The paper does not discuss potential scalability issues or the computational resources required for implementing the OT-GRPO strategy.

**Why it matters**  
This work has significant implications for the development of more robust and flexible reasoning models that can operate effectively in spatial contexts without extensive labeled datasets. By demonstrating that pre-trained LRMs can be fine-tuned through self-supervised methods, the authors contribute to the ongoing discourse on efficient model training strategies in AI. This approach could pave the way for advancements in various applications, including robotics, computer vision, and natural language processing, where spatial reasoning is critical. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.11918v1).
