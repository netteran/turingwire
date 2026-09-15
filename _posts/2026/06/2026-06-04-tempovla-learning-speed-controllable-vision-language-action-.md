---
title: "TempoVLA: Learning Speed-Controllable Vision-Language-Action Policies"
date: 2026-06-04 17:59:40 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.06491v1"
arxiv_id: "2606.06491"
authors: ["Dong Jing", "Jingchen Nie", "Tianqi Zhang", "Jiaqi Liu", "Huaxiu Yao", "Zhiwu Lu"]
slug: tempovla-learning-speed-controllable-vision-language-action-
summary_word_count: 450
classification_confidence: 0.80
source_truncated: false
layout: post
description: "TempoVLA introduces a novel approach for speed-controllable Vision-Language-Action policies, enhancing robot manipulation through dynamic execution speed adjustment."
---

**Problem**  
This paper addresses the limitation of existing Vision-Language-Action (VLA) models, which typically operate at a fixed execution speed derived from training demonstrations. Prior methods for enhancing speed, such as model compression and reinforcement learning, only allow for a shift between fixed speeds, neglecting the potential for deceleration and dynamic speed control. The authors highlight the need for a more flexible approach that can adapt execution speed based on the context of robot manipulation tasks, particularly during the transition between low-risk and high-risk phases. This work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The core contribution of this research is TempoVLA, a VLA model that incorporates a dual-component architecture to enable controllable execution speed. The first component is Variable-Speed Trajectory Augmentation (VSTA), which modifies demonstration trajectories to achieve any target speed by merging or splitting actions while maintaining the original motion semantics. The second component is a conditioning mechanism that integrates the desired speed into the policy decision-making process. The authors provide empirical evidence that VSTA can achieve the requested speed with minimal motion error. The model is trained on a dataset that includes varied speed demonstrations, leveraging a large multimodal model to facilitate dynamic speed adjustments during execution.

**Results**  
TempoVLA demonstrates significant improvements in speed control capabilities compared to baseline VLA models. In simulation and real-world tasks, it achieves flexible speed adjustments, accelerating during low-risk phases and decelerating in high-risk scenarios. The authors report that VSTA enhances the default performance by better data utilization, achieving a performance boost of approximately 15% in task completion rates compared to traditional fixed-speed models. The results indicate that TempoVLA can effectively manage execution speed without compromising the quality of manipulation tasks.

**Limitations**  
The authors acknowledge that while TempoVLA shows promise, it is still limited by the quality and diversity of the training data used for VSTA. The reliance on existing demonstration data may restrict the model's adaptability to novel tasks or environments not represented in the training set. Additionally, the paper does not explore the computational overhead introduced by the conditioning mechanism, which could impact real-time performance in practical applications. The authors also do not address potential safety concerns related to rapid speed changes in physical robot interactions.

**Why it matters**  
The development of TempoVLA has significant implications for the field of robotic manipulation, particularly in applications requiring nuanced control over execution speed. By enabling robots to dynamically adjust their speed based on contextual cues, this work paves the way for more sophisticated and adaptable robotic systems. The findings contribute to the ongoing discourse on improving VLA models and highlight the importance of speed control in enhancing robot performance in complex environments, as published in [arXiv](https://arxiv.org/abs/2606.06491v1).
