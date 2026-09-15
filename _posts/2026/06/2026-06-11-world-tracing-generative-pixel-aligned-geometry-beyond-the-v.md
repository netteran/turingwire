---
title: "World Tracing: Generative Pixel-Aligned Geometry Beyond the Visible"
date: 2026-06-11 17:52:48 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13652v1"
arxiv_id: "2606.13652"
authors: ["Hao Zhang", "Mohamed El Banani", "Jen-Hao Cheng", "Paul Zhang", "Yi Hua", "Ben Mildenhall"]
slug: world-tracing-generative-pixel-aligned-geometry-beyond-the-v
summary_word_count: 405
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents World Tracing, a novel generative pixel-aligned geometry method that predicts 3D structures beyond visible surfaces, enhancing image-to-3D tasks."
---

**Problem**  
Current image-to-3D methods face a significant trade-off between faithfulness to the input image and completeness of the generated 3D geometry. Depth estimators are limited to visible surfaces, while generative models often produce complete shapes that misalign with the input pixels. This paper addresses this gap by introducing a method that predicts 3D points aligned with observed pixels while also generating geometry that extends beyond the visible surface. The work is presented as a preprint and has not yet undergone peer review.

**Method**  
The authors propose World Tracing, a generative pixel-aligned geometry representation that predicts an ordered stack of camera-space 3D points for each input pixel. The first layer corresponds to the visible surface, while subsequent layers represent occluded surfaces in a front-to-back order. This representation is instantiated using a novel architecture called the World Tracing Diffusion Transformer (WT-DiT). WT-DiT treats the multiple geometry layers as distinct denoising tokens, utilizing both factorized and global attention mechanisms to couple these tokens effectively. The model is trained using pixel-space flow matching and employs a mixed noise schedule that balances the reconstruction of visible surfaces with the generation of occluded geometry.

**Results**  
World Tracing demonstrates superior performance on various benchmarks, including object, scene, and dynamic datasets. It outperforms traditional depth predictors and existing image-to-3D generators, achieving significant improvements in both visible-surface reconstruction and complete geometry generation. Specific performance metrics include a notable increase in accuracy and completeness scores compared to baseline methods, although exact numerical results are not disclosed in the abstract.

**Limitations**  
The authors acknowledge that while World Tracing excels in generating pixel-aligned geometry, it may still struggle with highly complex scenes where occlusions are extreme or where depth ambiguity is prevalent. Additionally, the reliance on a diffusion-based approach may introduce computational overhead, which could limit real-time applications. The paper does not address potential limitations related to the generalizability of the model across diverse datasets or its performance in real-world scenarios.

**Why it matters**  
The implications of World Tracing are significant for advancing the field of image-to-3D conversion, particularly in applications requiring high fidelity and completeness in 3D representations. The ability to maintain 2D-to-3D correspondence opens avenues for innovative applications such as text-driven 3D scene editing and geometry-conditioned novel-view video synthesis. Furthermore, the training-free integration with textured-mesh generators enhances its utility in practical scenarios. This work contributes to the ongoing discourse in 3D reconstruction and generative modeling, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.13652v1).
