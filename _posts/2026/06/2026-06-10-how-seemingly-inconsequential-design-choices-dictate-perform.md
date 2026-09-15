---
title: "How Seemingly Inconsequential Design Choices Dictate Performance of LLMs in Pathology"
date: 2026-06-10 17:59:39 +0000
category: research
subcategory: evaluation_benchmarks
company: "OpenAI"
secondary_companies: ["Google"]
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.12407v1"
arxiv_id: "2606.12407"
authors: ["Kian R. Weihrauch", "Thomas A. Buckley", "William Lotter", "Arjun K. Manrai"]
slug: how-seemingly-inconsequential-design-choices-dictate-perform
summary_word_count: 391
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper systematically evaluates design choices in LLMs for pathology, revealing significant performance improvements through optimized input configurations."
---

**Problem**  
This work addresses the gap in understanding how design choices impact the performance of general-purpose large language models (LLMs) when applied to specialized tasks in pathology, particularly with whole-slide images (WSIs). Prior studies have not systematically evaluated the effects of input configurations such as patch size, patch count, and magnification, leading to an overestimation of the performance gap between specialized models and generalist LLMs. This paper is a preprint and has not undergone peer review.

**Method**  
The authors conduct a factorial analysis of four input design factors: inference mode, patch size, magnification, and patch count. They utilize a balanced configuration of large patches at lower magnification, processed jointly, to optimize the input for LLMs. The experiments are conducted using the MultiPathQA benchmark, focusing on cancer-type classification (TCGA) and organ classification (GTEx). The authors evaluate the performance of GPT-5 and Gemini 3 Flash under these optimized conditions, comparing results against previous configurations and specialized models. The training compute details are not disclosed, but the systematic approach to input design is emphasized.

**Results**  
The results demonstrate substantial performance improvements for GPT-5 when using the optimized input configuration. Specifically, cancer-type classification accuracy increases from 15.1% to 39.5%, and organ classification accuracy rises from 38.1% to 62.9%. Further per-task optimization yields maximum accuracies of 43.9% for TCGA and 71.6% for GTEx. Additionally, the same optimized configuration is shown to generalize effectively to Gemini 3 Flash, improving its performance by 23.4 percentage points on a fully held-out CPTAC cohort without any task-specific tuning.

**Limitations**  
The authors acknowledge that their findings are contingent on the specific configurations tested and may not generalize to all pathology tasks or datasets. They also note that while the optimized configurations significantly improve performance, the inherent limitations of LLMs in specialized domains remain a consideration. The study does not explore the computational efficiency or resource requirements of the optimized configurations compared to traditional methods.

**Why it matters**  
This research has significant implications for the application of LLMs in medical imaging and pathology, suggesting that careful consideration of input design can bridge the performance gap between generalist and specialized models. The findings challenge the prevailing notion that domain-specific training is always necessary, opening avenues for further exploration of LLMs in various medical contexts. This work contributes to the ongoing discourse on optimizing AI models for specialized tasks, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.12407v1).
