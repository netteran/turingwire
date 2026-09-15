---
title: "Adaptive directional gradients for parameterised quantum circuits"
date: 2026-06-08 16:59:58 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09734v1"
arxiv_id: "2606.09734"
authors: ["Brian Coyle", "Snehal Raj", "Virag Umathe", "El Amine Cherrat", "Elham Kashefi"]
slug: adaptive-directional-gradients-for-parameterised-quantum-cir
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel framework for gradient estimation in parameterized quantum circuits, significantly improving training efficiency on quantum hardware."
---

**Problem**  
The training of parameterized quantum circuits (PQCs) on quantum hardware is hindered by the high measurement costs associated with gradient estimation, particularly when using the parameter-shift rule, which scales linearly with the number of trainable parameters. This work addresses the gap in efficient gradient estimation methods for PQCs, proposing a solution that does not require additional ancilla qubits or controlled-gate overhead. The authors present a preprint, indicating that the work has not yet undergone peer review.

**Method**  
The authors propose a framework utilizing forward gradient estimators based on the forward mode of automatic differentiation. This method provides an unbiased gradient estimator by averaging a tunable number of random directional derivatives. The framework encompasses several existing methods as limiting cases, including the simultaneous perturbation stochastic approximation (SPSA), random coordinate descent, and the parameter-shift rule. The authors derive the Quantum Iterative V-adaptive Estimator Rule (QUIVER), an adaptive optimizer that minimizes measurement costs through a closed-form update rule. The convergence of stochastic quantum forward gradient descent is proven under standard assumptions, supported by an explicit second-moment expansion that bridges the extremes of SPSA and the parameter-shift rule.

**Results**  
The proposed forward gradient method demonstrates significant efficiency improvements in training Hamming-weight-preserving orthogonal quantum neural networks with up to 60 qubits and 1770 parameters. On the ECG5000 and MNIST datasets, the method outperforms the parameter-shift rule by orders of magnitude in terms of measurement efficiency. Additionally, the QUIVER optimizer shows superior performance compared to measurement-frugal optimizers like iCANS and gCANS in optimization tasks involving the quantum approximate optimization algorithm and variational quantum eigensolver.

**Limitations**  
The authors acknowledge that their method's performance may vary depending on the specific architecture of the quantum circuits and the nature of the optimization problem. They do not address potential scalability issues related to the number of parameters or the complexity of the quantum circuits beyond the tested configurations. Furthermore, the reliance on stochastic methods may introduce variability in results, which could affect reproducibility.

**Why it matters**  
This work has significant implications for the field of quantum machine learning, particularly in enhancing the efficiency of training PQCs on quantum hardware. By providing a more efficient gradient estimation method, it paves the way for scaling quantum neural networks and optimizing quantum algorithms with reduced measurement costs. The findings contribute to the ongoing development of practical quantum computing applications, as highlighted in related literature on quantum optimization and variational methods, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.09734v1).
