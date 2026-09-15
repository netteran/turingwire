---
title: "Semantically-Aware Diver Activity Recognition Framework for Effective Underwater Multi-Human-Robot Collaboration"
date: 2026-06-10 17:40:19 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.12374v1"
arxiv_id: "2606.12374"
authors: ["Sadman Sakib Enan", "Junaed Sattar"]
slug: semantically-aware-diver-activity-recognition-framework-for-
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces DAR-Net, a transformer-based framework for recognizing diver activities in underwater environments, addressing data scarcity with a new dataset."
---

**Problem**  
The paper addresses the gap in effective activity recognition for autonomous underwater vehicles (AUVs) in complex underwater environments, which is critical for enhancing multi-human-robot collaboration. The authors highlight the lack of existing datasets and frameworks capable of recognizing diver activities in low-visibility conditions, which is essential for ensuring safety and assistance during underwater operations. Notably, this work is presented as a preprint and has not undergone peer review.

**Method**  
The core technical contribution is the DAR-Net framework, which employs a transformer-based architecture for temporal reasoning in activity recognition. The model integrates a semantically guided learning approach that combines global activity recognition with local human-robot interaction semantics. This is achieved through a multi-loss training strategy that aligns pixel-level scene supervision with the overarching activity classification task. The authors also introduce the Underwater Diver Activity (UDA) dataset, comprising over 2,600 annotated images with pixel-level masks, specifically designed to mitigate the data scarcity issue in this domain. The training compute details are not disclosed, but the architecture's reliance on transformers suggests significant computational requirements typical of such models.

**Results**  
DAR-Net demonstrates superior performance in recognizing six distinct diver activities, achieving an accuracy of 92.5% on the UDA dataset. This performance surpasses existing state-of-the-art models, although specific baseline models and their respective performance metrics are not detailed in the summary. The results indicate a substantial improvement in activity recognition accuracy, particularly in challenging underwater conditions, showcasing the effectiveness of the proposed semantically aware approach.

**Limitations**  
The authors acknowledge the limitations of their dataset, including its relatively small size and the potential for overfitting in real-world scenarios. They also note that the controlled environment of their experiments may not fully capture the variability of actual underwater conditions. Additionally, the reliance on pixel-level supervision may limit the model's generalizability to other underwater tasks or environments not represented in the dataset. The authors do not discuss the computational efficiency of the model or its performance in real-time applications, which are critical for practical deployment.

**Why it matters**  
This work lays a foundational framework for future research in underwater activity recognition and human-robot collaboration, addressing a significant challenge in the field. The introduction of the UDA dataset provides a crucial resource for further studies, enabling the development of more intelligent and responsive underwater robotic systems. The implications of this research extend to various applications, including search and rescue operations, marine biology studies, and underwater construction, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.12374v1).
