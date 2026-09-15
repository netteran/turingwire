---
title: "Consensus-based Agentic Large Language Model Framework for Harmonized Tariff Schedule Code Classification"
date: 2026-06-15 17:24:07 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16987v1"
arxiv_id: "2606.16987"
authors: ["Truong Thanh Hung Nguyen", "Khanh Van Quynh Nguyen", "Hoang-Loc Cao", "Tri Duong", "Phuc Ho", "Van Pham"]
slug: consensus-based-agentic-large-language-model-framework-for-h
summary_word_count: 397
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a consensus-based agentic LLM framework for accurate classification of Harmonized Tariff Schedule codes in maritime logistics."
---

**Problem**  
The paper addresses the challenge of accurate Harmonized Tariff Schedule (HTS) code classification, which is critical for customs clearance and regulatory compliance in maritime logistics. Existing methods struggle with short, incomplete, or ambiguous product descriptions, and the complexity of hierarchical tariff structures. The authors highlight that current literature lacks a robust framework that integrates evidence-grounded reasoning and human oversight, particularly in the context of Canadian 10-digit HTS codes. This work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The proposed framework employs a multi-agent architecture that combines information retrieval and semantic analysis of official tariff documents. Key components include evidence-grounded reasoning, consensus-based validation, and element-wise voting across hierarchical code components. The model incorporates confidence estimation and a human-in-the-loop mechanism to escalate uncertain classifications. The framework was trained and evaluated on a private dataset consisting of 3,300 domain-expert-labeled product records, specifically designed for logistics and delivery contexts. The authors do not disclose specific training compute details or the architecture of the LLM used.

**Results**  
The framework's performance was assessed on the classification of 10-digit HTS codes, revealing significant challenges in achieving high accuracy. The results indicate a marked performance drop from chapter-level predictions to fine-grained tariff and statistical suffix assignments. While exact performance metrics are not provided, the authors emphasize that even advanced LLMs struggle with this task, underscoring the necessity for a more nuanced approach to classification that incorporates uncertainty and human validation.

**Limitations**  
The authors acknowledge that the reliance on a private dataset may limit the generalizability of their findings. They also note that the framework's performance is contingent on the quality of the input data and the inherent ambiguity in product descriptions. Additionally, the need for human intervention suggests that the framework may not be fully autonomous, which could impact scalability in high-throughput environments. The lack of detailed training compute specifications and architectural choices may also hinder reproducibility.

**Why it matters**  
This work has significant implications for improving HTS classification processes in maritime logistics, emphasizing the importance of interpretability and accountability in AI-driven decision-making. The integration of human oversight into the classification workflow could lead to more reliable compliance with regulatory standards. The findings advocate for a shift towards evidence-grounded and uncertainty-aware methodologies in AI applications for trade logistics, as discussed in the context of the broader literature on LLMs and classification tasks, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.16987v1).
