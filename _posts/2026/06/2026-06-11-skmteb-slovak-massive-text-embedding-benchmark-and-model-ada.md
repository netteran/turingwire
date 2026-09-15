---
title: "SkMTEB: Slovak Massive Text Embedding Benchmark and Model Adaptation"
date: 2026-06-11 17:50:06 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13647v1"
arxiv_id: "2606.13647"
authors: ["Marek \u0160uppa", "Andrej Ridzik", "Daniel Hl\u00e1dek", "Nat\u00e1lia K\u0148a\u017eekov\u00e1", "Vikt\u00f3ria Ondrejov\u00e1"]
slug: skmteb-slovak-massive-text-embedding-benchmark-and-model-ada
summary_word_count: 387
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents SkMTEB, a benchmark for Slovak text embeddings, and introduces efficient models for local deployment in low-resource settings."
---

**Problem**  
This work addresses the lack of comprehensive benchmarks for text embeddings in Slovak, a low-resource West Slavic language. Existing multilingual benchmarks do not adequately cover Slovak, and prior Slovak-specific models trained for natural language understanding (NLU) tasks have shown poor transferability to embedding tasks. The authors present SkMTEB, the first extensive MTEB-style benchmark for Slovak, comprising 31 datasets across 7 task types, significantly expanding the evaluation landscape for this language. This paper is a preprint and has not undergone peer review.

**Method**  
The authors introduce two new models, \texttt{e5-sk-small} (45M parameters) and \texttt{e5-sk-large} (365M parameters), which are adaptations of the Multilingual E5 architecture. The adaptation process involves vocabulary trimming and fine-tuning on Slovak-specific datasets to enhance performance on embedding tasks. The models are designed to be efficient and locally deployable, making them suitable for applications such as semantic search and retrieval-augmented generation (RAG). The training compute details are not disclosed, but the models are open-sourced, allowing for replication and further research.

**Results**  
The evaluation of 31 embedding models on the SkMTEB benchmark reveals that large instruction-tuned multilingual models outperform existing Slovak-specific models. The \texttt{e5-sk-small} and \texttt{e5-sk-large} models achieve competitive performance compared to proprietary APIs, despite their reduced sizes (up to 62% smaller). Specific performance metrics are not detailed in the abstract, but the authors emphasize the models' effectiveness in local deployment scenarios, which is critical for applications in low-resource language settings.

**Limitations**  
The authors acknowledge that while their models perform competitively, they are still limited by the underlying data quality and quantity available for Slovak. Additionally, the benchmark itself may not cover all possible embedding tasks or datasets relevant to Slovak, potentially limiting its applicability. The paper does not discuss the potential biases in the training data or the generalizability of the models to other low-resource languages.

**Why it matters**  
The introduction of SkMTEB and the \texttt{e5-sk} models represents a significant advancement for Slovak language processing, providing a foundation for future research and development in low-resource language embeddings. By making the benchmark, models, datasets, and code openly available, the authors aim to facilitate further exploration and adaptation of embedding techniques for other under-resourced languages, promoting inclusivity in NLP research. This work is crucial for enhancing the accessibility of language technologies, as highlighted in the context of ongoing efforts in multilingual NLP, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.13647v1).
