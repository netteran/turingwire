---
title: "EvolveNav: Proactive Preflection and Self-Evolving Memory for Zero-Shot Object Goal Navigation"
date: 2026-06-16 17:56:57 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18235v1"
arxiv_id: "2606.18235"
authors: ["Qi Chai", "Wenhao Shen", "Nanjie Yao", "Yue Xia", "Kaiyong Zhao", "Jie Ma"]
slug: evolvenav-proactive-preflection-and-self-evolving-memory-for
summary_word_count: 379
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces EvolveNav, a self-evolving framework for Zero-Shot Object-Goal Navigation that enhances exploration efficiency and success rates."
---

**Problem**  
The paper addresses the limitations of existing Zero-Shot Object-Goal Navigation (ZS-OGN) methods, which typically rely on static priors from foundation models and lack the ability to adapt during test time. This results in repeated errors and inefficient exploration strategies. The authors highlight the need for a dynamic approach that allows agents to learn from past experiences in real-time, thereby improving navigation performance without prior training. This work is presented as a preprint and has not undergone peer review.

**Method**  
The proposed framework, EvolveNav, incorporates two key components: a self-evolving rule memory and a memory-guided preflection module. The rule memory is constructed by extracting actionable knowledge from previous navigation trajectories, enabling the agent to adapt its strategies based on historical data. The retrieval strategy employs an upper confidence bound approach to select effective rules, balancing semantic relevance with historical success rates. The memory-guided preflection module anticipates potential outcomes of actions before execution, which minimizes inefficient exploration. The architecture leverages reinforcement learning principles, although specific details regarding the training compute and dataset used are not disclosed.

**Results**  
EvolveNav demonstrates significant improvements over existing zero-shot baselines on standard benchmarks. The method achieves a 10.1% increase in success rate compared to previous approaches, while also reducing the number of unnecessary steps taken during navigation. These results indicate a more efficient exploration process, showcasing the effectiveness of the self-evolving memory and preflection strategies in enhancing navigation performance.

**Limitations**  
The authors acknowledge that the reliance on historical data may introduce biases if past experiences are not representative of future scenarios. Additionally, the performance of EvolveNav may be contingent on the quality and diversity of the trajectories used to build the rule memory. The paper does not address potential scalability issues when applied to more complex environments or the computational overhead introduced by the memory-guided preflection module.

**Why it matters**  
EvolveNav's approach to integrating self-evolving memory and proactive preflection has significant implications for the field of robotic navigation and embodied AI. By enabling agents to learn and adapt in real-time, this framework could pave the way for more robust and efficient navigation systems in dynamic environments. The findings contribute to the ongoing discourse on enhancing zero-shot learning capabilities in robotics, as discussed in related works on adaptive learning strategies. This research is available on [arXiv](https://arxiv.org/abs/2606.18235v1).
