---
title: "Mixed-Categorical Black-Box Optimization via Information-Geometric Bilevel Decomposition"
date: 2026-06-11 04:27:22 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.12885v1"
arxiv_id: "2606.12885"
authors: ["Marc Ong", "Shinichi Shirakawa", "Youhei Akimoto"]
slug: mixed-categorical-black-box-optimization-via-information-geo
summary_word_count: 422
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a bilevel optimization framework for mixed categorical-continuous black-box optimization, enhancing interaction handling and computational efficiency."
---

**Problem**  
The paper addresses the challenge of mixed categorical-continuous optimization in black-box settings, which is prevalent in various practical applications. Existing methods, particularly evolution strategy-based approaches like CMA-ES, struggle with strong interactions between categorical and continuous variables due to their assumption of independence. This limitation hampers performance, especially in scenarios where such interactions are significant. The authors propose a novel approach to tackle this issue, filling a gap in the literature regarding effective optimization strategies for mixed-variable spaces. Notably, this work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose a bilevel optimization framework that explicitly captures interactions between categorical and continuous variables. The outer loop optimizes categorical variables, while the inner loop optimizes continuous variables conditioned on each categorical configuration. Each level of the bilevel problem is formulated as a stochastic relaxation using information-geometric optimization techniques. To enhance computational efficiency, the authors introduce a warm-starting strategy that leverages cached configurations from previous iterations, allowing for rapid selection of the best candidates to accelerate the lower-level search. This method effectively reduces the computational burden typically associated with bilevel optimization.

**Results**  
Experimental evaluations demonstrate that the proposed method significantly outperforms existing state-of-the-art approaches in handling interactions between categorical and continuous variables. Specifically, on binary-continuous domains, the new framework achieves a performance improvement of up to 25% over traditional methods, such as CMA-ES and other evolution strategies, across various benchmarks. The results indicate not only enhanced interaction-handling capabilities but also improved computational efficiency, making the proposed approach a compelling alternative for mixed-variable optimization tasks.

**Limitations**  
The authors acknowledge that the proposed method may still face challenges in extremely high-dimensional spaces, where the complexity of the optimization landscape could lead to increased computational costs. Additionally, while the warm-starting strategy improves efficiency, it may not always guarantee optimal performance in every scenario, particularly if the cached configurations are not representative of the optimal solutions. The paper does not extensively explore the scalability of the method to larger datasets or more complex interaction types, which could be a potential area for future research.

**Why it matters**  
This work has significant implications for the field of optimization, particularly in applications requiring the simultaneous optimization of categorical and continuous variables, such as hyperparameter tuning in machine learning and engineering design problems. By providing a robust framework for handling interactions, this research paves the way for more efficient optimization strategies in complex domains. The findings contribute to the ongoing discourse in black-box optimization methodologies, as highlighted in related works, and are available on [arXiv](https://arxiv.org/abs/2606.12885v1).
