---
title: "VLGA: Vision-Language-Geometry-Action Models for Autonomous Driving"
date: 2026-06-10 17:57:06 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: critical
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.12396v1"
arxiv_id: "2606.12396"
authors: ["Jin Yao", "Dhruva Dixith Kurra", "Tom Lampo", "Zezhou Cheng", "Danhua Guo", "Burhan Yaman"]
slug: vlga-vision-language-geometry-action-models-for-autonomous-d
summary_word_count: 386
classification_confidence: 0.90
source_truncated: false
layout: post
description: "This paper presents VLGA, a novel vision-language-action model that integrates dense 3D geometry for improved autonomous driving performance."
---

**Problem**  
Existing vision-language-action (VLA) models struggle to effectively ground actions in complex 3D environments, often relying on frozen 3D features or sparse geometric constraints that lack dense spatial signals. This paper addresses this gap by introducing VLGA, the first VLA model that incorporates geometry as a fourth modality, enabling it to reconstruct the dense 3D world it navigates. The work is presented as a preprint and has not undergone peer review.

**Method**  
VLGA integrates a dedicated geometry expert that is supervised by a per-pixel pointmap regression loss, utilizing LiDAR data to provide dense spatial signals. The architecture combines vision, language, action, and geometry modalities, allowing for a more comprehensive understanding of the environment. The model is trained on the nuScenes and Bench2Drive datasets, focusing on both open-loop and closed-loop evaluations. The training process emphasizes the reconstruction of the 3D environment, which is critical for effective decision-making in autonomous driving scenarios.

**Results**  
VLGA demonstrates significant improvements over existing VLA methods. On the nuScenes dataset, it achieves a new state-of-the-art performance without ego status, recording the lowest L2 error of 0.50 meters on average and a 3-second collision rate of 0.18%. In closed-loop evaluations on the Bench2Drive dataset, VLGA attains a driving score of 79.08, surpassing the previous best VLA model by 0.71 points while maintaining comparable efficiency and comfort levels. These results highlight the effectiveness of integrating dense geometric information into VLA frameworks.

**Limitations**  
The authors acknowledge that while VLGA improves upon existing methods, it may still face challenges in highly dynamic environments where rapid decision-making is crucial. Additionally, the reliance on LiDAR data may limit its applicability in scenarios where such sensors are not available. The paper does not address potential computational overhead introduced by the additional geometric modality, which could impact real-time performance in practical applications.

**Why it matters**  
The introduction of VLGA marks a significant advancement in the integration of vision, language, action, and geometry for autonomous driving, providing a more robust framework for understanding and interacting with complex environments. This work has implications for future research in multimodal AI systems, particularly in enhancing the safety and efficiency of autonomous vehicles. The findings contribute to the ongoing discourse on improving VLA models and are relevant for researchers focusing on the intersection of computer vision, natural language processing, and robotics, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.12396v1).
