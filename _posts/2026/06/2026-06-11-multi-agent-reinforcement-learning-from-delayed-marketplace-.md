---
title: "Multi-Agent Reinforcement Learning from Delayed Marketplace Feedback for Objective-Weight Adaptation in Three-Sided Dispatch"
date: 2026-06-11 17:21:20 +0000
category: research
subcategory: agents_robotics
company: "DoorDash"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13604v1"
arxiv_id: "2606.13604"
authors: ["Haochen Wu", "Yi Hou", "Shiguang Xie"]
slug: multi-agent-reinforcement-learning-from-delayed-marketplace-
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a reinforcement learning system for adapting dispatch objective weights in a three-sided marketplace using delayed feedback."
---

**Problem**  
The paper addresses the challenge of adapting dispatch objective weights in three-sided marketplaces, specifically in the context of food delivery services like DoorDash. Traditional reinforcement learning approaches often struggle with delayed feedback and the need for real-time decision-making in operational environments. This work is particularly relevant as it explores the integration of delayed operational outcomes—such as delivery speed and courier utilization—into the reinforcement learning framework. The authors note that this is a preprint and has not yet undergone peer review.

**Method**  
The authors propose a novel reinforcement learning architecture that operates alongside a combinatorial assignment optimizer rather than replacing it. The system learns a store-level policy from historical marketplace data, which selects a discrete multiplier to adjust the trade-off between delivery quality and batching efficiency. The training employs a centralized value function derived from offline data, while execution occurs in a decentralized manner at the store level. The learning process utilizes Double Q-learning targets to mitigate overestimation of out-of-distribution values, complemented by a conservative regularizer to ensure stability. The model is trained under the constraints of noisy, delayed, and coupled feedback, maintaining operational feasibility and safeguards.

**Results**  
In a production switchback experiment, the offline-trained policy demonstrated significant improvements: it increased batching efficiency and reduced courier-side time costs while maintaining customer-facing delivery quality. The specific metrics reported indicate a marked enhancement in operational efficiency without compromising service quality, although exact numerical results are not disclosed in the abstract. The findings suggest that the proposed method effectively leverages real-world feedback to adapt decision policies in a live economic and logistics environment.

**Limitations**  
The authors acknowledge several limitations, including the reliance on historical data, which may not fully capture future operational dynamics. Additionally, the model's performance is contingent on the quality of the feedback signals received, which can be noisy and delayed. The paper does not address potential scalability issues or the adaptability of the model to different marketplace configurations beyond food delivery.

**Why it matters**  
This research has significant implications for the deployment of reinforcement learning in operational settings, particularly in environments characterized by delayed feedback and complex decision-making requirements. By demonstrating a practical application of reinforcement learning in a three-sided marketplace, the work paves the way for future studies to explore similar frameworks in other domains, such as logistics and supply chain management. The findings contribute to the growing body of literature on adaptive decision-making systems in real-world applications, as published in [arXiv](https://arxiv.org/abs/2606.13604v1).
