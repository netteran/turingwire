---
title: "GRAFT: Gain-Recalibrated Adapters for Transformer-Based Neural Population Activity Modeling"
date: 2026-06-09 16:29:34 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: critical
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11066v1"
arxiv_id: "2606.11066"
authors: ["Xiangsheng Ge", "Yang Xie"]
slug: graft-gain-recalibrated-adapters-for-transformer-based-neura
summary_word_count: 430
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper presents GRAFT, a Transformer-based model that enhances neural population activity modeling by decoupling temporal dynamics from neuron interfaces."
---

**Problem**  
Current neural population activity models are constrained by fixed read-in and readout layers tied to specific recorded neurons, limiting their adaptability in long-term brain-computer interfaces (BCIs). This paper addresses the gap in literature regarding the need for models that can dynamically adjust to varying neuron identities, counts, and response statistics over time. The authors propose GRAFT, a novel approach that allows for the recalibration of neuron interfaces while maintaining robust temporal dynamics, a capability that is particularly relevant for applications requiring long-term monitoring and interaction with neural data. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
GRAFT employs a Transformer architecture that integrates a gain-recalibrated adapter mechanism. The model separates the reusable temporal dynamics from a neuron interface that can be recalibrated. The neuron interface is designed to manage the entry and exit of recorded neurons into a shared backbone, allowing for flexibility in adapting to new data. Auxiliary mechanisms for gain adjustment and positional encoding are incorporated to enhance the modeling of neural activity within the Transformer framework. The training process and specific computational resources utilized are not disclosed, but the model's architecture is explicitly designed to facilitate efficient parameter updates.

**Results**  
On the MC Maze benchmark under the NLB'21 protocol, GRAFT achieves a new state-of-the-art performance with a co-bps score of 0.3866 as an ensemble, surpassing all previously reported results. In a cross-day evaluation using the NLB'21 MC Maze dataset series, GRAFT demonstrates impressive adaptability by recalibrating to different dataset scales (Large/Medium/Small) with only 9.21% of its parameters updated. The model achieves co-bps scores of 0.3749, 0.3112, and 0.3152 for these respective datasets, indicating strong performance even with limited target-day support sets.

**Limitations**  
The authors acknowledge that while GRAFT shows significant improvements in adaptability and performance, the model's reliance on a fixed architecture may limit its generalizability to other types of neural data or different experimental setups. Additionally, the paper does not provide extensive details on the computational resources used for training, which could impact reproducibility. The performance metrics are primarily focused on co-bps, and further evaluation on additional benchmarks could provide a more comprehensive understanding of the model's capabilities.

**Why it matters**  
GRAFT's ability to decouple temporal dynamics from neuron interfaces represents a significant advancement in neural population activity modeling, particularly for applications in BCIs where adaptability is crucial. The model's efficiency in recalibrating with minimal parameter updates opens avenues for future research in dynamic neural data analysis and long-term monitoring. This work lays the groundwork for further exploration of Transformer-based architectures in neuroscience applications, as published in [arXiv](https://arxiv.org/abs/2606.11066v1).
