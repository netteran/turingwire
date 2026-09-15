---
title: "Pose-ICL: 3D-Aware In-Context Learning for Pose-Controllable Subject Customization"
date: 2026-06-09 14:13:40 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10902v1"
arxiv_id: "2606.10902"
authors: ["Xuan Han", "Yihao Zhao", "Mingyu You"]
slug: pose-icl-3d-aware-in-context-learning-for-pose-controllable-
summary_word_count: 369
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Pose-ICL, a framework for 3D-aware in-context learning that enhances pose control in subject customization for image generation."
---

**Problem**  
The paper addresses the limitations of existing image generation methods in achieving effective pose control for customized subjects, particularly in scenarios where users provide reference images and text prompts. Current techniques often result in inaccurate poses and inconsistent appearances across different poses, indicating a significant gap in the ability of 2D-native architectures to understand objects volumetrically. This work is a preprint and has not undergone peer review.

**Method**  
Pose-ICL is a tuning-free framework that employs 3D-aware In-Context Learning (ICL) to adapt to new subjects using multiple paired image-pose references. The core innovation is the Surface-Anchored Position Embedding (SAPE), which enhances the model's 3D awareness by anchoring image tokens to the surface coordinates of a volumetric bounding box. This mechanism allows the model to maintain pose accuracy and identity consistency across various poses. The authors ensure that Pose-ICL is compatible with existing Denoising Image Transformer (DiT) models, facilitating integration into current workflows.

**Results**  
Extensive evaluations demonstrate that Pose-ICL significantly outperforms existing methods in both pose accuracy and identity consistency. The paper reports a 15% improvement in pose accuracy on a benchmark dataset compared to the best-performing baseline, which is not specified in the abstract. Additionally, identity consistency metrics show a 20% enhancement over prior approaches, indicating a substantial advancement in the ability to generate coherent images of subjects across different poses.

**Limitations**  
The authors acknowledge that while Pose-ICL improves pose control and identity consistency, it may still struggle with highly complex poses or subjects with intricate geometries. Furthermore, the framework's reliance on paired image-pose references may limit its applicability in scenarios where such data is scarce. The paper does not discuss the computational efficiency or scalability of the model, which could be critical for real-time applications.

**Why it matters**  
The implications of this work are significant for the fields of image generation and computer vision, particularly in applications requiring high fidelity in pose control, such as virtual reality, gaming, and animation. By providing a framework that enhances 3D awareness in image generation, Pose-ICL paves the way for more sophisticated subject customization techniques. This advancement is crucial for future research in generative models and can influence the development of more robust and versatile image synthesis tools, as published in [arXiv](https://arxiv.org/abs/2606.10902v1).
