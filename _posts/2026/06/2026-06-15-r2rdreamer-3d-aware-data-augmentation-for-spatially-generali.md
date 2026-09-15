---
title: "R2RDreamer: 3D-aware Data Augmentation for Spatially-generalized 2D Manipulation Policies"
date: 2026-06-15 17:56:19 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.17040v1"
arxiv_id: "2606.17040"
authors: ["Xiuwei Xu", "Haowen Sun", "Angyuan Ma", "Yiwei Zhang", "Zhenyu Wu", "Xiaofeng Wang"]
slug: r2rdreamer-3d-aware-data-augmentation-for-spatially-generali
summary_word_count: 426
classification_confidence: 0.80
source_truncated: false
layout: post
description: "R2RDreamer introduces a novel framework for 3D-aware data augmentation, enhancing spatial generalization in 2D manipulation policies from limited demonstrations."
---

**Problem**  
This paper addresses the challenge of spatial generalization in imitation-learned manipulation policies, particularly when scaling demonstrations across diverse object poses, robot configurations, and camera viewpoints. Traditional methods often require extensive real-world data collection, which is costly and time-consuming. While simulation-based augmentation can provide controllable variations, it typically necessitates complex setups and may introduce a sim-to-real gap. Recent real-to-real methods have improved upon this by editing 3D observations and action trajectories from real demonstrations, but they still depend on robust 3D scene parsing and geometry completion. Furthermore, these methods are often tailored for 3D pointcloud policies rather than RGB-based 2D policies. This work is a preprint and has not yet undergone peer review.

**Method**  
R2RDreamer is a real-to-real demonstration augmentation framework that maintains geometric consistency during 3D action-observation editing while transitioning visual completion to 2D video space. The method consists of two main components: (1) lightweight 3D augmentation, which involves editing incomplete object pointclouds and end-effector trajectories within a shared 3D frame, and (2) projection of the edited scene into masked image-space control videos, utilizing occlusion-aware reasoning. The framework employs a dense-control image-to-video model to generate temporally coherent RGB observations from the augmented data. The authors do not disclose specific training compute or dataset sizes, focusing instead on the methodological innovations.

**Results**  
R2RDreamer demonstrates significant improvements in spatial generalization across various manipulation tasks. The framework was evaluated against both 2D diffusion-style policies and vision-language-action policies. The results indicate that R2RDreamer outperforms baseline methods, although specific numerical improvements and benchmark names are not detailed in the abstract. The authors provide analyses that validate the contributions of 3D editing, occlusion-aware projection, and video completion, suggesting that these components are critical for enhancing performance.

**Limitations**  
The authors acknowledge that the reliance on 3D scene parsing and the potential complexity of the occlusion-aware projection may limit the framework's applicability in certain scenarios. Additionally, the method's performance may vary depending on the quality of the source demonstrations and the specific manipulation tasks. The paper does not address the computational efficiency of the proposed method or its scalability to larger datasets.

**Why it matters**  
R2RDreamer has significant implications for the development of more robust and efficient data augmentation techniques in robotic manipulation, particularly in scenarios where real-world data collection is impractical. By enhancing spatial generalization from limited demonstrations, this framework could facilitate the deployment of imitation-learned policies in diverse environments. The work contributes to the ongoing discourse on bridging the gap between 3D and 2D policy learning, as discussed in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.17040v1).
