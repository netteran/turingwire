---
title: "Geometry-Aware Distillation for Prompt Tuning Biomedical Vision-Language Models"
date: 2026-06-03 14:17:57 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.04922v1"
arxiv_id: "2606.04922"
authors: ["Tran Dinh Tien", "Zhiqiang Shen"]
slug: geometry-aware-distillation-for-prompt-tuning-biomedical-vis
summary_word_count: 385
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Omni-Geometry Knowledge Distillation, enhancing prompt tuning in biomedical vision-language models by incorporating class-relation structures."
---

**Problem**  
Current prompt-based and adapter-based tuning methods for vision-language models (VLMs) in medical imaging are limited by their treatment of classes as equally incorrect, which neglects clinically relevant class relationships. This results in unstable decision boundaries, particularly in scenarios with limited supervision. The authors address this gap by proposing a novel framework, Omni-Geometry Knowledge Distillation (OGKD), which is particularly relevant given the sensitivity of clinical data and the constraints of existing methods. This work is presented as a preprint and has not undergone peer review.

**Method**  
The core contribution of this paper is the OGKD framework, which integrates class-relation structures into the teacher model to generate directional targets that maintain the ground truth while respecting inter-class geometry. The authors develop two distinct distillation losses: Global Geometry-Aware Distillation (GAD), which operates on the global image token, and Label-Guided Geometry Distillation (LGD), which applies the same geometric principles to attentive patch tokens. This dual-loss approach enhances the fine-grained alignment of predictions. The training process leverages a variety of medical datasets, although specific details regarding the training compute and hyperparameters are not disclosed.

**Results**  
The proposed OGKD framework demonstrates significant improvements over existing state-of-the-art VLM adaptation methods across 11 widely-used medical datasets. The authors report an average absolute accuracy gain of 1.7% to 2.8% compared to prior approaches in both base-to-novel and few-shot evaluation settings. Additionally, OGKD exhibits robust generalization capabilities to unseen classes, yielding more reliable predictions than competing methods. These results underscore the effectiveness of incorporating geometric class relations into the distillation process.

**Limitations**  
The authors acknowledge that while OGKD improves performance, it may still be sensitive to the choice of teacher model and the specific geometric structures employed. They do not address potential computational overhead introduced by the additional distillation losses, which could impact scalability in larger datasets or real-time applications. Furthermore, the generalizability of the method beyond the medical domain remains untested.

**Why it matters**  
The introduction of OGKD has significant implications for the field of biomedical AI, particularly in enhancing the performance of VLMs under limited supervision. By addressing the shortcomings of existing prompt tuning methods, this work paves the way for more reliable and clinically relevant AI applications in medical imaging. The findings contribute to the ongoing discourse on improving model robustness and accuracy in sensitive domains, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.04922v1).
