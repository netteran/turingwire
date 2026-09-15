---
title: "DIRECT: When and Where Should You Allocate Test-Time Compute in Embodied Planners?"
date: 2026-06-10 17:58:49 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12402v1"
arxiv_id: "2606.12402"
authors: ["Jadelynn Dao", "Milan Ganai", "Yasmina Abukhadra", "Ajay Sridhar", "Mozhgan Nasr Azadani", "Katie Luo"]
slug: direct-when-and-where-should-you-allocate-test-time-compute-
summary_word_count: 399
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces DIRECT, a framework for optimizing test-time compute allocation in embodied planners, enhancing performance while reducing costs."
---

**Problem**  
The paper addresses the inefficiencies in deploying Vision-Language Models (VLMs) as high-level planners for embodied agents, particularly the challenge of scaling test-time compute. While increasing compute can enhance performance, it also leads to increased latency, token usage, and FLOPs, often resulting in diminishing returns in success rates. This work is particularly relevant as it is a preprint and unreviewed, highlighting the need for a systematic approach to compute allocation in real-world applications of embodied agents.

**Method**  
The authors propose DIRECT, a routing framework that leverages multimodal scene context to dynamically allocate compute resources based on the specific requirements of each prompt. The framework operates across three scaling axes: chain-of-thought depth, model size, and memory history. By analyzing these axes, DIRECT identifies the optimal compute allocation strategy, allowing for tailored resource management rather than a one-size-fits-all approach. The experiments were conducted on two benchmarks: VLABench and RoboMME, utilizing a physical Franka arm in a DROID setup for validation. The training compute details are not disclosed, but the focus is on optimizing test-time compute rather than model training.

**Results**  
The results demonstrate that DIRECT can achieve a success rate comparable to a stronger model while reducing average latency by up to 65%. Specifically, the framework outperformed fixed model selection strategies across the evaluated scaling axes, indicating that different compute allocations yield qualitatively distinct improvements in capability. The paper provides quantitative metrics showing that naive scaling of compute is inefficient, and DIRECT's approach significantly enhances the success-cost Pareto frontier.

**Limitations**  
The authors acknowledge that their framework may not generalize across all types of embodied tasks, as the effectiveness of compute allocation strategies can vary based on the specific characteristics of the task and environment. Additionally, the study is limited to the benchmarks used, and further validation on a broader range of tasks is necessary to fully assess the robustness of DIRECT. The paper does not address potential computational overhead introduced by the routing mechanism itself.

**Why it matters**  
The implications of this work are significant for the deployment of embodied agents in real-world scenarios, where efficiency and performance are critical. By optimizing test-time compute allocation, DIRECT enables more effective use of resources, potentially expanding the applicability of VLMs in robotics and other domains. This research contributes to the ongoing discourse on efficient AI deployment strategies, as highlighted in related works on resource allocation in machine learning, and is available on [arXiv](https://arxiv.org/abs/2606.12402v1).
