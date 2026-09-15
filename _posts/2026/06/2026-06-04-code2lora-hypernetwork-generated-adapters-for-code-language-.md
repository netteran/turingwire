---
title: "Code2LoRA: Hypernetwork-Generated Adapters for Code Language Models under Software Evolution"
date: 2026-06-04 17:59:46 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.06492v1"
arxiv_id: "2606.06492"
authors: ["Liliana Hotsko", "Yinxi Li", "Yuntian Deng", "Pengyu Nie"]
slug: code2lora-hypernetwork-generated-adapters-for-code-language-
summary_word_count: 369
classification_confidence: 0.80
source_truncated: false
layout: post
description: "Code2LoRA introduces a hypernetwork framework for generating repository-specific adapters for code language models, enhancing efficiency in software evolution contexts."
---

**Problem**  
Existing methods for integrating repository-level context into code language models, such as retrieval-augmented generation (RAG) and per-repository fine-tuning, are inefficient and brittle, particularly in the face of evolving codebases. This paper addresses the gap in capability for dynamically adapting models to repository-specific knowledge without incurring significant inference-time overhead. The work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The authors propose Code2LoRA, a hypernetwork framework that generates repository-specific Low-Rank Adaptation (LoRA) adapters. This framework operates in two modes: Code2LoRA-Static, which creates an adapter from a single repository snapshot, and Code2LoRA-Evo, which updates an adapter using a Gated Recurrent Unit (GRU) hidden state based on code diffs. The architecture allows for efficient knowledge injection without increasing the token overhead during inference. The training utilizes a newly constructed benchmark, RepoPeftBench, comprising 604 Python repositories, with a static track featuring 40,000 training and 12,000 test assertion-completion tasks, and an evolution track with 215,000 commit-derived training and 87,000 test tasks.

**Results**  
On the static track, Code2LoRA-Static achieves an exact match score of 63.8% across repositories and 66.2% within repositories, effectively matching the upper bound of per-repository LoRA performance. In the evolution track, Code2LoRA-Evo demonstrates a 60.3% cross-repo exact match, outperforming a single shared LoRA by 5.2 percentage points. These results indicate significant improvements in leveraging repository-specific knowledge for code language models.

**Limitations**  
The authors acknowledge that the performance of Code2LoRA may be contingent on the quality and stability of the repository snapshots used for training. Additionally, while the framework is designed to handle evolving codebases, the effectiveness of the GRU-based updates in highly dynamic environments remains to be fully validated. The paper does not address potential scalability issues when applied to larger or more complex repositories beyond the tested 604 Python repositories.

**Why it matters**  
Code2LoRA's approach to generating repository-specific adapters represents a significant advancement in the efficiency of code language models, particularly in contexts of software evolution. By minimizing inference-time overhead and adapting to changes in codebases, this framework could facilitate more robust and responsive AI-driven development tools. The implications of this work extend to various applications in software engineering, including automated code review, bug detection, and intelligent code completion, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.06492v1).
