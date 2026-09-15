---
title: "Exploring the Design Space of Reward Backpropagation for Flow Matching"
date: 2026-06-09 16:36:54 +0000
category: research
subcategory: training_methods
company: "UiPath"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11075v1"
arxiv_id: "2606.11075"
authors: ["Ruoyu Wang", "Boye Niu", "Xiangxin Zhou", "Yushi Huang", "Tongliang Liu", "Chi Zhang"]
slug: exploring-the-design-space-of-reward-backpropagation-for-flo
summary_word_count: 424
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces FlowBP, a novel framework for reward backpropagation in flow matching, addressing gradient pathologies in text-to-image models."
---

**Problem**  
This work addresses the limitations of existing reward backpropagation methods in text-to-image flow matching models, particularly the inefficiencies caused by storing activations across the full sampling trajectory and the inflation of reward gradients due to chained Jacobian products. These issues hinder the sample efficiency of aligning models with human preferences. The authors note that current connector-based methods, such as LeapAlign, mitigate these problems but still rely on approximating the full rollout, which can degrade performance over longer intervals. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose FlowBP, a unified surrogate-trajectory framework that redefines the backward trajectory as the primary design object. FlowBP employs a no-gradient cached rollout for sampling, which is then complemented by a lightweight backward surrogate constructed from cached velocities and selectively re-forwarded velocities. This framework allows for the separation of four critical design choices: the reward-model input, active set, integration weights, and bridge coupling. The authors instantiate three specific variants of FlowBP: 
1. **FlowBP-Sparse**: Utilizes sparse Euler reconstruction to optimize memory usage.
2. **FlowBP-Bridge**: Introduces controlled bridge coupling to enhance gradient flow.
3. **FlowBP-Lagrange**: Increases the order of leap quadrature for improved accuracy.

All variants are designed to bound memory usage by the active-set size and limit the gradient chaining to a maximum of one Jacobian factor, thus addressing the identified pathologies effectively.

**Results**  
The proposed FlowBP variants were evaluated against direct-gradient baselines across three benchmarks: SD3.5-M, FLUX.1-dev, and FLUX.2-Klein-base. The results indicate that all three FlowBP variants outperform the direct-gradient methods on most metrics related to preference, quality, and compositionality. Specific performance improvements were noted, although exact numerical results and effect sizes were not disclosed in the abstract.

**Limitations**  
The authors acknowledge that the performance of FlowBP is contingent on the accuracy of the short path approximation to the full rollout, particularly over extended intervals. Additionally, while the framework allows for flexibility in design choices, the optimal configuration may vary depending on the specific application and dataset. The paper does not address potential computational overhead introduced by the surrogate construction process, which could impact scalability in larger models.

**Why it matters**  
The introduction of FlowBP represents a significant advancement in the design of reward backpropagation methods for flow matching, offering a more efficient and effective means of aligning text-to-image models with human preferences. This work has implications for improving the sample efficiency of generative models and could influence future research in reinforcement learning and model alignment strategies, as discussed in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.11075v1).
