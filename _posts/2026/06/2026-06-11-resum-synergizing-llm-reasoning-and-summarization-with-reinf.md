---
title: "ReSum: Synergizing LLM Reasoning and Summarization with Reinforcement Learning"
date: 2026-06-11 13:10:48 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13316v1"
arxiv_id: "2606.13316"
authors: ["Xucong Wang", "Ziyu Ma", "Yong Wang", "Shidong Yang", "Hailang Huang", "Renda Li"]
slug: resum-synergizing-llm-reasoning-and-summarization-with-reinf
summary_word_count: 348
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ReSum, a novel reinforcement learning framework that enhances LLM reasoning through self-summarization, improving coherence and efficiency."
---

**Problem**  
The paper addresses the limitations of existing Reinforcement Learning with Verifiable Rewards (RLVR) methods in Large Language Models (LLMs), particularly their tendency to produce unnecessarily long reasoning rollouts that compromise coherence and exhaust context budgets. Current approaches often rely on external mechanisms for organizing reasoning trajectories, failing to leverage the model's internal capabilities for self-management. This work is a preprint and has not undergone peer review.

**Method**  
ReSum introduces a self-summarization mechanism within the RLVR framework, allowing LLMs to compress and organize their reasoning trajectories autonomously. The architecture employs a summarization-aware adaptive rollout mechanism that evaluates the benefits of self-summarization during reasoning. When the model triggers self-summarization, it masks the summarization phrase to create a contrastive branch, while for non-summarization positions, it injects the phrase randomly to form a matched branch. This dual approach enables a more nuanced comparison of reasoning trajectories. Additionally, a summarization-aware advantage is designed to facilitate fine-grained evaluations of the contrastive rollouts. The training process involves extensive experimentation, although specific details on the dataset and compute resources are not disclosed.

**Results**  
ReSum demonstrates a significant performance improvement, achieving an average increase of 4% in reasoning accuracy while simultaneously reducing the average rollout length by 18.6%. These results were validated against established baselines, although specific baseline models and benchmarks are not detailed in the summary provided.

**Limitations**  
The authors acknowledge that while ReSum improves reasoning coherence and efficiency, the reliance on self-summarization may introduce new challenges in maintaining the fidelity of the original reasoning. Additionally, the paper does not discuss the scalability of the approach to larger models or more complex reasoning tasks, nor does it address potential biases introduced by the summarization process itself.

**Why it matters**  
The implications of this work are significant for the development of more efficient LLMs capable of long-horizon reasoning. By enabling models to self-organize their reasoning processes, ReSum could lead to advancements in applications requiring coherent and contextually aware outputs, such as dialogue systems and complex decision-making tasks. This research contributes to the ongoing discourse on enhancing LLM capabilities through innovative training methodologies, as published in [arXiv](https://arxiv.org/abs/2606.13316v1).
