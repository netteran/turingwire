---
title: "Interpretable Crisis Behavior Analysis Using Mobility and Social Media Data"
date: 2026-06-08 14:16:36 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09532v1"
arxiv_id: "2606.09532"
authors: ["Muhammad Hamza Arshad Majeed", "Sidahmed Benabderrahmane", "Talal Rahwan"]
slug: interpretable-crisis-behavior-analysis-using-mobility-and-so
summary_word_count: 394
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a unified framework for analyzing mobility and social media data to identify behavioral patterns during crises, enhancing crisis intelligence."
---

**Problem**  
This work addresses the gap in the literature regarding the simultaneous analysis of mobility patterns and social media discourse during crises, which are often studied in isolation. The authors highlight the need for an integrated approach to understand how these domains influence each other during emergencies, such as wildfires and pandemics. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a unified pipeline that integrates mobility and social media data to identify cross-domain behavioral patterns. The framework consists of several key components: it aligns heterogeneous daily signals, transforms them into binary behavioral states, and employs Formal Concept Analysis (FCA) to extract co-occurrence structures. The pipeline also mines association rules and validates their stability through chronological holdout testing. A structured policy-translation layer is included to convert robust rules into operational briefs, detailing triggers, lead times, and action playbooks. The evaluation is conducted through two case studies: a short-horizon analysis of the January 2025 Los Angeles wildfires and a longitudinal analysis of UAE COVID-19 behavior from March 2020 to December 2021, covering 671 days.

**Results**  
In the wildfire case study, the authors found a strong coupling between traffic stress, fear/anger sentiment, and governance discourse within a 33-day window, with key rules achieving 100% confidence and lift scores up to 2.5. For the COVID-19 case, the analysis revealed 8 stable same-day rules with an 88% holdout pass rate and 40 clean predictive rules with lead times ranging from 2 to 7 days. These results demonstrate the effectiveness of the proposed framework in capturing and interpreting complex behavioral patterns during crises.

**Limitations**  
The authors acknowledge that their approach may be limited by the availability and quality of mobility and social media data, which can vary significantly across different crises and regions. Additionally, the reliance on binary behavioral states may oversimplify the complexity of human behavior. The case studies are also geographically constrained, which may limit the generalizability of the findings to other contexts.

**Why it matters**  
This research has significant implications for crisis management and response strategies, as it provides a method for generating interpretable and actionable insights from multimodal data sources. The ability to identify and predict behavioral patterns during crises can enhance situational awareness and inform policy decisions. The findings contribute to the growing body of work on crisis intelligence and multimodal data fusion, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.09532v1).
