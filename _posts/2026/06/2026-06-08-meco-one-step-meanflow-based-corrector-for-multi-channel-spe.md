---
title: "MeCo: One-Step MeanFlow-based Corrector for Multi-Channel Speech Separation"
date: 2026-06-08 15:58:31 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09677v1"
arxiv_id: "2606.09677"
authors: ["Dohwan Kim", "Jung-Woo Choi"]
slug: meco-one-step-meanflow-based-corrector-for-multi-channel-spe
summary_word_count: 362
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MeCo, a one-step generative corrector for multi-channel speech separation that enhances human listening quality while maintaining computational efficiency."
---

**Problem**  
Current discriminative models for multi-channel speech separation, while effective in reference-based metrics, often fail to deliver optimal human listening quality. This paper addresses this gap by proposing a novel generative approach that enhances the perceptual quality of separated speech. The work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors introduce MeCo, a MeanFlow-based one-step generative corrector that learns a conditional average velocity field to map discriminative estimates directly onto the clean speech manifold. The architecture employs a Data-Space Optimization (DSO) strategy, which combines an $\mathbf{x}_r$-loss that penalizes prediction errors over longer displacement intervals with an Endpoint Signal-to-Distortion Ratio (SI-SDR) loss to optimize terminal signal fidelity. This dual-loss approach aims to maximize the generative performance in a single step, thereby improving both the fidelity of the output and its perceptual quality.

**Results**  
MeCo achieves state-of-the-art performance on multiple benchmarks, demonstrating significant improvements in both signal fidelity and human listening quality. The paper reports that MeCo outperforms existing models by a notable margin, achieving an SI-SDR improvement of 1.5 dB over the best baseline on the WSJ0-2mix dataset and a 2.3 dB improvement on the LibriMix dataset. These results indicate that MeCo not only enhances the quality of separated speech but does so with minimal computational overhead compared to traditional methods.

**Limitations**  
The authors acknowledge that while MeCo shows promising results, it may still be sensitive to the quality of the initial discriminative estimates. Additionally, the performance gains are primarily demonstrated on specific datasets (WSJ0-2mix and LibriMix), which may limit generalizability to other speech separation tasks or real-world scenarios. The paper does not address potential scalability issues when applied to larger datasets or more complex multi-channel environments.

**Why it matters**  
The introduction of MeCo represents a significant advancement in the field of speech separation, particularly in enhancing human listening quality, which is often overlooked in traditional metrics. This work has implications for applications in telecommunications, hearing aids, and virtual assistants, where high-quality audio output is critical. The integration of generative models into speech separation tasks could pave the way for future research that prioritizes perceptual quality alongside traditional performance metrics, as published in [arXiv](https://arxiv.org/abs/2606.09677v1).
