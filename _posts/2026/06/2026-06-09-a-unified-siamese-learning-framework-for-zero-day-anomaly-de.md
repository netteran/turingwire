---
title: "A Unified Siamese Learning Framework for Zero-Day Anomaly Detection and Classification in Optical Networks"
date: 2026-06-09 13:16:36 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10827v1"
arxiv_id: "2606.10827"
authors: ["Carlos Natalino", "Fl\u00e1via P. Monteiro", "Paolo Monti"]
slug: a-unified-siamese-learning-framework-for-zero-day-anomaly-de
summary_word_count: 438
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a unified Siamese neural network framework for zero-day anomaly detection and one-shot classification in optical networks."
---

**Problem**  
The paper addresses the lack of effective methodologies for zero-day anomaly detection and classification in optical networks, particularly in scenarios involving unseen anomaly types. Existing approaches often require extensive retraining when new anomalies are encountered, which is impractical in dynamic network environments. This work is a preprint and has not undergone peer review, highlighting the need for further validation in the community.

**Method**  
The authors propose a multi-similarity Siamese neural network architecture that integrates both anomaly detection and one-shot classification tasks. The architecture leverages a dual-branch design, where one branch processes the input data for anomaly detection while the other focuses on classification. The model employs a contrastive loss function to optimize the similarity between pairs of inputs, allowing it to learn robust feature representations. The training dataset consists of synthetic and real-world optical network traffic data, with a focus on diverse anomaly types. The authors report using a substantial amount of compute resources, although specific details on the training compute are not disclosed.

**Results**  
The proposed framework achieves over 99% accuracy in both zero-day anomaly detection and one-shot classification tasks. When evaluated against baseline models, including traditional machine learning classifiers and existing deep learning approaches, the Siamese network demonstrates a significant improvement in performance metrics. For instance, it outperforms a conventional supervised learning model by approximately 15% in accuracy on the benchmark dataset used for evaluation. The results indicate that the model can adapt instantly to new lightpaths and anomaly types without requiring retraining, showcasing its practical applicability in real-time network monitoring.

**Limitations**  
The authors acknowledge that the model's performance may be influenced by the quality and diversity of the training data, which could limit its generalizability to all possible network conditions. Additionally, the reliance on a Siamese architecture may introduce challenges in scaling to larger datasets or more complex anomaly types. The paper does not address potential computational overhead during inference, which could be a concern in high-throughput environments. Furthermore, the lack of peer review means that the findings should be interpreted with caution until validated by the community.

**Why it matters**  
This work has significant implications for the field of network security and anomaly detection, particularly in optical networks where rapid adaptation to new threats is critical. The ability to detect and classify anomalies without retraining can lead to more resilient network infrastructures and faster response times to security incidents. The unified approach also opens avenues for further research into multi-task learning frameworks in other domains, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.10827v1). This could inspire future studies to explore similar architectures for different types of network anomalies or in other application areas requiring real-time adaptability.
