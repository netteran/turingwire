---
title: "MODIP: Efficient Model-Based Optimization for Diffusion Policies"
date: 2026-06-09 13:09:21 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10825v1"
arxiv_id: "2606.10825"
authors: ["Zakariae El Asri", "Philippe Gratias-Quiquandon", "Nicolas Thome", "Olivier Sigaud"]
slug: modip-efficient-model-based-optimization-for-diffusion-polic
summary_word_count: 386
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces MODIP, a framework for efficient fine-tuning of diffusion policies using model-based optimization and model predictive control."
---

**Problem**  
The paper addresses the challenge of fine-tuning diffusion policies (DPs) in reinforcement learning (RL) settings, particularly when transitioning from offline imitation learning (e.g., behavioral cloning) to online RL. While DPs have shown promise in BC, their application in direct RL is hindered by the complexity of their multi-step denoising action generation process. This work is a preprint and thus has not undergone peer review, highlighting the need for further validation in the community.

**Method**  
The authors propose MODIP, which integrates a world model (WM) to facilitate the offline-to-online fine-tuning of DPs. The framework employs model predictive control (MPC) to generate high-quality trajectories from the WM, which serve as supervised targets for the fine-tuning process. A key innovation is the use of a terminal state value instead of a policy-dependent state-action value during MPC planning, which significantly reduces inference time. Additionally, MODIP trains critics using policy-independent temporal-difference (TD) targets, further optimizing training efficiency. The architecture leverages existing DPs while maintaining the stability and simplicity characteristic of BC.

**Results**  
Experiments conducted on the D4RL benchmark (MuJoCo and Kitchen environments) and RoboMimic tasks demonstrate that MODIP enhances the performance of diffusion policies beyond what is achievable through BC alone. Specifically, MODIP achieves competitive results against diffusion policy RL fine-tuning methods and outperforms strong model-based baselines, such as TD-MPC2. The paper reports substantial improvements in sample efficiency and overall performance metrics, although specific numerical results are not detailed in the abstract.

**Limitations**  
The authors acknowledge that while MODIP improves the fine-tuning of DPs, it may still be limited by the quality of the world model and the assumptions inherent in model-based approaches. Additionally, the reliance on MPC could introduce computational overhead in real-time applications. The paper does not address the scalability of the approach to more complex environments or the potential for overfitting to the WM.

**Why it matters**  
The introduction of MODIP has significant implications for the field of robot learning, particularly in enhancing the applicability of diffusion policies in RL contexts. By bridging the gap between imitation learning and reinforcement learning, this work opens avenues for more efficient training methodologies that leverage model-based techniques. The findings contribute to the ongoing discourse on improving sample efficiency and performance in robotic control tasks, as discussed in related works on model-based RL and policy optimization strategies, as published in [arXiv](https://arxiv.org/abs/2606.10825v1).
