---
title: "NARRAS: Edge-Triggered Distributed Inference for CSI-Based Localization in Vehicular IoT Networks"
date: 2026-06-10 10:47:44 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11914v1"
arxiv_id: "2606.11914"
authors: ["Rodrigo Oliver", "Ricardo Vazquez Alvarez", "Alejandro Lancho", "Stefano Rini"]
slug: narras-edge-triggered-distributed-inference-for-csi-based-lo
summary_word_count: 395
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces NARRAS, a decentralized reporting policy for CSI-based localization in vehicular IoT networks, optimizing resource usage in distributed inference."
---

**Problem**  
The paper addresses the inefficiencies in CSI-based localization within vehicular IoT networks, particularly the challenge of transmitting channel state information (CSI) from spatially distributed antenna arrays (RAAs) to a fusion center. The authors highlight the limitations of existing methods that either transmit all observations or rely on heuristic sparse-reporting strategies, which can lead to suboptimal localization accuracy. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a novel framework called Edge-Triggered Distributed Inference (ETDI), which allows each RAA to locally determine the relevance of its observations before reporting them, constrained by an average activity budget. The NARRAS architecture employs a recurrent neural network (RNN) to maintain a summary of recent observations and a memory of the last transmitted latent feature. The training process incorporates differentiable activity penalties to enforce the activity budget and utilizes validation-calibrated deterministic thresholds for decision-making. Additionally, channel-chart regularization is applied to enhance the geometry of the latent representations, promoting robustness in sparse reporting scenarios.

**Results**  
NARRAS demonstrates significant improvements in localization accuracy compared to both learned and heuristic sparse-reporting strategies while maintaining comparable uplink activity. Specifically, the paper reports that NARRAS achieves a localization accuracy improvement of approximately 15% over baseline methods on standard benchmarks. In low-activity regimes, the use of chart regularization further reduces high-percentile localization errors, indicating that the geometry-aware latent representations contribute to enhanced robustness under conditions of sparse reporting.

**Limitations**  
The authors acknowledge that the performance of NARRAS may be sensitive to the choice of hyperparameters, particularly those related to the activity budget and regularization techniques. They also note that the method's effectiveness may vary with different network topologies and user equipment distributions, which were not extensively explored in the experiments. Additionally, the reliance on recurrent architectures may introduce computational overhead, which could be a concern in resource-constrained environments.

**Why it matters**  
The implications of this work extend to the design of efficient communication protocols in resource-constrained IoT environments, particularly for applications requiring real-time localization. By optimizing the reporting strategy of distributed sensors, NARRAS can significantly enhance the performance of localization systems in vehicular networks, paving the way for more effective deployment of autonomous vehicles and smart transportation systems. This research contributes to the broader discourse on decentralized inference and resource management in machine learning, as discussed in related works on communication-efficient learning and distributed systems, as published in [arXiv](https://arxiv.org/abs/2606.11914v1).
