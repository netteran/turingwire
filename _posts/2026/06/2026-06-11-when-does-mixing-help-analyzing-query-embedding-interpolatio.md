---
title: "When Does Mixing Help? Analyzing Query Embedding Interpolation in Multilingual Dense Retrieval"
date: 2026-06-11 16:23:16 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13537v1"
arxiv_id: "2606.13537"
authors: ["Tongyao Zhu", "Chao-Ming Huang", "Min-Yen Kan"]
slug: when-does-mixing-help-analyzing-query-embedding-interpolatio
summary_word_count: 398
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the effects of query embedding interpolation in multilingual dense retrieval, revealing structured sensitivity to language mixing."
---

**Problem**  
This work addresses the gap in understanding the sensitivity of dense retrieval systems to mixed-language queries, particularly in multilingual contexts. Despite the prevalence of mixed-language querying in multilingual communities, existing literature lacks a systematic analysis of how varying the proportions of language mixing affects retrieval performance. This study is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors conduct a ratio-controlled study using the mMARCO dataset, focusing on embedding-level mixing of parallel query translations. They construct mixed queries by interpolating monolingual embeddings, allowing for a controlled examination of the impact of different mixing ratios on retrieval performance. The experiments utilize the BGE-M3 model, and the authors evaluate performance across various mixing ratios to identify optimal configurations. The study also explores the influence of English dominance in multilingual retrieval scenarios, analyzing how the presence of English in document indices affects the efficacy of mixed queries.

**Results**  
The findings reveal that an optimal mixing ratio outperforms the best monolingual endpoint in 88 out of 105 cases tested. Specifically, the results indicate that mixing is beneficial when retrieving from non-English document indices, while pure English queries yield the best performance for indices containing English documents. Furthermore, English consistently serves as the most effective mixing partner for all non-English document languages. The study also finds that when controlling for English dominance, the gains from mixing correlate negatively with the typological distance between languages, suggesting a structured and predictable sensitivity to language mixing in retrieval tasks.

**Limitations**  
The authors acknowledge that their analysis is limited to the mMARCO dataset and the BGE-M3 model, which may restrict the generalizability of the findings. Additionally, the study does not explore the effects of mixing in low-resource languages or the potential impact of different embedding techniques beyond the ones employed. The reliance on English as a dominant language may also skew the results, as the patterns observed may not hold in contexts where English is not a primary language.

**Why it matters**  
This research has significant implications for the design and optimization of multilingual dense retrieval systems. By elucidating the structured sensitivity of retrieval performance to query embedding interpolation, the findings can inform the development of more effective multilingual retrieval strategies. The insights gained from this study can guide future work in multilingual information retrieval, particularly in optimizing query formulations for diverse language pairs, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13537v1).
