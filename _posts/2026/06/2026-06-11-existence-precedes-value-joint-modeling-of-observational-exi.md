---
title: "Existence Precedes Value: Joint Modeling of Observational Existence and Evolving States in Time Series Forecasting"
date: 2026-06-11 16:59:42 +0000
category: research
subcategory: theory
company: "Oracle"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13571v1"
arxiv_id: "2606.13571"
authors: ["Yifan Hu", "Hongzhou Chen", "Peiyuan Liu", "Yiding Liu", "Zewei Dong", "Jiang-Ming Yang"]
slug: existence-precedes-value-joint-modeling-of-observational-exi
summary_word_count: 390
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Timeflies, a framework for joint modeling of future observability and value estimation in time series forecasting with missing data."
---

**Problem** — The paper addresses the gap in time series forecasting methods that assume future observation timestamps are known, which is often unrealistic in real-world scenarios. Existing techniques, including Neural ODEs and continuous-time graph networks, do not account for the uncertainty of future observations, limiting their practical applicability. This work is a preprint and has not undergone peer review.

**Method** — The authors propose Timeflies, a unified framework that reformulates the forecasting task into two interdependent components: future observability inference and value estimation. Timeflies employs an observation stream and a value stream, interconnected through three specialized modules: (1) reliability-aware embedding, which captures the reliability of observations; (2) observation-guided dependency modeling, which learns the relationships between observations and states; and (3) joint prediction, which integrates the outputs of the previous modules to produce forecasts. The framework is trained on a dataset that combines natural missingness from public datasets with real-world industrial data. The authors introduce the Observation-Value Joint Entropy (OVJE) metric to evaluate the performance of their model comprehensively.

**Results** — Timeflies demonstrates superior performance compared to existing baselines on the newly constructed Shadow benchmark, which incorporates both synthetic and real-world data. The paper reports that Timeflies achieves a significant improvement in forecasting accuracy, with a reduction in mean absolute error (MAE) by up to 15% compared to traditional impute-then-forecast methods and a 10% improvement over state-of-the-art continuous-time models. The results underscore the effectiveness of jointly modeling observability and value in time series forecasting.

**Limitations** — The authors acknowledge that the performance of Timeflies may be influenced by the quality and representativeness of the training data, particularly in scenarios with extreme missingness. Additionally, the computational complexity of the model may limit its scalability to very large datasets. The paper does not address the potential impact of noise in the observation data on the model's predictions.

**Why it matters** — The introduction of Timeflies represents a significant advancement in time series forecasting by explicitly addressing the dual challenges of observability and value estimation. This work has implications for various applications, including finance, healthcare, and IoT, where accurate forecasting in the presence of missing data is critical. The findings suggest that future research should focus on enhancing the robustness of models to handle extreme cases of missingness and exploring the integration of Timeflies with other forecasting techniques. This paper is available on [arXiv](https://arxiv.org/abs/2606.13571v1).
