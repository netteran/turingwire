---
title: "Synthetic Data Generation and Vision-based Wrinkle and Keypoint Detection for Bimanual Cloth Manipulation"
date: 2026-06-04 15:30:49 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06292v1"
arxiv_id: "2606.06292"
authors: ["Ariel Herrera", "Xueyang Kang", "Atal Anil Kumar"]
slug: synthetic-data-generation-and-vision-based-wrinkle-and-keypo
summary_word_count: 393
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a synthetic data generation pipeline and a perception framework for robust wrinkle and keypoint detection in bimanual cloth manipulation."
---

**Problem** — The paper addresses the challenge of robotic manipulation of textiles, particularly the difficulties posed by continuous deformation and self-occlusions that hinder robust visual perception. The authors highlight the lack of annotated real-world data for training models in this domain, which is critical for effective cloth state estimation. This work is a preprint and has not undergone peer review.

**Method** — The authors developed a Blender-based synthetic data generation pipeline that produces auto-annotated keypoints, which are essential for training the models. They combined this synthetic data with manually labeled renders and real-world data to train a wrinkle detection model. The perception framework integrates a convolutional neural network (CNN) for permutation-invariant keypoint detection and employs a YOLOv8-OpenCV pipeline to extract grasping points from structural wrinkles. The proposed bimanual algorithm utilizes this perception system to manipulate fully folded garments by leveraging wrinkles and transitioning to keypoint-based ironing once corners are detected. The keypoint detection model is evaluated using Mean Position Error (MPE) as a metric.

**Results** — The keypoint model achieves a Mean Position Error (MPE) of 1.7615 pixels, demonstrating high accuracy in detecting keypoints. The perception system successfully transfers to physical fabrics without requiring fine-tuning, outperforming baseline models that struggle in high-occlusion scenarios or produce false positives on severely folded textiles. Specific baseline models were not named in the abstract, but the results indicate a significant improvement in performance under challenging conditions.

**Limitations** — The authors acknowledge that the reliance on synthetic data may not fully capture the complexities of real-world scenarios, potentially limiting the generalizability of the trained models. Additionally, the paper does not discuss the computational resources required for training the models or the scalability of the synthetic data generation pipeline. The performance of the system in diverse lighting conditions and varying fabric types is also not addressed.

**Why it matters** — This work has significant implications for advancing robotic manipulation of textiles, particularly in applications such as automated ironing and garment handling. The integration of synthetic data generation with real-world data enhances the training process, potentially reducing the need for extensive manual annotation. The ability of the perception system to operate effectively without fine-tuning on physical fabrics suggests a promising direction for future research in robotic manipulation and computer vision. This research contributes to the growing body of literature on synthetic data applications in robotics, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.06292v1).
