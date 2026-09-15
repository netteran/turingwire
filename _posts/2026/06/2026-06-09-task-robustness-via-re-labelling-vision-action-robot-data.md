---
title: "Task Robustness via Re-Labelling Vision-Action Robot Data"
date: 2026-06-09 14:28:22 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10918v1"
arxiv_id: "2606.10918"
authors: ["Artur Kuramshin", "\u00d6zg\u00fcr Aslan", "Cyrus Neary", "Glen Berseth"]
slug: task-robustness-via-re-labelling-vision-action-robot-data
summary_word_count: 411
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents TREAD, a framework that enhances robot learning by re-labeling datasets using Vision-Language Models to improve task robustness."
---

**Problem**  
The paper addresses the limitations in existing robotics datasets, which often lack linguistic and action sequence diversity, hindering the ability of learned policies to follow complex instructions. This issue is particularly pronounced in the context of robot learning, where the generalization to novel tasks remains a challenge. The authors note that while recent advancements in scaling models have led to impressive manipulation policies, the underlying datasets do not support the necessary diversity for effective instruction following. This work is a preprint and has not undergone peer review.

**Method**  
The proposed framework, TREAD, operates in three stages utilizing a pretrained Vision-Language Model (VLM). First, it generates semantic sub-tasks from original instruction labels and initial scenes, effectively breaking down complex tasks into manageable components. Second, it segments demonstration videos based on these sub-tasks, allowing for a more structured representation of actions. Finally, TREAD produces diverse instructions that incorporate object properties, which aids in creating grounded language-action pairs. The augmentation process also includes generating linguistically diverse versions of the text goals, enhancing the dataset's robustness. The authors do not disclose specific training compute or architecture details for the VLM used.

**Results**  
Evaluations conducted on the LIBERO benchmark demonstrate that policies trained on datasets augmented with TREAD outperform those trained on standard datasets. Specifically, the TREAD-augmented policies show a significant improvement in generalization to novel tasks, achieving a 15% increase in task success rates compared to baseline models. Additionally, the framework enhances planning generalization through trajectory decomposition and language-conditioned policy generalization, indicating a robust performance across various unseen goals.

**Limitations**  
The authors acknowledge that the effectiveness of TREAD is contingent on the quality of the pretrained VLM and its ability to generate meaningful sub-tasks and instructions. They also note that while the framework improves generalization, it may not fully address all aspects of instruction-following capabilities in complex environments. An obvious limitation not discussed is the potential computational overhead introduced by the additional processing stages, which may affect real-time applications in robotics.

**Why it matters**  
The implications of this work are significant for advancing robot learning methodologies, particularly in enhancing the adaptability of robots to novel tasks through improved dataset diversity. By leveraging existing VLMs, TREAD provides a scalable solution for augmenting datasets without the need for extensive data collection, which is often a bottleneck in robotics research. This approach could pave the way for more sophisticated instruction-following capabilities in robots, ultimately leading to more autonomous and versatile robotic systems, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.10918v1).
