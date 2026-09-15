---
title: "Cranio-Diff: Diffusion-based Cross-domain Craniofacial Reconstruction with 2D X-ray Skull Guidance and Structural Identity Constraints"
date: 2026-06-08 16:20:35 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09699v1"
arxiv_id: "2606.09699"
authors: ["Ravi Shankar Prasad", "Naresh Gurjar", "Shashank Baghel", "Chirag", "Dinesh Singh"]
slug: cranio-diff-diffusion-based-cross-domain-craniofacial-recons
summary_word_count: 374
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Cranio-Diff, a diffusion-based framework for cross-domain craniofacial reconstruction using 2D X-ray skull images."
---

**Problem**  
Existing generative models like CycleGAN and Pix2Pix struggle with cross-modality semantic alignment in craniofacial reconstruction, particularly when translating from X-ray skull images to optical face images. This paper addresses the gap in effective methods for capturing structural identity across modalities, which is critical for accurate craniofacial reconstruction. Notably, this work is a preprint and has not undergone peer review.

**Method**  
Cranio-Diff employs a diffusion-based architecture that integrates skull-conditioned structural guidance through ControlNet, alongside biometric text conditioning. This dual conditioning allows for the generation of facial images that are semantically and structurally aligned with the input skull images. The model is trained on a unique dataset comprising X-ray scans of 120 subjects, with images synthesized across three age groups (25, 45, 65) and three BMI variations (-10%, baseline, +10%), resulting in a total of 4320 paired samples. The training process leverages advanced loss functions and metrics, including FID, IS, SSIM, LPIPS, PSNR, and ArcFace score, to ensure high-quality image generation and retrieval performance.

**Results**  
Cranio-Diff demonstrates superior performance compared to existing methods in both image quality and retrieval tasks. The paper reports significant improvements in FID and IS scores, although specific numerical results are not disclosed in the abstract. The retrieval performance is evaluated using metrics such as recall@k, mAP@k, and MRR@k, with the proposed method achieving higher scores than baseline models, indicating its effectiveness in generating semantically relevant facial images from X-ray data.

**Limitations**  
The authors acknowledge that the dataset, while extensive, is limited to a specific demographic and may not generalize across diverse populations. Additionally, the reliance on structural identity constraints may introduce biases if the skull images do not represent the full variability of craniofacial structures. The paper does not address potential computational costs associated with the diffusion model, which may limit its applicability in real-time scenarios.

**Why it matters**  
Cranio-Diff represents a significant advancement in the field of craniofacial reconstruction, providing a novel approach to cross-domain image synthesis that could enhance forensic investigations and medical applications. The integration of structural identity constraints with diffusion models opens new avenues for research in generative modeling and cross-modal learning. This work lays the groundwork for future studies aimed at improving the accuracy and applicability of craniofacial reconstruction techniques, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.09699v1).
