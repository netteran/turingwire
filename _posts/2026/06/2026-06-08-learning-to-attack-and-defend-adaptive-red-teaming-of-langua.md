---
title: "Learning to Attack and Defend: Adaptive Red Teaming of Language Models via GRPO"
date: 2026-06-08 16:21:36 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09701v1"
arxiv_id: "2606.09701"
authors: ["Blake Bullwinkel", "Eugenia Kim", "Amanda Minnich", "Mark Russinovich"]
slug: learning-to-attack-and-defend-adaptive-red-teaming-of-langua
summary_word_count: 383
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents AdvGRPO, a novel co-training framework for adaptive red teaming of language models, enhancing both attack and defense capabilities."
---

**Problem**  
The paper addresses the challenge of adaptive red teaming in AI, specifically the need for continuous evolution of both attackers and defenders in language models. Previous works have shown the potential of reinforcement learning for discovering novel attacks and co-training methods for enhancing defender robustness. However, existing approaches using Generalized Reinforcement Policy Optimization (GRPO) have been reported as unstable in this context. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose AdvGRPO, a co-training framework that stabilizes GRPO for joint optimization of attacker and defender models. The method employs dense multi-channel rewards and decoupled advantage normalization to enhance training stability. The training process is structured as a curriculum, beginning with single-turn attacks and progressing to closed-loop multi-turn attacks. This curriculum is followed by a co-training phase where the attacker and defender models are updated alternately. The architecture leverages Proximal Policy Optimization (PPO) and Direct Policy Optimization (DPO) as baselines for comparison, while the specific training compute requirements are not disclosed.

**Results**  
AdvGRPO demonstrates significant improvements in both attack effectiveness and defender robustness. The paper reports that co-trained defenders outperform baseline models on safety benchmarks, although specific metrics and comparisons to named baselines are not detailed in the summary provided. The authors claim that the attacks generated through AdvGRPO are highly effective and transferable across different scenarios, indicating a substantial advancement over previous methods.

**Limitations**  
The authors acknowledge the instability of GRPO in prior implementations as a limitation that their framework aims to address. However, they do not discuss potential limitations related to the scalability of the curriculum approach or the generalizability of the co-trained models across diverse language tasks. Additionally, the lack of detailed performance metrics and comparisons to a wider range of baselines may limit the assessment of AdvGRPO's effectiveness.

**Why it matters**  
The implications of this work are significant for the field of AI safety and adversarial robustness. By providing a stable framework for adaptive red teaming, AdvGRPO enhances the ability of language models to defend against evolving threats while simultaneously improving the sophistication of attacks. This dual focus on attacker-defender dynamics is crucial for developing more resilient AI systems. The findings contribute to ongoing research in adversarial machine learning and reinforcement learning strategies, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.09701v1).
