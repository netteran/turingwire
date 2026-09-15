---
title: "Contrast-Informed Augmentation and Domain-Adversarial Training for Adult-to-Neonatal MR Reconstruction Generalization"
date: 2026-06-11 16:47:53 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13562v1"
arxiv_id: "2606.13562"
authors: ["Stephen Moore", "Lara Leijser", "Richard Frayne", "Roberto Souza"]
slug: contrast-informed-augmentation-and-domain-adversarial-traini
summary_word_count: 419
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel approach combining contrast-informed data augmentation and domain-adversarial training to enhance MR reconstruction generalization from adults to neonates."
---

**Problem**  
This work addresses the challenge of generalizing deep learning models for magnetic resonance (MR) reconstruction from adult to neonatal populations, a gap in the literature that remains largely unaddressed. The authors highlight the limitations of existing models trained solely on adult data, which often fail to perform adequately on neonatal data due to significant differences in anatomy and imaging characteristics. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose three training regimes for the E2E-VarNet architecture: (1) adult-only training using unaugmented adult data (Unaug-Only), (2) mixed training with both unaugmented adult data and contrast-informed augmented adult data (Mixed), and (3) mixed training incorporating a domain-adversarial objective (Mixed-DAT). The models were trained on retrospectively undersampled multi-coil adult T2-weighted brain MR data. The training utilized acceleration factors of $R=4$ and $R=8$. The domain-adversarial training aimed to align the latent representations of adult and neonatal data, enhancing the model's ability to generalize across domains. Quantitative metrics such as Structural Similarity Index Measure (SSIM) and Peak Signal-to-Noise Ratio (PSNR) were employed for evaluation, alongside qualitative assessments using t-SNE plots to analyze latent space representations.

**Results**  
The results indicate that both Mixed and Mixed-DAT training regimes significantly outperformed the Unaug-Only baseline on neonatal test data. At $R=4$, Mixed-DAT achieved the highest performance with an SSIM of 0.924 ± 0.027 and a PSNR of 33.98 ± 1.15 dB. At $R=8$, Mixed-DAT again led in SSIM (0.848 ± 0.031) compared to Unaug-Only (0.766 ± 0.037) and Mixed (0.814 ± 0.035), while Mixed achieved the best PSNR (29.56 ± 0.83 dB) against Unaug-Only (26.26 ± 0.78 dB) and Mixed-DAT (29.43 ± 0.83 dB). The qualitative t-SNE analysis suggested that Mixed-DAT enhanced the overlap of latent representations across the different datasets, indicating improved feature alignment.

**Limitations**  
The authors acknowledge that the study is limited by its reliance on retrospectively undersampled data, which may not fully represent the variability encountered in clinical settings. Additionally, the generalizability of the findings to other imaging modalities or populations remains to be established. The paper does not address potential computational costs associated with domain-adversarial training, which may impact scalability in real-world applications.

**Why it matters**  
This research demonstrates that integrating contrast-informed data augmentation with domain-adversarial training can significantly enhance the robustness of MR reconstruction models to domain shifts, particularly in the context of neonatal imaging. These findings have implications for improving diagnostic accuracy and treatment planning in pediatric care, as highlighted in the context of advancing machine learning applications in medical imaging, as published in [arXiv](https://arxiv.org/abs/2606.13562v1).
