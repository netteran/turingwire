---
title: "ReasonAlloc: Hierarchical Decoding-Time KV Cache Budget Allocation for Reasoning Models"
date: 2026-06-09 17:44:23 +0000
category: research
subcategory: efficiency_inference
company: "DeepSeek"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11164v1"
arxiv_id: "2606.11164"
authors: ["Wenhao Liu", "Hao Shi", "Yunhe Li", "Weizhi Fei", "Xiangyuan Wang", "Mengzhe Ruan"]
slug: reasonalloc-hierarchical-decoding-time-kv-cache-budget-alloc
summary_word_count: 396
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ReasonAlloc, a hierarchical framework for optimizing KV cache allocation during reasoning in large language models, enhancing inference efficiency."
---

**Problem**  
The paper addresses the inefficiencies in decoding-time key-value (KV) cache management in large language models (LLMs) during long chain-of-thought (CoT) reasoning. Existing methods primarily focus on uniform budget distribution across layers and heads, which does not account for the dynamic context requirements inherent in autoregressive reasoning. Furthermore, the authors note that current non-uniform budget allocation techniques are mainly designed for static prompt prefill phases, leaving a gap in adaptive resource allocation during the reasoning process. This work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The authors propose ReasonAlloc, a training-free framework that reformulates KV compression as a hierarchical budget allocation problem. ReasonAlloc operates on two levels: an offline layer-wise preallocation strategy that identifies a demand pattern termed the "Reasoning Wave," and an online head-wise strategy that reallocates resources dynamically during decoding based on real-time utility assessments. This dual approach allows for more efficient use of the KV cache by prioritizing information-rich heads while maintaining a structured allocation across layers. The framework is designed to be compatible with existing token-eviction policies, ensuring minimal integration friction.

**Results**  
ReasonAlloc was evaluated on mathematical reasoning benchmarks, specifically MATH-500 and AIME 2024, using models such as DeepSeek-R1-Distill-Llama-8B, DeepSeek-R1-Distill-Qwen-14B, and AceReason-14B. The results indicate that ReasonAlloc significantly outperforms baseline methods, including uniform-budget R-KV, SnapKV, and Pyramid-RKV, particularly at smaller budget sizes (128-512 tokens). The paper reports substantial improvements in inference efficiency, although specific numerical gains are not detailed in the abstract.

**Limitations**  
The authors acknowledge that ReasonAlloc's performance may vary depending on the specific architecture of the LLMs used, as the framework is designed with certain architectural assumptions in mind. Additionally, while the method introduces negligible inference-time overhead, the exact computational costs associated with the online reallocation strategy are not quantified. The paper does not address potential limitations in scenarios with highly variable reasoning tasks that may not conform to the identified "Reasoning Wave" pattern.

**Why it matters**  
The implications of this work are significant for enhancing the efficiency of LLMs in reasoning tasks, particularly in applications requiring real-time decision-making and resource management. By optimizing KV cache allocation, ReasonAlloc can potentially reduce latency and improve throughput in practical deployments of LLMs. This advancement is crucial for scaling LLM applications in various domains, including natural language understanding and automated reasoning, as discussed in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.11164v1).
