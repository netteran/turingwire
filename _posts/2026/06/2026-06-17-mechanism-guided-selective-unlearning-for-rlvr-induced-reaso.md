---
title: "Mechanism-Guided Selective Unlearning for RLVR-Induced Reasoning"
date: 2026-06-17 15:59:21 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.19222v1"
arxiv_id: "2606.19222"
authors: ["Chenyu Zhou", "Qiliang Jiang", "Shuning Wu", "Xu Zhou"]
slug: mechanism-guided-selective-unlearning-for-rlvr-induced-reaso
summary_word_count: 401
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MAST, a mechanism-guided selective unlearning method that minimizes collateral damage in reinforcement learning-based reasoning tasks."
---

**Problem**  
The paper addresses the challenge of unlearning in reinforcement learning with value-based reasoning (RLVR), specifically focusing on the collateral damage incurred during full-parameter updates. Existing methods often lead to significant degradation in model performance on retained tasks, as evidenced by the detrimental effects on MATH and GSM8K benchmarks. This work is a preprint and has not undergone peer review, highlighting the need for further validation in the community.

**Method**  
The authors propose MAST (Mechanism-Aligned Selective Targeting), which selectively updates only a subset of model parameters based on a ranking system that evaluates attention-projection tensors. The ranking is determined by three criteria: off-principal energy, update magnitude, and forget-gradient coupling magnitude. This selective approach allows MAST to induce target forgetting while minimizing the impact on retained tasks. The method was evaluated on two models, Qwen2.5-Math-1.5B and Qwen3-1.7B-Base, using matched supervised fine-tuning (SFT) and RLVR checkpoints. The training compute details are not disclosed, but the method's efficacy is demonstrated through statistical comparisons.

**Results**  
MAST achieved a statistically significant reduction in MATH task performance from 45/150 to 37/150, with a McNemar p-value of 0.0078, indicating a robust forgetting effect. In contrast, the method preserved performance on the GSM8K benchmark, showing an improvement of +0.8 percentage points, while the retention of MATH performance was minimally affected, decreasing by only -0.5 percentage points. These results were consistent across multiple seeds and objectives (NPO/SimNPO), demonstrating the method's reliability. Notably, while full-parameter unlearning led to a collapse in GSM8K performance, MAST maintained its integrity.

**Limitations**  
The authors acknowledge that while MAST shows promise, it is limited to the specific benchmarks tested (MATH and GSM8K) and may not generalize to other tasks or datasets. Additionally, the method's reliance on tensor ranking could introduce biases based on the chosen criteria, which may not be universally applicable. The lack of peer review also raises questions about the robustness of the findings and their reproducibility in broader contexts.

**Why it matters**  
The implications of this work are significant for the field of reinforcement learning and model unlearning, particularly in scenarios where retaining performance on certain tasks is critical while selectively forgetting others. MAST provides a novel approach that could enhance the efficiency of model updates in dynamic environments, where continual learning and adaptation are necessary. This research contributes to the ongoing discourse on selective unlearning strategies, as published in [arXiv](https://arxiv.org/abs/2606.19222v1), and sets the stage for future investigations into more generalized unlearning frameworks.
