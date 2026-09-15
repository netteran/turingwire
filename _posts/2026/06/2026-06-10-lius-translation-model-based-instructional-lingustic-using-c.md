---
title: "Lius: Translation Model Based Instructional Lingustic Using Continual Instruction Tuning In Kupang Malay"
date: 2026-06-10 08:20:09 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11786v1"
arxiv_id: "2606.11786"
authors: ["Joanito Agili Lopo", "Yunita Sari", "Guntur Budi Herwanto"]
slug: lius-translation-model-based-instructional-lingustic-using-c
summary_word_count: 373
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Lius, a translation model for Kupang Malay that utilizes Continual Instruction Tuning to enhance performance in low-resource language tasks."
---

**Problem**  
This work addresses the performance degradation of Large Language Models (LLMs) when applied to low-resource languages, specifically Kupang Malay. The authors highlight a gap in the literature regarding effective fine-tuning methods for such languages, particularly in the context of translation tasks. The paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a novel approach that combines explicit lexical and semantic features derived from a bilingual dictionary with a training paradigm called Continual Instruction Tuning (CIT). This method allows for iterative instruction-based training, which is particularly beneficial for low-resource languages. The architecture of the model, Lius, is built upon existing LLM frameworks, although specific architectural details are not disclosed. The training process involves fine-tuning on a dataset specifically curated for Kupang Malay, leveraging the structured instructions to enhance the model's understanding and generation capabilities.

**Results**  
Lius demonstrates significant performance improvements over standard instruction-tuned models, achieving enhancements of 4-6 BLEU points. Furthermore, it outperforms both Neural Machine Translation (NMT) systems and multilingual LLMs by 10-13 BLEU points across several evaluation metrics, although the specific benchmarks used for evaluation are not detailed in the summary. These results indicate that the proposed method effectively reduces the dependency on large-scale parallel data, which is often a limitation in low-resource language translation.

**Limitations**  
The authors acknowledge that their approach may still be limited by the availability of high-quality bilingual dictionaries and the inherent challenges of low-resource language datasets. Additionally, the reliance on explicit lexical and semantic features may not generalize well to other low-resource languages without similar linguistic structures. The lack of peer review also raises questions about the robustness of the findings and the reproducibility of the results.

**Why it matters**  
The implications of this research are significant for the field of natural language processing, particularly in enhancing translation capabilities for low-resource languages. By demonstrating the effectiveness of Continual Instruction Tuning and the integration of explicit linguistic features, this work paves the way for future research aimed at improving LLM performance in similar contexts. The findings contribute to the ongoing discourse on reducing the reliance on extensive parallel corpora, which is a critical barrier in low-resource language processing, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.11786v1).
