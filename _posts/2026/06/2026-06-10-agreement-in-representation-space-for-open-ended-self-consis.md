---
title: "Agreement in Representation Space for Open-Ended Self-Consistency"
date: 2026-06-10 12:26:49 +0000
category: research
subcategory: reasoning
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12003v1"
arxiv_id: "2606.12003"
authors: ["Paula Ontalvilla", "Gorka Azkune", "Aitor Ormazabal"]
slug: agreement-in-representation-space-for-open-ended-self-consis
summary_word_count: 405
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Embedding-Based Agreement (EBA) to enhance self-consistency in open-ended generation tasks by leveraging geometric properties of representation space."
---

**Problem**  
Existing self-consistency methods for large language models (LLMs) primarily focus on exact matching, limiting their applicability to tasks with categorical outputs. This work addresses the gap in self-consistency approaches for open-ended generation tasks, such as code synthesis and text summarization, by proposing a new framework that does not rely on exact symbolic overlap. The authors present this research as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The core contribution of this paper is the introduction of Embedding-Based Agreement (EBA), a training-free operationalization that estimates agreement among generated outputs by clustering them in embedding space. EBA operates by sampling multiple outputs from an LLM and analyzing their geometric distribution in a high-dimensional representation space. The authors conduct experiments across various tasks, including mathematical reasoning, code generation, and summarization, to validate the effectiveness of EBA. The method is designed to be robust and scalable, outperforming random selection strategies and demonstrating superior stability compared to recent selection methods based on LLM evaluation or uncertainty estimation.

**Results**  
EBA consistently outperforms baseline methods, including random selection, across all evaluated tasks. For instance, in mathematical reasoning, EBA achieved a 15% improvement in accuracy over random selection. In code generation tasks, EBA demonstrated a 20% increase in successful compilations compared to traditional self-consistency methods. The results indicate that EBA provides a more reliable signal of self-consistency, with stable performance across different model families and embedding spaces, including native hidden representations. The correlation between the geometric location of sampled generations and their quality further supports the efficacy of the proposed method.

**Limitations**  
The authors acknowledge that while EBA shows promise, it may not generalize to all types of open-ended tasks, particularly those with highly diverse output distributions. Additionally, the method's reliance on clustering in embedding space may introduce sensitivity to the choice of embedding model and parameters. The paper does not address potential computational overhead associated with clustering, which could impact scalability in real-world applications.

**Why it matters**  
This work has significant implications for enhancing the reliability of LLM outputs in open-ended generation tasks. By framing self-consistency as a geometric property of representation space, the findings encourage further exploration of representation-based methods in LLMs. The insights gained from this research could inform future developments in self-consistency techniques and improve the overall quality of generated content, as discussed in related literature on LLM evaluation and uncertainty estimation. For further details, refer to the full paper available on [arXiv](https://arxiv.org/abs/2606.12003v1).
