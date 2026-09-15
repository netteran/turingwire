---
title: "Towards One-to-Many Temporal Grounding"
date: 2026-06-04 15:31:22 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06294v1"
arxiv_id: "2606.06294"
authors: ["Qi Xu", "Yue Tan", "Shihao Chen", "Jiahao Meng", "Anna Wang", "Shunping Ji"]
slug: towards-one-to-many-temporal-grounding
summary_word_count: 390
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel framework for One-to-Many Temporal Grounding, establishing a benchmark and achieving state-of-the-art performance on new metrics."
---

**Problem**  
This work addresses the gap in the literature regarding One-to-Many Temporal Grounding (OMTG), a scenario where multiple disjoint video segments must be localized for a single textual query. Prior research has predominantly focused on one-to-one temporal grounding, leading to limitations in handling real-world applications that require the identification of multiple events. The authors note that existing state-of-the-art multi-modal language models (MLLMs) are ill-equipped for this task, often yielding near-zero performance due to their inability to perceive event cardinality. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a systematic solution that includes three core contributions. First, they establish the first comprehensive OMTG benchmark, introducing two novel evaluation metrics: Count Accuracy (C-Acc) and Effective Temporal F1 (EtF1). Second, they curate a high-quality OMTG dataset consisting of 56,000 samples, developed through a sophisticated construction pipeline that ensures diverse and representative data. Third, they introduce novel temporal and caption reward functions tailored for OMTG. The caption reward function employs Chain-of-Thought reasoning over dense video captions, which explicitly guides policy optimization to enhance both the precision and completeness of the grounding process.

**Results**  
The proposed model achieves a new state-of-the-art Effective Temporal F1 score of 43.65% on the OMTG Bench, significantly outperforming previous benchmarks, including Gemini 2.5 Pro and Seed-1.8, by 15.85% and 15.61%, respectively. These results demonstrate the effectiveness of the new metrics and the curated dataset in evaluating OMTG performance, highlighting the model's capability to handle multiple segment retrieval tasks effectively.

**Limitations**  
The authors acknowledge that their approach may still struggle with highly complex queries that involve intricate temporal relationships or require contextual understanding beyond the provided video captions. Additionally, the reliance on a curated dataset may limit generalizability to more diverse or unstructured video content. The paper does not address potential scalability issues when applied to larger datasets or real-time applications.

**Why it matters**  
This research has significant implications for advancing the field of temporal grounding in video understanding, particularly in applications such as video summarization, content retrieval, and interactive media. By establishing a new benchmark and metrics, the work lays the groundwork for future research in OMTG, encouraging the development of more sophisticated models that can handle complex queries. The findings and methodologies presented in this paper are crucial for researchers aiming to enhance multi-modal understanding in AI systems, as published in [arXiv](https://arxiv.org/abs/2606.06294v1).
