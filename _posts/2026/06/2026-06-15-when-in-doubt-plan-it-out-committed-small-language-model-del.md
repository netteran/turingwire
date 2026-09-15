---
title: "When in Doubt, Plan It Out: Committed Small Language Model Deliberation for Reactive Reinforcement Learning"
date: 2026-06-15 17:31:22 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16995v1"
arxiv_id: "2606.16995"
authors: ["Nathan Gavenski", "Juarez Monteiro", "Francisco Galuppo", "Adriano Veloso", "Odinaldo Rodrigues"]
slug: when-in-doubt-plan-it-out-committed-small-language-model-del
summary_word_count: 400
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces PACT, a hybrid architecture combining reactive RL with deliberative planning via a Small Language Model to enhance performance in unfamiliar environments."
---

**Problem**  
Reinforcement Learning (RL) policies often exhibit performance degradation in novel environments due to their lack of explicit deliberation. This paper addresses the gap in the literature regarding the integration of deliberative planning mechanisms into reactive RL frameworks. The authors propose a novel approach that leverages a Small Language Model (SLM) for planning, which is particularly relevant as the work is presented as a preprint and has not undergone peer review.

**Method**  
The proposed architecture, Plan, Align, Commit, Think (PACT), integrates a fast-reactive RL policy with a deliberative SLM planner. The SLM operates asynchronously to generate candidate action plans, which are then validated through simulation to ensure they are safe, feasible, and complete. Once a plan is confirmed, it is executed directly, bypassing the RL policy without necessitating retraining or modifications. The backbone of the SLM consists of 2 billion parameters, which allows for effective deliberation while maintaining the speed of the reactive policy. The training compute details are not disclosed, but the architecture emphasizes the synergy between the reactive and deliberative components.

**Results**  
PACT was evaluated on three configurations of the FrozenLake environment, each with increasing difficulty. The results indicate that PACT significantly outperforms all baseline methods, achieving a performance improvement of approximately 20% over the best-performing baseline in the most challenging configuration. The specific baselines compared include traditional RL methods without deliberative planning, highlighting the effectiveness of the hybrid approach in enhancing decision-making in complex scenarios.

**Limitations**  
The authors acknowledge several limitations, including the reliance on a specific SLM architecture, which may not generalize across all environments or tasks. Additionally, the computational overhead associated with the SLM's deliberative planning process could be a bottleneck in real-time applications. The paper does not address the scalability of the approach to larger or more complex environments beyond the FrozenLake configurations tested.

**Why it matters**  
The integration of deliberative planning into reactive RL frameworks has significant implications for the development of more robust AI systems capable of operating in dynamic and unfamiliar environments. By demonstrating that combining these two paradigms can yield superior performance, this work paves the way for future research into hybrid architectures that leverage the strengths of both reactive and deliberative approaches. This is particularly relevant for applications in robotics and autonomous systems, where adaptability and safety are paramount. The findings are available on [arXiv](https://arxiv.org/abs/2606.16995v1) and contribute to the ongoing discourse on enhancing RL methodologies through innovative architectural designs.
