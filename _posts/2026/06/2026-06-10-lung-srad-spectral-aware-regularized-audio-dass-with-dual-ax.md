---
title: "Lung-SRAD: Spectral-Aware Regularized Audio DASS with Dual-Axis Patch-Mix Contrastive Learning for Respiratory Sound Classification"
date: 2026-06-10 10:53:41 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11922v1"
arxiv_id: "2606.11922"
authors: ["Hemansh Shridhar", "Miika Toikkanen", "June-Woo Kim"]
slug: lung-srad-spectral-aware-regularized-audio-dass-with-dual-ax
summary_word_count: 399
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a novel approach for respiratory sound classification using State Space Models and dual-axis contrastive learning, outperforming existing methods."
---

**Problem**  
Recent advancements in respiratory sound classification (RSC) have predominantly utilized CLS-token driven self-attention architectures, such as the Audio Spectrogram Transformer (AST). However, these models exhibit a low-pass filtering behavior that diminishes their sensitivity to localized abnormal patterns in respiratory sounds. This paper addresses the gap in the literature by exploring State Space Models (SSMs) as a more effective backbone for RSC, aiming to enhance the detection of such localized anomalies. The work is presented as a preprint and has not undergone peer review.

**Method**  
The authors employ the Distilled Audio State Space model as the primary architecture for RSC. They analyze the model's intermediate representations through spectral response curves, revealing that SSMs better preserve mid-to-high spatial-frequency components compared to traditional methods. To leverage this advantage, the authors introduce spectral-aware layer regularization, which applies Gaussian convolution to selected layers, enhancing the model's ability to capture relevant features. Additionally, they propose a novel training strategy called Dual-Axis Patch-Mix contrastive learning, specifically designed for SSM-based audio models. This method aims to improve representation learning by contrasting different audio patches along dual axes, thereby fostering more robust feature extraction.

**Results**  
The proposed Lung-SRAD approach achieves a classification score of 64.48% on the ICBHI benchmark, surpassing the AST baseline by 5%. This improvement indicates a significant enhancement in the model's ability to classify respiratory sounds accurately. The results demonstrate the effectiveness of the spectral-aware regularization and the dual-axis contrastive learning strategy in improving the performance of SSMs for RSC tasks.

**Limitations**  
The authors acknowledge that their approach may still be limited by the inherent challenges of RSC, such as the variability in respiratory sounds across different subjects and conditions. Additionally, the reliance on Gaussian convolution for layer regularization may not generalize well to all types of audio data. The paper does not address potential computational overhead introduced by the dual-axis contrastive learning method, which could impact training efficiency.

**Why it matters**  
This work has significant implications for the field of respiratory sound analysis, particularly in clinical settings where accurate classification of respiratory conditions is critical. By demonstrating the advantages of SSMs and introducing innovative training techniques, the authors pave the way for future research to explore alternative architectures and regularization methods in audio classification tasks. The findings contribute to a growing body of literature that seeks to improve the sensitivity and specificity of models used in medical diagnostics, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11922v1).
