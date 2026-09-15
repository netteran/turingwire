---
title: "Multi-Faceted Interactivity Alignment in Full-Duplex Speech Models"
date: 2026-06-09 17:46:55 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11167v1"
arxiv_id: "2606.11167"
authors: ["Atsumoto Ohashi", "Neil Zeghidour", "Alexandre D\u00e9fossez", "Eugene Kharitonov"]
slug: multi-faceted-interactivity-alignment-in-full-duplex-speech-
summary_word_count: 432
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a post-training reinforcement learning method to enhance interactivity in full-duplex speech models, addressing key interaction behaviors."
---

**Problem**  
Current full-duplex spoken dialogue models primarily rely on supervised learning via token-level likelihood maximization, which inadequately captures interaction-level dynamics. This limitation leads to interactivity issues such as excessive silence and poorly timed turn-taking. While recent approaches have employed reinforcement learning (RL) to enhance interactivity, they typically focus on a narrow range of interactive behaviors. This paper addresses these gaps by proposing a comprehensive post-training alignment method that optimizes multiple facets of interactivity in dialogue systems. The work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose a post-training alignment method that utilizes reinforcement learning to improve interactivity across four canonical axes: pause handling, turn-taking, backchanneling, and user interruption. For each axis, they extract short audio segments from human conversation corpora to create axis-specific reward functions. Additionally, they incorporate a large language model (LLM)-based reward to ensure response quality, mitigating the risk of semantic degradation during the optimization process. The method is applied to two open-source models, Moshi and PersonaPlex, which serve as the baseline architectures for evaluation. The training compute details are not explicitly disclosed, but the approach emphasizes the integration of RL with existing models to enhance their interactive capabilities.

**Results**  
The proposed method demonstrates significant improvements in interactivity metrics when evaluated against the baseline models. In offline evaluations using pre-recorded audio, the models exhibit enhanced performance across all four axes of interactivity. In real-time multi-turn dialogue evaluations, the improvements are consistent, indicating that the RL-based post-training alignment effectively addresses the identified interactivity issues. Specific quantitative results are not provided in the abstract, but the authors claim that the enhancements are substantial and statistically significant compared to the baseline performance.

**Limitations**  
The authors acknowledge that their approach may not fully generalize to all conversational contexts, as the training data is limited to specific human conversation corpora. Additionally, the reliance on LLM-based rewards may introduce biases inherent to the language model used. The paper does not address potential computational overhead introduced by the RL training phase, which could impact deployment in resource-constrained environments. Furthermore, the evaluation metrics for interactivity are not exhaustively defined, leaving room for interpretation.

**Why it matters**  
This work has significant implications for the development of more natural and effective spoken dialogue systems, particularly in applications requiring real-time interaction, such as virtual assistants and customer service bots. By addressing the multifaceted nature of interactivity, the proposed method can lead to more engaging user experiences and improved conversational flow. The findings contribute to the ongoing discourse on enhancing dialogue systems through RL techniques, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.11167v1).
