---
title: "STARE: Surprisal-Guided Token-Level Advantage Reweighting for Policy Entropy Stability"
date: 2026-06-17 16:13:42 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.19236v1"
arxiv_id: "2606.19236"
authors: ["Haipeng Luo", "Qingfeng Sun", "Songli Wu", "Can Xu", "Wenfeng Deng", "Han Hu"]
slug: stare-surprisal-guided-token-level-advantage-reweighting-for
summary_word_count: 445
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces STARE, a method for stabilizing policy entropy in reinforcement learning, addressing token-level credit assignment issues in LLMs."
---

**Problem**  
The paper addresses the issue of policy entropy collapse during training in Reinforcement Learning with Verifiable Rewards (RLVR) algorithms, particularly in the context of Generative Reinforcement Policy Optimization (GRPO). This work is significant as it is the first to conduct a first-order gradient analysis of token-level entropy dynamics under GRPO, revealing a token-level credit assignment mismatch. The authors highlight that existing methods struggle with maintaining stable policy entropy, which is crucial for effective exploration and exploitation in complex reasoning tasks. This research is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose STARE (Surprisal-guided Token-level Advantage Reweighting for policy Entropy stability), which leverages a novel approach to address the identified credit assignment mismatch. STARE operates by analyzing the per-token entropy variation, which is decomposed into the product of trajectory-level advantages and an entropy sensitivity function. The method identifies entropy-critical token subsets using batch-internal surprisal quantiles and selectively reweights their effective advantages. Additionally, STARE incorporates a target-entropy closed-loop gate to regulate entropy stability throughout the training process. The experiments were conducted across various model scales (1.5B to 32B parameters) and three task families: Short Chain of Thought (CoT), Long CoT, and Multi-Turn Tool Use.

**Results**  
STARE demonstrates significant improvements in maintaining policy entropy stability during training. On the AIME24 and AIME25 benchmarks, STARE outperforms competitive baselines, including DAPO, by 4%-8% in average accuracy. The results indicate that STARE not only sustains stable RL training over thousands of steps but also maintains a balance between exploration and exploitation, as evidenced by the growth of reflection tokens and response length in tandem with accuracy improvements. These results suggest that STARE effectively mitigates the entropy collapse issue while enhancing overall model performance.

**Limitations**  
The authors acknowledge that while STARE improves policy entropy stability, it may still be sensitive to the choice of hyperparameters, particularly in the entropy regulation mechanism. Additionally, the method's reliance on batch-internal surprisal quantiles may introduce computational overhead, which could limit scalability in larger applications. The paper does not address potential limitations related to the generalizability of STARE across different RL environments or its performance in scenarios with highly variable reward structures.

**Why it matters**  
The implications of this work are significant for advancing reinforcement learning methodologies, particularly in the context of large language models (LLMs) where stable training dynamics are essential for effective reasoning. By addressing the critical issue of policy entropy collapse, STARE paves the way for more robust RL training frameworks that can be applied to a variety of complex tasks. This research contributes to the ongoing discourse in the field, as highlighted in related works on RLVR and entropy regulation strategies, and is available on [arXiv](https://arxiv.org/abs/2606.19236v1).
