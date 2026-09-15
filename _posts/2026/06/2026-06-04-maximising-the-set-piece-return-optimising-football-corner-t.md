---
title: "Maximising the Set-Piece Return: Optimising Football Corner Tactics with Graph Reinforcement Learning"
date: 2026-06-04 16:22:44 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06353v1"
arxiv_id: "2606.06353"
authors: ["Sean Groom", "Michael Groom", "Francisco Belo", "Axl Rice", "Liam Anderson", "Victor-Alexandru Darvariu"]
slug: maximising-the-set-piece-return-optimising-football-corner-t
summary_word_count: 396
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel graph reinforcement learning approach to optimize football corner tactics, enhancing tactical discovery beyond historical imitation."
---

**Problem**  
This work addresses the limitations of existing machine learning approaches in football tactics, which primarily focus on analyzing historical actions or predefined counterfactual scenarios. The authors highlight a gap in the literature regarding the optimization of set-piece strategies, specifically corner kicks, using data-driven methods that can discover new, generalizable player configurations rather than merely imitating past behaviors. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a reinforcement learning architecture that operates on graph-structured data to optimize corner kick routines. The central policy adjusts the positions and velocities of attacking players to maximize the probability of a first contact shot. The architecture leverages a graph representation of player interactions, allowing for flexible adjustments to arbitrary starting configurations. The training process involves over 3,000 corner scenarios from the Premier League, with the model trained to maximize a reward signal based on shot probability. The computational resources and specific hyperparameters used for training are not disclosed, but the architecture is designed to operate efficiently within matched inference budgets.

**Results**  
The proposed method significantly outperforms baseline optimization techniques, achieving a marked improvement in first contact shot probability. While specific numerical results are not detailed in the abstract, the authors indicate that their approach yields superior performance metrics compared to traditional methods under equivalent computational constraints. This suggests a robust capability for tactical optimization in real-world scenarios, indicating a shift from historical analysis to proactive strategy development.

**Limitations**  
The authors acknowledge that their approach is limited to the context of corner kicks and may not generalize to other set-piece scenarios without further adaptation. Additionally, the reliance on historical Premier League data may introduce biases inherent to that dataset, potentially affecting the generalizability of the learned policies. The lack of peer review also raises questions about the robustness of the findings, as they have not yet been validated by the broader research community.

**Why it matters**  
This research has significant implications for the field of sports analytics, particularly in the realm of tactical optimization. By moving beyond historical imitation to a reward-driven discovery process, the proposed graph reinforcement learning framework could revolutionize how teams approach set-piece strategies. This work lays the groundwork for future research that could extend these methods to other aspects of football tactics or even different sports, enhancing the strategic depth of machine learning applications in athletics. As published in [arXiv](https://arxiv.org/abs/2606.06353v1).
