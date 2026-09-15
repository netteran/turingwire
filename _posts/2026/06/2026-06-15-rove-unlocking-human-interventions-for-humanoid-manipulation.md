---
title: "ROVE: Unlocking Human Interventions for Humanoid Manipulation via Reinforcement Learning"
date: 2026-06-15 17:45:06 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.17011v1"
arxiv_id: "2606.17011"
authors: ["Wei Xiao", "Weiliang Tang", "Yuying Ge", "Hui Zhou", "Yao Mu", "Li Zhang"]
slug: rove-unlocking-human-interventions-for-humanoid-manipulation
summary_word_count: 381
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ROVE, a reinforcement learning framework that enhances humanoid manipulation by effectively utilizing imperfect human interventions."
---

**Problem**  
The paper addresses the challenge of integrating human interventions into post-training Vision-Language-Action (VLA) models for humanoid manipulation. Current methods struggle with the complexities of humanoid kinematics and dexterous hand control, leading to suboptimal intervention trajectories. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for robust systems that can effectively leverage human feedback without absorbing inefficient or erroneous behaviors.

**Method**  
ROVE introduces a novel human-in-the-loop pipeline designed to collect both deployment and intervention data specifically for humanoid manipulation tasks. The framework employs Optimistic Value Estimation (OVE) to prioritize high-value behaviors from mixed-quality trajectories, effectively filtering out less optimal actions. To enhance the robustness of value estimation, ROVE incorporates cross-embodiment human experience videos, which provide additional supervision for long-tailed failure and recovery scenarios. This dual approach allows the critic to generate informative advantage signals, guiding the VLA actor to focus on high-value behaviors rather than simply imitating all observed actions. The training process leverages reinforcement learning techniques, although specific details regarding the architecture, loss functions, and compute resources are not disclosed.

**Results**  
ROVE demonstrates significant improvements over experience-learning baselines in various real-world, contact-rich humanoid manipulation tasks. The paper reports consistent performance enhancements across multiple rollout-intervention iterations, although specific quantitative metrics (e.g., success rates, efficiency gains) are not detailed in the abstract. The results indicate that ROVE effectively harnesses human interventions to refine the learning process, leading to more adept manipulation capabilities in humanoid robots.

**Limitations**  
The authors acknowledge that the reliance on human interventions can still introduce variability and potential biases into the training process. Additionally, the framework's performance may be contingent on the quality and diversity of the collected intervention data. The paper does not address the scalability of the approach to more complex environments or the potential computational overhead introduced by the human-in-the-loop system.

**Why it matters**  
The implications of ROVE extend to the broader field of humanoid robotics and reinforcement learning, particularly in enhancing the efficacy of human-robot collaboration. By effectively utilizing imperfect human interventions, ROVE paves the way for more adaptive and resilient humanoid systems capable of performing complex tasks in dynamic environments. This work contributes to the ongoing discourse on improving VLA models and human-robot interaction, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.17011v1).
