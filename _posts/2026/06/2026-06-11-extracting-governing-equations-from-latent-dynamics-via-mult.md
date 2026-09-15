---
title: "Extracting Governing Equations from Latent Dynamics via Multi-View Contrastive Learning"
date: 2026-06-11 12:16:35 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13260v1"
arxiv_id: "2606.13260"
authors: ["Paolo Muratore", "Mackenzie Weygandt Mathis"]
slug: extracting-governing-equations-from-latent-dynamics-via-mult
summary_word_count: 396
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces DYSCO, a multi-view contrastive learning algorithm for extracting latent dynamics and governing equations from noisy observations."
---

**Problem**  
The paper addresses the challenge of identifying latent dynamical systems from high-dimensional, noisy measurements, a critical issue in representation learning, system identification, and scientific discovery. The authors highlight a gap in existing methodologies that often fail to effectively disentangle signal from noise in the presence of multiple independent views of the same process. This work is particularly relevant as it is presented as a preprint and has not yet undergone peer review.

**Method**  
The core contribution is the DYSCO algorithm, which employs multi-view temporal contrastive learning to recover latent trajectories and governing dynamics. The method leverages multiple independent noisy observations to enhance the robustness of the signal extraction process. DYSCO parameterizes the dynamics using a structured functional basis, allowing for symbolic recovery of governing equations within an affine gauge. The authors provide theoretical guarantees for strong identification of the latent dynamics, extending previous identifiability results to accommodate noisy nonlinear observations. The training process involves optimizing a contrastive loss function that encourages the model to distinguish between true and false trajectories across different views.

**Results**  
Empirical evaluations demonstrate that DYSCO achieves accurate recovery of latent trajectories and flow fields across various dynamical regimes, including chaotic, oscillatory, and metastable systems. The algorithm was tested under both Gaussian and Poisson observation noise, with the latter being particularly relevant for applications in neural recordings. The results indicate that DYSCO outperforms baseline methods in terms of recovery accuracy, although specific numerical results and comparisons to named baselines are not detailed in the abstract.

**Limitations**  
The authors acknowledge that the theoretical guarantees provided are valid only up to an affine indeterminacy, which may limit the interpretability of the recovered governing equations. Additionally, the performance of DYSCO may be sensitive to the choice of the functional basis used for parameterization, which could affect its generalizability across different types of dynamical systems. The paper does not address potential computational inefficiencies or scalability issues when applied to very high-dimensional datasets.

**Why it matters**  
The implications of this work are significant for advancing methodologies in system identification and representation learning, particularly in fields where understanding underlying dynamics is crucial, such as physics and neuroscience. The ability to recover governing equations from noisy observations can facilitate scientific discovery and enhance predictive modeling capabilities. This research contributes to the growing body of literature on contrastive learning techniques and their applications in dynamical systems, as published in [arXiv](https://arxiv.org/abs/2606.13260v1).
