---
title: "Performance Evaluation of GraphCast for Medium-Range Weather Forecasting over Brazil"
date: 2026-06-04 16:19:29 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06348v1"
arxiv_id: "2606.06348"
authors: ["Wolfgang R. Rowell", "Lucas S. Kupssinsk\u00fc"]
slug: performance-evaluation-of-graphcast-for-medium-range-weather
summary_word_count: 397
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper evaluates the performance of GraphCast for medium-range weather forecasting in Brazil, highlighting its strengths and weaknesses across different seasons."
---

**Problem**  
This study addresses the gap in regional performance evaluation of Machine Learning Weather Prediction (MLWP) models, specifically GraphCast, in the Global South, where existing literature is limited and unverified. The authors highlight the need for robust benchmarks in complex, convective environments, particularly in Brazil, where traditional numerical weather prediction (NWP) models have been the standard.

**Method**  
The authors employ a cloud-native pipeline to benchmark GraphCast against the deterministic ECMWF IFS HRES model across four Brazilian climatic sub-regions. They utilize the WeatherBench-X framework to assess selected tropospheric variables, including temperature at 850 hPa ($T_{850}$), specific humidity at 850 hPa ($Q_{850}$), and geopotential height at 500 hPa ($Z_{500}$). The evaluation spans four seasonal windows, using operational IFS analysis as the ground truth for statistical metrics. The study emphasizes regime-dependent skill profiles, analyzing performance during both the austral winter and summer seasons.

**Results**  
The results indicate a nuanced performance of GraphCast relative to the ECMWF baseline. During the austral winter (lead days 2-7), GraphCast exhibits reduced skill in predicting $Z_{500}$, particularly in southern Brazil, where it struggles with fast-propagating baroclinic systems. However, in the extended range, GraphCast demonstrates improved performance due to its ability to smooth chaotic small-scale variability, yielding better deterministic skill metrics. In contrast, during the austral summer wet season, GraphCast effectively captures large-scale moisture transport but dampens high-frequency convective variability, which negatively impacts temperature forecasts. The study provides a detailed analysis of skill scores, although specific numerical values are not disclosed in the abstract.

**Limitations**  
The authors acknowledge that their findings are contingent on the specific climatic conditions of Brazil and may not generalize to other regions with different meteorological dynamics. They also note the limitations of the WeatherBench-X framework in capturing all aspects of model performance. Additionally, the study is a preprint and has not undergone peer review, which may affect the robustness of the conclusions drawn.

**Why it matters**  
This research establishes a critical baseline for evaluating MLWP models in Brazil, highlighting the specific physical boundaries that need to be addressed for future "tropicalization" efforts aimed at optimizing AI models for regional resilience. The findings underscore the importance of tailored approaches in MLWP, particularly in regions with complex weather patterns, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.06348v1). This work paves the way for further investigations into enhancing the performance of ML-based forecasting systems in the Global South, contributing to improved weather prediction capabilities in these regions.
