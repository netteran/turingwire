---
title: "When Does Language Matter? Multilingual Instructions Reveal Step-wise Language Sensitivity in Vision-Language-Action Models"
date: 2026-06-10 10:36:20 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11906v1"
arxiv_id: "2606.11906"
authors: ["Xuan Dong", "Zhe Han", "Tianhao Niu", "Qingfu Zhu", "Wanxiang Che"]
slug: when-does-language-matter-multilingual-instructions-reveal-s
summary_word_count: 402
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper systematically evaluates multilingual performance in Vision-Language-Action models, revealing step-wise language sensitivity and proposing targeted interventions."
---

**Problem**  
This work addresses the gap in understanding the robustness of Vision-Language-Action (VLA) models to linguistic variation, particularly in non-English contexts. Despite their strong performance in language-conditioned robotic manipulation, the authors note that existing evaluations predominantly focus on English instructions. This paper presents the first systematic multilingual evaluation of VLA models, highlighting significant performance degradation when instructions are provided in languages other than English. The research is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors translated the LIBERO benchmark into ten different languages to assess the performance of VLA models under multilingual conditions. They conducted a fine-grained analysis of task executions to identify the steps within the task that exhibit varying degrees of language sensitivity. The proposed intervention involves a step-wise inference-time adjustment that aligns model representations according to the identified language sensitivity of each task step. This method allows for targeted improvements in performance by addressing the specific steps that are most affected by linguistic variation.

**Results**  
The evaluation revealed that VLA models experienced a 30-50% drop in success rates when tasked with non-English instructions compared to English. The analysis indicated that certain steps in the task were highly dependent on the language used, leading to overall task failure, while other steps demonstrated a degree of language agnosticism. The step-wise intervention proposed by the authors significantly improved performance under linguistic variation, although specific quantitative improvements over baseline models were not detailed in the abstract.

**Limitations**  
The authors acknowledge that their findings are limited to the specific languages included in their evaluation and the LIBERO benchmark. They do not address the potential impact of cultural or contextual differences in language use that may affect model performance. Additionally, the paper does not explore the scalability of the proposed intervention across a broader range of tasks or languages beyond those tested.

**Why it matters**  
This research has significant implications for the development of robust VLA models capable of operating in multilingual environments. By revealing the step-wise nature of language sensitivity, it encourages future work to adopt a more granular approach to evaluating and improving language robustness in embodied agents. The findings suggest that addressing language sensitivity at the task step level could lead to more reliable performance across diverse linguistic contexts, which is crucial for deploying VLA models in real-world applications. This work is foundational for advancing multilingual capabilities in AI systems, as published in [arXiv](https://arxiv.org/abs/2606.11906v1).
