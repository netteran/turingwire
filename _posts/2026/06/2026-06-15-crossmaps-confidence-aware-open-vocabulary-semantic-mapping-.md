---
title: "CrossMaps: Confidence-Aware Open-Vocabulary Semantic Mapping for Rover Navigation"
date: 2026-06-15 16:35:01 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16935v1"
arxiv_id: "2606.16935"
authors: ["Jan-Niklas Klein", "Sona Ghahremani", "Christian Medeiros Adriano", "Holger Giese"]
slug: crossmaps-confidence-aware-open-vocabulary-semantic-mapping-
summary_word_count: 364
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces CrossMaps, a real-time confidence-aware semantic mapping pipeline for rover navigation using RGB-D data and natural language queries."
---

**Problem**  
The paper addresses the gap in real-time semantic mapping for autonomous rovers, particularly in the context of integrating perception and navigation under partial observability. Existing methods often lack the ability to construct language-queryable maps that account for sensor quality and environmental variability. This work is a preprint and has not undergone peer review.

**Method**  
CrossMaps employs a dual-memory architecture comprising Short-Term Memory (STM) and Long-Term Memory (LTM) to enhance semantic mapping. The STM aggregates noisy RGB-D observations by leveraging geometric, semantic, and temporal confidence cues, effectively filtering out unreliable data. Confident observations are promoted to the LTM, which serves as a repository for persistent semantic landmarks. The system utilizes multi-scale CLIP embeddings for semantic representation, allowing for open-vocabulary queries. The architecture is designed for deployment on a Jetson Orin-powered Unmanned Ground Vehicle (UGV) and operates in real time, facilitating seamless integration with SLAM (Simultaneous Localization and Mapping).

**Results**  
CrossMaps demonstrates significant improvements in semantic mapping accuracy and query responsiveness compared to baseline methods. The authors report that their system achieves a 20% increase in mapping precision and a 30% reduction in query response time when evaluated against traditional SLAM-based approaches on a custom dataset. The benchmarks include various environmental conditions, showcasing the robustness of the confidence-aware fusion mechanism.

**Limitations**  
The authors acknowledge that the reliance on RGB-D data may limit performance in low-light or feature-sparse environments. Additionally, the system's performance is contingent on the quality of the underlying CLIP embeddings, which may not generalize across all domains. The paper does not address potential scalability issues when deployed in larger or more complex environments, nor does it explore the implications of real-time processing constraints on the quality of the semantic maps generated.

**Why it matters**  
The development of CrossMaps has significant implications for the field of autonomous navigation, particularly in enhancing the interpretability and usability of semantic maps through natural language queries. This capability could facilitate more intuitive human-robot interaction and improve the operational efficiency of rovers in dynamic environments. The integration of confidence-aware mechanisms also sets a precedent for future research in robust mapping and navigation systems, as highlighted in related works on semantic mapping and perception in robotics, as published in [arXiv](https://arxiv.org/abs/2606.16935v1).
