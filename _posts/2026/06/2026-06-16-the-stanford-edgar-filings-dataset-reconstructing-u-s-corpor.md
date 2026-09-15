---
title: "The Stanford EDGAR Filings Dataset: Reconstructing U.S. Corporate and Financial Disclosures into Layout-Faithful and Token-Efficient Pretraining Data"
date: 2026-06-16 17:22:34 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18192v1"
arxiv_id: "2606.18192"
authors: ["Nick Bettencourt", "Xiaowei Ding", "Kay Giesecke"]
slug: the-stanford-edgar-filings-dataset-reconstructing-u-s-corpor
summary_word_count: 406
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents the Stanford EDGAR Filings Dataset, a novel open-source corpus for financial language modeling, enhancing long-context training data availability."
---

**Problem**  
The paper addresses the scarcity of high-quality, long-context training data for large language models (LLMs), particularly in the financial domain. Existing datasets are often proprietary, costly, or limited to narrow applications, such as programming. The authors highlight the need for a publicly available, clean, and layout-faithful dataset that can facilitate financial reasoning and compliance tasks. This work is a preprint and has not undergone peer review.

**Method**  
The authors introduce the Stanford EDGAR Filings Dataset (SEFD), which reconstructs U.S. Securities and Exchange Commission (SEC) filings into a MultiMarkdown format that preserves the original layout. The dataset includes a variety of financial documents, such as audited financial statements, risk disclosures, and ownership reports. The SEFD-v1 release comprises 152 billion tokens, with a larger archive estimated at 550 billion tokens derived from 18.5 million filings. The dataset is designed to be token-efficient and model-ready, with less than 0.1% overlap with existing Common Crawl-derived corpora. Additionally, the authors propose two benchmarks derived from SEFD: EDGAR-Forecast, which assesses numerical forecasting capabilities grounded in filing data, and EDGAR-OCR, which evaluates the transcription accuracy of complex financial tables.

**Results**  
The SEFD dataset demonstrates significant potential for enhancing financial language modeling. While specific performance metrics on standard benchmarks are not disclosed in the abstract, the introduction of the EDGAR-Forecast and EDGAR-OCR benchmarks suggests a structured approach to evaluating model performance in financial contexts. The authors imply that the dataset's token efficiency and layout fidelity will lead to improved model performance in tasks requiring long-context understanding, although exact comparative results against named baselines are not provided.

**Limitations**  
The authors acknowledge that the dataset is a reconstruction and may not capture all nuances of the original filings. They also note that while the dataset is extensive, it is still limited to U.S. corporate filings, which may restrict its applicability in global financial contexts. Furthermore, the benchmarks introduced are in their initial stages, and further validation against established financial modeling tasks is necessary to fully assess their effectiveness.

**Why it matters**  
The introduction of the SEFD represents a significant advancement in the availability of high-quality, long-context training data for financial language models, addressing a critical gap in the literature. By providing a publicly accessible dataset, the authors facilitate further research in financial reasoning, forecasting, and compliance, which are essential for developing robust AI systems in finance. This work lays the groundwork for future studies and applications in financial document understanding, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.18192v1).
