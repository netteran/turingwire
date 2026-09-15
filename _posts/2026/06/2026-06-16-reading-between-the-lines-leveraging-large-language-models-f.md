---
title: "Reading between the Lines: Leveraging Large Language Models for Global Dementia and Depression Assessment from Clinical Interviews"
date: 2026-06-16 15:01:30 +0000
category: research
subcategory: multimodal
company: "Mistral"
secondary_companies: ["DeepHermes", "Qwen3"]
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18019v1"
arxiv_id: "2606.18019"
authors: ["Franziska Braun", "Alea R\u00fcggeberg", "Thomas Ranzenberger", "Hartmut Lehfeld", "Thomas Hillemacher", "Tobias Bocklet"]
slug: reading-between-the-lines-leveraging-large-language-models-f
summary_word_count: 386
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper explores the use of Large Language Models for assessing dementia and depression severity from clinical interview transcripts, introducing a novel evaluation framework."
---

**Problem**  
This study addresses the challenge of differential diagnosis between dementia and depression, two prevalent neuropsychiatric disorders in geriatric populations. The overlapping symptoms complicate accurate assessments, necessitating improved methodologies for evaluating these conditions. The authors present a preprint work that leverages open-weights Large Language Models (LLMs) to predict severity from clinical interviews, filling a gap in the literature regarding automated assessment tools in this domain.

**Method**  
The authors introduce an observer-based Global Depression Scale (GDS-D) that aligns with the established Global Deterioration Scale (GDS), facilitating simultaneous evaluation of cognitive and affective symptoms. They compare three LLMs: Mistral 3.1, DeepHermes, and Qwen3, in two experimental settings: (1) zero-shot prediction directly from transcripts and (2) LLM-based feature extraction for Support Vector Regression (SVR). The dataset comprises speech samples from 154 German-speaking subjects, with both human and pause-enriched transcripts utilized. The models were trained and evaluated on predicting depression and dementia severity, with performance metrics including Mean Absolute Error (MAE).

**Results**  
In zero-shot settings, the best-performing model achieved a MAE of 0.60 for depression severity prediction. For dementia assessment, the structured feature extraction approach significantly improved performance, yielding a best MAE of 0.78, which represents a reduction in error by up to 35% compared to zero-shot baselines. Notably, pause-enriched transcripts demonstrated competitive performance relative to human transcriptions, indicating their potential for use in fully automated screening pipelines.

**Limitations**  
The authors acknowledge that the study is limited by its reliance on a relatively small and homogeneous sample of German-speaking subjects, which may affect the generalizability of the findings. Additionally, the performance of the LLMs may vary with different languages or dialects, and the zero-shot approach may not capture the full complexity of clinical assessments. The authors also note that while the results are promising, further validation in larger, more diverse populations is necessary to establish robustness.

**Why it matters**  
This research has significant implications for the development of automated tools for neuropsychiatric assessment, potentially streamlining the diagnostic process for dementia and depression. The introduction of the GDS-D and the demonstrated efficacy of LLMs in this context could pave the way for more accessible and efficient screening methods in clinical settings. The findings contribute to the growing body of literature on the application of LLMs in healthcare, as discussed in related works on automated diagnostic systems, and are available on [arXiv](https://arxiv.org/abs/2606.18019v1).
