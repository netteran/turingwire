---
title: "Recursive Agent Harnesses"
date: 2026-06-11 17:47:30 +0000
category: research
subcategory: agents_robotics
company: "Anthropic"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13643v1"
arxiv_id: "2606.13643"
authors: ["Elias Lumer", "Sahil Sen", "Kevin Paul", "Vamse Kumar Subbiah"]
slug: recursive-agent-harnesses
summary_word_count: 421
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper introduces the Recursive Agent Harness (RAH), enhancing long-context reasoning in coding agents through structured harness recursion."
---

**Problem**  
This work addresses the limitations of existing recursive language models (RLMs) and coding agents, particularly in their ability to handle long-context reasoning effectively. While RLMs have demonstrated the utility of recursion in model calls, they lack the capability to utilize full agent harnesses equipped with filesystem tools and execution capabilities. The authors propose the Recursive Agent Harness (RAH) as a novel framework that extends the concept of recursion from model calls to a more comprehensive agent-based architecture. This paper is a preprint and has not undergone peer review.

**Method**  
The core technical contribution is the Recursive Agent Harness (RAH), which allows a parent agent to generate and execute scripts that spawn multiple subagent harnesses in parallel. This architecture facilitates fine-grained workload management and employs structured function calls for handling smaller subtasks. The evaluation is conducted using a fixed backbone model, GPT-5, to ensure comparability with existing baselines, specifically Codex and RLMs. The training setup includes a controlled evaluation on the Oolong-Synthetic benchmark, which consists of 199 samples across 13 context-length buckets, extending up to 4 million tokens. The authors emphasize that the performance improvements are attributed to the harness architecture rather than enhancements in the underlying model.

**Results**  
The RAH framework significantly outperforms the Codex coding-agent baseline, achieving an accuracy of 81.36%, up from 71.75%. This improvement is quantified as a 9.61% absolute gain, demonstrating the effectiveness of the harness recursion approach. When evaluated with a more powerful backbone, Claude Sonnet 4.5, the RAH design reaches an impressive accuracy of 89.77%. These results indicate a substantial enhancement in long-context reasoning capabilities compared to established baselines.

**Limitations**  
The authors acknowledge that the evaluation is limited to a specific benchmark (Oolong-Synthetic) and may not generalize across all coding tasks or real-world applications. Additionally, the reliance on a fixed backbone model (GPT-5) may restrict the understanding of how RAH performs with other architectures. The paper does not address potential scalability issues when deploying RAH in more complex environments or the computational overhead introduced by managing multiple subagent harnesses.

**Why it matters**  
The introduction of the Recursive Agent Harness (RAH) has significant implications for the development of advanced coding agents capable of handling complex tasks with long-context dependencies. By framing harness recursion as a code-first extension of model recursion, this work opens avenues for further research into agent-based architectures that leverage parallelism and structured task management. The findings suggest that RAH could enhance the performance of coding agents in practical applications, potentially influencing future designs in AI systems. This research is available on [arXiv](https://arxiv.org/abs/2606.13643v1).
