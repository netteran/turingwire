---
title: "An Open-Source Two-Stage Computer Vision Pipeline for Fine-Grained Vehicle Classification using Vision Transformers"
date: 2026-06-03 17:53:33 +0000
category: research
subcategory: other
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.05149v1"
arxiv_id: "2606.05149"
authors: ["Gandhimathi Padmanaban", "Fred Feng"]
slug: an-open-source-two-stage-computer-vision-pipeline-for-fine-g
summary_word_count: 429
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces an open-source two-stage pipeline for fine-grained vehicle classification using Vision Transformers, addressing a gap in automated vehicle categorization."
---

**Problem**  
The paper addresses the lack of automated tools for classifying vehicles into fine-grained categories relevant to cyclist injury risk from naturalistic roadway video. Existing object detection benchmarks provide only coarse labels (e.g., car, truck), and current fine-grained recognition systems are typically trained on controlled datasets, lacking robustness evaluation across diverse recording environments. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for further validation in real-world applications.

**Method**  
The proposed pipeline consists of two stages: a pre-trained RT-DETR (Deformable Transformer) for coarse vehicle localization and a fine-tuned Vision Transformer (ViT-Base/16) for classifying vehicles into six categories: passenger car, SUV, pickup truck, minivan, large van, and commercial truck. The authors implement a confidence-based abstention mechanism that withholds predictions from Stage 2 when the softmax output probability is below 0.60, thereby avoiding silent misclassifications by labeling uncertain predictions as unknown. The model was trained on a dataset of 3,805 annotated overtaking events collected from a bicycle-lane corridor in Ann Arbor, Michigan.

**Results**  
The pipeline achieved an impressive accuracy of 0.94 on the in-distribution dataset, with per-class F1 scores ranging from 0.91 for minivans to 0.97 for SUVs. In an independent out-of-distribution evaluation using 311 events from an open cycling dataset, the model maintained an accuracy of 0.89. Notably, three out of four well-represented categories sustained F1 scores above 0.90 despite the domain shift. The most significant performance drop was observed for minivans, where the F1 score decreased to 0.72, primarily due to an increase in the abstention rate from 2.4% to 25.0%, indicating that the model's uncertainty was accurately reflected in its predictions.

**Limitations**  
The authors acknowledge that the abstention mechanism may lead to a higher rate of unknown labels, particularly for certain vehicle types like minivans, which could impact the overall utility of the system in practical applications. Additionally, the model's performance on out-of-distribution data suggests that further training or domain adaptation may be necessary to enhance robustness across varied environments. The paper does not address potential biases in the training data or the implications of deploying the model in real-world scenarios.

**Why it matters**  
This work contributes significantly to the field of computer vision and traffic safety by providing an open-source solution for fine-grained vehicle classification, which is crucial for understanding cyclist injury risks in overtaking scenarios. The release of the full pipeline, including inference scripts and model weights, promotes reproducibility and encourages further research in cycling safety and automated vehicle classification, as discussed in the context of existing literature on vehicle detection and classification, available on [arXiv](https://arxiv.org/abs/2606.05149v1).
