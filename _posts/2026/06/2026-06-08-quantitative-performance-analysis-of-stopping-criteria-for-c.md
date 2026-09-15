---
title: "Quantitative Performance Analysis of Stopping Criteria for CMA-ES"
date: 2026-06-08 08:56:38 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.09220v1"
arxiv_id: "2606.09220"
authors: ["Ryoji Tanabe"]
slug: quantitative-performance-analysis-of-stopping-criteria-for-c
summary_word_count: 432
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper quantitatively analyzes the effectiveness of 11 stopping criteria in the CMA-ES optimization algorithm, revealing key insights into their performance."
---

**Problem**  
The paper addresses a significant gap in the understanding of stopping criteria within the Covariance Matrix Adaptation Evolution Strategy (CMA-ES), a leading black-box optimization algorithm. While CMA-ES employs multiple stopping criteria to optimize function evaluation budgets, the effectiveness and behavior of these criteria have not been thoroughly investigated. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The author, Ryoji Tanabe, conducts a quantitative performance analysis of 11 stopping criteria used in CMA-ES, specifically focusing on their behavior when applied to the noiseless BBOB (Black-Box Optimization Benchmarking) function set. The study evaluates the stopping criteria based on their optimal stopping points, measured in terms of the number of function evaluations during a single run of CMA-ES. The analysis considers various sample sizes (λ) and dimensions (n) to assess how these factors influence the triggering of stopping criteria. The stopping criteria analyzed include \texttt{tolflatfitness}, \texttt{tolfun}, and \texttt{tolfunhist}, among others. The evaluation methodology involves running multiple experiments to determine which criteria are activated first and their overall stopping accuracy.

**Results**  
The findings reveal that the triggering of stopping criteria is significantly influenced by the sample size and dimensionality of the problem. Notably, \texttt{tolflatfitness} and \texttt{tolfun} are frequently the first criteria to be activated. The analysis indicates that \texttt{tolfunhist} and the overall portfolio of stopping criteria achieve the highest stopping accuracy across most scenarios tested. Furthermore, the results demonstrate that \texttt{tolfun} and \texttt{tolfunhist} are often triggered prior to the algorithm reaching complete stagnation, suggesting their potential for improving the efficiency of CMA-ES.

**Limitations**  
The author acknowledges that the study is limited to the noiseless BBOB function set, which may not fully represent the complexities of real-world optimization problems. Additionally, the analysis does not explore the impact of noise on the performance of stopping criteria, which could be a critical factor in practical applications. The findings are based on a specific set of experimental conditions, and the generalizability of the results to other optimization scenarios remains to be validated.

**Why it matters**  
This research provides valuable insights into the behavior of stopping criteria in CMA-ES, which can inform the design of more efficient optimization algorithms. Understanding which criteria are most effective can lead to better resource allocation in function evaluations, ultimately enhancing the performance of CMA-ES in various applications. The implications of this work are significant for future research in optimization strategies, particularly in the context of adaptive algorithms. As published in [arXiv cs.NE](https://arxiv.org/abs/2606.09220v1), this study lays the groundwork for further exploration of stopping criteria in black-box optimization.
