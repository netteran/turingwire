---
title: "Distribution-Agnostic Robust Trajectory Optimization via Chance-Constrained Reinforcement Learning"
date: 2026-06-11 17:22:05 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13605v1"
arxiv_id: "2606.13605"
authors: ["Yashdeep Chaudhary", "Roberto Armellin", "Harry Holt", "Marco Sagliano"]
slug: distribution-agnostic-robust-trajectory-optimization-via-cha
summary_word_count: 414
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a distribution-agnostic robust trajectory optimization framework using chance-constrained reinforcement learning for uncertain environments."
---

**Problem**  
This work addresses the gap in robust trajectory optimization under uncertainty, specifically focusing on scenarios where the uncertainty is not strictly Gaussian. The authors highlight the limitations of existing methods that rely on specific distributional assumptions, which can hinder performance in real-world applications. The paper is a preprint and has not undergone peer review, indicating that the findings are preliminary and subject to change.

**Method**  
The proposed framework employs a chance-constrained reinforcement learning approach to enhance a deterministic nominal trajectory computed offline. The core technical contribution lies in the structured affine closed-loop correction law, which integrates a feedforward control adjustment with time-varying feedback gains. The method utilizes empirical rollout-based upper-tail quantiles to enforce probabilistic feasibility, while terminal dispersion is managed through covariance-feasibility penalties. The framework is evaluated on two distinct trajectory design problems: a three-dimensional multi-impulse Earth-Mars transfer and a stochastic atmospheric pinpoint rocket landing. The authors do not disclose specific training compute resources, but the methodology emphasizes the adaptability of the robustification scaffold across various spacecraft trajectory planning problems.

**Results**  
In the Earth-Mars transfer case study, the learned policy demonstrates competitive upper-tail fuel costs when benchmarked against a recent robust trajectory-optimization reference under Gaussian uncertainty. The framework maintains probabilistic feasibility even when evaluated under bounded uniform uncertainty and process disturbances not encountered during training. In the second case study involving the rocket landing problem, the framework successfully adapts to short-horizon continuous-thrust settings, showcasing its versatility. The results indicate that the proposed method can effectively balance fuel efficiency and robustness across heterogeneous trajectory planning scenarios.

**Limitations**  
The authors acknowledge that their approach may not generalize to all forms of uncertainty, particularly those that are highly non-linear or exhibit complex dependencies. Additionally, the empirical nature of the probabilistic feasibility enforcement may introduce variability in performance, which is not fully explored in the paper. The lack of extensive real-world validation is also a noted limitation, as the experiments are primarily conducted in simulated environments.

**Why it matters**  
This research has significant implications for the field of trajectory optimization in uncertain environments, particularly for aerospace applications where robustness is critical. The ability to apply a unified robustification framework across different trajectory planning problems without redesigning the core stochastic-control structure could streamline the development of reliable autonomous systems. This work contributes to the ongoing discourse on robust reinforcement learning methodologies, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.13605v1), and sets the stage for future research aimed at enhancing the adaptability and reliability of trajectory optimization techniques in complex, uncertain environments.
