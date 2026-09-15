---
title: "A Komi-Yazva--Russian Parallel Corpus and Evaluation Protocol for Zero- and Few-Shot LLM Translation"
date: 2026-06-04 17:26:38 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06420v1"
arxiv_id: "2606.06420"
authors: ["Petr Parshakov"]
slug: a-komi-yazva-russian-parallel-corpus-and-evaluation-protocol
summary_word_count: 391
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the first Komi-Yazva–Russian parallel corpus and a robust evaluation protocol for assessing LLM translation in low-resource settings."
---

**Problem**  
This work addresses the lack of resources and methodologies for evaluating machine translation in endangered languages, specifically focusing on the Komi-Yazva language, which is extremely low-resource. The authors present the first Komi-Yazva–Russian parallel corpus, comprising 457 aligned sentence pairs from 74 narrative texts. This corpus is essential for studying translation capabilities in a zero-shot and few-shot context, filling a significant gap in the literature regarding low-resource language translation. The paper is a preprint and has not undergone peer review.

**Method**  
The authors developed a parallel corpus with documented provenance and sentence-level alignment, enabling leakage-aware evaluation. They propose a comprehensive evaluation protocol that includes story-level cross-validation and deterministic retrieval for few-shot prompting. The evaluation metrics are both reference-based and judge-based, with a focus on strict validation of generated outputs and story-level uncertainty estimates. The models evaluated include various large language models (LLMs), and the experiments are conducted under zero-shot and retrieval-based few-shot prompting regimes. The training compute details are not disclosed, but the methodology emphasizes the importance of context retrieval in improving translation quality.

**Results**  
The results indicate that LLMs can produce non-trivial translations for the Komi-Yazva-to-Russian task, but performance varies significantly across different model families and prompting strategies. Retrieval-based few-shot prompting consistently outperforms zero-shot prompting, although improvements beyond a small retrieved context are limited. The paper highlights that the choice of evaluation metrics and failure handling critically influences the conclusions drawn from the results. Specific performance metrics are not detailed in the summary, but the findings underscore the variability in translation quality based on the employed methods.

**Limitations**  
The authors acknowledge that the corpus is small, which may limit the generalizability of the findings. Additionally, the reliance on specific evaluation metrics may introduce biases in assessing translation quality. The paper does not address potential issues related to the representativeness of the narrative texts used in the corpus or the scalability of the proposed evaluation protocol to other low-resource languages.

**Why it matters**  
This work is significant for advancing machine translation research in endangered languages, providing both a dataset and a reproducible evaluation framework. The findings emphasize the need for careful metric selection and evaluation strategies in low-resource settings, which can inform future research and development in this area. The implications extend to broader applications in natural language processing, particularly in enhancing translation systems for underrepresented languages, as published in [arXiv](https://arxiv.org/abs/2606.06420v1).
