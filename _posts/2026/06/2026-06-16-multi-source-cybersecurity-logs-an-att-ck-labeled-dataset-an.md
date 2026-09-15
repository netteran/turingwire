---
title: "Multi-Source Cybersecurity Logs: An ATT&CK-Labeled Dataset and SLM Evaluation"
date: 2026-06-16 17:21:58 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.18190v1"
arxiv_id: "2606.18190"
authors: ["Abir Ashab Niloy", "Ahmed Ryan", "Imamul Hossain Rafi", "Md Erfan", "Md Rayhanur Rahman"]
slug: multi-source-cybersecurity-logs-an-att-ck-labeled-dataset-an
summary_word_count: 411
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a novel multi-source cybersecurity log dataset with ATT&CK labels and evaluates the performance of fine-tuned Small Language Models."
---

**Problem**  
The paper addresses the lack of publicly available multi-source cybersecurity datasets that include detailed labeling of events according to the MITRE ATT&CK framework. Existing datasets either focus on single sources (network or host) or lack the granularity of ATT&CK technique labels. This gap limits the ability of machine learning models to learn cross-source patterns essential for detecting multi-stage cyberattacks. The authors present a new dataset that combines system, network, and browser logs, labeled with ATT&CK techniques, to facilitate research in this area. This work is a preprint and has not undergone peer review.

**Method**  
The authors constructed a multi-source log dataset comprising 870 sessions (70 attack, 800 benign) and approximately 2.3 million events, capturing simultaneous system, network, and browser activity on Windows endpoints. Malicious events were labeled with ATT&CK technique IDs, covering 12 tactics and 53 techniques. The attack data was generated using real-world tools, including Remote Access Trojans (RATs), Command and Control (C2) tunnels, and cloud exfiltration methods. To evaluate the dataset's utility, the authors fine-tuned three Small Language Models (SLMs): Qwen2.5-1.5B, Llama-3.2-3B, and Phi-4-Mini, employing Low-Rank Adaptation (LoRA) for the fine-tuning process. The models were assessed on two tasks: chunk classification and ATT&CK technique identification, with performance metrics including accuracy and exact/partial match rates.

**Results**  
Fine-tuning resulted in significant performance improvements across all models and metrics. For chunk classification, accuracy increased from approximately 8% in the base models to between 90% and 97% post-fine-tuning. In the ATT&CK technique identification task, the best exact-match accuracy achieved was 42%, indicating that while the models struggled with precise identification, they demonstrated high partial-match scores, suggesting they captured much of the underlying reasoning behind the techniques.

**Limitations**  
The authors acknowledge that while the dataset provides a comprehensive view of multi-source logs, the relatively small number of attack sessions (70) may limit the generalizability of the findings. Additionally, the exact-match accuracy for technique identification remains low, indicating that further improvements in model architecture or training strategies may be necessary. The dataset's focus on Windows endpoints may also restrict its applicability to other operating systems.

**Why it matters**  
This work contributes a valuable resource for the cybersecurity research community, enabling the development of more effective machine learning models for detecting complex cyberattacks. The dataset's ATT&CK labeling allows for nuanced analysis and benchmarking of detection algorithms. As published in [arXiv cs.LG](https://arxiv.org/abs/2606.18190v1), this research paves the way for future studies that can leverage multi-source data to enhance cybersecurity defenses and improve the understanding of adversarial tactics.
