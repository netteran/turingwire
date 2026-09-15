---
title: "Navigating the Safety-Fidelity Trade-off: Massive-Variate Time Series Forecasting for Power Systems via Probabilistic Scenarios"
date: 2026-06-11 13:27:43 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13338v1"
arxiv_id: "2606.13338"
authors: ["Kaijie Xu", "Anqi Wang", "Xilin Dai"]
slug: navigating-the-safety-fidelity-trade-off-massive-variate-tim
summary_word_count: 399
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces PowerPhase, a novel probabilistic forecasting benchmark for power systems, and PowerForge, a scenario-based quantile forecaster."
---

**Problem**  
The paper addresses the lack of comprehensive benchmarks for probabilistic forecasting in multivariate systems, particularly in power systems, where existing benchmarks either do not scale adequately or fail to incorporate temporal structure and probabilistic evaluation. Current canonical benchmarks are limited to 2,000 channels, while power-system benchmarks lack the necessary complexity and evaluation metrics. This work is a preprint and has not undergone peer review.

**Method**  
The authors introduce PowerPhase, a probabilistic forecasting benchmark that encompasses six transmission grids with channel counts ranging from 2,000 to 36,964, significantly exceeding existing benchmarks. Each target trajectory is derived from an AC power-flow solve, ensuring that the outputs are physically grounded. PowerPhase includes novel constraint-aware metrics such as Safety_mBrier, NECV, and CVaR-alpha, which complement traditional metrics like CRPS and Distortion. The authors also propose PowerForge, a scenario-based quantile forecaster that employs type-specific decoding heads and a causal bridge to connect variable groups, enhancing the model's ability to capture complex interdependencies among channels.

**Results**  
PowerForge demonstrates superior performance across all tested grids, achieving the best average rank in distributional accuracy and constraint satisfaction when compared to eight baseline models across three random seeds. The results indicate a significant trade-off between safety and fidelity, termed safety-fidelity, where models rank differently based on their ability to satisfy operational constraints while maintaining accurate probabilistic forecasts. Specific performance metrics and effect sizes are not disclosed in the abstract, but the emphasis on ranking suggests a robust comparative analysis.

**Limitations**  
The authors acknowledge that the proposed benchmarks and models may not generalize to all types of multivariate systems beyond power grids. Additionally, the reliance on AC power-flow solves may introduce computational overhead, and the performance of PowerForge in real-world scenarios remains untested. The paper does not address potential scalability issues when applied to even larger systems or the implications of model interpretability in operational settings.

**Why it matters**  
This work significantly advances the field of probabilistic forecasting in power systems by providing a scalable benchmark and a novel forecasting model that addresses both accuracy and operational constraints. The introduction of PowerPhase and PowerForge could facilitate further research into robust forecasting methods that are critical for the integration of renewable energy sources and the management of complex power grids. The implications of this research extend to various applications in energy management and operational planning, as highlighted in the context of existing literature on probabilistic forecasting, as published in [arXiv](https://arxiv.org/abs/2606.13338v1).
