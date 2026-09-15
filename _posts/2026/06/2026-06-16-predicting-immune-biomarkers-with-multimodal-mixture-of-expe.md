---
title: "Predicting Immune Biomarkers with MultiModal Mixture-of-Expert Pathology Foundation Models Empowers Precision Oncology"
date: 2026-06-16 16:22:42 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18123v1"
arxiv_id: "2606.18123"
authors: ["Tianyu Liu", "Ziqing Wang", "Zhaokang Liang", "Tong Ding", "Peter Humphrey", "Lorraine Col\u00f3n-Cartagena"]
slug: predicting-immune-biomarkers-with-multimodal-mixture-of-expe
summary_word_count: 371
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents MixTIME, a multimodal mixture-of-experts model for predicting immune biomarkers, enhancing precision oncology through advanced pathology analysis."
---

**Problem**  
Current methodologies for predicting immune biomarkers associated with the tumor immune microenvironment (TIME) are predominantly limited to single image modalities, which restricts their resolution and the effective use of complementary clinical and biological data. This paper addresses this gap by introducing a multimodal approach that integrates various data types to improve biomarker prediction accuracy. Notably, this work is a preprint and has not undergone peer review.

**Method**  
The authors propose MixTIME, a multimodal foundation model utilizing a mixture-of-experts (MoE) architecture. This model integrates three distinct modalities: UNIv2 (image-only), CONCHv1.5 (image-text), and STPath (image-transcriptomic). The architecture employs a learnable router that dynamically adjusts the contributions of each expert based on the input data. The training process utilizes a distribution- and tendency-aware loss function, which enhances the model's ability to predict multiplex immunofluorescence (mIF) protein expression from hematoxylin and eosin (HE) whole-slide images. The model is trained on two datasets of varying scales, allowing for robust performance evaluation.

**Results**  
MixTIME achieves state-of-the-art performance across 17 protein markers, as measured by correlation metrics on the benchmark datasets. The model significantly outperforms existing baselines, although specific baseline models and exact performance metrics are not disclosed in the summary. The predicted mIF profiles from MixTIME facilitate improved outcomes in downstream tasks, including spatial domain identification, survival prediction, and AI-assisted pathology report generation, validated by expert pathologists from multiple institutions.

**Limitations**  
The authors acknowledge that the model's performance may be influenced by the quality and diversity of the training datasets. Additionally, the reliance on a mixture-of-experts architecture may introduce complexity in model interpretability. The paper does not address potential biases in the datasets or the generalizability of the model across different populations or tumor types.

**Why it matters**  
The introduction of MixTIME represents a significant advancement in the field of computational pathology, providing a scalable framework for multimodal biomarker discovery and clinical translation. By enhancing the predictive capabilities for immune biomarkers, this work has the potential to improve precision oncology strategies, particularly in understanding tumor microenvironments and their implications for treatment resistance and immune suppression. The findings underscore the importance of integrating diverse data modalities in cancer research, as highlighted in related literature on multimodal learning and its applications in healthcare, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.18123v1).
