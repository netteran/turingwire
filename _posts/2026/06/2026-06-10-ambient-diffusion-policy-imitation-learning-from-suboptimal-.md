---
title: "Ambient Diffusion Policy: Imitation Learning from Suboptimal Data in Robotics"
date: 2026-06-10 17:34:12 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12365v1"
arxiv_id: "2606.12365"
authors: ["Adam Wei", "Nicholas Pfaff", "Thomas Cohn", "Arif Kerem Day\u0131", "Constantinos Daskalakis", "Giannis Daras"]
slug: ambient-diffusion-policy-imitation-learning-from-suboptimal-
summary_word_count: 377
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Ambient Diffusion Policy, a novel method for effective imitation learning from suboptimal data in robotics, enhancing data utility."
---

**Problem**  
The paper addresses the challenge of leveraging suboptimal datasets in robotics, which are often abundant but contain lower-quality or out-of-distribution demonstrations. Existing co-training methods struggle to differentiate between useful and detrimental features in these suboptimal samples. This work is particularly relevant as it presents a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose the Ambient Diffusion Policy, which introduces a novel approach to co-training by incorporating noise-dependent data usage. This method restricts the influence of suboptimal data during training to specific diffusion times, effectively filtering out harmful features. The theoretical foundation is built on the observation that robot action data follows a spectral power law, leading to two critical properties: a global-to-local hierarchy and locality. The authors formalize these concepts using a simplified model, which underpins the design of the Ambient Diffusion Policy. The method is evaluated across four types of suboptimal action data: noisy trajectories, sim-to-real gaps, task mismatches, and large-scale data mixtures, across six distinct robotic tasks.

**Results**  
The Ambient Diffusion Policy demonstrates significant improvements over existing co-training baselines, achieving up to a 33% performance increase when evaluated on the Open X-Embodiment dataset, which features heterogeneous data quality and unstructured distribution shifts. The results indicate that the proposed method effectively learns from various sources of suboptimal data, enhancing the overall performance of robotic systems in real-world applications.

**Limitations**  
The authors acknowledge that their approach may still be sensitive to the quality of the suboptimal data and that the theoretical model is simplified, which may not capture all complexities of real-world scenarios. Additionally, the reliance on specific diffusion times may limit the generalizability of the method across all types of robotic tasks. The paper does not address potential computational overhead introduced by the noise-dependent data usage mechanism.

**Why it matters**  
The Ambient Diffusion Policy has significant implications for the field of robotics, particularly in scenarios where high-quality, task-specific data is scarce or expensive to obtain. By effectively utilizing suboptimal data, this method expands the range of usable data sources, potentially accelerating the development of robust robotic systems. The findings contribute to the ongoing discourse on improving imitation learning techniques in robotics, as discussed in related works on data efficiency and learning from imperfect demonstrations, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.12365v1).
