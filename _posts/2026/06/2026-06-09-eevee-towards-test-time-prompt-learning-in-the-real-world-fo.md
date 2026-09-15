---
title: "EEVEE: Towards Test-time Prompt Learning in the Real World for Self-Improving Agents"
date: 2026-06-09 17:57:16 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11182v1"
arxiv_id: "2606.11182"
authors: ["Weixian Xu", "Shilong Liu", "Mengdi Wang"]
slug: eevee-towards-test-time-prompt-learning-in-the-real-world-fo
summary_word_count: 381
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces EEVEE, a multi-dataset test-time prompt learning framework for LLM agents, enhancing robustness in heterogeneous input streams."
---

**Problem**  
This work addresses the limitations of existing test-time prompt learning methods, which are primarily designed for single-dataset scenarios. The authors highlight that real-world applications necessitate the ability to process heterogeneous input streams from multiple datasets, domains, and task distributions. This gap in capability restricts the practical applicability of current models. The paper is a preprint and has not undergone peer review.

**Method**  
The core contribution of this paper is the EEVEE framework, which employs a router to partition incoming inputs into task clusters, assigning them to appropriate prompt configurations. This router is optimized through a novel router-prompt co-evolution strategy, which consists of interleaved learning phases for both the router and the prompts. This approach addresses the mutual dependency between the router and the prompts, allowing for dynamic adaptation to varying input streams. The authors do not disclose specific details regarding the architecture, loss functions, or training compute used in their experiments, focusing instead on the framework's operational mechanics.

**Results**  
EEVEE demonstrates significant improvements in performance across multiple datasets. Specifically, it achieves an average multi-benchmark score increase of 10.38 and 24.32 points over the Qwen3-4B-Instruct and DeepSeek-V3.2 baselines, respectively. Furthermore, EEVEE surpasses state-of-the-art methods, GEPA and ACE, by margins of up to 37.2% and 48.2%. These results indicate that EEVEE not only enhances robustness under heterogeneous data streams but also retains efficiency and effectiveness in single-benchmark learning scenarios.

**Limitations**  
The authors acknowledge that while EEVEE improves robustness and adaptability, the framework's performance may still be influenced by the quality and diversity of the datasets used for training. Additionally, the paper does not address potential computational overhead introduced by the router-prompt co-evolution strategy, which could impact real-time applications. The authors also do not explore the scalability of the framework to an even larger number of datasets or task distributions, which could be a critical factor in practical deployments.

**Why it matters**  
The introduction of EEVEE has significant implications for the development of self-improving agents capable of operating in dynamic and diverse environments. By enabling test-time prompt learning across multiple datasets, this framework paves the way for more robust AI systems that can adapt to real-world challenges. The findings in this paper contribute to the ongoing discourse on enhancing the adaptability of large language models in practical applications, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11182v1).
