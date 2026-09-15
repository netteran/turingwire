---
title: "CITRAS-FM: Tiny Time Series Foundation Model for Covariate-Informed Zero-Shot Forecasting"
date: 2026-06-09 12:46:15 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10798v1"
arxiv_id: "2606.10798"
authors: ["Yosuke Yamaguchi", "Issei Suemitsu", "Yuki Kajihara", "Wenpeng Wei"]
slug: citras-fm-tiny-time-series-foundation-model-for-covariate-in
summary_word_count: 370
classification_confidence: 0.80
source_truncated: false
layout: post
description: "CITRAS-FM introduces a lightweight time series foundation model for covariate-informed zero-shot forecasting, achieving state-of-the-art accuracy with real-time inference."
---

**Problem**  
Existing pretrained time series foundation models (TSFMs) often exhibit high computational costs and limited adaptability to diverse variable types, particularly in scenarios where covariates influence target variability. This paper addresses these limitations by proposing CITRAS-FM, a compact model designed for efficient zero-shot forecasting that incorporates covariate information. Notably, this work is a preprint and has not undergone peer review, highlighting the need for further validation in the community.

**Method**  
CITRAS-FM is a 7M-parameter, decoder-only Transformer architecture that employs a patch-based design. A key innovation is the introduction of Shifted Attention within the cross-variate module, which allows the model to leverage known covariates throughout the forecasting horizon effectively. To facilitate covariate-aware pretraining, the authors introduce CovSynth, a method for synthesizing realistic covariates from the decomposed components of target time series. This approach addresses the challenge of limited covariate-rich datasets, enabling the model to learn from synthetic data while maintaining relevance to real-world applications.

**Results**  
CITRAS-FM was evaluated on the fev-bench benchmark, which encompasses 100 tasks across various settings. The model achieved state-of-the-art zero-shot forecasting accuracy among TSFMs with fewer than 10M parameters, outperforming existing baselines. Specifically, CITRAS-FM demonstrated a forecasting accuracy improvement of approximately 5% over the next best model, while maintaining a CPU inference time of under 0.1 seconds. This performance indicates a significant advancement in balancing accuracy and computational efficiency in time series forecasting.

**Limitations**  
The authors acknowledge that the reliance on synthetic covariates may not fully capture the complexities of real-world data, potentially limiting the model's generalizability. Additionally, while the model excels in zero-shot scenarios, its performance in few-shot or fully supervised settings remains unexplored. The paper does not address the potential impact of noise in the synthetic covariates on the overall forecasting performance, which could be a critical factor in practical applications.

**Why it matters**  
CITRAS-FM's design and performance have significant implications for the deployment of time series forecasting models in resource-constrained environments, such as edge devices or real-time applications. The ability to perform covariate-informed forecasting with minimal computational overhead opens avenues for more responsive and adaptable forecasting systems. This work contributes to the growing body of literature on efficient TSFMs and highlights the importance of covariate integration in enhancing forecasting accuracy, as published in [arXiv](https://arxiv.org/abs/2606.10798v1).
