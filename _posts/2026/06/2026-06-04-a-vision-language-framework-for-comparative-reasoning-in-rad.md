---
title: "A Vision-language Framework for Comparative Reasoning in Radiology"
date: 2026-06-04 17:12:47 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06407v1"
arxiv_id: "2606.06407"
authors: ["Tengfei Zhang", "Ziheng Zhao", "Lisong Dai", "Xiaoman Zhang", "Pengcheng Qiu", "Ya Zhang"]
slug: a-vision-language-framework-for-comparative-reasoning-in-rad
summary_word_count: 405
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper presents a vision-language framework for comparative reasoning in radiology, enhancing diagnostic accuracy through entity-aware retrieval and interpretation."
---

**Problem**  
Current medical imaging AI excels in isolated image interpretation but lacks alignment with radiological practices that depend on comparative analysis of prior studies and reference cases. This paper addresses this gap by formulating radiological comparison as an entity-aware cross-image reasoning problem. The authors highlight that existing literature does not adequately support the retrieval of clinically analogous cases or the interpretation of temporal changes in imaging, which is critical for accurate diagnosis and follow-up. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors introduce MedReCo-DB, a large-scale comparative imaging dataset comprising over 690,000 images from more than 160,000 patients across eight institutions and seven imaging modalities. The dataset is constructed from routine image-report pairs, with reports decomposed into anatomical structures, abnormal findings, and pathological conditions to facilitate entity-conditioned retrieval and comparative visual question answering. The core technical contributions include MedReCo, an entity-aware visual encoder designed for the controllable retrieval of clinically analogous cases, and MedReCo-VLM, a vision-language model that enables generative interpretation of interval changes. The training process and compute resources utilized for these models are not disclosed in the paper.

**Results**  
MedReCo achieved the highest Recall@1 across all 12 internal retrieval settings and improved external retrieval performance by an average of 6.0 percentage points compared to baseline models. In scenarios involving clinically confusable differential groups, MedReCo consistently outperformed the strongest baselines. MedReCo-VLM demonstrated superior performance in all comparative generation evaluations, enhancing longitudinal follow-up accuracy by 14.5-46.5 percentage points on chest radiographs and 13.0-27.9 percentage points on CT scans. These results indicate significant improvements in both retrieval and generative tasks compared to existing methods.

**Limitations**  
The authors acknowledge that the dataset, while extensive, may still be limited in diversity and may not encompass all possible clinical scenarios. Additionally, the reliance on routine clinical data may introduce biases inherent to the data collection process. The paper does not address potential challenges in generalizing the models to other imaging modalities or clinical settings outside the dataset's scope.

**Why it matters**  
This work has significant implications for the development of AI systems in medical imaging, as it demonstrates that entity-aware comparative reasoning can be effectively learned from large-scale clinical data. By aligning AI capabilities with actual radiological practices, this framework could enhance diagnostic accuracy and improve patient outcomes. The findings suggest a pathway for future research to explore the integration of comparative reasoning in other medical domains, as published in [arXiv](https://arxiv.org/abs/2606.06407v1).
