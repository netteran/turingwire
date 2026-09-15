---
title: "Evolutionary Bilevel Reward Shaping for Generalization in Reinforcement Learning"
date: 2026-06-15 05:35:16 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.16236v1"
arxiv_id: "2606.16236"
authors: ["Ekasit Usaratniwart", "Xilin Gao", "Marc Ong", "Youhei Akimoto"]
slug: evolutionary-bilevel-reward-shaping-for-generalization-in-re
summary_word_count: 435
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Generalization via Evolutionary Reward Shaping (GERS), a bilevel optimization method for enhancing RL generalization with limited feedback."
---

**Problem**  
Reinforcement learning (RL) often experiences performance degradation when applied to environments that differ from those encountered during training. Existing methods like domain randomization (DR) require diverse training environments and full trajectory observability, which are impractical in scenarios with privacy constraints or limited data access. This paper addresses the gap in the literature regarding generalization in RL under such restricted conditions, proposing a novel approach that relies solely on scalar performance metrics from validation environments. The work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose Generalization via Evolutionary Reward Shaping (GERS), a bilevel optimization framework designed to enhance RL generalization. The method consists of two levels: the lower level involves training an RL agent using a reward function shaped by parameters optimized at the upper level. The upper level employs Covariance Matrix Adaptation Evolution Strategy (CMA-ES) to optimize these reward shaping parameters, aiming to maximize the cumulative unshaped reward on separate validation environments where trajectory data is unavailable. The training utilizes a limited set of environments with accessible trajectory data, while the optimization process at the upper level leverages scalar feedback from validation environments, thus circumventing the need for full trajectory observability.

**Results**  
GERS demonstrates superior performance compared to standard RL baselines on unseen test environments across various continuous control tasks. Specifically, GERS achieves performance metrics that are comparable to those obtained through domain randomization, despite DR requiring access to both training and validation environments as a single dataset. The paper reports significant improvements in generalization capabilities, with GERS outperforming the baseline by a notable margin, although exact numerical results are not specified in the abstract.

**Limitations**  
The authors acknowledge that GERS relies on the assumption that scalar feedback is sufficient for effective reward shaping, which may not hold in all scenarios. Additionally, the method's performance is contingent on the quality of the validation environments used for optimization. The paper does not address potential scalability issues or the computational overhead associated with the CMA-ES optimization process, which could limit its applicability in real-time or resource-constrained settings.

**Why it matters**  
The introduction of GERS has significant implications for the field of reinforcement learning, particularly in environments where data access is limited or privacy concerns are paramount. By demonstrating that effective generalization can be achieved without full trajectory observability, this work opens avenues for deploying RL in more restrictive settings, such as healthcare or finance, where data privacy is critical. The findings contribute to the ongoing discourse on enhancing RL robustness and generalization, as discussed in related works on domain adaptation and reward shaping techniques, and are available on [arXiv](https://arxiv.org/abs/2606.16236v1).
