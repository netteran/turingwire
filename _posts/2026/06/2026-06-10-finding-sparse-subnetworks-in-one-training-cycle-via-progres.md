---
title: "Finding Sparse Subnetworks in One Training Cycle via Progressive Magnitude-Based Pruning"
date: 2026-06-10 16:17:53 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.12278v1"
arxiv_id: "2606.12278"
authors: ["Romana Qureshi", "Hafida Benhidour", "Said Kerrache", "Nahlah Aljeraisy"]
slug: finding-sparse-subnetworks-in-one-training-cycle-via-progres
summary_word_count: 405
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a single-cycle progressive magnitude-based pruning method for neural networks, achieving high accuracy at significant sparsity levels."
---

**Problem**  
This work addresses the inefficiency of existing iterative pruning methods, which require multiple training cycles to identify sparse subnetworks that maintain performance. The authors highlight the limitations of the Lottery Ticket Hypothesis (LTH) and other initialization-based pruning techniques, which often necessitate extensive computational resources and time. This paper presents a novel approach that allows for effective pruning within a single training cycle, thus filling a gap in the literature regarding efficient neural network sparsification methods.

**Method**  
The proposed method employs progressive magnitude-based pruning, which gradually increases the sparsity of the network during training using a linear schedule. The pruning masks are updated based on the magnitudes of the active weights, allowing for a dynamic adjustment of the network's structure as training progresses. The authors conduct experiments on standard datasets, CIFAR-10 and MNIST, utilizing various architectures including ResNet, VGG-style, and LeNet. The training compute details are not explicitly disclosed, but the method is designed to operate within a single training cycle, contrasting with the multi-cycle requirements of traditional methods.

**Results**  
The method demonstrates impressive performance metrics across different architectures. On CIFAR-10, ResNet-18 achieves 95.12% accuracy at 72.9% sparsity, significantly outperforming LTH, which reported 90.5% accuracy. At extreme sparsity levels, the VGG-like architecture reaches 93.13% accuracy at 97% sparsity, compared to approximately 92.0% for SNIP. Additionally, VGG-19 achieves 93.44% accuracy at 97.97% sparsity, surpassing GraSP's 92.19% at 98% sparsity. A detailed sparsity-accuracy analysis on ResNet-18 indicates that accuracy remains within 0.1 percentage points of the dense baseline across sparsity levels of 70-85%, showcasing the method's robustness.

**Limitations**  
The authors acknowledge that their approach may not generalize across all architectures or datasets, as the experiments were limited to specific configurations. They also note that while the method is effective in the evaluated settings, further research is needed to explore its applicability in more complex scenarios or with different types of neural networks. Additionally, the paper does not address the potential impact of pruning on the interpretability of the resulting models.

**Why it matters**  
This research provides a significant advancement in the field of neural network pruning by demonstrating that effective sparsification can be achieved in a single training cycle, thus reducing computational overhead and time. The findings have implications for deploying lightweight models in resource-constrained environments, making them more accessible for real-world applications. The work encourages further exploration of single-cycle pruning methods, potentially influencing future research directions in model efficiency and performance optimization, as published in [arXiv](https://arxiv.org/abs/2606.12278v1).
