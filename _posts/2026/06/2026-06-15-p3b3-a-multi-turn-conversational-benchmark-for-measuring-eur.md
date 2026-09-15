---
title: "P3B3: A Multi-Turn Conversational Benchmark for Measuring European and Brazilian Portuguese Variety Bias in LLMs"
date: 2026-06-15 14:10:19 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16753v1"
arxiv_id: "2606.16753"
authors: ["Rafael Ferreira", "In\u00eas Vieira", "In\u00eas Calvo", "James Furtado", "Iago Paulo", "Diogo Tavares"]
slug: p3b3-a-multi-turn-conversational-benchmark-for-measuring-eur
summary_word_count: 424
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces P3B3, a benchmark for assessing variety bias in LLMs between European and Brazilian Portuguese, highlighting significant biases in current models."
---

**Problem**  
The paper addresses the underrepresentation of European Portuguese (pt-PT) in Large Language Models (LLMs) compared to Brazilian Portuguese (pt-BR), which is prevalent in training datasets. Despite the increasing integration of LLMs in communication, the linguistic diversity within Portuguese remains inadequately explored. This work is particularly relevant as it is a preprint, indicating that it has not yet undergone peer review, and thus its findings should be interpreted with caution.

**Method**  
The authors propose the P3B3 benchmark, which consists of a set of expert-curated conversational prompts designed to be language variety agnostic. The evaluation framework measures variety bias and controllability across different LLMs. The benchmark includes a diverse set of multi-turn conversational scenarios that reflect real-world usage. The authors evaluate several state-of-the-art LLMs, although specific architectures and training compute details are not disclosed. The methodology emphasizes the need for a systematic approach to assess how well these models can handle both pt-PT and pt-BR, focusing on their performance in generating contextually appropriate responses.

**Results**  
The experiments reveal that most evaluated LLMs exhibit a pronounced bias towards pt-BR, with significant discrepancies in performance when generating responses in pt-PT. For instance, the models showed a preference for pt-BR in over 80% of the conversational prompts, indicating a strong variety bias. The controllability of language variety varied across models, with some demonstrating better adaptability to pt-PT than others. These results underscore the urgent need for balanced representation in training datasets to mitigate bias.

**Limitations**  
The authors acknowledge that the P3B3 benchmark is limited to conversational prompts and may not encompass all aspects of language use in Portuguese. Additionally, the evaluation framework may not capture the full complexity of linguistic variation, as it primarily focuses on conversational contexts. The lack of peer review also raises questions about the robustness of the findings. Furthermore, the study does not explore the implications of these biases on downstream applications, such as sentiment analysis or machine translation, which could be critical for understanding the broader impact of LLMs on language diversity.

**Why it matters**  
This work highlights the critical need for equitable representation of linguistic varieties in LLMs, which is essential for ensuring reliable and fair language processing across different Portuguese-speaking populations. The findings call for a reevaluation of training datasets to include a more balanced representation of pt-PT and pt-BR, which could lead to improved model performance and user experience. The implications of this research extend to various applications in natural language processing, emphasizing the importance of addressing variety bias in multilingual models. This is particularly relevant as published in [arXiv](https://arxiv.org/abs/2606.16753v1).
