---
title: "Proper Scoring Rules for Right-Censored Survival Data"
date: 2026-06-04 17:00:29 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06393v1"
arxiv_id: "2606.06393"
authors: ["Jef Jonkers", "Glenn Van Wallendael", "Luc Duchateau", "Sofie Van Hoecke"]
slug: proper-scoring-rules-for-right-censored-survival-data
summary_word_count: 407
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a framework for proper scoring rules tailored for right-censored survival data, enhancing probabilistic forecasting accuracy."
---

**Problem**  
The paper addresses the gap in the literature regarding the evaluation and training of probabilistic forecasts in the context of right-censored survival data. Conventional scoring rules are not applicable due to the partial observability of event times caused by censoring. This work is particularly relevant as it presents a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a novel framework for proper scoring of right-censored survival outcomes. The core idea involves mapping the predictive distribution through the censoring mechanism, followed by the application of proper scoring rules on the resulting observed-data law. This approach yields two types of scores: localized scores for fixed censoring times and marginalized scores for random or partially observed censoring times. The framework recovers established right-censored likelihood and Inverse Probability Censoring Weights (IPCW) criteria while also introducing right-censored versions of the Continuous Ranked Probability Score (CRPS), pinball loss, Brier score, and energy score. The marginalized score is shown to be proper under conditional independent censoring and strictly proper within the identifiable region. Additionally, the authors introduce "censored engression," a sample-based learning objective designed for multivariate right-censored survival modeling.

**Results**  
In empirical evaluations, the proposed scoring rules effectively rank the oracle forecast across various censoring regimes. Notably, the authors demonstrate that forecast-dependent plug-in weighted scores can lead to ranking reversals, highlighting the robustness of their method. Censored engression significantly outperforms naive training approaches on censored outcomes, indicating its practical utility in survival modeling tasks.

**Limitations**  
The authors acknowledge that their framework assumes conditional independent censoring, which may not hold in all real-world scenarios. Additionally, the paper does not explore the computational complexity of implementing the proposed scoring rules in large-scale datasets, which could be a potential limitation for practical applications. The generalizability of the results to other forms of censoring or different types of survival data is also not extensively discussed.

**Why it matters**  
This work has significant implications for the field of survival analysis and probabilistic forecasting, particularly in medical and reliability engineering contexts where right-censored data is prevalent. By providing a coherent framework for proper scoring rules, the authors enable more accurate evaluation and training of predictive models, which can lead to improved decision-making in critical applications. The introduction of censored engression as a learning objective further enhances the toolkit available for practitioners dealing with censored data. This research contributes to the ongoing discourse in survival analysis, as highlighted in related works available on [arXiv](https://arxiv.org/abs/2606.06393v1).
