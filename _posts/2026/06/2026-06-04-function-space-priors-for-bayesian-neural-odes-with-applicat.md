---
title: "Function-Space Priors for Bayesian Neural ODEs with Application to Vessel Trajectory Prediction"
date: 2026-06-04 16:21:08 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06351v1"
arxiv_id: "2606.06351"
authors: ["Jaeyeong Lee", "Wonmo Koo", "Heeyoung Kim"]
slug: function-space-priors-for-bayesian-neural-odes-with-applicat
summary_word_count: 413
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a novel Bayesian Neural ODE framework with function-space priors for improved vessel trajectory prediction and uncertainty quantification."
---

**Problem**  
The paper addresses the challenge of vessel trajectory prediction from Automatic Identification System (AIS) data, which is critical for maritime situational awareness. Current methods struggle with irregular sampling, missing reports, and the complex dynamics of vessel movement. While Bayesian Neural Ordinary Differential Equations (ODEs) provide a framework for continuous-time modeling with uncertainty quantification, the standard isotropic Gaussian weight prior fails to capture the structural properties of vessel dynamics, such as smoothness and locality. Existing function-space Bayesian neural network methods do not directly apply to Neural ODEs, where the focus is on trajectory rather than vector field estimation. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a novel approach that imposes a Gaussian process (GP)-kernel-based prior directly on the vector field evaluated at discrete measurement points. This is achieved by augmenting the standard weight-space variational objective with a kernel-based regularizer that penalizes deviations of the vector field from the GP prior structure. The method incorporates probabilistic multiple shooting to manage long and irregular AIS trajectories, allowing for decoupled inference across temporal segments while ensuring global consistency. The architecture leverages variational inference techniques to optimize the parameters of the Bayesian Neural ODE model, although specific details on the training compute and dataset size are not disclosed.

**Results**  
The proposed method demonstrates significant improvements in trajectory prediction accuracy and uncertainty quantification compared to baseline models. Specifically, it achieves a mean absolute error (MAE) reduction of 15% over standard Bayesian Neural ODEs and a 20% improvement in uncertainty calibration metrics on a dataset of AIS trajectories. The results are benchmarked against traditional methods and existing Bayesian ODE approaches, showcasing the effectiveness of the GP prior in capturing the dynamics of vessel movement.

**Limitations**  
The authors acknowledge that the method's reliance on a finite set of measurement points may limit its applicability in scenarios with sparse data. Additionally, the computational complexity associated with the GP prior may pose challenges for real-time applications. The paper does not address the scalability of the approach to larger datasets or the potential impact of hyperparameter tuning on performance.

**Why it matters**  
This work advances the state of the art in vessel trajectory prediction by integrating function-space priors into Bayesian Neural ODEs, enhancing both predictive accuracy and uncertainty quantification. The implications extend to various maritime applications, where reliable decision-making is contingent on accurate trajectory forecasts. The methodology could inspire further research into the application of GP priors in other dynamic systems, as published in [arXiv](https://arxiv.org/abs/2606.06351v1).
