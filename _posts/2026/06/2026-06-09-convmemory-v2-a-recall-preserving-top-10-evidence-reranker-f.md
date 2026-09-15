---
title: "ConvMemory v2: A Recall-Preserving Top-10 Evidence Reranker for Conversational Memory Retrieval"
date: 2026-06-09 13:27:03 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.10842v1"
arxiv_id: "2606.10842"
authors: ["Taiheng Pan"]
slug: convmemory-v2-a-recall-preserving-top-10-evidence-reranker-f
summary_word_count: 397
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ConvMemory v2, a recall-preserving reranker that enhances conversational memory retrieval performance while maintaining efficiency."
---

**Problem**  
This work addresses the limitations of existing conversational memory retrieval systems, specifically focusing on the need for improved ranking mechanisms that preserve recall while enhancing retrieval effectiveness. The authors introduce ConvMemory v2 as an opt-in reranker that operates on the top-10 candidates selected by the earlier ConvMemory v1. This paper is a preprint and has not undergone peer review, which may affect the robustness of its findings.

**Method**  
ConvMemory v2 employs a fine-tuned ms-marco-MiniLM-L-6-v2 cross-encoder architecture, consisting of 22,713,601 parameters, to reorder the top-10 (query, memory) pairs identified by ConvMemory v1. The reranker does not alter the selection of these candidates, ensuring that Recall@10 and Hit@10 metrics remain consistent with v1. The model is trained on the LoCoMo conversational memory benchmark, which consists of 4,955 test rows across 5 seeds. The reranking process is designed to enhance the Mean Reciprocal Rank (MRR) while adhering to a recall-preserving cascade pattern, with specific fine-tuning for the LoCoMo dataset.

**Results**  
ConvMemory v2 demonstrates significant improvements over ConvMemory v1, achieving a FULL MRR of 0.6560 compared to v1's 0.5824, resulting in a paired bootstrap effect size of +0.0734 (95% CI [+0.0645, +0.0827]). Additionally, the Hit@1 metric improves from 0.4440 to 0.5474. While v2 approaches the performance of a more computationally intensive full-pool cross-encoder reference (mxbai-rerank-large-v1), which has an MRR of 0.6688, it remains 0.013 below this benchmark. Notably, in specific slices where v1's top-10 candidates outperform mxbai's, v2 surpasses the latter's performance.

**Limitations**  
The authors acknowledge that while ConvMemory v2 significantly enhances retrieval performance, it does not universally outperform the more expensive mxbai model across all scenarios. The improvements are slice-specific, indicating that the advantages of v2 may not generalize to all types of queries or memory contexts. Additionally, the reliance on candidate-specific memory text is critical; any alterations to this component can lead to a collapse in MRR below that of raw dense retrieval, highlighting a potential fragility in the model's design.

**Why it matters**  
The development of ConvMemory v2 has important implications for the field of conversational AI and memory retrieval systems. By demonstrating a method to enhance ranking without sacrificing recall, this work paves the way for more efficient models that can operate in resource-constrained environments. The findings contribute to the ongoing discourse on optimizing retrieval systems, as discussed in related literature, and provide a foundation for future research in this area, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.10842v1).
