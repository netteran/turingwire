---
title: "Rethinking the Divergence Regularization in LLM RL"
date: 2026-06-08 17:58:23 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09821v1"
arxiv_id: "2606.09821"
authors: ["Jiarui Yao", "Xiangxin Zhou", "Penghui Qi", "Wee Sun Lee", "Liefeng Bo", "Tianyu Pang"]
slug: rethinking-the-divergence-regularization-in-llm-rl
summary_word_count: 412
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Divergence Regularized Policy Optimization (DRPO), enhancing stability in reinforcement learning for large language models."
---

**Problem**  
The paper addresses the limitations of existing reinforcement learning (RL) methods for post-training large language models (LLMs), particularly the issues arising from off-policy training due to training-inference mismatch and policy staleness. Current mainstream approaches like Proximal Policy Optimization (PPO) and Generalized RL with Policy Optimization (GRPO) utilize ratio-clipping mechanisms that inadequately capture distributional shifts, especially in long-tailed vocabularies. While recent advancements such as Divergence-based PPO (DPPO) have attempted to mitigate these issues by employing a divergence-based mask, they still rely on a hard masking approach that discards gradients when tokens exceed trust-region boundaries. This paper proposes a novel solution to this problem, which remains unreviewed.

**Method**  
The authors introduce Divergence Regularized Policy Optimization (DRPO), which replaces the hard mask used in DPPO with a smooth advantage-weighted quadratic regularizer. This regularizer allows for continuous gradient weights that mitigate diverging updates while maintaining the same trust-region geometry as DPPO. The method effectively provides corrective signals for policy updates that exceed the trust-region boundary, thus enhancing the stability and efficiency of the RL training process. The paper details the architecture and training procedures, although specific compute resources are not disclosed.

**Results**  
The experimental results demonstrate that DRPO significantly outperforms baseline methods, including PPO and DPPO, across various model scales and architectures. The authors report improvements in training stability and efficiency, although specific quantitative metrics (e.g., average reward, convergence rates) are not explicitly detailed in the summary provided. The results indicate that DRPO achieves better performance in terms of robustness to policy updates, particularly in scenarios with long-tailed distributions.

**Limitations**  
The authors acknowledge that while DRPO improves upon the limitations of hard masking in DPPO, it may still be sensitive to hyperparameter tuning related to the regularization strength. Additionally, the paper does not explore the scalability of DRPO in extremely large models or its performance in diverse application contexts beyond the tested benchmarks. The lack of detailed quantitative results in the summary also limits the ability to fully assess the method's effectiveness compared to existing approaches.

**Why it matters**  
The introduction of DRPO has significant implications for the field of reinforcement learning in LLMs, particularly in enhancing the stability and efficiency of training processes. By addressing the shortcomings of existing methods, DRPO could facilitate more effective deployment of RL techniques in real-world applications of LLMs, such as dialogue systems and content generation. This work contributes to the ongoing discourse on improving RL methodologies for LLMs, as highlighted in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.09821v1).
