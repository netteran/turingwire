---
title: "Overcoming Rank Collapse in Feedback Alignment"
date: 2026-06-09 17:21:25 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11123v1"
arxiv_id: "2606.11123"
authors: ["Gauthier Boeshertz", "Razvan Pascanu", "Claudia Clopath"]
slug: overcoming-rank-collapse-in-feedback-alignment
summary_word_count: 383
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper addresses the limitations of Feedback Alignment in deep networks and proposes methods to enhance its performance through dimensionality increase."
---

**Problem**  
The paper addresses the limitations of Feedback Alignment (FA) in deep neural networks, particularly its inability to scale effectively compared to Backpropagation (BP). FA, which uses fixed random feedback weights, leads to a lower effective rank of the error signal, constraining the learning dynamics to a lower-dimensional subspace. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for further validation of its findings.

**Method**  
The authors investigate the rank differences between BP and FA models trained on the CIFAR10 dataset, focusing on the effective rank of the error signal. They propose two mechanisms to enhance the effective dimensionality of FA: 
1. **Muon**: An optimizer designed to orthogonalize weight updates, thereby promoting a more diverse exploration of the parameter space.
2. **Hidden Activity Normalization**: A technique that encourages orthogonality in hidden layer activations, further enhancing the dimensionality of the learning signal.

These methods are evaluated on larger architectures, specifically using ResNet-18 on the CIFAR100 benchmark, to assess their impact on performance.

**Results**  
The proposed methods demonstrate significant improvements over FA baselines. For instance, when using ResNet-18 on CIFAR100, the accuracy achieved an increase of 9 percentage points compared to traditional FA approaches. The authors provide quantitative comparisons, showing that the effective rank of the error signal in FA models can be substantially increased through their proposed techniques, leading to enhanced learning dynamics and performance.

**Limitations**  
The authors acknowledge that while their methods improve the performance of FA, they do not fully replicate the efficiency of BP. Additionally, the study is limited to specific architectures and datasets (CIFAR10 and CIFAR100), which may not generalize to all types of neural networks or tasks. The reliance on orthogonalization and normalization techniques may also introduce additional computational overhead, which could be a concern in resource-constrained environments.

**Why it matters**  
This work has significant implications for the development of biologically plausible learning algorithms that can operate effectively in deep networks without relying on the stringent requirements of BP. By identifying low-dimensional gradient dynamics as a critical barrier to scaling FA, the authors suggest that inducing higher-dimensional update geometry could pave the way for more robust alternatives to traditional backpropagation methods. This research contributes to the ongoing exploration of efficient training paradigms in neural networks, as published in [arXiv](https://arxiv.org/abs/2606.11123v1).
