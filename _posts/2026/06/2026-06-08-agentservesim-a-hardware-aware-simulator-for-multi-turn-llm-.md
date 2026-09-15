---
title: "AGENTSERVESIM: A Hardware-aware Simulator for Multi-Turn LLM Agent Serving"
date: 2026-06-08 15:20:23 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09613v1"
arxiv_id: "2606.09613"
authors: ["Rakibul Hasan Rajib", "Mengxin Zheng", "Qian Lou"]
slug: agentservesim-a-hardware-aware-simulator-for-multi-turn-llm-
summary_word_count: 378
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces AGENTSERVESIM, a hardware-aware simulator designed for evaluating multi-turn LLM agent serving policies efficiently."
---

**Problem**  
The paper addresses the gap in existing literature regarding the simulation of multi-turn LLM agent serving, which interleaves model calls with external tool invocations. Current LLM serving simulators primarily focus on stateless request-level workloads, neglecting the complexities of stateful program execution, including turn dependencies and KV-cache management. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for a robust evaluation framework for agent-serving policies.

**Method**  
AGENTSERVESIM is a hardware-aware simulator that evaluates serving policies at the program granularity. It comprises several composable modules: 
- **Program Orchestrator**: Maintains program identity and turn order.
- **Tool Simulator**: Models tool-induced gaps in execution.
- **Session-Aware Router**: Ensures program-to-instance affinity for cache-aware dispatch.
- **KV Residency Model**: Tracks the placement of key-value (KV) data across various memory hierarchies, including High Bandwidth Memory (HBM) and host DRAM/CXL, while managing eviction policies.

The simulator operates entirely on commodity CPUs, allowing for scalable and cost-effective evaluations of agent-serving policies without the need for dedicated accelerator time.

**Results**  
AGENTSERVESIM demonstrates a high fidelity in reproducing real-system behavior, achieving an error margin of only 6% across key performance metrics when compared to actual deployments across various hardware configurations. This performance is significant as it allows researchers and engineers to explore agent-serving policies in a controlled and repeatable manner, facilitating the optimization of scheduling, KV-cache management, and routing policies.

**Limitations**  
The authors acknowledge that while AGENTSERVESIM effectively simulates multi-turn LLM agent serving, it may not capture all nuances of real-world deployments, particularly those involving highly specialized hardware or unique workload characteristics. Additionally, the reliance on commodity CPUs may limit the simulator's applicability in scenarios where dedicated accelerators are essential for performance. The paper does not address potential scalability issues when simulating extremely large models or complex agent interactions.

**Why it matters**  
The introduction of AGENTSERVESIM has significant implications for the development and optimization of multi-turn LLM agents, enabling researchers to evaluate various serving policies without incurring the high costs associated with real system deployments. This work lays the groundwork for future advancements in agent-serving architectures and policies, promoting more efficient use of computational resources. The findings and methodologies presented in this paper are crucial for ongoing research in the field of LLMs and are available on [arXiv](https://arxiv.org/abs/2606.09613v1).
