---
title: "Compositional Skill Routing for LLM Agents: Decompose, Retrieve, and Compose"
date: 2026-06-16 15:27:55 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18051v1"
arxiv_id: "2606.18051"
authors: ["Xueping Gao"]
slug: compositional-skill-routing-for-llm-agents-decompose-retriev
summary_word_count: 442
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SkillWeaver, a framework for compositional skill routing in LLM agents, enhancing task decomposition and skill retrieval."
---

**Problem**  
The paper addresses the gap in the capability of large language model (LLM) agents to effectively compose multiple external skills for complex tasks. While existing systems primarily focus on single skill selection, real-world applications often necessitate the integration of multiple skills. This work formalizes the challenge as the Compositional Skill Routing problem, which involves decomposing user queries into atomic sub-tasks, retrieving relevant skills, and composing an executable plan. The authors present this as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The core technical contribution is the SkillWeaver framework, which consists of three main components: an LLM task decomposer, a bi-encoder skill retriever utilizing FAISS indexing, and a dependency-aware directed acyclic graph (DAG) planner. The task decomposer breaks down complex queries into simpler sub-tasks, while the skill retriever identifies appropriate skills from a library of 2,209 real skills across 24 functional categories. The authors introduce Iterative Skill-Aware Decomposition (SAD), a feedback loop that enhances the decomposition process by iteratively aligning it with the available skills. This method leverages retrieval-augmented techniques to improve the accuracy of task decomposition.

**Results**  
The authors evaluate SkillWeaver using CompSkillBench, a benchmark comprising 300 compositional queries. They report that standard LLM decomposition achieves only 34.2% category recall at the step level, highlighting the limitations of existing methods. With the introduction of SAD, decomposition accuracy improves significantly from 51.0% to 67.7% (+32.7%, Wilcoxon p < 10^-6) in a single iteration. Additionally, the dependency-aware analysis shows that correct granularity is crucial for effective skill retrieval, with CatR@1 increasing from 34% to 41% when the dependency-aware condition is met. SkillWeaver also demonstrates a reduction in context window consumption by over 99%, and transfer experiments indicate a generalization capability, achieving a +35.6% relative gain in dependency-aware performance even when target categories are not present in the retrieval pool.

**Limitations**  
The authors acknowledge that the primary limitation is the initial task decomposition quality, which can hinder overall performance. They do not discuss potential scalability issues related to the size of the skill library or the computational overhead of the iterative decomposition process. Additionally, the reliance on a specific set of skills may limit the framework's applicability to other domains or tasks not represented in the MCP ecosystem.

**Why it matters**  
This work has significant implications for the development of more capable LLM agents that can handle complex, multi-faceted tasks by effectively composing skills. The introduction of SkillWeaver and the SAD method provides a structured approach to improve task decomposition and skill retrieval, which can enhance the performance of AI systems in real-world applications. This research contributes to the ongoing discourse on compositionality in AI, as published in [arXiv](https://arxiv.org/abs/2606.18051v1).
