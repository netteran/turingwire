---
title: "Lip Forcing: Few-Step Autoregressive Diffusion for Real-time Lip Synchronization"
date: 2026-06-09 17:56:36 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11180v1"
arxiv_id: "2606.11180"
authors: ["Paul Hyunbin Cho", "Jinhyuk Jang", "SeokYoung Lee", "Joungbin Lee", "Siyoon Jin", "Heeseong Shin"]
slug: lip-forcing-few-step-autoregressive-diffusion-for-real-time-
summary_word_count: 396
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Lip Forcing, an autoregressive diffusion method for real-time lip synchronization, achieving significant speed improvements over existing models."
---

**Problem**  
Current diffusion-based lip synchronization models, while achieving high visual quality and audio-visual alignment, are hindered by their reliance on full-sequence bidirectional attention and extensive denoising steps, making them impractical for real-time applications. This paper addresses this gap by proposing Lip Forcing, which is the first autoregressive diffusion method specifically designed for video-to-video (V2V) lip synchronization. The authors highlight that existing literature lacks efficient real-time solutions, particularly those that leverage the strengths of diffusion models while maintaining low latency.

**Method**  
Lip Forcing distills a 14B parameter audio-conditioned bidirectional video diffusion teacher model into causal student models. The core technical contributions include a novel inference strategy that generates each video chunk in only two denoising steps, eliminating the need for inference-time Classifier-Free Guidance (CFG). The authors introduce three components derived from a lip-sync-specific teacher-trajectory analysis: Sync-Window DMD, which optimizes the temporal window for synchronization; a two-step inference schedule that enhances efficiency; and a SyncNet-based reward mechanism that reinforces synchronization accuracy. The model is validated using two student scales, both distilled from the 14B teacher, with the 1.3B student model achieving real-time performance.

**Results**  
The 1.3B student model operates at 31 frames per second (FPS), which is $17.6\times$ faster than its same-scale bidirectional counterpart. The 14B student model, the largest diffusion model reported for V2V lip synchronization, runs $39.8\times$ faster than its teacher while maintaining comparable reference fidelity. Both models achieve a time-to-first-frame of sub-millisecond, significantly outperforming existing diffusion baselines in terms of speed and responsiveness.

**Limitations**  
The authors acknowledge that while Lip Forcing achieves real-time performance, the tradeoff between fidelity and synchronization accuracy remains a challenge, particularly in scenarios where CFG is not employed. Additionally, the reliance on a teacher model may limit the generalizability of the student models to other tasks or domains outside of lip synchronization. The paper does not address potential issues related to the scalability of the method to larger datasets or more complex synchronization tasks.

**Why it matters**  
Lip Forcing represents a significant advancement in the field of lip synchronization, particularly for applications requiring real-time processing, such as virtual avatars and interactive media. The findings suggest that autoregressive diffusion methods can effectively bridge the gap between high-quality output and low-latency requirements, paving the way for future research in efficient generative models. This work is particularly relevant for researchers exploring real-time applications of deep learning in multimedia contexts, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11180v1).
