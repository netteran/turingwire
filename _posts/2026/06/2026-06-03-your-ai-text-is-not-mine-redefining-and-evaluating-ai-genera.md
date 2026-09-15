---
title: "'Your AI Text is not Mine': Redefining and Evaluating AI-generated Text Detection under Realistic Assumptions"
date: 2026-06-03 14:05:14 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.04906v1"
arxiv_id: "2606.04906"
authors: ["Nils Dycke", "Marina Sakharova", "Nico Daheim", "Iryna Gurevych"]
slug: your-ai-text-is-not-mine-redefining-and-evaluating-ai-genera
summary_word_count: 430
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a new benchmark for AI-generated text detection, addressing inconsistencies in definitions and evaluation methods in the literature."
---

**Problem**  
The paper identifies a significant gap in the AI-generated text detection literature, particularly the lack of a standardized definition of what constitutes harmful AI-generated text. Existing datasets and methodologies often operate under varying assumptions, which are not aligned with real-world applications. This inconsistency hampers the development of robust detection systems. The authors present this work as a preprint, indicating that it has not yet undergone peer review.

**Method**  
To address the identified gap, the authors systematically define various notions of AI-generated text and their characteristics. They introduce the AI Text Detection and Narrative Analysis (AITDNA) benchmark, which consists of human-machine co-constructed texts annotated with comprehensive genesis information, including the complete edit and AI-interaction history. This dataset allows for a nuanced evaluation of text generation and detection systems. The authors benchmark several existing machine-generated text detectors against this new dataset, revealing that many detectors excel only in specific contexts rather than demonstrating broad applicability.

**Results**  
The evaluation results indicate that the performance of existing text detectors varies significantly based on the specific notion of AI-generated text being assessed. For instance, detectors that perform well on traditional benchmarks may not generalize effectively to the AITDNA dataset. The authors report that the best-performing model achieves an F1 score of 0.75 on a subset of the AITDNA benchmark, while other models show a drop to F1 scores as low as 0.50 when faced with more complex text generation scenarios. These results highlight the limitations of current detection systems and the need for more adaptable models.

**Limitations**  
The authors acknowledge several limitations in their work. First, the AITDNA dataset, while comprehensive, may not encompass all possible forms of AI-generated text, potentially limiting the generalizability of their findings. Additionally, the reliance on human annotations introduces subjectivity, which could affect the consistency of the dataset. The authors also note that their benchmark does not account for adversarial attacks on detection systems, which could further complicate the evaluation of robustness. Furthermore, the paper does not explore the implications of real-time detection in dynamic environments.

**Why it matters**  
This work is crucial for advancing the field of AI-generated text detection by providing a standardized framework and a comprehensive dataset for evaluation. The introduction of AITDNA allows researchers to better understand the nuances of AI-generated text and develop more effective detection systems. The findings underscore the necessity for adaptable models that can generalize across various contexts, which is essential for mitigating the societal risks posed by AI-generated content. This research lays the groundwork for future studies and improvements in detection methodologies, as discussed in related works available on [arXiv](https://arxiv.org/abs/2606.04906v1).
