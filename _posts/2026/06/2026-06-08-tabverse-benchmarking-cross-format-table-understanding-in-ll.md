---
title: "TABVERSE: Benchmarking Cross-Format Table Understanding in LLMs and VLMs"
date: 2026-06-08 14:52:46 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09578v1"
arxiv_id: "2606.09578"
authors: ["Momina Ahsan", "Sarfraz Ahmad", "Ming Shan Hee", "Roy Ka-Wei Lee", "Preslav Nakov"]
slug: tabverse-benchmarking-cross-format-table-understanding-in-ll
summary_word_count: 358
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces TABVERSE, a benchmark for evaluating table understanding in LLMs and VLMs across multiple formats, revealing significant representation effects."
---

**Problem**  
The paper addresses the under-explored role of table representation in evaluating Large Language Models (LLMs) and Vision-Language Models (VLMs) on table reasoning tasks. Existing evaluations conflate content, format, layout, and modality, making it difficult to isolate the effects of representation. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose TABVERSE, a controlled multimodal benchmark that aligns identical table content across various structural formats (HTML, Markdown, LaTeX) and rendered images. Each table instance is tagged with question categories and difficulty levels, facilitating systematic evaluation of representation effects while keeping the content constant. The benchmark includes three primary tasks: Question Answering (QA), Structural Understanding Capability (SUC), and Structure Reconstruction (SR). The evaluation involves multiple LLMs and VLMs, although specific architectures and training compute details are not disclosed.

**Results**  
The findings indicate that the choice of table representation significantly impacts model performance. Across the evaluated tasks, models generally exhibit superior performance with structured text formats compared to rendered images. Notably, the performance gap varies by task, model, and format. For instance, HTML consistently emerges as the most robust text format, while tasks requiring row-sensitive structural understanding and LaTeX reconstruction present notable challenges. The paper quantifies these effects, although specific performance metrics and comparisons to baseline models are not detailed in the abstract.

**Limitations**  
The authors acknowledge that their benchmark may not encompass all possible table formats and that the evaluation is limited to the selected models. Additionally, the reliance on specific tasks may not generalize to broader table understanding applications. The lack of detailed performance metrics and comparisons to existing benchmarks is another limitation that could hinder comprehensive evaluation.

**Why it matters**  
The introduction of TABVERSE provides a critical framework for isolating and understanding the effects of table representation on model performance, which is essential for advancing table reasoning capabilities in LLMs and VLMs. This work highlights the importance of representation in reliable table evaluation, suggesting that future research should consider these factors when developing and assessing models. The implications of this research extend to various applications in data extraction, information retrieval, and automated reasoning, as published in [arXiv](https://arxiv.org/abs/2606.09578v1).
