---
title: "AIGS-Net: Compact Illumination Field Modeling via 2D Gaussian Splatting for Fast Low-Light Image Enhancement"
date: 2026-06-16 14:45:55 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.17998v1"
arxiv_id: "2606.17998"
authors: ["Yuhan Chen", "Kunyang Huang", "Fuchen Li", "Zhuohan Qin", "Guofa Li", "Wenbo Chu"]
slug: aigs-net-compact-illumination-field-modeling-via-2d-gaussian
summary_word_count: 382
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces AIGS-Net, a lightweight architecture for low-light image enhancement that balances representation capacity and computational efficiency."
---

**Problem**  
Existing low-light image enhancement techniques struggle with the trade-off between the representation capacity of illumination-field modeling and computational complexity. This paper addresses this gap by proposing a novel architecture, AIGS-Net, which is designed to enhance low-light images efficiently while maintaining high-quality output. The work is presented as a preprint and has not undergone peer review.

**Method**  
AIGS-Net employs an Adaptive Illumination Gaussian Splatting approach, which constructs a 2D Gaussian Splatting illumination field that adapts to the input image. The architecture dynamically modulates the opacity of Gaussian basis functions based on the relative luminance statistics of the input, allowing for spatially varying illumination compensation through ordered alpha compositing. A key innovation is the introduction of a zero-parameter nonlinear multiscale contextual encoding module, which extracts low-frequency structures and local contrast cues without the need for additional convolutional weights. To mitigate noise amplification and sensor-induced color bias, the model incorporates several techniques: noise-mask estimation, locked single-channel Gamma mapping, cross-channel consistency regularization, and target color-alignment constraints. The overall architecture is ultra-lightweight, utilizing approximately 40 learnable parameters, which significantly enhances inference efficiency.

**Results**  
AIGS-Net was evaluated on the LOL and LSRW benchmarks, demonstrating superior performance in detail recovery and color fidelity compared to existing methods. The paper reports that AIGS-Net achieves a notable improvement in enhancement quality while maintaining extreme inference efficiency, although specific quantitative metrics (e.g., PSNR, SSIM) against named baselines are not detailed in the summary provided.

**Limitations**  
The authors acknowledge that while AIGS-Net offers significant improvements in efficiency and quality, the reliance on a limited number of learnable parameters may restrict its adaptability to highly diverse low-light conditions. Additionally, the paper does not discuss the potential impact of varying noise levels in input images on the model's performance, nor does it explore the generalizability of the approach across different datasets beyond LOL and LSRW.

**Why it matters**  
The development of AIGS-Net has important implications for real-time low-light image enhancement applications, particularly in fields such as surveillance, photography, and autonomous driving, where quick and effective image processing is crucial. The lightweight nature of the model allows for deployment on resource-constrained devices, making it a valuable contribution to the ongoing research in low-light image processing. This work is relevant for future studies aiming to balance computational efficiency with enhancement quality, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.17998v1).
