---
title: "Multi-Column RBF Neural Network Using Adaptive and Non-Adaptive Particle Swarm Optimization"
date: 2026-06-03 17:53:48 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.05150v1"
arxiv_id: "2606.05150"
authors: ["Ammar Hoori", "Yuichi Motai"]
slug: multi-column-rbf-neural-network-using-adaptive-and-non-adapt
summary_word_count: 366
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces multi-column RBF neural networks optimized with PSO and APSO, enhancing accuracy and efficiency on large datasets."
---

**Problem**  
This work addresses the scalability limitations of traditional radial basis function neural networks (RBFNs) trained with gradient descent and particle swarm optimization (PSO) methods, particularly in handling large datasets. The authors highlight that while existing methods like the error correction (ErrCor) and PSO improve performance, they struggle with excessive kernel computations and large hidden layer structures. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose two novel architectures: multi-column RBFN with PSO (MC-PSO) and multi-column RBFN with adaptive PSO (MC-APSO). These architectures utilize a parallel structure where multiple smaller RBFNs are trained independently on spatial subsets of the dataset using either PSO or APSO. The APSO variant enhances convergence speed by dynamically adjusting swarm parameters during optimization. Each RBFN specializes in a specific subset, allowing for targeted learning. During inference, only the RBFNs relevant to the test instance's neighborhood contribute to the final output, which improves both accuracy and computational efficiency.

**Results**  
The proposed MC-PSO and MC-APSO methods were evaluated against several benchmarks, demonstrating superior performance compared to ErrCor, PSO, APSO, and the multi-column RBFN (MCRN). Specifically, MC-PSO and MC-APSO achieved improvements in accuracy and recall metrics, with notable reductions in training and testing times across most datasets. The paper reports that these methods consistently outperform the baselines, although specific numerical results and effect sizes are not detailed in the abstract.

**Limitations**  
The authors acknowledge that while their methods improve scalability and performance, they may still face challenges related to the selection of optimal spatial subsets and the potential for overfitting in specialized RBFNs. Additionally, the paper does not discuss the computational overhead introduced by maintaining multiple RBFNs or the implications of parameter tuning for the PSO and APSO algorithms.

**Why it matters**  
The introduction of MC-PSO and MC-APSO represents a significant advancement in the application of RBFNs for large-scale datasets, providing a framework that balances accuracy and computational efficiency. This work has implications for various domains requiring real-time processing and high accuracy, such as image recognition and time-series forecasting. The findings contribute to the ongoing discourse on optimizing neural network architectures for scalability, as discussed in related literature on RBFNs and evolutionary algorithms, and are available on [arXiv](https://arxiv.org/abs/2606.05150v1).
