---
title: "HAMON: Passive Optical Sequence Mixing for Long-Horizon Forecasting"
date: 2026-06-15 17:51:50 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.17028v1"
arxiv_id: "2606.17028"
authors: ["Alper Y\u0131ld\u0131r\u0131m"]
slug: hamon-passive-optical-sequence-mixing-for-long-horizon-forec
summary_word_count: 418
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces HAMON, a passive optical forecasting model that outperforms digital baselines in long-horizon time-series forecasting."
---

**Problem**  
This work addresses the gap in the literature regarding the effectiveness of complex learned models for long-horizon time-series forecasting. It challenges the prevailing assumption that high-capacity models, such as transformers, are necessary for accurate predictions, especially given that simpler linear and frequency-domain models have shown competitive performance. The authors propose a novel approach using passive optical systems, which has not been extensively explored in this context. This paper is a preprint and has not undergone peer review.

**Method**  
HAMON employs a passive diffractive optical architecture for forecasting. Historical time-series data is encoded onto an optical aperture, while future time points remain unlit. The model utilizes cascaded trainable phase masks that manipulate the optical field through free-space diffraction, allowing for direct forecasting without a digital sequence-mixing layer. The inference process involves a single pass of optical propagation, leveraging the principles of Fourier optics. The authors provide a detailed description of the phase encoding and intensity-compatible readout mechanisms, as well as phase-scrambling ablations to validate the model's performance.

**Results**  
HAMON demonstrates superior performance on the ETTm2 benchmark, outperforming the strongest digital baselines across all forecasting horizons, with a maximum improvement in mean squared error (MSE) of up to 14%. On the ETTh2 dataset, HAMON also excels, achieving better results at all but the longest forecasting horizon. While it shows competitive performance on the Weather dataset, it trails behind the strongest baselines on other ETT settings and on high-channel-count datasets such as Traffic and Electricity. The results indicate that the optical field carries the predictive information, as confirmed by the TorchOptics cross-simulator checks.

**Limitations**  
The authors acknowledge that while HAMON outperforms several digital baselines, it does not achieve the same level of performance across all datasets, particularly on high-channel-count datasets. Additionally, the reliance on passive optical components may limit the model's scalability and adaptability to various forecasting tasks. The paper does not address potential challenges in real-world deployment, such as noise and environmental factors affecting optical systems.

**Why it matters**  
The introduction of HAMON represents a significant advancement in the field of time-series forecasting by demonstrating that passive optical systems can effectively replace complex digital architectures. This work opens avenues for further research into optical computing and its applications in machine learning, particularly in scenarios where low-latency and high-throughput predictions are critical. The findings suggest that future forecasting models could benefit from integrating optical components, potentially leading to more efficient and scalable solutions. This is particularly relevant as the field moves towards exploring non-traditional computing paradigms, as published in [arXiv](https://arxiv.org/abs/2606.17028v1).
