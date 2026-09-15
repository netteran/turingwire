---
title: "ATLAS: Active Theory Learning for Automated Science"
date: 2026-06-10 17:52:03 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12386v1"
arxiv_id: "2606.12386"
authors: ["No\u00e9mi \u00c9ltet\u0151", "Nathaniel D. Daw", "Kimberly L. Stachenfeld", "Kevin J. Miller"]
slug: atlas-active-theory-learning-for-automated-science
summary_word_count: 399
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents ATLAS, an active learning framework that automates the discovery of interpretable behavioral models in cognitive science."
---

**Problem**  
The paper addresses the challenge of automating the formulation of experimental questions that yield informative data for mechanistic modeling in cognitive science. Current methodologies often rely on manual design, which can be inefficient and suboptimal. The authors propose ATLAS (Active Theory Learning for Automated Science) as a solution to this gap, enabling data-driven discovery of interpretable models through active learning. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
ATLAS employs an active learning framework that iteratively generates mechanistic hypotheses represented as a diverse ensemble of sparse neural networks, specifically Disentangled RNNs. The framework is designed to optimize the selection of experiments that can effectively differentiate between these hypotheses. The authors focus on the task of recovering reinforcement learning agents from their behavior in bandit tasks, where ATLAS generates sequences of experiments with temporal structures tailored to the characteristics of the underlying agents. The training process involves evaluating the models against a comprehensive set of metrics that assess behavioral, structural, and computational similarities, ensuring that the generated models are interpretable and relevant.

**Results**  
ATLAS demonstrates a significant improvement in sample efficiency, achieving a 5-10x enhancement across all evaluation metrics when compared to random experimentation. Furthermore, the performance of ATLAS is validated against expert-designed experiments derived from existing literature, indicating its robustness and effectiveness in generating meaningful insights. The results suggest that ATLAS not only outperforms random sampling but also competes favorably with human-designed experimental frameworks.

**Limitations**  
The authors acknowledge that the current implementation of ATLAS may be limited by the complexity of the underlying models and the specific nature of the tasks it was tested on. Additionally, the reliance on sparse neural networks may restrict the expressiveness of the hypotheses generated. The paper does not address potential scalability issues when applied to more complex or high-dimensional problems, nor does it explore the generalizability of the approach across different domains beyond cognitive science.

**Why it matters**  
The implications of ATLAS extend beyond cognitive science, offering a framework that can be adapted for various scientific inquiries where mechanistic modeling is essential. By automating the experimental design process, ATLAS has the potential to accelerate the discovery of interpretable models, thereby enhancing our understanding of complex systems. This work contributes to the growing field of automated scientific discovery and highlights the importance of integrating machine learning techniques with traditional scientific methodologies, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.12386v1).
