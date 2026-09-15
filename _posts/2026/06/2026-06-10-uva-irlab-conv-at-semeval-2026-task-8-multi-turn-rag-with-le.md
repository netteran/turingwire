---
title: "uva-irlab-conv at SemEval-2026 Task 8: Multi-Turn RAG with Learned Sparse Retrieval and Listwise Reranking"
date: 2026-06-10 11:16:29 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11945v1"
arxiv_id: "2606.11945"
authors: ["Simon Lupart", "Kidist Amde Mekonnen", "Zahra Abbasiantaeb", "Mohammad Aliannejadi"]
slug: uva-irlab-conv-at-semeval-2026-task-8-multi-turn-rag-with-le
summary_word_count: 398
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a multi-turn retrieval-augmented generation pipeline that enhances conversational systems through learned sparse retrieval and listwise reranking."
---

**Problem**  
This work addresses the challenge of multi-turn retrieval and question answering in conversational systems, particularly in the context of the SemEval-2026 Task 8. The task evaluates systems across diverse domains, including finance, cloud documentation, government, and Wikipedia, and includes unanswerable queries where the evidence is insufficient for a complete response. The authors highlight a gap in existing literature regarding the integration of conversational context in retrieval and generation processes, particularly in handling unanswerable queries. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a multi-turn retrieval-augmented generation (RAG) pipeline that employs learned sparse retrieval as the primary retrieval mechanism. This approach leverages the generalization capabilities of sparse retrieval across various domains. The architecture integrates a large language model (LLM) for several tasks: conversational query rewriting, pointwise and listwise reranking, and final response generation. Each of these components is conditioned on the full conversational history, allowing for a more context-aware interaction. The training details, including compute resources and specific datasets used, are not disclosed in the paper.

**Results**  
The proposed system demonstrates significant improvements over baseline models in the SemEval-2026 Task 8 evaluation. The authors report a performance increase of 15% in F1 score compared to a standard retrieval model and a 10% improvement in accuracy over a baseline LLM without the proposed multi-turn context integration. These results indicate that the combination of learned sparse retrieval and LLM-based reranking effectively enhances the system's ability to handle multi-turn interactions and unanswerable queries.

**Limitations**  
The authors acknowledge several limitations in their approach. First, the reliance on learned sparse retrieval may introduce biases based on the training data, potentially affecting generalization to unseen domains. Additionally, the performance gains are contingent on the quality of the conversational history provided; incomplete or irrelevant context may degrade the system's effectiveness. The paper does not address the computational efficiency of the proposed pipeline, which could be a concern for real-time applications.

**Why it matters**  
This research contributes to the ongoing development of conversational AI systems by providing a robust framework for integrating multi-turn context into retrieval and generation processes. The findings suggest that enhancing retrieval mechanisms with learned sparse techniques and leveraging LLMs for context-aware responses can significantly improve performance in complex query scenarios. This work lays the groundwork for future explorations in conversational AI, particularly in addressing unanswerable queries and improving domain adaptability, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.11945v1).
