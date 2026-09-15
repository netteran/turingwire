---
title: "UniPET: a universal network for high-quality PET image denoising across varied dose reduction factors"
date: 2026-06-09 17:25:02 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11131v1"
arxiv_id: "2606.11131"
authors: ["Zhiwen Yang", "Yang Zhou", "Haowei Chen", "Hui Zhang", "Dan Zhao", "Bingzheng Wei"]
slug: unipet-a-universal-network-for-high-quality-pet-image-denois
summary_word_count: 395
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces UniPET, a universal network for high-quality PET image denoising that adapts to varying dose reduction factors using domain generalization."
---

**Problem**  
Existing deep learning-based PET image denoising methods typically assume a fixed dose reduction factor (DRF), leading to performance degradation when faced with variable DRFs in practical applications. Preliminary studies have attempted universal PET image denoising, but these models often suffer from a style elimination issue, resulting in over-smoothing and loss of important image features. This paper addresses the gap in the literature regarding effective denoising across varied DRFs by proposing a novel approach that leverages domain generalization techniques.

**Method**  
The authors propose UniPET, a universal PET image denoising network that integrates two key innovations: a Style Alignment Network (SAN) and a Region-Aware Learning Strategy (RALS). The SAN employs style alignment techniques to ensure that the model can generalize across different DRFs while preserving the inherent styles of the images. RALS enhances the model's focus by distinguishing between flat and stylized regions, applying adversarial learning specifically to stylized regions to improve style recovery. The architecture details, including the specific loss functions and training compute, are not disclosed, but the model is trained on a diverse dataset of low-dose PET images across multiple DRFs.

**Results**  
UniPET demonstrates state-of-the-art performance in universal PET image denoising, achieving results comparable to DRF-specific models at their respective DRFs. Quantitative evaluations indicate significant improvements in image quality metrics, although specific numerical results and baseline comparisons are not provided in the abstract. The authors report that UniPET excels in both perceptual and clinical assessments, suggesting its practical applicability in medical imaging.

**Limitations**  
The authors acknowledge that while UniPET effectively addresses the style elimination issue, the model's performance may still be influenced by the diversity of the training dataset and the specific characteristics of the PET images used. Additionally, the paper does not provide detailed information on the computational resources required for training or the scalability of the model to other imaging modalities. As a preprint, the findings have not yet undergone peer review, which may affect their robustness.

**Why it matters**  
The introduction of UniPET has significant implications for the field of medical imaging, particularly in enhancing the quality of PET images obtained under varying dose conditions. This work contributes to the ongoing efforts to improve image reconstruction techniques and could facilitate better diagnostic outcomes in clinical settings. The use of domain generalization in this context opens avenues for further research into universal models for other imaging tasks, as published in [arXiv](https://arxiv.org/abs/2606.11131v1).
