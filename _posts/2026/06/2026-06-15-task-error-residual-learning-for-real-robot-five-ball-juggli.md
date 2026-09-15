---
title: "Task-Error Residual Learning for Real-Robot Five-Ball Juggling"
date: 2026-06-15 17:14:32 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.16978v1"
arxiv_id: "2606.16978"
authors: ["Kai Ploeger", "Jan Peters"]
slug: task-error-residual-learning-for-real-robot-five-ball-juggli
summary_word_count: 413
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a novel approach to residual learning for real-robot juggling, enhancing sample efficiency through directional task-error supervision."
---

**Problem**  
This work addresses the limitations of sample efficiency in reinforcement learning (RL) for real-robot tasks, specifically in the context of juggling multiple balls. The authors highlight that traditional scalar rewards in RL provide insufficient information for effective learning, particularly in complex tasks like juggling, where the directional task error is more informative. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a residual learning framework that utilizes directional task-error supervision to refine existing behaviors in robotic juggling. They introduce a task error model that informs sample selection, allowing the system to focus on the most informative rollouts. The architecture employs a simple, idealized stack for planning and control, with a fixed-Jacobian Newton update as the primary learning method. The study compares various residual learning strategies across two axes: the quality of directional feedback and the commitment to an analytic prior. The methods evaluated include Newton-style Jacobian updates, Composite Bayesian Optimization, and stochastic search techniques. The training process is designed to converge rapidly, achieving stable juggling of three, four, and five balls on Barrett WAM arms.

**Results**  
The proposed method demonstrates significant improvements in juggling performance, achieving stable five-ball juggling from the second attempt, with a monotonically decreasing task error after the initial drop. The authors report that the fixed-Jacobian Newton update outperforms other methods, indicating that both directional feedback and an informative prior are essential for effective learning. While specific quantitative results are not detailed in the abstract, the qualitative performance indicates a substantial advancement over traditional RL approaches, which typically require extensive training periods.

**Limitations**  
The authors acknowledge that the primary bottleneck for residual learning in real robots is the information content of the supervision signal and the learner's ability to utilize it effectively. They note that the learned residual can tolerate significant misalignment in prior knowledge and degraded joint tracking, but this primarily affects convergence speed rather than overall performance. However, the paper does not address potential issues related to the scalability of the approach to more complex environments or tasks beyond juggling.

**Why it matters**  
This research has significant implications for the field of robotics and reinforcement learning, particularly in enhancing the efficiency of learning complex tasks through improved supervision signals. The findings suggest that leveraging directional task error can lead to faster convergence and more reliable performance in real-world applications. This work contributes to the ongoing discourse on sample efficiency in RL, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.16978v1).
