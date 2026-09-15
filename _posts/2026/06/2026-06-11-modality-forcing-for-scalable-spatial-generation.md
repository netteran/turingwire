---
title: "Modality Forcing for Scalable Spatial Generation"
date: 2026-06-11 17:59:45 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13676v1"
arxiv_id: "2606.13676"
authors: ["Bardienus Pieter Duisterhof", "Deva Ramanan", "Jeffrey Ichnowski", "Justin Johnson", "Keunhong Park"]
slug: modality-forcing-for-scalable-spatial-generation
summary_word_count: 395
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Modality Forcing, a scalable method for joint image-depth generation using sparse depth data with a single DiT model."
---

**Problem** — This work addresses the challenge of synthesizing photorealistic, cluttered scenes that require an understanding of geometry, such as perspective and relative scale. Existing methods for adapting text-to-image (T2I) models to depth prediction often rely on dense depth data and complex training procedures. The authors propose a simpler, scalable approach that utilizes sparse depth data, filling a gap in the literature regarding efficient joint image-depth generation.

**Method** — The core contribution is the Modality Forcing technique, which allows for conditional and joint generation of images and depth maps by assigning distinct noise levels to each modality. This method employs a single Denoising Image Transformer (DiT) model, trained on sparse real-world depth data. The architecture supports per-modality decoders, enabling effective training despite the limited depth data. The authors also explore the scalability of T2I pre-training by training multiple models ranging from 370M to 3.3B parameters, demonstrating that larger models trained on more extensive image datasets yield improved depth prediction performance.

**Results** — The proposed method achieves a significant reduction in Absolute Relative Error (AbsRel) by 57% compared to existing joint image-depth generative models. The strongest model developed in this study competes favorably with state-of-the-art monocular depth estimators, showcasing the effectiveness of Modality Forcing in enhancing depth prediction accuracy. The results indicate that the approach not only improves depth estimation but also leverages the scalability inherent in T2I pre-training.

**Limitations** — The authors acknowledge that the reliance on sparse depth data may limit the generalizability of the model in scenarios where dense depth information is available. Additionally, the paper does not extensively evaluate the performance of the model across diverse datasets or in real-world applications, which could provide further insights into its robustness. The scalability of the approach is promising, but the computational cost associated with training larger models may be a barrier for some applications.

**Why it matters** — The implications of this work are significant for advancing the field of spatial perception in AI. By demonstrating that image generation can serve as a scalable pre-training objective for depth perception, the authors open avenues for future research in multimodal generative models. This approach could lead to more efficient training methodologies and improved performance in applications requiring depth understanding, such as robotics and autonomous navigation. The findings are particularly relevant for researchers exploring the intersection of computer vision and generative modeling, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13676v1).
