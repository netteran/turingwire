---
title: "Querying an astronomical database using large language models: the ALeRCE text-to-SQL system"
date: 2026-06-16 16:12:16 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18108v1"
arxiv_id: "2606.18108"
authors: ["P. A. Estevez", "J. Espejo-Moreira", "S. Sanfeliu-Alvarez", "F. Forster", "A. M. Munoz Arancibia", "G. Cabrera-Vives"]
slug: querying-an-astronomical-database-using-large-language-model
summary_word_count: 391
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a text-to-SQL system leveraging large language models for querying the ALeRCE astronomical database, demonstrating significant performance improvements."
---

**Problem**  
This work addresses the gap in effective natural language (NL) querying of structured databases, specifically within the context of astronomical data. The authors highlight the challenges of translating NL queries into SQL, particularly for complex queries, and note that existing systems often struggle with accuracy and execution errors. The paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a novel text-to-SQL framework that utilizes large language models (LLMs) and in-context learning. The system comprises four key modules: schema linking, query classification, prompt decomposition, and self-correction. The dataset used for training and evaluation consists of 110 NL/SQL pairs specifically curated for the ALeRCE database, which serves as a community broker for astronomical events. The performance of thirteen LLMs, including Claude Opus 4.6, Gemini 2.5 Pro, Gemini 3 Flash, and GPT-5.2-Codex, is evaluated using in-context learning and prompt engineering techniques. The authors assess the text-to-SQL performance using the perfect-match (PM) rate for both row identifiers (e.g., object identifiers) and column identifiers (i.e., column names).

**Results**  
The proposed framework demonstrates superior performance compared to a direct-inference baseline. For Claude Opus 4.6, the PM performance for simple queries reaches 0.97 for row identifiers and 0.94 for column identifiers. However, performance declines with increased query complexity: for medium queries, the PM rates drop to 0.44 (row) and 0.72 (column), and for hard queries, to 0.59 (row) and 0.49 (column). The self-correction module significantly reduces execution errors, enhancing overall system reliability.

**Limitations**  
The authors acknowledge that the performance of the system diminishes with query complexity, indicating a need for further refinement in handling intricate queries. Additionally, the dataset of 110 NL/SQL pairs may not fully represent the diversity of potential user queries, which could limit the generalizability of the results. The paper does not address the computational resources required for training and deploying the LLMs, which could be a barrier for some applications.

**Why it matters**  
This research has significant implications for the integration of natural language processing in database querying, particularly in specialized fields like astronomy. By improving the accuracy and reliability of text-to-SQL systems, the work facilitates broader access to complex datasets, enabling researchers to extract insights more efficiently. The findings contribute to the ongoing development of LLM applications in structured data environments, as discussed in related literature on natural language interfaces for databases, and are available on [arXiv](https://arxiv.org/abs/2606.18108v1).
