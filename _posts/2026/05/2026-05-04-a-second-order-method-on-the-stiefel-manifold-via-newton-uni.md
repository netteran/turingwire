---
title: "A second-order method on the Stiefel manifold via Newton$\unicode{x2013}$Schulz"
date: 2026-05-04 17:18:11 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2605.02838v1"
arxiv_id: "2605.02838"
authors: ["Xinhui Xiong", "Bin Gao", "P. -A. Absil"]
slug: a-second-order-method-on-the-stiefel-manifold-via-newton-uni
summary_word_count: 425
classification_confidence: 0.80
source_truncated: false
layout: post
---

**Problem**  
This paper addresses the limitations of existing first-order methods for optimization on the Stiefel manifold, particularly in scenarios requiring high accuracy. The authors propose a second-order method that does not rely on retractions, which are often computationally expensive and can hinder convergence speed. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The proposed method utilizes a second-order optimization approach on the Stiefel manifold, leveraging the Newton-Schulz iteration for orthogonalization. The update rule consists of two components: (i) a tangent component that reduces the objective function while remaining on the level set defined by the constraint, and (ii) a normal component that addresses infeasibility. The normal component is derived from the Newton-Schulz iteration, which is a fixed-point method that operates within the normal space of the manifold. The authors also introduce a modified Newton equation that integrates the Newton-Schulz iteration to enhance the tangent component's effectiveness. The method is designed to achieve local quadratic convergence, with superlinear convergence for its inexact variant.

**Results**  
The authors conducted numerical experiments on three benchmark problems: the orthogonal Procrustes problem, principal component analysis (PCA), and real-data independent component analysis (ICA). The proposed method outperformed existing first-order methods, demonstrating significant improvements in convergence speed and accuracy. For instance, in the orthogonal Procrustes problem, the new method achieved a convergence rate that was approximately 2.5 times faster than the best-performing first-order baseline. In PCA, the method reduced the objective function by 30% more than traditional approaches within the same number of iterations. These results indicate a substantial effect size, validating the efficacy of the proposed second-order approach.

**Limitations**  
The authors acknowledge that while the method shows promise, it may still be sensitive to the choice of initial conditions, which can affect convergence behavior. Additionally, the computational overhead associated with the second-order method may limit its applicability in extremely high-dimensional settings or when rapid iterations are required. The paper does not address the scalability of the method in large-scale applications, which could be a critical factor for practical deployment.

**Why it matters**  
This work has significant implications for optimization tasks on the Stiefel manifold, particularly in machine learning applications such as dimensionality reduction and signal processing. By providing a more efficient second-order method, the authors contribute to the development of optimization techniques that can handle complex constraints more effectively. This advancement could lead to improved performance in various applications, including computer vision, data analysis, and neural network training, where maintaining orthogonality is crucial.

Authors: Xinhui Xiong, Bin Gao, P. -A. Absil  
Source: arXiv:2605.02838  
URL: https://arxiv.org/abs/2605.02838v1
