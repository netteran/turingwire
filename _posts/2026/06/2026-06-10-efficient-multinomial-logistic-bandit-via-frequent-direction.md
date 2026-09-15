---
title: "Efficient Multinomial Logistic Bandit via Frequent Directions"
date: 2026-06-10 11:47:27 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11968v1"
arxiv_id: "2606.11968"
authors: ["Linzhe He", "Yu-Jie Zhang", "Sifan Yang", "Lijun Zhang"]
slug: efficient-multinomial-logistic-bandit-via-frequent-direction
summary_word_count: 376
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces EOFD-MLogB, an efficient algorithm for multinomial logistic bandits that reduces computational complexity while maintaining performance."
---

**Problem**  
This work addresses the computational inefficiencies in existing algorithms for multinomial logistic bandits (MLogB), specifically the OFUL-MLogB algorithm, which suffers from high time and space complexity due to parameter estimation and reward construction. The authors highlight that the current state-of-the-art algorithm requires $\mathcal{O}(K^3d^3)$ time and $\mathcal{O}(K^2d^2)$ space per round, making it impractical for high-dimensional settings. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose EOFD-MLogB, which integrates frequent directions matrix sketching into the OFUL-MLogB framework. This method maintains a low-rank SVD sketch of the accumulated Hessian, allowing for constrained online Newton updates in parameter estimation. The algorithm reduces the complexity of reward bonus computations from $Kd \times K$ spectral-norm calculations to $K \times K$ eigenvalue computations and transforms the parameter estimation into one-dimensional root-finding tasks. The per-round time complexity is improved to $\mathcal{O}(Kd(m+K)^2)$ and the space complexity to $\mathcal{O}(Kd(m+K))$, where $m$ is the sketch size and is significantly smaller than $d$.

**Results**  
The proposed EOFD-MLogB achieves a regret bound of $\tilde{\mathcal{O}}(Δ_T(Kd\lnΔ_T+m)\sqrt{T})$, where $Δ_T$ is a factor that controls the sketching error based on the $m$-truncated spectral tail of the Hessian. The authors demonstrate that when the Hessian is approximately low-rank, the regret performance of EOFD-MLogB approaches that of OFUL-MLogB. Experimental results validate the computational efficiency of EOFD-MLogB, showing competitive performance against existing baselines, although specific numerical results and benchmarks are not detailed in the abstract.

**Limitations**  
The authors acknowledge that the performance of EOFD-MLogB is contingent on the Hessian being approximately low-rank, which may not hold in all scenarios. Additionally, the paper does not explore the impact of varying sketch sizes $m$ on performance or the potential trade-offs between computational efficiency and regret bounds in more complex environments. The lack of extensive empirical validation across diverse datasets is also a noted limitation.

**Why it matters**  
The development of EOFD-MLogB has significant implications for online learning in high-dimensional settings, particularly in applications where computational resources are constrained. By reducing the complexity of MLogB algorithms, this work paves the way for more scalable solutions in real-time decision-making scenarios, such as recommendation systems and adaptive control. The findings contribute to the ongoing discourse in the field of online learning and bandit algorithms, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.11968v1).
