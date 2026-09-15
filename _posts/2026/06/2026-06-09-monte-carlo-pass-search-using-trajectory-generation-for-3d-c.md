---
title: "Monte Carlo Pass Search: Using Trajectory Generation for 3D Counterfactual Pass Evaluation in Football"
date: 2026-06-09 17:16:30 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11120v1"
arxiv_id: "2606.11120"
authors: ["Andrew Kang", "Priya Narasimhan"]
slug: monte-carlo-pass-search-using-trajectory-generation-for-3d-c
summary_word_count: 401
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Monte Carlo Pass Search (MCPS) for evaluating football passes using trajectory generation and a novel value model."
---

**Problem**  
This work addresses the gap in football (soccer) pass evaluation methodologies by proposing a Monte Carlo Tree Search (MCTS)-like framework. Existing literature lacks a unified approach that integrates value modeling, world modeling, and policy sampling for counterfactual actions in pass evaluation. The authors highlight that this is a preprint and unreviewed work, indicating the need for further validation in the academic community.

**Method**  
The core technical contribution is the Monte Carlo Pass Search (MCPS) framework, which consists of several components: a value model that quantifies possession value, a world model that simulates multi-agent trajectories with ball interactions, and a policy that samples counterfactual pass variants with added noise. The framework utilizes the first public high-fidelity tracking dataset featuring 3D ball trajectories from the Bundesliga. MCPS infers kick parameters for observed passes, generates execution and option variants, and rolls these candidates forward using a ball-conditioned world model until the next ball interaction occurs. The outcomes are scored using a learned value model, producing a distribution over potential value gains. To enhance sample efficiency, the authors adapt an autoregressive trajectory generator from autonomous driving (SMART), which demonstrates superior forecasting accuracy compared to baseline methods.

**Results**  
The authors report that MCPS achieves strong performance in forecasting accuracy, specifically in best-of-20 scenarios, outperforming existing baselines. While specific numerical results are not disclosed in the abstract, the emphasis on distribution-aware attribution through mean-based and percentile-based execution-surplus scores indicates a robust evaluation framework. The paper suggests that the MCPS framework can effectively rank and analyze pass outcomes, although exact metrics and comparisons to named baselines are not detailed in the provided text.

**Limitations**  
The authors acknowledge that the reliance on a single dataset (Bundesliga) may limit the generalizability of their findings. Additionally, the adaptation of the trajectory generator from autonomous driving may not fully capture the complexities of football dynamics. The authors do not discuss potential biases in the data or the implications of noise in the sampling process, which could affect the robustness of the pass evaluations.

**Why it matters**  
The introduction of MCPS has significant implications for the analysis of football strategies and player performance, providing a more nuanced understanding of pass effectiveness through counterfactual evaluation. This framework could enhance coaching strategies and player development by offering data-driven insights into decision-making processes on the field. The release of model checkpoints and code facilitates further research and application in sports analytics, as published in [arXiv](https://arxiv.org/abs/2606.11120v1).
