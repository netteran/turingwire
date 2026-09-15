---
title: "Benchmarking LLM Agents on Meta-Analysis Articles from Nature Portfolio"
date: 2026-06-15 17:56:41 +0000
category: research
subcategory: evaluation_benchmarks
company: "Meta"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.17041v1"
arxiv_id: "2606.17041"
authors: ["Anzhe Xie", "Weihang Su", "Yujia Zhou", "Yiqun Liu", "Qingyao Ai"]
slug: benchmarking-llm-agents-on-meta-analysis-articles-from-natur
summary_word_count: 401
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MetaSyn, a dataset for benchmarking LLM agents on meta-analysis articles, revealing significant limitations in current retrieval systems."
---

**Problem**  
The paper addresses the lack of comprehensive benchmarks for evaluating systematic scientific reasoning in meta-analysis, particularly in the context of literature retrieval, study selection, and statistical aggregation. Existing benchmarks do not provide ground truth across the entire retrieval-screening-synthesis pipeline, which is critical for assessing the capabilities of large language models (LLMs) in this domain. The authors present MetaSyn, a dataset specifically designed to fill this gap, consisting of expert-curated meta-analyses from Nature Portfolio journals. This work is a preprint and has not undergone peer review.

**Method**  
MetaSyn comprises 442 meta-analysis entries, each associated with a research question, participant inclusion/exclusion criteria (PI/ECO), and a retrieval corpus of 140,000 PubMed articles. The dataset includes verified positive studies, hard negatives (topically similar but PI/ECO-ineligible studies), and complete search strategies with date bounds. The authors benchmark twelve configurations of LLM agents, including nine retrieval-augmented generation (RAG) variants and a protocol-driven agent. The evaluation focuses on the retrieval and screening stages, utilizing stage-attributed metrics to assess performance across different pipeline configurations.

**Results**  
The benchmarking results reveal a significant screening bottleneck in current LLM systems. Despite achieving a retrieval ceiling of 90.9% recall at K=200, no system successfully recovers more than 52.7% of the ground-truth included literature. This indicates that while retrieval capabilities are high, the ability to distinguish between eligible studies and PI/ECO-failing distractors remains inadequate. The authors emphasize that a single end-to-end score is insufficient to capture the nuanced performance of the systems, necessitating the use of stage-attributed metrics to identify specific strengths and weaknesses.

**Limitations**  
The authors acknowledge that the current LLMs struggle with the screening phase, particularly in differentiating between relevant and irrelevant studies within comparable topical contexts. They do not address potential biases in the dataset selection or the implications of using a single journal source for the meta-analyses. Additionally, the reliance on expert curation may limit the generalizability of the findings to broader datasets or real-world applications.

**Why it matters**  
The introduction of MetaSyn provides a critical resource for evaluating LLMs in the context of meta-analysis, highlighting the limitations of current systems in effectively screening literature. This work has significant implications for the development of more robust LLM agents capable of systematic scientific reasoning, which is essential for advancing automated literature review processes. The findings underscore the need for improved methodologies in distinguishing eligible studies from distractors, paving the way for future research in this area. As published in [arXiv](https://arxiv.org/abs/2606.17041v1).
