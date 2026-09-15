---
title: "Transition-Based Digital Twin Modelling for Alzheimer's Disease under Sparse Longitudinal Data"
date: 2026-06-08 15:54:10 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09671v1"
arxiv_id: "2606.09671"
authors: ["Yinyu Huang", "Yilin Zhang", "Sofia Michopoulou", "Christopher Kipps", "Rahman Attar"]
slug: transition-based-digital-twin-modelling-for-alzheimer-s-dise
summary_word_count: 407
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a personalized digital twin framework for Alzheimer's disease prediction using sparse longitudinal data, enhancing predictive accuracy and uncertainty quantification."
---

**Problem**  
The paper addresses the limitations of existing machine learning approaches in Alzheimer's disease (AD) prediction, which often rely on static classification or cohort-level risk estimation. These methods struggle with the heterogeneous nature of AD progression and the challenges posed by sparse and irregular longitudinal data. The authors highlight the need for a personalized modeling framework that can effectively utilize multimodal data while providing subject-specific insights and uncertainty-aware reasoning. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose a personalized digital twin framework that integrates complementary modeling strategies to capture clinical transitions and temporal dependencies across patient visits. The framework utilizes data from the Alzheimer's Disease Neuroimaging Initiative (ADNI), which includes cognitive assessments, clinical variables, and MRI-derived phenotypes. The core technical contribution involves a transition-based modeling approach that predicts cognitive status and diagnostic categories while quantifying predictive uncertainty. The model is trained on leak-free subject-level splits, emphasizing data efficiency by focusing on local transitions between adjacent visits rather than relying solely on sequence-based models. The architecture's specifics, including loss functions and training compute, are not disclosed in the abstract.

**Results**  
The proposed framework demonstrates superior performance in score forecasting and diagnosis classification compared to traditional sequence-based models. The transition-based modeling approach achieved higher predictive accuracy in the sparse and irregular ADNI setting, although specific numerical results and effect sizes are not provided in the abstract. The findings suggest that local transition modeling is more data-efficient, which is critical given the challenges of sparse longitudinal data in AD research.

**Limitations**  
The authors acknowledge that while their transition-based approach offers advantages in predictive accuracy and data efficiency, it may not fully leverage the strengths of sequence models for uncertainty-aware trajectory forecasting. Additionally, the study is limited by the reliance on data from the ADNI, which may not generalize to other datasets or populations. The lack of detailed information on the model architecture, loss functions, and training compute also limits reproducibility and understanding of the framework's implementation.

**Why it matters**  
This work has significant implications for personalized disease forecasting in neurodegenerative disorders, particularly in enhancing the interpretability and robustness of predictive models. By aligning temporal modeling strategies with the clinical data structure, the proposed digital twin framework could facilitate more effective monitoring and intervention strategies for Alzheimer's disease. The findings contribute to the ongoing discourse on improving machine learning methodologies in healthcare, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.09671v1).
