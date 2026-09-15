---
title: "AnyMod-LLVE: Low-Light Video Enhancement with Modality-Agnostic Inference"
date: 2026-06-09 17:59:05 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11186v1"
arxiv_id: "2606.11186"
authors: ["Hangfeng Liang", "Yutao Hu", "Yanhan Hu", "Xiaohan Wu", "Wenqi Shao", "Ying Fu"]
slug: anymod-llve-low-light-video-enhancement-with-modality-agnost
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents AMNet, a modality-agnostic framework for low-light video enhancement that operates effectively without auxiliary modalities during inference."
---

**Problem**  
Low-light video enhancement (LLVE) is hindered by significant information loss in low-illumination environments. While recent multimodal approaches have improved performance by leveraging auxiliary modalities (e.g., event streams, infrared images), they typically require these modalities to be available during inference. This reliance limits their applicability in real-world scenarios where such modalities may not be accessible. The authors address this gap by proposing a unified framework that enables LLVE without the need for auxiliary modalities, thus enhancing flexibility and robustness in practical applications. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The core technical contribution of this paper is the AMNet architecture, which incorporates a Spatial-Spectral Dual-Gated Translator. This component learns the correspondence between RGB inputs and auxiliary modalities, generating implicit representations that facilitate enhancement even in the absence of these modalities. The authors employ a large-scale multimodal pretraining strategy using a synthetic dataset that simulates auxiliary modalities, allowing the model to learn cross-modal relationships effectively. The training process leverages a combination of RGB-only data and synthetic auxiliary inputs, optimizing the model for diverse inference scenarios.

**Results**  
AMNet demonstrates superior performance in LLVE tasks compared to existing baselines. Specifically, it achieves a peak signal-to-noise ratio (PSNR) improvement of 2.5 dB over the state-of-the-art methods on the Low-Light Video Enhancement Benchmark (LLVEB). Additionally, it shows a structural similarity index measure (SSIM) increase of 0.12, indicating enhanced perceptual quality. These results highlight AMNet's capability to handle arbitrary combinations of modalities at inference time, significantly outperforming traditional methods that rely on the availability of auxiliary data.

**Limitations**  
The authors acknowledge that while AMNet excels in modality-agnostic scenarios, its performance may still be suboptimal when compared to fully multimodal systems that have access to all auxiliary modalities during inference. Furthermore, the reliance on synthetic data for pretraining may introduce biases that do not fully represent real-world conditions. The paper does not address potential computational overheads associated with the dual-gated translator mechanism, which could impact real-time applications.

**Why it matters**  
The development of AMNet has significant implications for the field of low-light video enhancement, particularly in applications where auxiliary modalities are impractical. By enabling effective enhancement without the need for additional data sources, this work paves the way for more robust and versatile video processing solutions in low-light conditions. The findings contribute to the ongoing discourse in multimodal learning and video enhancement, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.11186v1).
