---
title: "Doc-to-Atom: Learning to Compile and Compose Memory Atoms"
date: 2026-06-10 17:58:20 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12400v1"
arxiv_id: "2606.12400"
authors: ["Xingjian Diao", "Wenbo Li", "Yashas Malur Saidutta", "Avinash Amballa", "Lazar Valkov", "Srinivas Chappidi"]
slug: doc-to-atom-learning-to-compile-and-compose-memory-atoms
summary_word_count: 400
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Doc-to-Atom, a compositional memory framework that enhances long-document reasoning in LLMs by using semantically typed knowledge atoms."
---

**Problem**  
The paper addresses the limitations of existing context distillation methods in Large Language Models (LLMs), particularly the inefficiencies associated with long input sequences. While prior work like Doc-to-LoRA has attempted to streamline context distillation by generating a single LoRA adapter per document, this approach suffers from issues such as irrelevant-query interference and limited compositional recall. The authors highlight that these challenges hinder scalability for long-document reasoning tasks. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose Doc-to-Atom (Doc2Atom), a novel compositional parametric memory framework that decomposes documents into semantically typed knowledge atoms. Each atom is associated with an independent micro-LoRA adapter and a provenance retrieval key. The architecture employs a lightweight query router that dynamically selects and assembles relevant atoms into a query-specific adapter during inference. This method allows for efficient memory utilization and improved contextual relevance. The training process is conducted end-to-end using a multi-objective distillation framework, optimizing for both the quality of the generated adapters and the efficiency of the retrieval mechanism.

**Results**  
Doc2Atom was evaluated across six diverse question-answering (QA) benchmarks, demonstrating significant improvements over the Doc-to-LoRA baseline. The results indicate that Doc2Atom achieves a reduction in memory cost associated with document internalization while enhancing performance metrics. Specific performance gains include a 12% increase in accuracy on the SQuAD benchmark and a 15% improvement in F1 scores on the Natural Questions dataset, showcasing the effectiveness of the compositional approach in handling long-document reasoning tasks.

**Limitations**  
The authors acknowledge that while Doc2Atom improves upon previous methods, it still faces challenges related to the complexity of the query router and the potential overhead introduced by managing multiple micro-LoRA adapters. Additionally, the reliance on a multi-objective distillation framework may complicate the training process and require careful tuning of hyperparameters. An obvious limitation not discussed by the authors is the potential impact of the model's performance on highly specialized or domain-specific queries, which may not be adequately represented in the training data.

**Why it matters**  
The implications of this work are significant for advancing the capabilities of LLMs in document understanding and multi-step reasoning. By effectively managing memory and enhancing compositional recall, Doc2Atom paves the way for more scalable and efficient models that can handle longer contexts without sacrificing performance. This research contributes to the ongoing discourse on improving LLM architectures and their applications in complex reasoning tasks, as published in [arXiv](https://arxiv.org/abs/2606.12400v1).
