---
title: "Understanding helpfulness and harmless tension in reward models"
date: 2026-06-11 11:19:03 +0000
category: research
subcategory: alignment_safety
company: "Anthropic"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13209v1"
arxiv_id: "2606.13209"
authors: ["Eshaan Tanwar", "Pepa Atanasova"]
slug: understanding-helpfulness-and-harmless-tension-in-reward-mod
summary_word_count: 414
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the internal mechanisms of reward models in reinforcement learning from human feedback, revealing tensions between helpfulness and harmlessness objectives."
---

**Problem**  
This work addresses the gap in understanding the internal mechanisms of reward models used in reinforcement learning from human feedback (RLHF), particularly the conflicting objectives of helpfulness and harmlessness. Despite their importance in aligning language models, the interactions and tensions between these objectives remain poorly understood. The authors highlight that existing literature lacks a comprehensive analysis of how these objectives interfere with one another, which is critical for improving alignment strategies. This paper is a preprint and has not yet undergone peer review.

**Method**  
The authors conduct a series of experiments using reward models trained under three different settings: helpfulness-only, harmlessness-only, and mixed-objective. They employ activation-based methods to identify neurons associated with each objective and perform targeted ablations to assess their functional roles. The study utilizes a combination of qualitative and quantitative analyses to evaluate the performance of mixed-objective models against single-objective baselines. The training compute and specific architectures used are not disclosed, but the focus is on understanding the causal relationships between neuron activations and model behavior.

**Results**  
The findings reveal that mixed-objective models often underperform compared to single-objective models, indicating significant interference between the helpfulness and harmlessness objectives. Specifically, the authors report that mixed models exhibit a performance drop of approximately 15% on alignment tasks compared to the best-performing single-objective model. They identify that a substantial proportion of neurons are shared between the two objectives, with these shared neurons exerting a disproportionate influence on model behavior. The targeted ablation experiments demonstrate that neurons associated with helpfulness can negatively impact harmlessness and vice versa, further elucidating the alignment tension.

**Limitations**  
The authors acknowledge that their analysis is limited to the specific architectures and datasets used in their experiments, which may not generalize to all reward models. Additionally, the study does not explore the potential for alternative training paradigms that could mitigate the observed tensions. The lack of peer review may also imply that the findings should be interpreted with caution until validated by the community.

**Why it matters**  
This research provides critical insights into the mechanistic underpinnings of reward models in RLHF, highlighting the complexities of multi-objective alignment. The identification of shared neurons and their conflicting roles offers a pathway for future work aimed at developing disentangled and controllable alignment methods. Understanding these dynamics is essential for advancing the field of AI alignment, as it informs the design of more effective reward models. This work motivates further exploration into how to balance conflicting objectives in AI systems, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13209v1).
