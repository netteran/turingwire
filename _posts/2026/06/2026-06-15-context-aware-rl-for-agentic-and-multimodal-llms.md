---
title: "Context-Aware RL for Agentic and Multimodal LLMs"
date: 2026-06-15 17:59:28 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.17053v1"
arxiv_id: "2606.17053"
authors: ["Peiyang Xu", "Bangzheng Li", "Sijia Liu", "Karthik R. Narasimhan", "Pramod Viswanath", "Prateek Mittal"]
slug: context-aware-rl-for-agentic-and-multimodal-llms
summary_word_count: 421
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ContextRL, a context-aware reinforcement learning method that enhances long-horizon reasoning and multimodal performance in LLMs."
---

**Problem**  
Large language models (LLMs) often struggle with tasks requiring the identification of critical evidence within extensive or intricate contexts, such as pinpointing a specific line in a tool trace or a subtle detail in an image. This paper addresses this gap by proposing a novel reinforcement learning approach, ContextRL, which is particularly relevant for improving the performance of LLMs in long-horizon reasoning and multimodal tasks. The work is presented as a preprint and has not undergone peer review.

**Method**  
ContextRL employs an indirect auxiliary objective that enhances the model's ability to ground its responses in relevant contexts. The method involves presenting the model with a query, an answer, and two similar contexts, rewarding it for selecting the context that best supports the query-answer pair. This approach encourages fine-grained grounding of the model's responses. The authors construct contrastive context data in two domains: for coding agents, they generate 1,000 context pairs from trajectories using condition filtering; for multimodal reasoning, they create 7,000 context pairs from images through generative editing and similarity search. The training process leverages these context pairs to optimize the model's performance on long-horizon reasoning tasks.

**Results**  
ContextRL demonstrates significant performance improvements over the standard Generalized Reinforcement Policy Optimization (GRPO) method. Specifically, it achieves an average gain of +2.2% across five long-horizon benchmarks and +1.8% on twelve diverse visual question answering benchmarks. The authors conduct a comparative analysis against data-augmentation baselines that utilize the same contrastive contexts as standard query-context-answer examples. These baselines yield minimal to no improvement, indicating that the performance gains are attributable to the context-selection objective rather than merely the additional contrastive data.

**Limitations**  
The authors acknowledge that their approach may be limited by the quality and diversity of the constructed context pairs. Additionally, the reliance on indirect supervision may not generalize well to all types of reasoning tasks. The paper does not address potential scalability issues when applying ContextRL to larger datasets or more complex multimodal scenarios, nor does it explore the computational overhead introduced by the context-selection mechanism.

**Why it matters**  
The introduction of ContextRL has significant implications for the development of more capable LLMs, particularly in applications requiring nuanced understanding and reasoning over complex data. By enhancing the model's ability to ground its responses in relevant contexts, this work paves the way for improved performance in various downstream tasks, including coding assistance and visual question answering. The findings contribute to the ongoing discourse on the integration of reinforcement learning techniques in LLM training, as discussed in related literature (as published in [arXiv cs.CL](https://arxiv.org/abs/2606.17053v1)).
