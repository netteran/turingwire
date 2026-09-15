---
title: "Illumination-Robust Camera-Based Heart-Rate Estimation for Physiological Sensing in Robots"
date: 2026-06-10 17:42:31 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12378v1"
arxiv_id: "2606.12378"
authors: ["Zhi Wei Xu", "Torbj\u00f6rn E. M. Nordling"]
slug: illumination-robust-camera-based-heart-rate-estimation-for-p
summary_word_count: 373
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel transformer framework for robust heart-rate estimation under varying illumination conditions using RGB cameras."
---

**Problem** — This work addresses the challenge of illumination variability in remote photoplethysmography (rPPG) for heart-rate (HR) estimation, which is critical for the deployment of physiological sensing in robots. The authors highlight that existing methods struggle with consistent performance under different lighting conditions, which limits their practical application in real-world scenarios. This paper is a preprint and has not undergone peer review.

**Method** — The authors propose an end-to-end spatial-temporal transformer framework that integrates several components: PRNet-based 3D face alignment for accurate facial feature extraction, clip-level illumination augmentation to simulate diverse lighting conditions, and a Residual Temporal Standardization Module to enhance temporal feature representation. The training objective employs a Soft-Shifted Pearson waveform loss combined with a spectral Kullback-Leibler divergence loss, with a tunable weight ($\mathbfβ$) that balances the contributions of frequency-domain heart-rate guidance. The model is trained on a newly created dataset that includes varied illumination scenarios, ensuring robustness across different lighting conditions.

**Results** — The proposed framework achieves a mean absolute error (MAE) of 0.79 bpm in heart-rate estimation and a correlation coefficient of 0.982 when $\mathbfβ=5$ is used. This represents a significant improvement over the PhysFormer baseline, which had an MAE reduction of 93.6% and an increase in HR correlation from 0.088 to 0.982 on the same dataset. The experiments were conducted using a static all-level mix protocol that encompassed three distinct illumination levels, demonstrating the model's effectiveness in real-world applications.

**Limitations** — The authors acknowledge that their approach may still be sensitive to extreme lighting conditions not represented in the training dataset. Additionally, the reliance on 3D face alignment may introduce errors if the face is not fully visible or is occluded. The paper does not address the computational efficiency of the model during inference, which could impact its deployment in real-time robotic systems.

**Why it matters** — This research has significant implications for the development of socially aware robots capable of physiological monitoring in dynamic environments. By overcoming the limitations of illumination variability, the proposed framework enhances the feasibility of non-contact heart-rate estimation, paving the way for more sophisticated human-robot interactions. The findings contribute to the growing body of literature on rPPG and physiological sensing technologies, as discussed in related works on the subject, and are available on [arXiv](https://arxiv.org/abs/2606.12378v1).
