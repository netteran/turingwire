---
title: "U-TTT: Towards Generalizable PET Image Denoising via Test-Time Training"
date: 2026-06-09 16:02:48 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11032v1"
arxiv_id: "2606.11032"
authors: ["Zhiwen Yang", "Jiayin Li", "Hao Lu", "Hui Zhang", "Zihua Wang", "Bingzheng Wei"]
slug: u-ttt-towards-generalizable-pet-image-denoising-via-test-tim
summary_word_count: 408
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents U-TTT, a novel U-shaped model for PET image denoising that adapts to distribution shifts via Test-Time Training layers."
---

**Problem**  
Existing deep learning models for Positron Emission Tomography (PET) image denoising exhibit significant performance degradation when faced with distribution shifts, such as variations in dose levels or scanner types. This limitation arises from the conventional approach of using fixed-parameter models that cannot adapt post-training. The authors address this gap by proposing a method that allows for dynamic parameter adjustment during inference, enhancing the robustness of PET image denoising in clinical settings. This work is a preprint and has not yet undergone peer review.

**Method**  
The proposed architecture, U-TTT, is a U-shaped model that incorporates Test-Time Training (TTT) layers to facilitate self-supervised adaptation of model parameters during inference. U-TTT employs a dual-domain adaptation mechanism, consisting of two key components: the Spatial Test-Time Training (S-TTT) layer and the Frequency Test-Time Training (F-TTT) layer. The S-TTT layer is designed to address spatial structural degradations, while the F-TTT layer focuses on suppressing global noise spectra and restoring high-frequency details. The model is trained on a dataset of 3D PET images, although specific details regarding the training compute and dataset size are not disclosed.

**Results**  
U-TTT demonstrates state-of-the-art performance in PET image denoising across various benchmarks, particularly under challenging conditions involving unseen dose levels and scanner types. The authors report that U-TTT outperforms existing baselines, achieving a notable improvement in Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM) metrics. While exact numerical results are not provided in the summary, the authors emphasize the model's superior generalization capabilities compared to traditional fixed-parameter models.

**Limitations**  
The authors acknowledge that while U-TTT shows promising results, it may still be sensitive to extreme variations in test data that were not represented in the training set. Additionally, the computational overhead introduced by the TTT layers during inference could be a concern in real-time clinical applications. The paper does not discuss the scalability of the model to larger datasets or its performance in diverse clinical environments beyond those tested.

**Why it matters**  
The introduction of U-TTT represents a significant advancement in the field of PET image denoising, particularly in its ability to generalize across varying conditions encountered in clinical practice. By enabling models to adapt dynamically during inference, this approach could enhance the reliability of PET imaging in diverse settings, ultimately improving diagnostic accuracy. The implications of this work extend to other imaging modalities facing similar challenges with distribution shifts, suggesting a broader applicability of the Test-Time Training paradigm in medical imaging, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11032v1).
