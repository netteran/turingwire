---
title: "Evaluating Open-Source LLMs for Multi-Label ATT&CK Technique Classification on CTI Reports"
date: 2026-06-16 17:04:15 +0000
category: research
subcategory: evaluation_benchmarks
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.18166v1"
arxiv_id: "2606.18166"
authors: ["Ahmed Ryan", "Saad Sakib Noor", "Md Erfan", "Shaswata Mitra", "Sudip Mittal", "Md Rayhanur Rahman"]
slug: evaluating-open-source-llms-for-multi-label-att-ck-technique
summary_word_count: 435
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper evaluates open-source LLMs for multi-label classification of ATT&CK techniques in complex CTI reports, establishing a new empirical baseline."
---

**Problem**  
The paper addresses the inadequacy of existing evaluations of open-source Large Language Models (LLMs) for classifying Cyber Threat Intelligence (CTI) using the MITRE ATT&CK framework. Prior evaluations have relied on simplified, single-technique sentences, which do not reflect the complexity of real-world CTI reports. This gap in the literature is critical, as it leads to inflated performance metrics and does not provide a reliable assessment of LLM capabilities in practical applications. The authors construct a new dataset to fill this gap, which is essential for advancing automated CTI classification methods. Notably, this work is a preprint and has not undergone peer review.

**Method**  
The authors developed a ground-truth dataset comprising 2,076 human-annotated sentences extracted from 83 complex unstructured CTI reports. The annotation process involved six phases and resulted in 1,281 technique-positive and 795 negative sentences, achieving an inter-annotator agreement of \(\kappa = 0.68\). The dataset maps these sentences to 114 unique ATT&CK techniques. The evaluation involved seven open-source LLMs with parameter sizes ranging from 8 billion to 236 billion. The models were assessed under various prompt strategies and temperature settings. The highest-performing model achieved a micro-averaged F1 score of 0.22, establishing a new empirical baseline for multi-label ATT&CK classification on complex unstructured CTI.

**Results**  
The evaluation revealed that the best-performing LLM achieved a micro-averaged F1 score of 0.22, which serves as the baseline for future research in this domain. The analysis indicated a statistically significant positive correlation between model parameter size and F1 score, suggesting that larger models may perform better in this context. However, variations in prompt strategy and temperature did not yield statistically significant improvements across the evaluated configurations. This highlights the limitations of current prompting techniques in enhancing model performance for this specific task.

**Limitations**  
The authors acknowledge that the overall performance of open-source LLMs remains insufficient for production-grade ATT&CK classification, as indicated by the low F1 score. They also note that the dataset, while comprehensive, may not encompass all possible variations in CTI report language and structure. Additionally, the study does not explore the potential of fine-tuning these models on the constructed dataset, which could yield different results. The lack of peer review also raises questions about the robustness of the findings.

**Why it matters**  
This work provides a critical empirical baseline for evaluating LLMs in the context of multi-label ATT&CK classification, which is vital for enhancing automated CTI analysis. The dataset and findings lay the groundwork for future research aimed at improving the performance of LLMs in this domain. As such, this study is a significant contribution to the field of cybersecurity and machine learning, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.18166v1).
