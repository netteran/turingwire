---
title: "Automated Creativity Evaluation of Language Models Across Open-Ended Tasks"
date: 2026-06-10 07:37:06 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11762v1"
arxiv_id: "2606.11762"
authors: ["Min Sen Tan", "Zachary Kit Chun Choy", "Syed Ali Redha Alsagoff", "Nadya Yuki Wangsajaya", "Mohor Banerjee", "Swaagat Bikash Saikia"]
slug: automated-creativity-evaluation-of-language-models-across-op
summary_word_count: 373
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents an automated, domain-agnostic framework for evaluating the creativity of large language models across diverse open-ended tasks."
---

**Problem**  
The paper addresses the lack of systematic and scalable methods for evaluating the creativity of large language models (LLMs) across various open-ended tasks. Existing creativity metrics are often tied to specific tasks, embedding domain-specific assumptions that hinder generalizability and scalability. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a novel framework that separates the measurement apparatus from the creative tasks, allowing for a task-agnostic assessment of creativity. Divergent creativity is quantified using semantic entropy, a reference-free metric that captures novelty and diversity, validated against human annotations and LLM-based novelty judgments. For convergent creativity, the authors introduce a retrieval-based multi-agent judge framework that evaluates task fulfillment contextually, achieving over 60% improved efficiency compared to traditional methods. The framework is validated across three distinct domains: problem-solving (MacGyver), research ideation (HypoGen), and creative writing (BookMIA), utilizing a diverse suite of LLMs.

**Results**  
Empirical evaluations demonstrate that the proposed framework effectively captures critical aspects of creativity, including novelty, diversity, and task fulfillment. The results indicate that model properties such as size, temperature, recency, and reasoning significantly influence creative performance. While specific numerical results are not detailed in the abstract, the authors claim substantial improvements in efficiency and reliability compared to existing metrics.

**Limitations**  
The authors acknowledge that their framework, while robust, may still be influenced by the inherent biases present in the LLMs being evaluated. Additionally, the reliance on semantic entropy and retrieval-based assessments may not fully encapsulate all dimensions of creativity, particularly in highly subjective tasks. The paper does not address potential limitations related to the generalizability of the findings across all creative domains or the computational resources required for implementing the framework.

**Why it matters**  
This work establishes a reproducible and generalizable standard for automated creativity evaluation in LLMs, which is crucial for advancing research in creative AI. By providing a scalable benchmarking method, it opens avenues for further exploration of LLM capabilities in creative tasks, potentially influencing future developments in AI-generated content. The implications of this research are significant for both academic and industrial applications, as it lays the groundwork for more nuanced assessments of AI creativity, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.11762v1).
