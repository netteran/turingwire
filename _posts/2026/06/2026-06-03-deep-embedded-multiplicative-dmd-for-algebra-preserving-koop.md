---
title: "Deep Embedded Multiplicative DMD for Algebra-Preserving Koopman Learning"
date: 2026-06-03 17:37:06 +0000
category: research
subcategory: theory
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.05131v1"
arxiv_id: "2606.05131"
authors: ["Kelan Gray", "Finlay Brown", "Nicolas Boull\u00e9", "Matthew J. Colbrook"]
slug: deep-embedded-multiplicative-dmd-for-algebra-preserving-koop
summary_word_count: 426
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces DeepMDMD, a method that combines deep learning with algebraic constraints for improved Koopman operator learning in dynamic systems."
---

**Problem**  
This work addresses the limitations of existing Koopman operator learning methods, particularly the trade-off between expressiveness and structure preservation in finite-dimensional observable choices. Current approaches either rely on fixed dictionaries that enforce operator identities or utilize flexible coordinates that may lack algebraic rigor. The authors propose a novel method, Deep Embedded Multiplicative Dynamic Mode Decomposition (DeepMDMD), to bridge this gap. This preprint is unreviewed and contributes to the ongoing discourse in the field of dynamical systems and machine learning.

**Method**  
DeepMDMD integrates deep learning with algebraic constraints by learning a latent space and a partition of it while enforcing the Koopman product rule as an exact constraint. The training process alternates between two key steps: an exact multiplicative operator update and a differentiable latent-clustering step that promotes Koopman closure. This dual approach allows the model to learn a finite transition map on the learned latent cells. The architecture leverages a neural network to learn the latent coordinates, while the multiplicative operator update ensures that the learned dynamics adhere to the algebraic structure of the Koopman operator. The authors do not disclose specific training compute details but emphasize the method's ability to handle high-dimensional flows.

**Results**  
DeepMDMD demonstrates significant improvements over traditional geometric MDMD partitions across various benchmarks, including Hamiltonian systems, chaotic dynamics, and fluid flows. Notably, it achieves a reduction in spectral pollution and reveals a richer continuous-spectrum structure. In high-dimensional scenarios, such as a 158,624-dimensional cylinder wake and a noisy lid-driven cavity at $Re=20,000$, DeepMDMD maintains coherent structures and long-time spectral statistics, outperforming state-space MDMD. The authors report that DeepMDMD's learned dictionaries are more compact and dynamically coherent, leading to stable forecasts even under severe noise conditions.

**Limitations**  
The authors acknowledge that while DeepMDMD improves upon existing methods, it may still face challenges in scalability and computational efficiency, particularly in extremely high-dimensional settings. Additionally, the reliance on the quality of the initial latent space and the effectiveness of the clustering step could impact performance. The paper does not address potential overfitting issues that may arise from the flexibility of the learned coordinates.

**Why it matters**  
The introduction of DeepMDMD represents a significant advancement in the field of Koopman learning, providing a practical framework that balances expressiveness with algebraic constraints. This work has implications for various applications in dynamical systems, particularly in areas requiring robust forecasting under uncertainty. The findings suggest a new paradigm for Koopman learning: prioritize learning coordinates while constraining the underlying algebra, which could influence future research directions in the integration of deep learning with dynamical systems theory, as published in [arXiv](https://arxiv.org/abs/2606.05131v1).
