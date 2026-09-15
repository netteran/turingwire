---
title: "EvTexture++: Event-Driven Texture Enhancement for Video Super-Resolution"
date: 2026-06-11 17:04:08 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13580v1"
arxiv_id: "2606.13580"
authors: ["Dachun Kai", "Jiayao Lu", "Yueyi Zhang", "Xiaoyan Sun"]
slug: evtexture-event-driven-texture-enhancement-for-video-super-r
summary_word_count: 423
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces EvTexture++, an event-driven framework for enhancing texture in video super-resolution, achieving state-of-the-art performance."
---

**Problem**  
This work addresses the gap in video super-resolution (VSR) techniques that primarily focus on motion refinement, neglecting the enhancement of texture quality. While previous methods have utilized event-based vision for flow estimation and temporal alignment, they have not leveraged the high-frequency spatiotemporal details from events specifically for texture enhancement. The authors present EvTexture++, the first framework dedicated to this purpose, highlighting the need for improved texture recovery in VSR, particularly in scenarios with large motions that can lead to flickering artifacts. This paper is a preprint and has not yet undergone peer review.

**Method**  
EvTexture++ introduces a novel architecture that includes a customized texture enhancement branch and an iterative texture enhancement module. The texture enhancement branch is designed to progressively exploit high-temporal-resolution event information, allowing for gradual refinement of texture regions across multiple iterations. The iterative module enhances texture recovery by utilizing event data to restore fine details. Additionally, a temporal texture alignment module is incorporated to address inter-frame consistency issues, estimating event-guided texture-aware flow for precise alignment of textures across frames. The framework is designed to be a plug-and-play solution, compatible with existing VSR models, thereby enhancing their performance without requiring extensive modifications.

**Results**  
The authors conducted experiments on five datasets, demonstrating that EvTexture++ achieves state-of-the-art performance in VSR tasks. Notably, when integrated into recent VSR models, EvTexture++ yields significant improvements, achieving up to 1.55 dB gains in Peak Signal-to-Noise Ratio (PSNR) on the texture-rich Vid4 dataset compared to baseline models. The results indicate that the proposed method not only enhances texture quality but also maintains temporal consistency, outperforming existing techniques in both qualitative and quantitative assessments.

**Limitations**  
The authors acknowledge that while EvTexture++ significantly improves texture enhancement, it may still be sensitive to the quality of input event data. Additionally, the iterative nature of the texture enhancement process could lead to increased computational overhead, which may limit real-time applications. The paper does not address potential limitations related to the scalability of the method across diverse video content or the impact of varying lighting conditions on event data quality.

**Why it matters**  
The introduction of EvTexture++ has significant implications for the field of video super-resolution, particularly in applications requiring high fidelity in texture representation, such as video editing, gaming, and surveillance. By focusing on texture enhancement through event-driven signals, this work opens new avenues for research in VSR and event-based vision systems. The ability to integrate this framework with existing models enhances its utility, making it a valuable contribution to the ongoing development of advanced VSR techniques, as published in [arXiv](https://arxiv.org/abs/2606.13580v1).
