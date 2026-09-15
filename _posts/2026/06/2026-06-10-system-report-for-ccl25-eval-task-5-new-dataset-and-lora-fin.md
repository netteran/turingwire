---
title: "System Report for CCL25-Eval Task 5: New Dataset and LoRA-Fine-Tuned Qwen2.5"
date: 2026-06-10 17:54:32 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12392v1"
arxiv_id: "2606.12392"
authors: ["Haotao Xie"]
slug: system-report-for-ccl25-eval-task-5-new-dataset-and-lora-fin
summary_word_count: 377
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a new dataset and a fine-tuned LLM, PoetryQwen, enhancing classical Chinese poetry translation and emotional understanding."
---

**Problem**  
The paper addresses the gap in domain-specific research for classical Chinese poetry translation and affective-semantic understanding, which has been largely overlooked in favor of general-domain approaches. The authors highlight the lack of high-quality datasets tailored for poetic appreciation tasks, which complicates the development of models capable of nuanced understanding in this area. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
To tackle the identified limitations, the authors decompose the poetic appreciation task into three subtasks: term interpretation, semantic interpretation, and emotional inference. They construct the Classical Chinese Poetry Instruction Pair Dataset (CCPoetry-49K) by performing data cleansing and alignment on multiple open-source datasets, resulting in 49,404 high-quality instruction-response pairs specifically optimized for classical poetry. The authors then propose a domain-specialized LLM, PoetryQwen, which is derived from the Qwen2.5-14B model. They employ Low-Rank Adaptation (LoRA) for fine-tuning, which allows for efficient parameter updates while maintaining the model's pre-trained knowledge.

**Results**  
Experimental evaluations on the CCL25-Eval Task 5 benchmark reveal that PoetryQwen achieves a score of 0.757, marking a 9.7% improvement over the Qwen2.5-14B-Instruct baseline, which scored 0.690. This improvement underscores the effectiveness of the proposed dataset and fine-tuning methodology in enhancing the model's capabilities in precise translation and emotional understanding of classical poetry.

**Limitations**  
The authors acknowledge that their work is limited by the reliance on existing open-source datasets, which may introduce biases or gaps in the training data. Additionally, while the performance improvement is significant, the generalizability of the model to other forms of classical literature or different languages remains untested. The authors do not discuss potential overfitting to the specific dataset or the scalability of the approach to larger or more diverse datasets.

**Why it matters**  
This research contributes to the growing body of work focused on domain-specific adaptations of LLMs, particularly in the context of classical literature. By providing a specialized dataset and demonstrating the effectiveness of LoRA for fine-tuning, the authors pave the way for future studies aimed at enhancing LLM performance in niche areas. The implications extend to the broader field of natural language processing, where understanding emotional and semantic nuances is critical. This work is particularly relevant for researchers interested in the intersection of AI and the humanities, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.12392v1).
