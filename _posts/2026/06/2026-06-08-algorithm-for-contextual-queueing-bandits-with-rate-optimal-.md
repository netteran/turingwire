---
title: "Algorithm for Contextual Queueing Bandits with Rate-Optimal Queue Length Regret"
date: 2026-06-08 15:51:25 +0000
category: research
subcategory: other
company: "Oracle"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09668v1"
arxiv_id: "2606.09668"
authors: ["Seoungbin Bae", "Dabeen Lee"]
slug: algorithm-for-contextual-queueing-bandits-with-rate-optimal-
summary_word_count: 410
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a novel algorithm for contextual queueing bandits, achieving improved queue length regret rates compared to existing methods."
---

**Problem**  
The paper addresses the limitations of existing algorithms for contextual queueing bandits, which achieve a queue length regret of $\widetilde{\mathcal{O}}(T^{-1/4})$. This work is particularly relevant as it is a preprint and has not undergone peer review. The authors aim to improve the regret rate to $\widetilde{\mathcal{O}}(T^{-1/2})$, thereby enhancing the efficiency of scheduling heterogeneous jobs under unknown context-dependent service rates.

**Method**  
The authors introduce the CQB-$η$-2 algorithm, which operates in three distinct phases: 
1. **Pure Random Exploration**: This phase constructs an initial estimator by exploring the service rates without any bias.
2. **$η$-Random Exploration with UCB**: In this phase, the algorithm combines $η$-random exploration with an Upper Confidence Bound (UCB) strategy to continue learning while ensuring a negative drift in queue length.
3. **Pure UCB**: After a predetermined cutoff round, the algorithm switches to a pure UCB approach, leveraging the information gathered in the previous phases.

The proof of the algorithm's performance decomposes the queue length regret at the cutoff round, demonstrating that the first two phases effectively mitigate the impact of suboptimal decisions. The authors establish that the combined approach yields a queue length regret of $\widetilde{\mathcal{O}}(T^{-1/2})$. Additionally, they provide a minimax lower bound of order $Ω(T^{-1/2})$, which is derived from constructing hard instances that are statistically indistinguishable until the final service decision.

**Results**  
The proposed CQB-$η$-2 algorithm achieves a queue length regret of $\widetilde{\mathcal{O}}(T^{-1/2})$, significantly improving upon the previous $\widetilde{\mathcal{O}}(T^{-1/4})$ benchmark. The authors also establish a minimax lower bound of $Ω(T^{-1/2})$, confirming that their upper bound is optimal up to logarithmic factors. The results indicate a substantial enhancement in the efficiency of scheduling in contextual queueing bandits.

**Limitations**  
The authors acknowledge that their approach relies on the assumption of stochastic contexts and may not generalize to adversarial settings. Additionally, the performance of the algorithm is contingent on the accurate selection of the cutoff round, which may require prior knowledge or heuristics that are not always available. The paper does not address potential computational complexities associated with implementing the three-phase algorithm in real-time systems.

**Why it matters**  
This work has significant implications for the design of algorithms in online learning and scheduling, particularly in environments where service rates are context-dependent. The improved regret rate can lead to more efficient resource allocation and job scheduling in various applications, such as cloud computing and telecommunications. The findings contribute to the theoretical understanding of queueing bandits and set a new benchmark for future research in this area, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.09668v1).
