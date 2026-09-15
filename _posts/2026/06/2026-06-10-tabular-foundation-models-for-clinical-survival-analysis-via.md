---
title: "Tabular Foundation Models for Clinical Survival Analysis via Survival-Aware Adaptation"
date: 2026-06-10 12:28:40 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12006v1"
arxiv_id: "2606.12006"
authors: ["Minh-Khoi Pham", "Luca Cotugno", "Alina Sirbu", "Tai Tan Mai", "Martin Crane", "Marija Bezbradica"]
slug: tabular-foundation-models-for-clinical-survival-analysis-via
summary_word_count: 402
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a lightweight adaptation of tabular foundation models for clinical survival analysis, demonstrating superior performance on benchmark datasets."
---

**Problem**  
This work addresses the gap in applying tabular foundation models to clinical survival analysis, specifically for predicting right-censored time-to-event outcomes. While traditional survival analysis methods have been extensively studied, they often require task-specific training and substantial labeled data. The authors note that existing literature has not sufficiently explored the use of tabular foundation models in this context, particularly for clinical applications, making this a preprint and unreviewed contribution to the field.

**Method**  
The authors propose a lightweight adaptation strategy that involves training a survival-aware head on top of pretrained tabular foundation models. They investigate several architectures, including TabPFN, TabDPT, and TabICL, and employ a multi-task logistic regression (MTLR) head to model right-censored outcomes. The training process leverages the pretrained representations of these models, allowing for effective transfer learning. The adaptation is designed to maintain the general-purpose nature of the foundation models while tailoring them for survival analysis tasks.

**Results**  
The proposed method demonstrates competitive performance on various public survival benchmarks and two large-scale ICU datasets: MIMIC-IV and eICU. Specifically, on the MIMIC-IV dataset, the TabDPT-FT-MTLR model achieves a concordance index (C-index) of 0.856, which represents a relative improvement of +1.4% over the best non-foundation model baseline (DeepSurv, C-index of 0.844) and +6.7% over the best zero-shot model (C-index of 0.802). Similarly, on the eICU dataset, the TabICL-FT-MTLR model reaches a C-index of 0.797, yielding gains of +1.7% over DeepSurv (C-index of 0.784) and +6.4% over the best zero-shot model (C-index of 0.749). These results underscore the effectiveness of combining pretrained tabular representations with survival-aware objectives.

**Limitations**  
The authors acknowledge that their approach may not generalize to all clinical contexts, as the performance is evaluated on specific datasets. Additionally, the reliance on pretrained models may limit the adaptability to unique clinical features not captured in the training data. The paper does not address potential biases in the datasets used, which could affect the generalizability of the findings.

**Why it matters**  
This research highlights the potential of tabular foundation models as a viable alternative for clinical survival prediction, suggesting that they can effectively leverage pretrained representations to improve performance in survival analysis tasks. The findings may encourage further exploration of transfer learning techniques in clinical settings, paving the way for more robust predictive models in healthcare. This work is significant for advancing methodologies in survival analysis, as discussed in the context of recent developments in machine learning for healthcare, as published in [arXiv](https://arxiv.org/abs/2606.12006v1).
