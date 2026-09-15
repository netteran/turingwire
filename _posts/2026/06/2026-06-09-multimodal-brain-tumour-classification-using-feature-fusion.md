---
title: "Multimodal Brain Tumour Classification Using Feature Fusion"
date: 2026-06-09 17:03:50 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11107v1"
arxiv_id: "2606.11107"
authors: ["Wajih ul Islam", "Muhammad Yaqoob", "Javed Ali Khan", "Volker Steuber"]
slug: multimodal-brain-tumour-classification-using-feature-fusion
summary_word_count: 356
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a two-branch multimodal network for brain tumor classification, integrating MRI scans and radiomic features to enhance diagnostic accuracy."
---

**Problem**  
Current deep learning approaches for brain tumor classification predominantly utilize single-modality data, typically MRI or CT images, which limits their ability to emulate the comprehensive diagnostic process employed by clinicians. This paper addresses the gap in multimodal reasoning by proposing a model that integrates both imaging data and extracted radiomic features. The work is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a two-branch multimodal neural network architecture that combines raw MRI scans with 91 radiomic features, which include intensity, texture, shape, and boundary descriptors. The image data is processed through a pre-trained Convolutional Neural Network (CNN) backbone, while the radiomic features are encoded using a dedicated Multi-Layer Perceptron (MLP). The fusion of these two streams is achieved through three different strategies: concatenation, gated fusion, and bidirectional cross-modal attention. The model is trained on a balanced dataset comprising 7,200 images, with the training compute details not explicitly disclosed.

**Results**  
The multimodal configurations consistently outperform unimodal baselines across nine experimental runs. The gated fusion strategy yields the highest classification accuracy of 96.13%, significantly surpassing the performance of models that rely solely on either MRI or radiomic features. The paper does not provide specific baseline accuracy figures for unimodal approaches, but the improvement indicates a substantial enhancement in diagnostic capability through multimodal integration.

**Limitations**  
The authors acknowledge that their study is limited by the reliance on a specific dataset, which may not generalize to other populations or imaging protocols. Additionally, the model's performance in real-world clinical settings remains untested, and the computational efficiency of the proposed architecture is not discussed. The absence of a comprehensive comparison with other state-of-the-art multimodal approaches is another potential limitation.

**Why it matters**  
This research highlights the importance of integrating multiple data modalities to improve diagnostic accuracy in medical imaging, particularly in complex cases like brain tumors. The findings suggest that multimodal approaches can better replicate the nuanced decision-making processes of clinicians, potentially leading to improved patient outcomes. Future work could build on this framework to explore additional modalities or refine the fusion techniques, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.11107v1).
