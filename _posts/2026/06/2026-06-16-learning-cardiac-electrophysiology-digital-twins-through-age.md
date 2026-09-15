---
title: "Learning Cardiac Electrophysiology Digital Twins Through Agentic Discovery of Hybrid Structure"
date: 2026-06-16 16:54:03 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18154v1"
arxiv_id: "2606.18154"
authors: ["Ziqi Zhou", "Yubo Ye", "Sumeet Atul Vadhavka", "Linwei Wang", "Zhiqiang Tao"]
slug: learning-cardiac-electrophysiology-digital-twins-through-age
summary_word_count: 405
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces LEADS, a framework for discovering hybrid cardiac electrophysiology models using large language models, enhancing personalization and stability."
---

**Problem**  
The paper addresses the challenge of creating personalized cardiac electrophysiology (EP) digital twins, which traditionally rely on expert-driven hybrid physics-neural architectures. This approach is limited by the need for deep domain expertise and fails to generalize across different patients. Existing methods leveraging large language models (LLMs) for hybrid model generation lack the necessary structural priors for stable cardiac simulations. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose LEADS, a framework that formulates cardiac EP domain knowledge as a structured action space. LEADS employs an LLM agent that iteratively discovers hybrid models through a reasoning-and-action loop. The agent selects, combines, and refines candidate models while gradient descent is utilized for parameter fitting. The framework is designed to ensure that each candidate model is physically grounded, interpretable, and numerically stable, allowing for open-ended architectural discovery. The training process involves synthetic data generated from three ground-truth reaction models, as well as real cardiac EP data, to validate the effectiveness of the discovered models.

**Results**  
LEADS demonstrates superior performance compared to both human-designed hybrid models and other LLM-based hybrid modeling approaches. On synthetic datasets, LEADS achieved a mean absolute error (MAE) reduction of 25% compared to the best-performing baseline. When evaluated on real cardiac EP data, LEADS outperformed existing models by a significant margin, achieving a 30% improvement in predictive accuracy. These results indicate that LEADS not only enhances model performance but also provides a more robust framework for personalized cardiac simulations.

**Limitations**  
The authors acknowledge that LEADS is primarily validated on synthetic and real cardiac EP data, which may not encompass the full variability of patient-specific conditions. Additionally, the reliance on LLMs may introduce biases based on the training data used for the language model. The framework's performance in clinical settings remains to be evaluated, and the scalability of the approach to larger datasets or more complex cardiac conditions is not fully addressed.

**Why it matters**  
The development of LEADS has significant implications for the field of cardiac electrophysiology, as it enables the creation of personalized digital twins that are both interpretable and stable. This advancement could facilitate more accurate simulations and predictions in clinical practice, ultimately improving patient outcomes. The ability to automate the discovery of hybrid models through LLMs represents a novel approach that could be extended to other domains requiring personalized modeling. This work contributes to the ongoing discourse in AI-driven healthcare solutions, as published in [arXiv](https://arxiv.org/abs/2606.18154v1).
