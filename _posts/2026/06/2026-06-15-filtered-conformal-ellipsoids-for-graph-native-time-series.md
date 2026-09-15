---
title: "Filtered Conformal Ellipsoids for Graph-Native Time Series"
date: 2026-06-15 17:46:19 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.17014v1"
arxiv_id: "2606.17014"
authors: ["Yannick Limmer"]
slug: filtered-conformal-ellipsoids-for-graph-native-time-series
summary_word_count: 414
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces filtered conformal ellipsoids for multivariate time series, enhancing prediction set accuracy by addressing cross-coordinate dependence."
---

**Problem**  
The paper addresses the challenge of generating joint prediction sets for multivariate time series that effectively control for a single event while adapting to cross-coordinate dependencies. Existing methods often fail to account for the interdependencies among time series coordinates, leading to suboptimal prediction sets. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a novel framework utilizing filtered conformal ellipsoids, where a frozen state-space filter generates a one-step predictive mean and covariance. The method employs split-conformal calibration applied to Mahalanobis scores derived from the filter's output. The filter determines the ellipsoid shape, while the calibration process selects the scalar radius, allowing the construction to leverage learned predictive covariance without relying on Gaussian tail probabilities for coverage. The paper introduces a contraction analysis of the learned recurrent filters, focusing on an observable predictive-law quotient that identifies hidden states yielding identical future sequences of emitted Gaussian laws. The framework is instantiated using a Graph Convolutional Network (GCN) combined with a Gated Recurrent Unit (GRU) filter, which incorporates diagonal-plus-low-rank covariance structures.

**Results**  
The proposed method was evaluated on moderate-size graph-native traffic benchmarks, specifically METRLA-$20$ and PEMSBAY-$50$. The results indicate that the learned filter produces sharper at-target ellipsoids compared to static-covariance and non-filter baselines. Notably, the method achieves a significant improvement in predictive performance, although the paper does not provide specific numerical effect sizes or p-values. In scenarios involving full-graph scale and non-graph-native datasets, the authors note that factor and copula baselines may outperform their approach.

**Limitations**  
The authors acknowledge that the method's reliance on a stable Bayes Gaussian-projection filter and the finite-horizon observability Fisher condition may limit its applicability in certain contexts. Additionally, the requirement for an additional geometric-mixing concentration assumption to achieve sharper Bernstein-type bounds could restrict the generalizability of the results. The paper does not address potential computational inefficiencies associated with the learned filters or the scalability of the method to larger datasets beyond the tested benchmarks.

**Why it matters**  
This work has significant implications for the field of time series forecasting, particularly in applications where multivariate dependencies are critical, such as traffic prediction and financial modeling. By providing a method that enhances the accuracy of prediction sets while accounting for interdependencies, this research contributes to the development of more robust statistical tools for complex data scenarios. The findings are relevant for future research in conformal prediction and graph-based learning, as published in [arXiv](https://arxiv.org/abs/2606.17014v1).
