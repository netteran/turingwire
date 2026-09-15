---
title: "Operation-Guided Progressive Human-to-AI Text Transformation Benchmark for Multi-Granularity AI-Text Detection"
date: 2026-06-04 17:58:05 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.06481v1"
arxiv_id: "2606.06481"
authors: ["Sondos Mahmoud Bsharat", "Jiacheng Liu", "Xiaohan Zhao", "Tianjun Yao", "Xinyi Shang", "Yi Tang"]
slug: operation-guided-progressive-human-to-ai-text-transformation
summary_word_count: 444
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces OpAI-Bench, a benchmark for analyzing progressive human-to-AI text transformation and its implications for AI-text detection."
---

**Problem**  
The paper addresses a significant gap in the literature regarding the detection of AI-generated text, particularly in the context of progressive human-AI co-editing. Existing benchmarks primarily focus on final outputs, neglecting the intermediate stages of text transformation that occur during the revision process. This oversight limits the understanding of how AI authorship signals evolve, accumulate, or diminish throughout document revisions. The authors present OpAI-Bench, a novel benchmark designed to study these dynamics across multiple granularities, including document, sentence, token, and span levels. This work is a preprint and has not yet undergone peer review.

**Method**  
OpAI-Bench constructs a dataset from human-written documents, generating nine sequentially revised versions for each sample. The revisions are guided by predefined AI coverage levels and five representative AI edit operations, ensuring a comprehensive exploration of the text transformation process. The benchmark spans four distinct domains and maintains complete authorship provenance at various granularities. It facilitates evaluation using eight document-level detectors, seven sentence-level detectors, and two fine-grained token/span-level detectors. The authors employ a systematic approach to analyze the detectability of AI-generated content, focusing on the interplay between the proportion of AI edits, the nature of the edit operations, the domain of the text, and the cumulative revision history.

**Results**  
The experiments reveal that AI-text detectability is influenced by multiple factors beyond mere content proportion. Notably, mixed-authorship intermediate versions exhibit lower detectability compared to both fully human and heavily AI-edited endpoints, indicating non-monotonic detection patterns that existing benchmarks fail to capture. The findings suggest that the type of edit operation and the specific domain also play critical roles in the detectability of AI contributions. The benchmark's comprehensive evaluation framework allows for nuanced insights into the progressive transformation of text, highlighting the complexity of authorship detection in co-edited documents.

**Limitations**  
The authors acknowledge that while OpAI-Bench provides a robust framework for studying AI-text detection, it is limited by the specific AI edit operations and domains chosen for the benchmark. Additionally, the focus on controlled scenarios may not fully capture the variability present in real-world editing environments. The paper does not address potential biases in the dataset or the generalizability of the findings across different languages or cultural contexts.

**Why it matters**  
OpAI-Bench represents a significant advancement in the study of AI-text detection, offering a controlled environment to analyze the nuances of human-AI co-editing. The insights gained from this benchmark can inform the development of more sophisticated detection algorithms and contribute to the understanding of authorship in increasingly collaborative writing environments. This work is particularly relevant as AI writing assistants become more prevalent in various domains, necessitating robust mechanisms for identifying AI contributions. The benchmark and accompanying code are available at [arXiv](https://arxiv.org/abs/2606.06481v1).
