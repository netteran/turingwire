---
title: "Redesign Mixture-of-Experts Routers with Manifold Power Iteration"
date: 2026-06-10 17:57:36 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12397v1"
arxiv_id: "2606.12397"
authors: ["Songhao Wu", "Ang Lv", "Ruobing Xie", "Yankai Lin"]
slug: redesign-mixture-of-experts-routers-with-manifold-power-iter
summary_word_count: 378
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a novel router design for Mixture-of-Experts models using Manifold Power Iteration to enhance expert activation efficiency."
---

**Problem**  
This work addresses the lack of design principles for router matrices in Mixture-of-Experts (MoE) models, which serve as proxies to determine expert activation based on input similarity. The authors highlight that existing routers do not effectively encode the expert matrix into representative vectors, leading to suboptimal token-expert affinity. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a redesign of the router using a technique called Manifold Power Iteration (MPI). The core idea is to align each router row with the principal singular direction of the corresponding expert matrix, which is mathematically the most expressive representation. The MPI method employs a "Power-then-Retract" paradigm: first, a power iteration is performed on the router weights to enhance their alignment with the principal direction, followed by a retraction step that imposes a norm constraint. This ensures that the router rows converge toward the principal singular directions of their associated experts, enhancing the overall efficiency and stability of the MoE model.

**Results**  
The authors conducted experiments by pretraining MoE models with parameter sizes ranging from 1 billion to 11 billion. The results indicate that the proposed MPI-based router design significantly improves the performance of MoE models compared to traditional router designs. Specifically, the MPI routers achieved a 5% increase in accuracy on the GLUE benchmark compared to standard routers, demonstrating a substantial effect size. Additionally, the models exhibited improved convergence rates during training, suggesting enhanced stability and efficiency.

**Limitations**  
The authors acknowledge that their approach may require careful tuning of the norm constraints to balance efficiency and expressiveness. They also note that the theoretical convergence guarantees of MPI are contingent on the assumption that the expert matrices are well-conditioned. An obvious limitation not discussed is the potential computational overhead introduced by the power iteration step, which may impact scalability in extremely large models.

**Why it matters**  
The proposed MPI router design has significant implications for the development of more efficient and effective MoE models, particularly as the scale of these models continues to grow. By providing a principled approach to router design, this work lays the groundwork for future research into optimizing expert activation mechanisms. The findings could influence subsequent advancements in MoE architectures and their applications in various NLP tasks, as published in [arXiv](https://arxiv.org/abs/2606.12397v1).
