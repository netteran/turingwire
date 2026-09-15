---
title: "Conservation Laws from Data Symmetry in Neural Networks"
date: 2026-06-09 14:23:34 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10913v1"
arxiv_id: "2606.10913"
authors: ["Jakob Galley", "Vahid Shahverdi", "Axel Flinth"]
slug: conservation-laws-from-data-symmetry-in-neural-networks
summary_word_count: 421
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the relationship between data symmetries and conserved quantities in neural networks, revealing conditions under which these quantities arise."
---

**Problem** — This work addresses the gap in understanding how intrinsic symmetries of training data influence the emergence of conserved quantities during gradient-flow training of neural networks. The authors highlight that existing literature lacks a comprehensive analysis of this relationship, particularly under the assumption of analytic and non-polynomial loss functions. This is a preprint and has not undergone peer review.

**Method** — The authors introduce a framework based on tensorizable networks, which are defined as architectures where the dependence on parameters and inputs can be decoupled through an intermediate representation. This framework encompasses various architectures, including linear and polynomial networks, as well as Lightning Attention. The analysis focuses on the mean squared error (MSE) loss function, demonstrating that data augmentation can lead to the emergence of additional conserved quantities. The authors provide theoretical proofs to substantiate their claims, particularly emphasizing the conditions under which these conserved quantities manifest.

**Results** — The paper presents a theoretical result indicating that, generically, data symmetries do not induce additional integrals of motion for analytic and non-polynomial loss functions. However, for MSE loss, the authors identify specific scenarios where data augmentation results in extra conserved quantities. While the paper does not provide empirical results or benchmark comparisons, the theoretical implications suggest that the presence of symmetries in the training data can influence the dynamics of neural network training under certain conditions.

**Limitations** — The authors acknowledge that their findings are contingent on the assumption of analytic and non-polynomial loss functions, which may not encompass all practical scenarios in machine learning. Additionally, the exploration of tensorizable networks is limited to specific architectures, and the generalizability of the results to other types of neural networks remains an open question. The lack of empirical validation and benchmark comparisons is a notable limitation, as the theoretical insights may not directly translate to performance improvements in real-world applications.

**Why it matters** — This research has significant implications for the design and training of neural networks, particularly in understanding how data symmetries can be leveraged to enhance model performance through the introduction of conserved quantities. The findings suggest that practitioners should consider the structure of their training data and the choice of loss functions when designing neural network architectures. This work lays the groundwork for future investigations into the interplay between data symmetries and neural network dynamics, potentially informing new training strategies and architectures. As published in [arXiv cs.LG](https://arxiv.org/abs/2606.10913v1), this paper invites further exploration into the theoretical underpinnings of neural network training and the role of data characteristics in shaping model behavior.
