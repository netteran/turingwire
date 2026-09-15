---
title: "REVES: REvision and VErification--Augmented Training for Test-Time Scaling"
date: 2026-06-17 10:37:23 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18910v1"
arxiv_id: "2606.18910"
authors: ["Yuanxin Liu", "Ruida Zhou", "Xinyan Zhao", "Amr Sharaf", "Hongzhou Lin", "Arijit Biswas"]
slug: reves-revision-and-verification-augmented-training-for-test-
summary_word_count: 383
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces REVES, a two-stage iterative framework for enhancing test-time scaling in LLMs through revision and verification, outperforming existing methods."
---

**Problem**  
The paper addresses the limitations of existing post-training methods for Large Language Models (LLMs) that optimize single-shot objectives, which misalign with the multi-step inference dynamics inherent in test-time scaling. While recent approaches have explored multi-turn reinforcement learning (RL) for this purpose, they typically optimize over multi-step trajectories without leveraging the high-quality mistakes made during intermediate steps. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose a two-stage iterative framework called REVES, which alternates between online data/prompt augmentation and policy optimization. The core innovation lies in transforming intermediate "near-miss" answers from successful recovery trajectories into decoupled revision and verification prompts. This allows the model to focus on both effective answer transformation and error identification. The framework facilitates efficient off-policy data generation, significantly reducing the computational overhead associated with long-horizon sampling compared to traditional multi-turn RL methods. The architecture details, including specific loss functions and training compute, are not disclosed in the paper.

**Results**  
REVES demonstrates substantial performance improvements on the LiveCodeBench benchmark, achieving a score increase of +6.5 points over the RL baseline and +4.0 points over standard multi-turn training methods. Additionally, the approach matches the state-of-the-art results on the circle packing problem while utilizing a smaller base model (4B parameters) and requiring fewer rollouts than larger evolutionary search systems. The authors also report enhanced correction capabilities in mathematical results verified against ground truth. Furthermore, REVES generalizes effectively to out-of-distribution constraint-satisfaction puzzles, such as n_queens and mini_sudoku, where correctness is strictly defined by problem constraints.

**Limitations**  
The authors acknowledge that their approach may be limited by the quality of the initial model and the nature of the prompts used for augmentation. They do not discuss potential scalability issues or the impact of varying model sizes on performance. Additionally, the reliance on specific benchmarks may not fully capture the generalizability of the method across diverse tasks.

**Why it matters**  
The implications of this work are significant for advancing the capabilities of LLMs in multi-step reasoning tasks, particularly in coding and constraint satisfaction problems. By effectively utilizing intermediate mistakes for training, REVES could lead to more robust models that require less computational resource for similar or improved performance. This research contributes to the ongoing discourse on optimizing LLMs for complex reasoning tasks, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.18910v1).
