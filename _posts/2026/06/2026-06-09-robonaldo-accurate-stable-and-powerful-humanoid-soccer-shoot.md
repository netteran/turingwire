---
title: "RoboNaldo: Accurate, Stable and Powerful Humanoid Soccer Shooting via Motion-Guided Curriculum Reinforcement Learning"
date: 2026-06-09 16:51:13 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11092v1"
arxiv_id: "2606.11092"
authors: ["Yichao Zhong", "Yidan Lu", "Yuhang Lu", "Tianyang Tang", "Haoguang Mai", "Yixuan Pan"]
slug: robonaldo-accurate-stable-and-powerful-humanoid-soccer-shoot
summary_word_count: 414
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents RoboNaldo, a motion-guided curriculum reinforcement learning framework for enhancing humanoid soccer shooting accuracy and stability."
---

**Problem**  
The paper addresses the limitations of existing reinforcement learning (RL) approaches in humanoid soccer shooting, particularly the challenges of achieving stability and adaptability in whole-body movements. Traditional motion tracking-driven RL methods struggle with fixed references that hinder adaptation to varying ball positions and strike timings. Conversely, task reward-driven RL methods often fail to explore effective kicking strategies from scratch. This work is a preprint and has not undergone peer review.

**Method**  
RoboNaldo introduces a three-stage motion-guided curriculum RL framework designed to optimize high-impulse humanoid interactions for soccer shooting. The framework begins with a single human-kick reference that serves as a scaffold for learning. The curriculum consists of three phases: 

1. **Stable Kicking Prior**: The initial phase focuses on learning a stable whole-body kicking motion.
2. **Free-Kick Adaptation**: The second phase adapts the learned kicking motion to free-kick scenarios, where the ball is stationary at random positions.
3. **Moving-Ball Shooting**: The final phase extends the kicking strategy to scenarios involving a moving ball, facilitated by a locomotion-command and kick-trigger interface.

A high-level heuristic planner orchestrates the training process, while alternative high-level controllers can be employed during inference to drive the same low-level policy.

**Results**  
In simulation, RoboNaldo achieved a 48.6% reduction in free-kick shot error compared to prior baselines, alongside a 2.96x increase in shot velocity. In real-world tests using a Unitree G1 robot equipped with onboard perception, RoboNaldo recorded an average target shooting error of 0.73 m in free-kick scenarios and 0.86 m in moving-ball scenarios from a distance of 3 m. The post-contact ball velocity reached 13.10 m/s, which corresponds to 59-71% of the shot speed reported for professional open-play soccer.

**Limitations**  
The authors acknowledge that the performance of RoboNaldo is contingent on the quality of the initial human-kick reference and the effectiveness of the heuristic planner. Additionally, the framework's reliance on simulation may not fully capture the complexities of real-world environments. The paper does not address potential scalability issues or the generalization of the learned policies to different humanoid platforms or soccer contexts.

**Why it matters**  
RoboNaldo's innovative approach to integrating motion guidance with curriculum learning has significant implications for the development of humanoid robots in dynamic environments, particularly in sports. The framework's ability to enhance shooting accuracy and stability could pave the way for more advanced robotic applications in soccer and other sports, as well as in broader fields requiring precise motor control. This work contributes to the ongoing discourse in robotics and reinforcement learning, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11092v1).
