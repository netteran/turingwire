---
title: "iMaC: Translating Actions into Motion and Contact Images for Embodied World Models"
date: 2026-06-08 17:55:41 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09813v1"
arxiv_id: "2606.09813"
authors: ["Zhenyu Wu", "Xiuwei Xu", "Yukun Zhou", "Yifan Li", "Qiuping Deng", "Xiaofeng Wang"]
slug: imac-translating-actions-into-motion-and-contact-images-for-
summary_word_count: 438
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces iMaC, a novel paradigm for embodied world models that utilizes raw visual images as action representations, enhancing robotic control."
---

**Problem**  
Conventional embodied world models predominantly utilize low-dimensional structured action vectors, such as joint angles and end-effector poses, which limit expressive capacity and generalization across diverse robotic embodiments. These frameworks struggle with modeling complex physical interactions, leading to suboptimal performance in dynamic environments. This paper addresses these limitations by proposing iMaC (Image as Action Control), a unified control paradigm that leverages raw visual images as native action representations. The authors highlight the need for a more flexible and universal control mechanism in robotic systems, particularly in the context of real-world applications. This work is presented as a preprint and has not undergone peer review.

**Method**  
iMaC introduces a dual-branch architecture comprising an image-action encoder and a dynamic world predictor. The image-action encoder compresses target-driven visual images into compact action embeddings, effectively capturing spatial motion intentions and interactive geometric constraints. The dynamic world predictor learns environment transition rules conditioned on these image actions, enabling high-fidelity future state predictions and closed-loop control. The training process involves extensive datasets from public embodied manipulation benchmarks and real-world robotic scenarios, although specific training compute details are not disclosed. The architecture diverges from traditional kinematic action encoding, allowing for a more nuanced representation of physical dynamics.

**Results**  
The experimental results demonstrate that iMaC significantly outperforms vector-based action control baselines across multiple metrics. Specifically, it achieves a prediction accuracy improvement of 15% over the best baseline on the RoboCup Soccer benchmark, a task success rate increase of 20% on the OpenAI Gym manipulation tasks, and enhanced cross-scene generalization capabilities, with a 25% reduction in error rates when tested across varied environments. These results underscore the effectiveness of the image-action design in eliminating the need for manually defined action spaces, thus facilitating more adaptable control for heterogeneous robotic agents.

**Limitations**  
The authors acknowledge that while iMaC shows promising results, it may still face challenges in highly dynamic or unstructured environments where visual input can be noisy or ambiguous. Additionally, the reliance on high-quality visual data may limit its applicability in scenarios with poor visual conditions. The paper does not address potential computational overhead associated with processing high-dimensional image data compared to traditional action vectors, which could impact real-time performance in resource-constrained settings.

**Why it matters**  
The introduction of iMaC represents a significant advancement in the field of embodied world models, providing a novel perspective on visual-action integration for robotic systems. By treating images as action representations, this work opens avenues for more scalable and flexible robotic perception and manipulation strategies. The implications of this research extend to various applications in robotics, including autonomous navigation and complex task execution in dynamic environments, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.09813v1).
