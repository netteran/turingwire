---
title: "ActiveSAM: Image-Conditional Class Pruning for Fast and Accurate Open-Vocabulary Segmentation"
date: 2026-06-15 17:31:30 +0000
category: research
subcategory: efficiency_inference
company: "null"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16996v1"
arxiv_id: "2606.16996"
authors: ["Tran Dinh Tien", "Zhiqiang Shen"]
slug: activesam-image-conditional-class-pruning-for-fast-and-accur
summary_word_count: 404
classification_confidence: 0.85
source_truncated: false
layout: post
description: "ActiveSAM introduces a zero-shot inference framework for efficient open-vocabulary segmentation, enhancing speed and accuracy over existing methods."
---

**Problem**  
This paper addresses the inefficiency of applying the Segment Anything Model 3 (SAM 3) directly to open-vocabulary semantic segmentation (OVSS). The authors highlight that traditional methods require full-resolution decoding across the entire dataset vocabulary, despite each image containing only a limited subset of classes. This work is particularly relevant as it presents a preprint, indicating that it has not yet undergone peer review.

**Method**  
ActiveSAM is a training-free, zero-shot inference framework designed to optimize the segmentation process. The method begins by canonicalizing and expanding class prompts, followed by estimating an image-conditioned active set using a low-resolution presence preview. This preview stage leverages class-presence evidence to filter out unnecessary computations, allowing only the relevant classes to be decoded at full resolution. The final segmentation stage employs bucketed prompt multiplexing with the frozen SAM 3 decoder and incorporates margin-aware background calibration to mitigate low-confidence pixel predictions. Notably, ActiveSAM does not require any target-dataset training, weight updates, or oracle class-presence labels, making it highly efficient.

**Results**  
ActiveSAM demonstrates significant improvements over the state-of-the-art method, SegEarth-OV3, achieving an average increase of approximately +1.4 mIoU across eight OVSS benchmarks while operating up to 5.5 times faster on large-vocabulary datasets. These results indicate a favorable speed-accuracy tradeoff, which is critical for real-time applications. The robustness of ActiveSAM is also highlighted, as it shows superior performance under image corruption scenarios that mimic real-world distribution shifts.

**Limitations**  
The authors acknowledge that while ActiveSAM is effective in improving speed and accuracy, it may still be limited by the inherent constraints of the SAM 3 backbone, particularly in scenarios where the class distribution is highly imbalanced. Additionally, the reliance on a low-resolution presence preview may introduce challenges in accurately capturing the full complexity of class distributions in certain images. The paper does not address potential limitations related to the scalability of the method to extremely large datasets or the impact of varying image qualities on performance.

**Why it matters**  
The implications of ActiveSAM are significant for the field of open-vocabulary semantic segmentation, particularly in applications requiring real-time processing, such as autonomous driving and embodied AI. By providing a framework that enhances both speed and accuracy without the need for extensive training, this work paves the way for more efficient deployment of segmentation models in dynamic environments. The advancements presented in this paper contribute to the ongoing evolution of segmentation techniques, as discussed in related literature, and are available for further exploration on [arXiv](https://arxiv.org/abs/2606.16996v1).
