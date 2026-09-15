---
title: "Hybrid Metaheuristic Combining the Dragonfly Algorithm and Tabu Search for the Traveling Salesman Problem"
date: 2026-06-08 14:14:50 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.09529v1"
arxiv_id: "2606.09529"
authors: ["Ammar Bouketta"]
slug: hybrid-metaheuristic-combining-the-dragonfly-algorithm-and-t
summary_word_count: 447
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a hybrid metaheuristic combining the Dragonfly Algorithm and Tabu Search to enhance solutions for the Traveling Salesman Problem."
---

**Problem**  
The Traveling Salesman Problem (TSP) is a well-known NP-hard combinatorial optimization challenge that seeks the shortest Hamiltonian cycle visiting each city exactly once. This paper addresses the limitations of existing metaheuristic approaches by proposing a hybrid method that integrates the Dragonfly Algorithm (DA) and Tabu Search (TS). The authors highlight that while both DA and TS have been studied independently, their combination has not been extensively explored in the literature, particularly in the context of TSP. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The proposed hybrid metaheuristic employs a High-Level Relay Hybridization (HRH) scheme. Initially, the Dragonfly Algorithm is utilized for global exploration of the solution space, generating a promising initial tour. Following this, the Tabu Search is applied to refine the solution through neighborhood-based improvements and the use of tabu memory to avoid cycling back to previously explored solutions. The authors conduct a systematic grid search to optimize hyperparameters, although specific values for these parameters are not disclosed in the summary. The method is evaluated on standard TSPLIB benchmark instances, including burma14, att48, and ch150, and compared against standalone DA, standalone TS, and classical metaheuristics such as Genetic Algorithm, Ant Colony Optimization, Particle Swarm Optimization, and Random Search.

**Results**  
The experimental results demonstrate that the hybrid approach outperforms both standalone DA and TS across the tested instances. For instance, the hybrid method achieved a tour quality improvement of approximately 10% over standalone DA on the att48 instance. Additionally, it consistently outperformed classical metaheuristics, although specific performance metrics and comparisons are not detailed in the summary. The results indicate that the combination of global exploration (via DA) and local exploitation (via TS) effectively enhances solution quality, although the performance is sensitive to hyperparameter settings and the size of the problem.

**Limitations**  
The authors acknowledge that the performance of the hybrid method is sensitive to the choice of hyperparameters and the size of the problem instances. They suggest that further validation is necessary on larger benchmarks and against stronger TSP-specific baselines to fully assess the robustness of their approach. Additionally, the lack of detailed parameter settings and performance metrics in the summary limits the ability to replicate or build upon their findings.

**Why it matters**  
This research contributes to the ongoing exploration of hybrid metaheuristic approaches for combinatorial optimization problems, particularly the TSP. By demonstrating the efficacy of combining global and local search strategies, it opens avenues for future work in optimizing other NP-hard problems using similar hybrid frameworks. The findings underscore the importance of parameter tuning and the need for comprehensive benchmarking against established methods, as discussed in the context of TSP research, available on [arXiv](https://arxiv.org/abs/2606.09529v1).
