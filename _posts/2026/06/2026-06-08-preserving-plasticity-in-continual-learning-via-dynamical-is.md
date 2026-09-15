---
title: "Preserving Plasticity in Continual Learning via Dynamical Isometry"
date: 2026-06-08 17:24:15 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09762v1"
arxiv_id: "2606.09762"
authors: ["Andries Rosseau", "Robert M\u00fcller", "Ann Now\u00e9"]
slug: preserving-plasticity-in-continual-learning-via-dynamical-is
summary_word_count: 392
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel approach to preserving plasticity in continual learning through dynamical isometry and an adaptive optimizer, AdamO."
---

**Problem**  
The paper addresses the challenge of maintaining plasticity in deep neural networks during continual learning, particularly under non-stationary conditions. The authors highlight that existing methods often lead to a progressive loss of plasticity, which limits the model's ability to learn new tasks effectively. This work is a preprint and contributes to the literature by proposing a new framework based on dynamical isometry, a concept that has not been extensively explored in the context of continual learning.

**Method**  
The authors relate plasticity to the empirical Neural Tangent Kernel (NTK) and identify dynamical isometry as a crucial factor in preserving plasticity. They revisit a class of networks that maintain near-dynamical isometry while being universal Lipschitz function approximators. The proposed method includes an efficient isometry-promoting regularization scheme that encourages layer-wise Jacobian singular values to remain close to one. Additionally, the authors introduce AdamO, an adaptive optimizer that decouples isometry regularization from gradient updates, similar to the AdamW optimizer. This allows for more effective training while preserving the desired properties of the network.

**Results**  
The proposed methods were evaluated on various supervised and reinforcement-learning continual-learning benchmarks designed to induce plasticity loss. The results indicate that the new approach consistently matches or outperforms existing methods. Specific performance metrics were not disclosed in the abstract, but the authors claim significant improvements over baseline methods, suggesting a robust enhancement in the ability to retain plasticity during continual learning tasks.

**Limitations**  
The authors acknowledge that their approach primarily targets a specific measure of isometry and may not fully capture all aspects of plasticity preservation. They do not discuss potential scalability issues or the computational overhead introduced by the isometry-promoting regularization scheme. Additionally, the performance of the proposed methods in highly complex or real-world scenarios remains to be validated.

**Why it matters**  
This work has significant implications for the field of continual learning, particularly in applications where models must adapt to new information without forgetting previously learned tasks. By framing plasticity preservation through the lens of dynamical isometry, the authors provide a new perspective that could inspire further research into more effective continual learning strategies. The introduction of AdamO as an optimizer also opens avenues for future work on adaptive optimization techniques in neural networks. This research is available on [arXiv](https://arxiv.org/abs/2606.09762v1) and could influence subsequent studies aimed at enhancing the robustness and adaptability of machine learning models in dynamic environments.
