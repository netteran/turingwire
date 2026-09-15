---
title: "Pushing the Limits of LLM Tool Calling via Experiential Knowledge Integration and Activation"
date: 2026-06-09 13:51:32 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.10875v1"
arxiv_id: "2606.10875"
authors: ["Yupu Hao", "Zhuoran Jin", "Huanxuan Liao", "Kang Liu", "Jun Zhao"]
slug: pushing-the-limits-of-llm-tool-calling-via-experiential-know
summary_word_count: 360
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces KATE, a framework that enhances LLM tool execution through experiential knowledge integration and improved reasoning strategies."
---

**Problem**  
This work addresses the limitations of large language models (LLMs) in executing multi-step tasks using tools, particularly their deficiencies in tool-related knowledge and knowledge activation. The authors highlight that existing literature lacks a systematic exploration of how different forms of experiential knowledge impact tool-use performance. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose the Knowledge-Augmented Tool Execution (KATE) framework, which consists of three main components: knowledge acquisition, activation, and internalization. In the knowledge acquisition phase, they evaluate various experiential knowledge types, revealing that instance-level knowledge significantly enhances performance, while abstract intent-level knowledge provides minimal benefits. For knowledge activation, they demonstrate that expanding the width of reasoning through parallel sampling and aggregation is more effective than merely deepening reasoning via prompting. In the knowledge internalization phase, they employ post-training with knowledge-augmented data, finding that reinforcement learning (RL) surpasses traditional supervised fine-tuning in performance enhancement. The experiments utilize the BFCL-V3 and AppWorld benchmarks to validate the proposed methods.

**Results**  
KATE achieves substantial performance improvements over strong baselines across various model scales. Specifically, on the BFCL-V3 benchmark, KATE outperforms the best baseline by 15% in task completion rates, while on AppWorld, it shows a 20% increase in successful tool executions. These results indicate that the integration of experiential knowledge and the proposed reasoning strategies significantly enhance LLM capabilities in tool use.

**Limitations**  
The authors acknowledge that their approach may not generalize well to all types of tasks, particularly those requiring highly abstract reasoning or domain-specific knowledge not captured in their experiential knowledge framework. Additionally, the reliance on parallel sampling may introduce computational overhead, which could limit scalability in resource-constrained environments. The paper does not address the potential biases introduced by the experiential knowledge sources used in training.

**Why it matters**  
The findings from this research have significant implications for the development of more capable autonomous agents that leverage LLMs for complex tasks. By demonstrating the effectiveness of experiential knowledge integration and innovative reasoning strategies, this work paves the way for future research in enhancing LLM tool use. The insights gained can inform subsequent studies on knowledge representation and activation in LLMs, as published in [arXiv](https://arxiv.org/abs/2606.10875v1).
