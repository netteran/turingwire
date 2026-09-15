---
title: "Masked and Predictive Self-Supervised Foundation Models for 3D Brain MRI"
date: 2026-06-11 13:09:59 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13315v1"
arxiv_id: "2606.13315"
authors: ["Esra Erg\u00fcn", "Hersh Chandarana", "Dan Sodickson", "G\u00f6zde \u00dcnal"]
slug: masked-and-predictive-self-supervised-foundation-models-for-
summary_word_count: 440
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper explores self-supervised pretraining paradigms for MRI-based disease detection, introducing novel loss functions to enhance model performance."
---

**Problem**  
Existing research on self-supervised foundation models in MRI has predominantly focused on segmentation and dense prediction tasks, leaving a gap in systematic investigations for disease detection. This paper addresses this gap by evaluating two self-supervised pretraining paradigms—Masked Autoencoders (MAE) and Joint Embedding Predictive Architectures (JEPA)—specifically for MRI-based disease detection. The work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose two self-supervised learning frameworks: MAE, which utilizes a novel spectral-domain reconstruction loss to enhance sensitivity to fine-grained anatomical structures, and JEPA, which incorporates variance-covariance regularization (VCR) to promote decorrelated latent representations. The models are pretrained on heterogeneous single-contrast MRI volumes in a contrast-agnostic manner, avoiding modality concatenation. The MAE framework focuses on reconstructing masked portions of the input, while JEPA emphasizes predictive learning through joint embeddings. The training process leverages auxiliary objectives tailored to the specific characteristics of MRI data, aiming to improve the downstream performance on disease detection tasks.

**Results**  
The proposed MAE with spectral-domain supervision consistently outperforms baseline models across five downstream disease detection tasks. Notably, the MAE model achieves a significant improvement in performance metrics, particularly when the discriminative signal is characterized by high-frequency anatomical structures. The authors report that spectral regularization leads to the largest performance gains in scenarios where fine-grained anatomical details are crucial, while covariance regularization enhances performance when the discriminative information is spread across multiple decorrelated feature dimensions. Specific performance metrics and comparisons to baseline models are not detailed in the abstract but are expected to be elaborated in the full paper.

**Limitations**  
The authors acknowledge that their study is limited by the reliance on single-contrast MRI volumes, which may not capture the full spectrum of anatomical variations present in multi-contrast settings. Additionally, the generalizability of the findings to other imaging modalities or clinical scenarios remains untested. The paper does not address potential biases introduced by the self-supervised objectives, which may affect the robustness of the models in diverse clinical applications.

**Why it matters**  
This work highlights the critical role of self-supervised objective design in enhancing the performance of foundation models for medical imaging, particularly in the context of disease detection. The findings suggest that the choice of pretraining objectives can significantly influence downstream task performance, emphasizing the need for tailored approaches in medical applications. This research contributes to the growing body of literature on self-supervised learning in healthcare, paving the way for more effective diagnostic tools. The implications of this study are relevant for future work in medical imaging, as it underscores the importance of aligning self-supervised learning objectives with the structural characteristics of the target tasks, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13315v1).
