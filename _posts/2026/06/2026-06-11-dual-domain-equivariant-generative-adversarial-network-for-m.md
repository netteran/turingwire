---
title: "Dual-Domain Equivariant Generative Adversarial Network for Multimodal CT-PET Synthesis"
date: 2026-06-11 13:30:56 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13341v1"
arxiv_id: "2606.13341"
authors: ["Gabriel Steele", "Alzahra Altalib", "Alessandro Perelli"]
slug: dual-domain-equivariant-generative-adversarial-network-for-m
summary_word_count: 400
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces DDE-GAN, a novel architecture for multimodal CT-PET synthesis that leverages dual-domain learning and rotational equivariance."
---

**Problem**  
The paper addresses the limitations of traditional GANs in multimodal image synthesis, specifically for CT-PET images, which often lack geometric consistency and structural fidelity due to their operation solely in the spatial domain. The authors highlight that existing methods do not adequately capture the complementary information from both spatial and frequency domains, leading to suboptimal synthesis quality. This work is a preprint and has not undergone peer review.

**Method**  
The core contribution is the Dual-Domain Equivariant Generative Adversarial Network (DDE-GAN), which synthesizes CT-PET images by jointly learning from both spatial and frequency (Fourier) domains. The architecture incorporates rotational equivariance into the loss functions of both the generator and discriminator, ensuring that the model maintains consistent outputs under rotations, which is critical for anatomical accuracy. The training employs a hierarchical dual-domain strategy that enforces intra- and inter-domain consistency through multi-stage loss functions. The authors do not disclose specific training compute details but emphasize the importance of the dual-domain approach in enhancing synthesis quality.

**Results**  
DDE-GAN was evaluated on the HECKTOR 2022 CT-PET dataset, demonstrating significant improvements over baseline models. The paper reports that DDE-GAN achieves a peak signal-to-noise ratio (PSNR) of 34.2 dB and a structural similarity index (SSIM) of 0.92, outperforming traditional GANs and other state-of-the-art methods, which typically yield PSNR values around 30 dB and SSIM values below 0.85. These results indicate a substantial enhancement in synthesis quality, with effect sizes suggesting a clear advantage in both anatomical fidelity and robustness.

**Limitations**  
The authors acknowledge that while DDE-GAN improves synthesis quality, it may still struggle with extreme variations in anatomical structures or pathological conditions not represented in the training data. Additionally, the reliance on dual-domain learning may increase computational complexity and training time, which could limit its applicability in real-time scenarios. The paper does not address potential overfitting issues or the generalizability of the model to other multimodal imaging tasks beyond CT-PET synthesis.

**Why it matters**  
The implications of this work are significant for the fields of medical imaging and radiology, particularly in enhancing the accuracy of multimodal image synthesis, which is crucial for applications such as PET completion and data augmentation. The integration of dual-domain learning and geometric equivariance could pave the way for more robust models in medical imaging, potentially improving diagnostic capabilities and treatment planning. This research contributes to the ongoing discourse on leveraging advanced GAN architectures for complex imaging tasks, as published in [arXiv](https://arxiv.org/abs/2606.13341v1).
