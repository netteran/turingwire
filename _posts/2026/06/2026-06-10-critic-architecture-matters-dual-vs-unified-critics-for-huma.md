---
title: "Critic Architecture Matters: Dual vs. Unified Critics for Humanoid Loco-Manipulation"
date: 2026-06-10 10:21:38 +0000
category: research
subcategory: agents_robotics
company: "NVIDIA"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11891v1"
arxiv_id: "2606.11891"
authors: ["Mehmet Turan Yard\u0131mc\u0131"]
slug: critic-architecture-matters-dual-vs-unified-critics-for-huma
summary_word_count: 430
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the impact of critic architecture on multi-objective reinforcement learning for humanoid robots, comparing dual and unified critics."
---

**Problem**  
The paper addresses a gap in the literature regarding the effectiveness of different critic architectures in multi-objective reinforcement learning (RL) for humanoid robots. Specifically, it explores whether a unified critic, which estimates the combined value of multiple objectives, or dual critics, which handle disjoint reward signals, is more effective for coordinating locomotion and manipulation tasks. This work is particularly relevant as it is presented as a preprint and has not yet undergone peer review.

**Method**  
The authors conducted experiments using the Unitree G1 humanoid robot, which has 23 active degrees of freedom (DoF), within the NVIDIA Isaac Lab environment. They implemented a sequential curriculum that spans 13 levels, progressing from stationary reaching tasks to dynamic walking with variable-orientation targets. The core technical contribution lies in the controlled comparison of dual-critic and unified-critic architectures. The dual-critic approach employs separate critics for locomotion and manipulation, while the unified critic aggregates these objectives into a single value function. The training process involved standard reinforcement learning techniques, although specific details on the loss functions and training compute were not disclosed.

**Results**  
The results demonstrate a significant performance advantage for the dual-critic architecture over the unified-critic architecture. Specifically, dual-critic policies achieved target reaching 3.5 times faster (6.5 simulation steps vs. 22.6), realized 2 times higher throughput (14.3 validated reaches per 1,000 steps vs. 7.0), and attained higher validated reach rates (65.2% vs. 53.8%). Additionally, the authors found that incorporating anti-gaming reward mechanisms did not yield further improvements beyond the architectural benefits of the dual-critic setup (60.9% vs. 65.2%).

**Limitations**  
The authors acknowledge that their findings are limited to the specific humanoid robot and tasks tested, which may not generalize to other robotic platforms or more complex environments. They also note that the study does not explore the potential benefits of hybrid architectures that could combine elements of both critic types. Furthermore, the lack of peer review means that the robustness of the results has yet to be validated by the broader research community.

**Why it matters**  
This research highlights the critical role of critic architecture in multi-objective RL for humanoid robots, suggesting that the choice between dual and unified critics can significantly influence performance outcomes. The findings imply that when refining pre-trained manipulation policies with RL, a unified critic may inadvertently suppress learned behaviors due to conflicting gradients from locomotion tasks. This insight is crucial for future work in RL fine-tuning and policy optimization, as it emphasizes the need to prioritize architectural decisions over reward engineering. These implications are particularly relevant for ongoing advancements in humanoid robotics and RL methodologies, as published in [arXiv](https://arxiv.org/abs/2606.11891v1).
