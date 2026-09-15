---
title: "When Do Autoregressive Sequence Models Forecast Physical Wavefields? A Controlled Study on Synthetic Seismograms"
date: 2026-06-09 13:46:14 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10868v1"
arxiv_id: "2606.10868"
authors: ["Waleed Esmail", "Stuart Russell", "Jana Klinge", "Alexander Kappes", "Christine Thomas"]
slug: when-do-autoregressive-sequence-models-forecast-physical-wav
summary_word_count: 455
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the stability of autoregressive models in forecasting synthetic seismograms, identifying key architectural choices that enhance performance."
---

**Problem**  
This work addresses the challenge of long-horizon autoregressive forecasting of oscillatory physical signals, specifically synthetic seismograms. The authors highlight the issue of error accumulation in causal models, where small inaccuracies compound over time, leading to phase drift that traditional pointwise metrics fail to capture. The study is positioned as a controlled investigation into the conditions under which autoregressive models maintain stable rollouts, filling a gap in the literature regarding the robustness of these models in forecasting physical wavefields. Notably, this is a preprint and has not undergone peer review.

**Method**  
The authors utilize the \textsc{SeismoGPT} autoregressive forecaster, conducting a series of controlled intra-architecture ablations to evaluate the model's performance during free-running rollouts. The study focuses on several architectural choices, including multi-token prediction, a horizon-embedding hybrid prediction head, and a cross-horizon Short-Time Fourier Transform (STFT) magnitude coherence loss. The primary contribution is the identification of multi-token prediction as a significant stabilizer, which improves performance over a single-token baseline by a median Normalized Cross-Correlation (NCC) of +0.040. The experiments are designed to isolate the impact of each design choice on the model's ability to generalize during rollout, with a specific emphasis on the context-ratio threshold, which is found to be critical for maintaining stability.

**Results**  
The findings indicate that the multi-token prediction mechanism is the most effective at enhancing rollout stability, with a substantial improvement in performance metrics compared to the single-token baseline. The context-ratio threshold, approximately equal to the full P-S interval of the observed signal, is crucial; below this threshold, the model's generalization capabilities deteriorate significantly. The authors report that the dominant failure mode during rollout is polarity inversion, which is not adequately addressed by the magnitude-based spectral loss employed in the model. This suggests that phase-aware objectives may be necessary for further improvements.

**Limitations**  
The authors acknowledge that their study is limited to synthetic seismograms and may not generalize to other types of oscillatory signals or real-world data. They also note that the inability of the current loss function to penalize polarity inversion represents a significant limitation, indicating a need for future work to explore phase-aware loss functions. Additionally, the controlled nature of the study may not capture the complexities present in real-world forecasting scenarios.

**Why it matters**  
This research has important implications for the development of autoregressive models in forecasting physical wavefields, particularly in fields such as seismology and gravitational-wave astronomy. By identifying key architectural features that enhance stability, this work lays the groundwork for future studies aimed at improving the robustness of forecasting models. The findings suggest that incorporating phase-aware objectives could lead to significant advancements in model performance. This study contributes to the ongoing discourse on the limitations of autoregressive models in complex forecasting tasks, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.10868v1).
