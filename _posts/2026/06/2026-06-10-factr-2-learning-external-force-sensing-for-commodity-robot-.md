---
title: "FACTR 2: Learning External Force Sensing for Commodity Robot Arms Improves Policy Learning"
date: 2026-06-10 17:59:35 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12406v1"
arxiv_id: "2606.12406"
authors: ["Steven Oh", "Jason Jingzhou Liu", "Tony Tao", "Philip Han", "Kenneth Shaw", "Satoshi Funabashi"]
slug: factr-2-learning-external-force-sensing-for-commodity-robot-
summary_word_count: 406
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces NEXT, a method for estimating external joint torques in robot arms, enhancing policy learning without dedicated sensors."
---

**Problem**  
The paper addresses the gap in force sensitivity for commodity robot arms, which typically lack dedicated force sensors due to cost constraints. This limitation hampers their ability to perform contact-rich manipulation tasks effectively. The authors propose a solution that does not require additional hardware, making it accessible for low-cost robotic systems. This work is presented as a preprint and has not undergone peer review.

**Method**  
The core technical contribution is Neural External Torque Estimation (NEXT), a data-driven approach that estimates external joint torques using only free-motion data. NEXT is trained in just 1 minute with a dataset comprising 10 minutes of free-motion data, achieving performance comparable to traditional dedicated joint-torque sensors. The architecture leverages neural networks to infer torque estimates from the robot's kinematic data. Additionally, the authors introduce Force-Informed Re-Sampling Training (FIRST), which enhances policy learning by up-sampling segments of data that occur before and during contact. This method is integrated into behavior cloning frameworks, allowing for improved learning efficiency and effectiveness.

**Results**  
The proposed methods were evaluated across five long-horizon manipulation tasks. The results indicate that FIRST outperforms existing force-aware policies by over 17% in terms of task progress, demonstrating significant improvements in performance metrics. The benchmarks used for comparison were not explicitly named in the abstract, but the improvements suggest a robust enhancement in the capabilities of low-cost robotic arms when equipped with NEXT and FIRST.

**Limitations**  
The authors acknowledge that the reliance on free-motion data may limit the generalizability of the torque estimates in highly dynamic or complex environments. Additionally, the performance of NEXT may vary depending on the specific robot arm configuration and the nature of the tasks. The paper does not address potential issues related to the scalability of the method to more complex manipulation tasks or the integration of NEXT with existing robotic control systems.

**Why it matters**  
The implications of this work are significant for the field of robotics, particularly in making advanced manipulation capabilities accessible to low-cost robotic platforms. By enabling force-aware teleoperation and policy learning without the need for expensive sensors, NEXT and FIRST can democratize access to sophisticated robotic functionalities. This advancement could lead to broader applications in industries such as logistics, healthcare, and service robotics, where cost-effective solutions are essential. The findings and methodologies presented in this paper are crucial for future research in robot learning and manipulation, as discussed in the context of ongoing developments in the field, as published in [arXiv](https://arxiv.org/abs/2606.12406v1).
