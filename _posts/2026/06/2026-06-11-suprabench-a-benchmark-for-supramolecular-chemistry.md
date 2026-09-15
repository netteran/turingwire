---
title: "SupraBench: A Benchmark for Supramolecular Chemistry"
date: 2026-06-11 15:29:56 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13477v1"
arxiv_id: "2606.13477"
authors: ["Tianyi Ma", "Yijun Ma", "Zehong Wang", "Weixiang Sun", "Ziming Li", "Connor R. Schmidt"]
slug: suprabench-a-benchmark-for-supramolecular-chemistry
summary_word_count: 380
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SupraBench, a benchmark for evaluating LLMs in supramolecular chemistry tasks, addressing a significant gap in the literature."
---

**Problem**  
The paper identifies a critical gap in the evaluation of large language models (LLMs) for host-guest reasoning in supramolecular chemistry, an area that has not been systematically benchmarked. Despite the potential of LLMs to expedite the design of host-guest systems, there is no existing framework to assess their performance on fundamental tasks such as binding affinity prediction. The authors note that the work is a preprint and has not undergone peer review.

**Method**  
The authors propose SupraBench, a benchmark comprising four primary tasks: binding affinity prediction, top-binder selection, solvent identification, and host-guest description, along with an auxiliary vision-based task for molecular identification. To support these tasks, they introduce SupraPMC, a curated corpus of 16 million tokens derived from supramolecular chemistry articles sourced from Europe PMC. The benchmark evaluates a variety of LLMs, both open-source and proprietary, to assess their performance across the defined tasks. The authors also implement domain adaptation pretraining over SupraPMC, which enhances performance on in-distribution regression tasks but may compromise the model's ability to generate strict letter-format outputs.

**Results**  
The benchmarking results reveal that LLMs exhibit substantial performance gaps across all tasks, indicating significant room for improvement. Specific performance metrics are not disclosed in the abstract, but the authors emphasize that the difficulty profile varies sharply across task families, suggesting distinct failure modes. This indicates that current LLMs struggle with certain aspects of supramolecular chemistry reasoning, which could inform future research directions.

**Limitations**  
The authors acknowledge that while domain adaptation pretraining improves performance, it may lead to trade-offs in output format fidelity. Additionally, the benchmark's reliance on LLMs may not fully capture the complexities of supramolecular chemistry, as the tasks may not encompass all relevant aspects of host-guest interactions. The paper does not address potential biases in the training data or the generalizability of the benchmark across different chemical domains.

**Why it matters**  
The introduction of SupraBench represents a significant advancement in the evaluation of LLMs for supramolecular chemistry, providing a structured framework for assessing model performance on critical tasks. This benchmark can catalyze further research into improving LLM capabilities in this domain, potentially leading to more efficient design processes for host-guest systems. The findings and methodologies presented in this paper are crucial for researchers aiming to enhance LLM applications in chemistry, as published in [arXiv](https://arxiv.org/abs/2606.13477v1).
