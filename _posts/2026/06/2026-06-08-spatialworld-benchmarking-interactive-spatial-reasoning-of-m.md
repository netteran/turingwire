---
title: "SpatialWorld: Benchmarking Interactive Spatial Reasoning of Multimodal Agents in Real-World Tasks"
date: 2026-06-08 15:51:51 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09669v1"
arxiv_id: "2606.09669"
authors: ["Hongcheng Gao", "Hailong Qu", "Jingyi Tang", "Jiahao Wang", "Zihao Huang", "Hengkang Qiao"]
slug: spatialworld-benchmarking-interactive-spatial-reasoning-of-m
summary_word_count: 417
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SpatialWorld, a benchmark for evaluating interactive spatial reasoning in multimodal agents across real-world tasks."
---

**Problem**  
Existing benchmarks for multimodal large language models (MLLMs) primarily focus on passive evaluations, such as static visual question answering (VQA), or are limited to specific simulation environments. This paper addresses the gap in assessing interactive spatial reasoning capabilities of MLLMs in real-world contexts. The authors present SpatialWorld, a unified benchmark that evaluates agents' abilities to perform complex tasks requiring active spatial understanding. This work is a preprint and has not undergone peer review.

**Method**  
SpatialWorld integrates eight heterogeneous simulation backends under a shared, simulator-agnostic protocol, allowing for a diverse range of tasks. The benchmark comprises 760 human-annotated tasks across various domains, including household routines, travel, and social collaboration. Agents are required to operate under vision-only partial observability, actively gathering egocentric visual evidence while making decisions through a unified text-based action interface. Each task is meticulously designed with a human-validated initial state, a reference trajectory, and a terminal-state verifier to ensure reliable evaluation. The authors evaluate 15 advanced agents, including GPT-5 and Qwen-3.5, to assess their performance in solving these tasks.

**Results**  
The evaluation reveals that robust spatial task solving remains a significant challenge for current models. The strongest model, GPT-5, achieves an average task success rate (TSR) of only 17.4%, while the leading open-source model, Qwen-3.5, reaches a TSR of 14.1%. The results indicate a substantial gap between task success and execution efficiency, highlighting the difficulties agents face in active exploration and long-horizon planning. The authors also note considerable performance variations across different domains, underscoring the complexity of the tasks involved.

**Limitations**  
The authors acknowledge that the benchmark's reliance on human-annotated tasks may introduce biases and variability in task difficulty. Additionally, the performance metrics may not fully capture the nuances of spatial reasoning, as the tasks are inherently complex and context-dependent. The paper does not address potential scalability issues when applying the benchmark to a broader range of agents or tasks, nor does it explore the implications of the observed performance variations in depth.

**Why it matters**  
SpatialWorld serves as a rigorous testbed for evaluating the interactive spatial reasoning capabilities of multimodal agents, providing a foundation for future research in this area. The benchmark's design encourages the development of more sophisticated models that can better navigate and understand real-world environments. The findings highlight critical challenges in spatial reasoning that need to be addressed to improve agent performance, paving the way for advancements in MLLMs. This work is significant for researchers aiming to enhance the capabilities of AI systems in real-world applications, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.09669v1).
