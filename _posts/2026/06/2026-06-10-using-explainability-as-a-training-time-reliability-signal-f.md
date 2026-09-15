---
title: "Using Explainability as a Training-Time Reliability Signal for Efficient ECG Classification"
date: 2026-06-10 15:55:00 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12252v1"
arxiv_id: "2606.12252"
authors: ["Veerendhra Kumar Dangeti", "Xiao Gu", "Ying Weng", "Shreyank N Gowda"]
slug: using-explainability-as-a-training-time-reliability-signal-f
summary_word_count: 360
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ERTS, an explainability-based training signal that enhances efficiency and reliability in ECG classification by filtering samples based on attention maps."
---

**Problem**  
The paper addresses the computational inefficiency in training deep neural networks for electrocardiogram (ECG) classification, particularly in resource-constrained healthcare environments. Existing methods like Progressive Data Dropout, which reduces training costs by excluding learned samples, may inadvertently retain noisy or ambiguous data, leading to suboptimal model performance. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose ERTS (Explainability-based Reliability Training Signal), which leverages Grad-CAM (Gradient-weighted Class Activation Mapping) to generate attention maps for candidate samples during training. The focus score derived from these maps quantifies the coherence and locality of model predictions. Samples with low focus scores, indicating unreliable uncertainty, are filtered out, while those with high focus scores are prioritized for gradient updates. This method is integrated into the training process of various backbone architectures across three ECG datasets, enhancing the model's ability to learn from informative data while reducing training costs.

**Results**  
The implementation of ERTS resulted in consistent improvements in macro-F1 scores across the evaluated ECG datasets compared to baseline methods. Specific performance metrics were not disclosed in the abstract, but the authors emphasize a reduction in effective training costs alongside improved classification reliability. The results indicate that the use of explanation quality as a training signal can significantly enhance model performance in clinical time-series analysis.

**Limitations**  
The authors acknowledge that the reliance on Grad-CAM for generating attention maps may introduce biases based on the architecture used, potentially affecting the generalizability of the method across different models. Additionally, the paper does not address the scalability of ERTS in larger datasets or its performance in real-time clinical settings. The effectiveness of the focus score in various contexts beyond ECG classification remains unexplored.

**Why it matters**  
The introduction of ERTS presents a novel approach to improving the efficiency and reliability of deep learning models in clinical applications, particularly in ECG classification. By utilizing explainability as a training signal, this work opens avenues for further research into integrating interpretability with model training, potentially leading to more robust healthcare AI systems. The implications of this research extend to other time-series analysis tasks in healthcare, where model reliability is critical. This work is available on [arXiv](https://arxiv.org/abs/2606.12252v1).
