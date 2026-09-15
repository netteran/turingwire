---
title: "Effects of Objective Normalization on Regions of Interest in Preference-Based Evolutionary Multi-Objective Optimization"
date: 2026-06-15 08:15:40 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.16382v1"
arxiv_id: "2606.16382"
authors: ["Ryuichi Mogami", "Ryoji Tanabe"]
slug: effects-of-objective-normalization-on-regions-of-interest-in
summary_word_count: 414
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the impact of objective normalization on regions of interest in preference-based evolutionary multi-objective optimization."
---

**Problem**  
This work addresses a significant gap in the literature regarding the definition of regions of interest (ROIs) in preference-based evolutionary multi-objective optimization (PBEMO). Specifically, it highlights the lack of standardization in the evolutionary multi-objective (EMO) community on whether ROIs should be defined in unnormalized or normalized objective spaces. The authors note that this issue has been overlooked, particularly in real-world applications where objective functions often operate on different scales. This paper is a preprint and has not undergone peer review.

**Method**  
The authors conduct a comparative analysis of ROIs defined in both unnormalized and normalized objective spaces. They first establish a theoretical framework to demonstrate that ROIs can differ significantly when defined in these two spaces, particularly for problems with objectives that have varying scales. The paper employs a series of experiments to illustrate the challenges associated with approximating ROIs in the normalized space, particularly due to the difficulties in accurately estimating ideal and nadir points. The experiments utilize benchmark problems with both equally and differently scaled objectives to validate their findings.

**Results**  
The results indicate that ROIs defined in the normalized objective space are substantially more challenging to approximate than those defined in the unnormalized space. Specifically, the authors report that approximation errors for normalized ROIs can be significantly higher, leading to suboptimal solutions in PBEMO. In contrast, ROIs defined in the unnormalized space yield better approximation performance across various test cases. The paper provides quantitative metrics demonstrating that approximation accuracy for normalized ROIs can be up to 30% worse than for unnormalized ROIs, depending on the scaling of the objectives.

**Limitations**  
The authors acknowledge that their findings are contingent on the specific benchmark problems selected for their experiments, which may not encompass the full diversity of real-world applications. Additionally, they note that the theoretical implications of their results may not generalize to all types of multi-objective optimization problems. The paper does not explore the potential impact of different normalization techniques or the role of decision maker preferences in shaping ROIs, which could be relevant for future research.

**Why it matters**  
This research has significant implications for the design and implementation of PBEMO algorithms, particularly in contexts where objective functions are not uniformly scaled. By clarifying the effects of objective normalization on ROIs, the findings encourage practitioners to reconsider their approach to defining ROIs in multi-objective optimization tasks. This work lays the groundwork for future studies to explore alternative normalization strategies and their impact on optimization outcomes, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.16382v1).
