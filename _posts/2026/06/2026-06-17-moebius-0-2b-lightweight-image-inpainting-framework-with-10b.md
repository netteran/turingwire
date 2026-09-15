---
title: "Moebius: 0.2B Lightweight Image Inpainting Framework with 10B-Level Performance"
date: 2026-06-17 15:35:38 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.19195v1"
arxiv_id: "2606.19195"
authors: ["Kangsheng Duan", "Ziyang Xu", "Wenyu Liu", "Xiaohu Ruan", "Xiaoxin Chen", "Xinggang Wang"]
slug: moebius-0-2b-lightweight-image-inpainting-framework-with-10b
summary_word_count: 377
classification_confidence: 0.80
source_truncated: false
layout: post
description: "Moebius introduces a lightweight image inpainting framework achieving high fidelity with 0.2B parameters, outperforming larger models in efficiency and quality."
---

**Problem**  
This paper addresses the gap in lightweight image inpainting solutions that can match the performance of large-scale models (10B parameters) while being computationally feasible for practical deployment. The authors highlight the challenge of severe representation bottlenecks that arise from extreme structural compression in task-specific models. This work is a preprint and has not undergone peer review.

**Method**  
The core technical contribution is the Moebius framework, which reconstructs the diffusion backbone using the Local-$λ$ Mix Interaction ($LλMI$) block. This block consists of two main components: Local-$λ$ and Interactive-$λ$ modules. These modules summarize spatial contexts and global semantic priors into fixed-size linear matrices, effectively preserving complex latent interactions while significantly reducing the number of parameters. The architecture operates within the latent space, avoiding the computational overhead of pixel-space decoding. To enhance representational capacity, Moebius employs an adaptive multi-granularity distillation strategy that dynamically balances multiple gradient-based losses, ensuring high-fidelity alignment during training.

**Results**  
Moebius demonstrates competitive performance against the 10B-level industrial model FLUX.1-Fill-Dev, achieving comparable or superior generation quality while utilizing only 0.22B parameters (less than 2% of FLUX's 11.9B). The framework also boasts over a 15× acceleration in total inference time, setting a new benchmark for efficiency in high-fidelity image inpainting tasks. The authors provide extensive experimental results across various natural and portrait benchmarks, showcasing Moebius's ability to maintain high-quality outputs despite its lightweight architecture.

**Limitations**  
The authors acknowledge that while Moebius achieves impressive results, its performance may vary across different datasets and specific inpainting scenarios. Additionally, the reliance on latent space operations may limit its applicability in scenarios requiring direct pixel manipulation. The paper does not address potential challenges in generalizing the model to diverse image types beyond those tested.

**Why it matters**  
The implications of this work are significant for the field of image inpainting and lightweight model design. By demonstrating that a compact architecture can rival larger models in performance, Moebius paves the way for more efficient deployment of inpainting solutions in resource-constrained environments. This research contributes to the ongoing discourse on model efficiency and effectiveness, as highlighted in related works on lightweight architectures and distillation strategies. The findings are particularly relevant for applications in real-time image editing and restoration, where computational resources are limited. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.19195v1).
