---
title: "Zero Touch Predictive Orchestration: Automating Time-Series Models for the Cloud-Edge Continuum"
date: 2026-06-08 17:43:41 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09787v1"
arxiv_id: "2606.09787"
authors: ["Abd Elghani Meliani", "Arora Sagar", "Adlen Ksentini", "Raymond Knopp"]
slug: zero-touch-predictive-orchestration-automating-time-series-m
summary_word_count: 377
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel automated time-series prediction architecture to address the cold start problem in Cloud-Edge Continuum resource orchestration."
---

**Problem**  
The paper addresses the cold start problem in the Cloud-Edge Continuum (CEC), where newly discovered nodes lack sufficient historical data for training localized predictive models. Existing generalized models fail to capture the unique behaviors of hardware and microservices, leading to inefficiencies in resource orchestration. This work is a preprint and has not undergone peer review, highlighting the need for further validation in the literature.

**Method**  
The authors propose a fully automated time-series prediction architecture that integrates a lightweight, technology-agnostic Resource Exposer (RE) for dynamic node discovery and telemetry collection. The RE continuously gathers customizable telemetry data, including compute, network, and energy metrics. To address the sparsity of local samples, the framework employs a novel data-mixing methodology that merges local node data with TimeTrack, a publicly available high-resolution dataset collected at 45-second intervals. This approach leverages TimeTrack's foundational temporal patterns to enhance the calibration of local data. The architecture utilizes a Neural Architecture Search (NAS) engine to automatically generate baseline models optimized for forecasting accuracy.

**Results**  
Experimental evaluations demonstrate that the proposed data-mixing strategy significantly improves forecasting accuracy. The integration of local node data with TimeTrack results in reductions in Mean Squared Error (MSE), Mean Absolute Error (MAE), and Mean Absolute Percentage Error (MAPE) compared to several baselines: training solely on sparse local samples, using generic datasets, or mixing with standard alternative datasets. The authors report a notable acceleration in convergence rates, establishing a robust foundation for continuous MLOps deployment.

**Limitations**  
The authors acknowledge that their approach relies on the availability and quality of the TimeTrack dataset, which may not generalize to all environments. Additionally, the performance of the proposed architecture in highly dynamic or heterogeneous environments remains to be fully explored. The paper does not address potential scalability issues when applied to larger networks or the computational overhead introduced by the NAS engine.

**Why it matters**  
This work has significant implications for the automation of resource orchestration in latency-sensitive applications across the Cloud-Edge Continuum. By effectively addressing the cold start problem, the proposed methodology enhances the reliability and efficiency of predictive models in dynamic environments, paving the way for improved MLOps practices. The findings contribute to the ongoing discourse on optimizing resource management in edge computing, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.09787v1).
