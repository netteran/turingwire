---
title: "A Systematic Approach for Selecting Trajectories for Data Augmentation"
date: 2026-06-09 14:46:47 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10938v1"
arxiv_id: "2606.10938"
authors: ["Adam Nordling"]
slug: a-systematic-approach-for-selecting-trajectories-for-data-au
summary_word_count: 425
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a systematic framework for selecting trajectories for data augmentation, enhancing spatio-temporal coherence in machine learning applications."
---

**Problem**  
This work addresses the gap in trajectory data augmentation methods, particularly the lack of systematic approaches for selecting which trajectories to augment. Prior research has shown the potential of geometric perturbation for data augmentation but relied on naive random selection, which does not optimize the benefits of augmentation. This paper, presented as a thesis by Adam Nordling, is a preprint and unreviewed, focusing on improving the efficacy of data augmentation in machine learning applications involving spatio-temporal data.

**Method**  
The author develops a systematic framework to evaluate five trajectory selection strategies: Outlierness, Diversity, Representativeness, Uncertainty, and Random selection. The evaluation is conducted across four datasets: animal behavior (Foxes and Starkey), maritime traffic (AIS), and urban traffic (Car). The framework incorporates an Optuna-based hyperparameter optimization loop to identify optimal augmentation parameters for each dataset. The study employs both linear and non-linear machine learning models to assess the impact of these strategies on model performance.

**Results**  
The systematic selection strategies, particularly Outlierness and Uncertainty, outperformed the random selection baseline, demonstrating improved stability and reduced performance degradation in dense datasets. For instance, the Outlierness strategy yielded a performance increase of approximately 15% in accuracy over the random baseline on the Foxes dataset. However, the results also indicate that the effectiveness of augmentation is conditional; systematic augmentation repaired topological fragmentation in sparse datasets but introduced noise in high-quality, dense datasets. Visual analysis using UMAP confirmed these findings, illustrating the contrasting effects of augmentation strategies based on dataset density.

**Limitations**  
The authors acknowledge that systematic selection is not universally applicable and may not always yield improvements over random selection. They highlight the potential for systematic strategies to introduce noise in high-quality datasets, which could lead to performance degradation. Additionally, the study identifies physical limitations in high-velocity domains, where standard perturbation techniques may cause divergence in feature space. The paper does not explore the long-term effects of these strategies on model generalization or the computational overhead introduced by the systematic selection process.

**Why it matters**  
This research has significant implications for the field of machine learning, particularly in applications where data scarcity is a concern. By providing a systematic approach to trajectory selection for data augmentation, it enhances the understanding of how to effectively utilize spatio-temporal data in model training. The findings suggest that careful selection of augmentation strategies can lead to improved model performance, particularly in sparse datasets, while cautioning against indiscriminate application in dense datasets. This work contributes to the ongoing discourse on data augmentation techniques and their optimization, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.10938v1).
