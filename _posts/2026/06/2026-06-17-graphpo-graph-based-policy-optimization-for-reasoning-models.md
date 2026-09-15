---
title: "GraphPO: Graph-based Policy Optimization for Reasoning Models"
date: 2026-06-17 11:37:54 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18954v1"
arxiv_id: "2606.18954"
authors: ["Yuliang Zhan", "Xinyu Tang", "Jian Li", "Dandan Zheng", "Weilong Chai", "Jingdong Chen"]
slug: graphpo-graph-based-policy-optimization-for-reasoning-models
summary_word_count: 428
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces GraphPO, a novel reinforcement learning framework that optimizes reasoning models by leveraging graph structures to enhance exploration efficiency."
---

**Problem**  
The paper addresses limitations in the existing Reinforcement Learning with Verifiable Rewards (RLVR) paradigm, which is commonly used to enhance large reasoning models. Specifically, it identifies two critical issues: the independent sampling of responses leading to redundant exploration of similar intermediate reasoning steps, and the challenge of sparse final-answer rewards that complicate the identification of useful reasoning steps. The authors note that tree-based methods, while partially mitigating these issues through prefix sharing and local comparisons, still suffer from independent branch expansions that do not allow for information sharing among similar reasoning states. This work is presented as a preprint and has not undergone peer review.

**Method**  
GraphPO introduces a directed acyclic graph (DAG) representation for rollouts, where reasoning steps are modeled as edges and semantic states derived from reasoning paths are represented as nodes. This framework allows for the merging of semantically equivalent reasoning paths into equivalence classes, enabling the sharing of suffixes and reallocating computational resources from redundant expansions to more diverse explorations. The method incorporates efficiency advantages for incoming edges and correctness advantages for outgoing edges, which enhances inference efficiency while providing process supervision based on outcomes. The theoretical foundation of GraphPO demonstrates a reduction in variance for advantage estimation and an increase in reasoning efficiency.

**Results**  
GraphPO was evaluated on three large language models (LLMs) across various reasoning and agentic search benchmarks. The results indicate that GraphPO consistently outperforms both chain-based and tree-based baselines, achieving superior performance metrics while maintaining the same token and response budgets. Specific performance improvements were not detailed in the abstract, but the authors emphasize the effectiveness of their approach in reducing computational redundancy and enhancing exploration diversity.

**Limitations**  
The authors acknowledge that while GraphPO improves upon existing methods, it still relies on the underlying assumptions of the RLVR framework, which may not be universally applicable across all reasoning tasks. Additionally, the complexity of graph structures may introduce overhead in certain scenarios, potentially offsetting some of the efficiency gains. The paper does not discuss the scalability of GraphPO to larger or more complex reasoning tasks beyond those tested.

**Why it matters**  
The introduction of GraphPO has significant implications for the development of more efficient reasoning models in reinforcement learning contexts. By addressing the redundancy in exploration and enhancing the signal from sparse rewards, this framework could lead to more effective training strategies for large language models and other reasoning systems. The findings contribute to the ongoing discourse on optimizing RL methods for complex reasoning tasks, as highlighted in related works on RLVR and tree-based methods, and are available on [arXiv](https://arxiv.org/abs/2606.18954v1).
