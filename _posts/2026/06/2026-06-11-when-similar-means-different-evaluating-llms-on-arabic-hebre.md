---
title: "When Similar Means Different: Evaluating LLMs on Arabic--Hebrew Cognates"
date: 2026-06-11 11:33:09 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13218v1"
arxiv_id: "2606.13218"
authors: ["Junhong Liang", "Noor Abo Mokh", "Bashar Alhafni"]
slug: when-similar-means-different-evaluating-llms-on-arabic-hebre
summary_word_count: 420
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SemCog Bench, a benchmark for evaluating LLMs on Arabic-Hebrew cognates, revealing significant cross-lingual reasoning gaps."
---

**Problem**  
This work addresses the gap in evaluating large language models (LLMs) on cross-lingual semantic understanding, specifically between Arabic and Hebrew, two closely related Semitic languages. The authors highlight the challenge posed by the substantial overlap of true cognates, misleading false friends, and modern loanwords, which complicates semantic disambiguation. The study is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors introduce SemCog Bench, a curated benchmark consisting of 1,858 Arabic-Hebrew word pairs, annotated for cognate identification and semantic disambiguation. The evaluation encompasses both open-source and commercial LLMs, utilizing multiple input representations: raw text, diacritized forms, Romanized versions, and phonetic transcriptions. The models are assessed on their ability to distinguish between true cognates, false friends, and loanwords, with a focus on their cross-lingual reasoning capabilities. The training compute and specific architectures of the evaluated models are not disclosed, but the methodology emphasizes the importance of input representation in model performance.

**Results**  
The evaluation reveals that while LLMs achieve high accuracy on true cognates, their performance significantly declines when faced with false friends and loanwords. The results indicate that models exhibit a strong reliance on surface-form similarity, with accuracy dropping from over 90% on true cognates to below 50% on false friends. The use of sentence-level context provides only modest improvements, suggesting that contextual cues alone are insufficient to resolve misleading form-based signals. These findings underscore a critical limitation in the current capabilities of LLMs regarding cross-lingual form-meaning conflicts.

**Limitations**  
The authors acknowledge that the reliance on surface-form similarity is a fundamental limitation of existing LLMs, which struggle to effectively disambiguate meanings in the presence of false friends and loanwords. They also note that the modest improvements from sentence-level context indicate that additional contextual information may not be a panacea for these challenges. An obvious limitation not explicitly mentioned is the potential for bias in the benchmark due to the selection of word pairs, which may not fully represent the diversity of cognate relationships in Arabic and Hebrew.

**Why it matters**  
This research has significant implications for the development of multilingual LLMs, particularly in enhancing their semantic reasoning capabilities across closely related languages. The introduction of SemCog Bench provides a rigorous framework for future evaluations and improvements in cross-lingual understanding. The findings highlight the need for LLMs to move beyond surface-level similarities and develop deeper semantic comprehension, which is crucial for applications in translation, information retrieval, and cross-lingual communication. This work contributes to the ongoing discourse in the field, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13218v1).
