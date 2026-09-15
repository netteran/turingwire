---
title: "The Post-GCN Decade Revisited: Curvature-Stratified Evaluation of Relational Learning"
date: 2026-06-04 17:05:36 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06397v1"
arxiv_id: "2606.06397"
authors: ["Shuo Wang", "Xiangyu Wang", "Quanxin Wang", "Bailin Wu", "Bokui Wang", "Shunyang Huang"]
slug: the-post-gcn-decade-revisited-curvature-stratified-evaluatio
summary_word_count: 430
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a curvature-stratified evaluation framework for relational learning, revealing geometry-dependent performance variations in model effectiveness."
---

**Problem**  
Current evaluation practices in relational learning predominantly utilize flat leaderboards that average performance across diverse datasets, implicitly assuming a uniform underlying structure. This assumption introduces systematic bias, obscuring geometry-dependent performance variations and potentially leading to misleading conclusions regarding model generalization. The authors highlight that existing literature lacks a nuanced understanding of how intrinsic geometry influences model effectiveness, which is particularly critical given the increasing complexity of relational learning tasks. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a curvature-stratified evaluation framework that categorizes datasets into three curvature regimes: positive, negative, and near-zero curvature. This stratification allows for a more granular analysis of model performance based on the geometric properties of the data. The benchmark evaluates 18 representative models, including Graph Convolutional Networks (GCNs), Graph Foundation Models (GFMs), and various tabular learning methods, across 14 datasets. The evaluation protocol emphasizes geometry-aware metrics, which are designed to reveal critical performance trade-offs that conventional aggregated metrics may obscure. The authors provide all code, curvature-stratified dataset splits, and evaluation tools to facilitate reproducibility and rigorous assessment.

**Results**  
The findings indicate that model rankings are stable within each curvature regime but exhibit significant shifts across different regimes. For instance, while GFMs demonstrate superior performance in certain curvature contexts, they show diminishing returns compared to geometry-aligned GNNs in others. The authors report that their curvature-stratified evaluation framework yields more reliable and interpretable comparisons than traditional aggregated benchmarks, highlighting the importance of geometry in assessing model effectiveness. Specific performance metrics and comparisons against baseline models are detailed, although exact numerical results are not provided in the abstract.

**Limitations**  
The authors acknowledge that their framework may not account for all factors influencing model performance and that the stratification is based solely on curvature properties. They also note that the evaluation is limited to the selected 18 models and 14 datasets, which may not encompass the full diversity of relational learning tasks. Additionally, the reliance on curvature as a primary factor may overlook other geometric or contextual influences on model performance.

**Why it matters**  
This work has significant implications for the evaluation of relational learning methods, as it challenges the prevailing practices that may lead to misleading conclusions about model generalization. By introducing a geometry-aware evaluation protocol, the authors provide a framework that can enhance the interpretability and reliability of performance assessments in relational learning. This approach encourages future research to consider intrinsic geometric properties when developing and evaluating models, potentially leading to more effective and generalizable solutions in the field. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.06397v1).
