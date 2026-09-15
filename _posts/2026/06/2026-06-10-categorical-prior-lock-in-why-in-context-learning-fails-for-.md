---
title: "Categorical Prior Lock-in: Why In-Context Learning Fails for Structured Data"
date: 2026-06-10 11:41:13 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11961v1"
arxiv_id: "2606.11961"
authors: ["Antonio Pelusi", "Stefano Braghin", "Alberto Trombetta"]
slug: categorical-prior-lock-in-why-in-context-learning-fails-for-
summary_word_count: 399
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper identifies the limitations of in-context learning for structured data in large language models, introducing the concept of categorical prior lock-in."
---

**Problem**  
This work addresses the limitations of in-context learning (ICL) in large language models (LLMs) when applied to structured data, particularly under conditions of distribution mismatch. The authors highlight a specific failure mode termed "categorical prior lock-in," where the model's prior over token distributions, inherited from pre-training, cannot be effectively updated. This issue is particularly pronounced in high-cardinality tabular data, which serves as a controlled test case. The paper is a preprint and has not undergone peer review.

**Method**  
The authors conduct experiments using two 7B-parameter open-weight models to evaluate the performance of ICL in generating structured data. They analyze the impact of providing additional examples on numerical fidelity and categorical distribution reproduction. The study also explores parameter-efficient fine-tuning techniques, specifically Low-Rank Adaptation (LoRA), to mitigate the limitations of ICL. The training setup includes a focus on high-cardinality categorical data, with the models evaluated on their ability to adapt to new distributions without parameter updates.

**Results**  
The findings reveal that while ICL can enhance numerical fidelity with more examples, it reaches a sharp ceiling in reproducing categorical distributions, particularly failing to generate rare classes entirely. In contrast, LoRA fine-tuning demonstrates improved adaptability but introduces risks of memorization and potential destabilization of structured output generation. The authors provide quantitative results, indicating that ICL's performance plateaus significantly below that of LoRA, although specific numerical metrics and baseline comparisons are not detailed in the abstract.

**Limitations**  
The authors acknowledge that while LoRA addresses some limitations of ICL, it also poses risks related to memorization and output stability. They do not explore the implications of these risks in depth, nor do they provide extensive analysis on the trade-offs between adaptability and privacy. Additionally, the study is limited to high-cardinality tabular data, which may not generalize to other structured data types or lower-cardinality scenarios.

**Why it matters**  
This research has significant implications for the deployment of LLMs in applications requiring structured data generation, such as database management and automated reporting. The identification of categorical prior lock-in underscores the need for improved methodologies in adapting LLMs to new data distributions, particularly in high-cardinality contexts. The trade-offs highlighted between adaptability and privacy in fine-tuning approaches like LoRA suggest a critical area for future research, as practitioners must balance performance with the risks of data leakage. This work contributes to the ongoing discourse on the limitations of ICL in structured data contexts, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11961v1).
