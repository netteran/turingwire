---
title: "RECOM: A Validity Discrimination Tradeoff in Automatic Metrics for Open Ended Reddit Question Answering"
date: 2026-06-17 15:55:33 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.19218v1"
arxiv_id: "2606.19218"
authors: ["Pushwitha Krishnappa", "Amit Das", "Vinija Jain", "Aman Chadha", "Tathagata Mukherjee"]
slug: recom-a-validity-discrimination-tradeoff-in-automatic-metric
summary_word_count: 440
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces RECOM, a dataset and analysis revealing the validity-discrimination tradeoff in automatic metrics for evaluating LLM-generated responses."
---

**Problem**  
The paper addresses a significant gap in the evaluation of large language models (LLMs) for open-ended question answering, particularly in the context of Reddit's r/AskReddit. Existing automatic metrics are tasked with two conflicting objectives: assessing the validity of generated content and discriminating between the performance of different models. The authors highlight that current metrics fail to effectively balance these two roles, which is critical for reliable evaluation in opinion-driven contexts. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors introduce RECOM (Reddit Evaluation for Correspondence of Models), a contamination-free evaluation dataset comprising 15,000 r/AskReddit questions, each paired with authentic community replies that postdate the training cutoffs of the evaluated models. The study evaluates five open-source LLMs with parameter counts ranging from 7 to 10 billion. The evaluation employs various automatic metrics, including cosine similarity and BERTScore, to assess the models against the community replies. A random-derangement noise floor is used to establish a baseline for comparison. The analysis reveals that while cosine similarity effectively distinguishes genuine responses from random noise (Cohen's d ≈ 2), it fails to rank the models effectively (|d| < 0.1). Conversely, BERTScore shows some ability to rank models (raw |d| up to 0.63), but this collapses to |d| = 0.09 when controlling for response length, indicating weak validity (d ≈ 0.8).

**Results**  
The findings indicate a clear validity-discrimination tradeoff inherent in the metrics used. Cosine similarity demonstrates strong validity but poor discriminative power, while BERTScore shows the opposite behavior. The authors report that all metrics yield similar scores across the evaluated outputs, suggesting that the limitations stem from the metrics themselves rather than the models. The independent evaluation by three LLM judges corroborates the validity gap, with weak model discrimination observed. The authors recommend that future evaluations report metrics on both validity and discrimination axes, alongside an explicit random-baseline floor.

**Limitations**  
The authors acknowledge that the validity-discrimination tradeoff is a fundamental property of the metrics rather than the models. They do not address potential biases in the dataset or the implications of using community-generated responses as a gold standard. Additionally, the study is limited to five specific LLMs, which may not generalize across other architectures or larger models.

**Why it matters**  
This work has significant implications for the evaluation of LLMs in open-ended question answering, emphasizing the need for a nuanced understanding of automatic metrics. By highlighting the validity-discrimination tradeoff, the authors advocate for improved evaluation practices that can better inform model development and deployment. The RECOM dataset is publicly available, facilitating further research in this area, as discussed in the paper available on [arXiv](https://arxiv.org/abs/2606.19218v1).
