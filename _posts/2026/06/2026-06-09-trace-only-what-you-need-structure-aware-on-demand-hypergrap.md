---
title: "Trace Only What You Need: Structure-Aware On-Demand Hypergraph Memory for Long-Document Question Answering"
date: 2026-06-09 14:29:06 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.10921v1"
arxiv_id: "2606.10921"
authors: ["Xiangjun Zai", "Xingyu Tan", "Chen Chen", "Xiaoyang Wang", "Wenjie Zhang"]
slug: trace-only-what-you-need-structure-aware-on-demand-hypergrap
summary_word_count: 434
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces DocTrace, a multi-agent RAG framework that enhances long-document question answering through structured memory and experience reuse."
---

**Problem**  
Long-document question answering (QA) presents challenges for large language models (LLMs) due to the need for reasoning over extensive evidence that is often dispersed throughout the text. Existing retrieval-augmented generation (RAG) methods struggle with three primary limitations: they rely on costly query-agnostic knowledge organization, fail to leverage the inherent structure of documents, and do not utilize historical reasoning experiences effectively. This paper addresses these gaps by proposing a novel framework, DocTrace, which is designed to enhance the efficiency and effectiveness of long-document QA. The work is presented as a preprint and has not yet undergone peer review.

**Method**  
DocTrace is a multi-agent RAG framework that incorporates several innovative components to improve long-document QA. It utilizes a lightweight document structural tree index to maintain the hierarchy of the document, allowing for better contextual understanding. During the reasoning process, DocTrace constructs an agent-shared hypergraph-structured working memory on demand, which facilitates dynamic knowledge organization based on the specific query. Additionally, it implements an experience memory that stores successful reasoning plans in a graph structure, enabling the reuse of past reasoning experiences for future queries. This architecture allows for adaptive exploration of related questions, enhancing the model's ability to retrieve and reason over relevant information efficiently.

**Results**  
The performance of DocTrace was evaluated on four long-document QA datasets, where it demonstrated superior results compared to the strongest baseline, ComoRAG. Specifically, DocTrace achieved an improvement of up to 8.85% in F1 score and 4.40% in Exact Match (EM) score. Furthermore, it significantly reduced overall computational costs by 53.32%, indicating a more efficient processing capability without sacrificing accuracy. These results highlight the effectiveness of the proposed framework in addressing the challenges associated with long-document QA.

**Limitations**  
The authors acknowledge that while DocTrace improves upon existing methods, it may still face challenges related to the scalability of the hypergraph memory as document lengths increase. Additionally, the reliance on a structured document index may limit its applicability to unstructured or poorly formatted documents. The paper does not address potential biases in the training data or the implications of using historical reasoning experiences, which could affect the generalizability of the model.

**Why it matters**  
The advancements presented in DocTrace have significant implications for the field of long-document question answering, particularly in applications requiring nuanced understanding and reasoning over extensive texts. By effectively organizing knowledge and leveraging past experiences, this framework could enhance the performance of LLMs in various domains, including legal document analysis, academic research, and technical documentation. The findings contribute to ongoing efforts to improve the efficiency and accuracy of AI systems in processing complex information, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.10921v1).
