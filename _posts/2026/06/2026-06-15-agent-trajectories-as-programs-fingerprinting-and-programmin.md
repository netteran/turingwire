---
title: "Agent trajectories as programs: fingerprinting and programming coding-agent behavior"
date: 2026-06-15 17:28:41 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.16988v1"
arxiv_id: "2606.16988"
authors: ["Hamidah Oderinwale"]
slug: agent-trajectories-as-programs-fingerprinting-and-programmin
summary_word_count: 421
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a framework for analyzing and programming coding-agent behavior through procedural representations and behavioral fingerprints."
---

**Problem**  
This work addresses the gap in understanding how AI agents achieve their performance, particularly in software engineering tasks. Existing benchmarks primarily report success rates without elucidating the underlying behavioral processes. The authors highlight the need for a systematic approach to compare agents procedurally across varying contexts, which is not sufficiently covered in the current literature. This paper is a preprint and has not undergone peer review.

**Method**  
The authors introduce a framework that defines agent behavior through "fingerprints," which are derived from procedural signatures of agent trajectories. They employ an emergent vocabulary induction technique to create compressive yet expressive procedural representations of agent problem-solving methods. The framework is implemented in a library called ProcGrep, designed for auditing and evaluating agents based on their task approaches. The study involves ten agents evaluated on the SWE-Bench dataset, focusing on the structural distinctness of their trajectories. The authors utilize Jensen-Shannon divergence to quantify behavioral similarity, revealing that agents from similar release periods or distilled from one another exhibit closer behavioral patterns.

**Results**  
The proposed fingerprinting method achieves an accuracy of 85.7% in attributing unseen trajectories to the correct agent while controlling for task leakage. The analysis of agent pairs shows that distilled models have a Jensen-Shannon divergence of 0.25, indicating they are significantly more similar in behavior compared to other model pairs. This suggests that the procedural representations effectively capture the nuances of agent behavior, providing a more granular understanding than traditional success metrics.

**Limitations**  
The authors acknowledge that their approach may not generalize across all types of agents or tasks, as the study is limited to the SWE-Bench dataset. Additionally, the emergent vocabulary induction technique may introduce biases based on the training data used. The paper does not address potential scalability issues when applying the framework to larger or more diverse agent populations, nor does it explore the implications of agent behavior in real-world applications beyond the controlled dataset.

**Why it matters**  
This research has significant implications for the development and deployment of coding agents, as it provides a methodology for understanding and programming agent behavior beyond mere performance metrics. By enabling task-aware model routing and agent monitoring, the framework can enhance the efficiency and effectiveness of coding agents in software engineering tasks. The introduction of ProcGrep as a tool for procedural evaluation could lead to more informed decisions in agent design and deployment, fostering advancements in AI applications. This work contributes to the ongoing discourse on agent interpretability and behavior analysis, as discussed in related literature (as published in [arXiv cs.LG](https://arxiv.org/abs/2606.16988v1)).
