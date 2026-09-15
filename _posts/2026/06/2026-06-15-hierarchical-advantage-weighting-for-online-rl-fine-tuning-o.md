---
title: "Hierarchical Advantage Weighting for Online RL Fine-Tuning of VLAs from Sparse Episode Outcomes"
date: 2026-06-15 17:57:14 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.17043v1"
arxiv_id: "2606.17043"
authors: ["Tongyan Fang", "Siyuan Huang", "Naiyu Fang", "Ganlong Zhao", "Zhongjin Luo", "Jianbo Liu"]
slug: hierarchical-advantage-weighting-for-online-rl-fine-tuning-o
summary_word_count: 443
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Hierarchical Advantage-Weighted Behavior Cloning (HABC) to enhance online reinforcement learning fine-tuning of variable-length action policies from sparse outcomes."
---

**Problem**  
This work addresses the limitations of existing online reinforcement learning (RL) fine-tuning methods for variable-length action (VLA) policies, particularly when trained on sparse binary outcomes (success or failure). Current approaches typically reduce these outcomes to a single scalar reward, which conflates distinct transition-level feedback and fails to provide adequate guidance for optimizing both viability and efficiency. Additionally, the presence of mixed autonomous and intervention segments in real-world rollouts complicates credit assignment, leading to potential misattribution of rewards. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose Hierarchical Advantage-Weighted Behavior Cloning (HABC), which employs a dual-critic architecture to separately evaluate the objectives of viability and efficiency. Each critic head is trained on distinct subsets of data, allowing for specialized learning. A state-adaptive gating mechanism, denoted as \( g_t \), dynamically merges the one-step advantages from both critics, prioritizing viability when the success of the current policy is uncertain and transitioning to efficiency when viability is assured. This approach generates per-transition weights for the actor loss, enhancing the learning signal. Furthermore, the method incorporates intervention-aware credit assignment, ensuring that outcome labels are restricted to segments executed by the current policy, thus preventing leakage of supervision across intervention boundaries.

**Results**  
In empirical evaluations on three contact-rich bimanual tasks, HABC significantly outperformed supervised fine-tuning (SFT) baselines, achieving success rates of 92%, 88%, and 38% compared to SFT baselines of 36%, 44%, and 12%, respectively. These results demonstrate a substantial improvement in the ability of the VLA policies to achieve task success, highlighting the effectiveness of the proposed method in addressing the challenges posed by sparse episode outcomes.

**Limitations**  
The authors acknowledge that the reliance on a state-adaptive gate may introduce complexity in tuning and could be sensitive to the specific task dynamics. Additionally, while the intervention-aware credit assignment mitigates some credit assignment issues, it may not fully eliminate the challenges associated with mixed autonomy in real-world scenarios. The paper does not explore the scalability of HABC to more complex environments or the potential computational overhead introduced by the dual-critic architecture.

**Why it matters**  
The proposed HABC framework offers a novel approach to fine-tuning VLA policies in online RL settings, addressing critical gaps in reward signal utilization and credit assignment. By effectively separating the objectives of viability and efficiency, this method enhances the learning process in environments with sparse feedback, which is common in real-world applications. The implications of this work extend to various domains where RL is applied, particularly in robotics and autonomous systems, as it provides a more nuanced approach to policy optimization. This research contributes to the ongoing discourse in reinforcement learning methodologies, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.17043v1).
