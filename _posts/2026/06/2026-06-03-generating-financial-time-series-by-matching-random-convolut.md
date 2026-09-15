---
title: "Generating Financial Time Series by Matching Random Convolutional Features"
date: 2026-06-03 17:46:50 +0000
category: research
subcategory: training_methods
company: "UiPath"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.05138v1"
arxiv_id: "2606.05138"
authors: ["Konrad J. Mueller", "Nikita Zozoulenko", "Ben Wood", "Thomas Cass", "Lukas Gonon"]
slug: generating-financial-time-series-by-matching-random-convolut
summary_word_count: 401
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces SOCK, a differentiable random convolutional feature map that enhances the generation of financial time series by matching features."
---

**Problem**  
Generating realistic financial time series is a significant challenge due to the limited availability of historical data, which often leads to overfitting, particularly in adversarial training scenarios. Existing methods that utilize path signatures for feature representation can fail to capture essential time series characteristics at manageable truncation depths. This paper addresses the gap in the literature regarding effective feature representation for generative models in financial contexts, presenting a novel approach that is not yet peer-reviewed.

**Method**  
The authors propose SOCK (SOft Competing Kernels), a differentiable random convolutional feature map designed to train generative models for financial time series. Unlike previous methods that rely on non-differentiable feature maps like Rocket and Hydra, SOCK allows for end-to-end training of generators by matching the random convolutional features of real and generated time series. The architecture leverages convolutional kernels to extract informative features while maintaining differentiability, enabling the use of gradient-based optimization techniques. The training process involves minimizing the distance between the feature representations of real and generated samples, thus enhancing the generator's ability to produce realistic time series data.

**Results**  
The experiments demonstrate that generators trained using SOCK consistently outperform baselines based on path signatures and diffusion models across various small-sample financial datasets. Specifically, the SOCK-based generators achieved a notable improvement in performance metrics, with effect sizes indicating a significant reduction in the Wasserstein distance compared to the aforementioned baselines. Additionally, SOCK's effectiveness was validated in two-sample hypothesis testing and time series classification tasks, where it matched or exceeded the performance of existing unsupervised feature maps.

**Limitations**  
The authors acknowledge that while SOCK improves upon previous methods, it may still be sensitive to the choice of hyperparameters and the specific characteristics of the financial datasets used. Furthermore, the paper does not explore the scalability of SOCK to larger datasets or its performance in high-dimensional time series scenarios. The lack of peer review may also imply that the findings should be interpreted with caution until validated by the broader research community.

**Why it matters**  
The introduction of SOCK represents a significant advancement in the generation of financial time series, providing a robust framework for feature representation that can mitigate overfitting in scenarios with limited data. This work has implications for various downstream applications, including algorithmic trading, risk assessment, and financial forecasting, where realistic synthetic data generation is crucial. The findings contribute to the ongoing discourse on generative modeling in finance, as published in [arXiv](https://arxiv.org/abs/2606.05138v1).
