---
title: "U-Net-Accelerated Quality-Diversity Optimization for Climate-Adaptive Urban Layouts"
date: 2026-06-03 09:35:11 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.04658v1"
arxiv_id: "2606.04658"
authors: ["Alexander Hagg", "Tania Guerrero", "Dirk Reith"]
slug: u-net-accelerated-quality-diversity-optimization-for-climate
summary_word_count: 412
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a U-Net-based surrogate model for efficient quality-diversity optimization of climate-adaptive urban layouts, outperforming traditional methods."
---

**Problem**  
The paper addresses the challenge of optimizing urban layouts for climate adaptation, specifically balancing building density with cold-air ventilation. Traditional methods rely on computationally expensive physics-based climate simulations, limiting planners to evaluate fewer than ten manual designs. The authors highlight a gap in the literature regarding the efficiency of surrogate models in quality-diversity (QD) optimization, particularly in the context of urban planning. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a novel approach that integrates a U-Net deep learning architecture as a surrogate model within an offline MAP-Elites loop for QD optimization. They systematically compare this spatial model against a traditional Gaussian Process (GP) surrogate across different training data strategies: quasi-random Sobol sampling and active QD bootstrapping. The U-Net is trained to predict climate impacts based on urban layout designs, leveraging its spatial inductive bias to learn the underlying physics mapping robustly. The training process utilizes a one-time batch of random samples, allowing the U-Net to achieve a high coefficient of determination ($R^2 = 0.996$) independent of the training data source.

**Results**  
The U-Net-based surrogate significantly outperforms the GP surrogate, which fails to generalize effectively when trained on random samples, necessitating costly active QD archives. The U-Net achieves highly accurate fitness rankings with a Spearman correlation coefficient of $ρ= 0.994$, demonstrating its capability to generate thousands of diverse, climate-evaluated building layouts in under ten minutes. The results indicate that the U-Net can efficiently illuminate the design space, providing a practical solution for urban planners.

**Limitations**  
The authors note that the GP surrogate's performance is heavily dependent on the quality of the training data, which can lead to catastrophic failures when using random samples. They do not address potential limitations related to the generalizability of the U-Net model to other urban contexts or the scalability of the approach to larger datasets. Additionally, the reliance on a single batch of training samples may raise concerns about overfitting or the robustness of the model in varying urban scenarios.

**Why it matters**  
This work has significant implications for urban planning and climate adaptation strategies, as it provides a more efficient method for exploring diverse design options without the prohibitive computational costs of traditional simulations. The integration of deep learning surrogates in QD optimization can enhance decision-making processes in urban design, potentially leading to more sustainable and climate-resilient cities. The findings contribute to the growing body of research on surrogate modeling in optimization tasks, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.04658v1).
