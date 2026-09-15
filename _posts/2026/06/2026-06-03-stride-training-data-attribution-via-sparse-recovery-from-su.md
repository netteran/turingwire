---
title: "STRIDE: Training Data Attribution via Sparse Recovery from Subset Perturbations"
date: 2026-06-03 17:59:36 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.05165v1"
arxiv_id: "2606.05165"
authors: ["Rishit Dagli", "Abir Harrasse", "Luke Zhang", "Florent Draye", "Amirali Abdullah", "Bernhard Sch\u00f6lkopf"]
slug: stride-training-data-attribution-via-sparse-recovery-from-su
summary_word_count: 416
classification_confidence: 0.80
source_truncated: false
layout: post
description: "STRIDE introduces a novel framework for Training Data Attribution in LLMs, achieving significant speed improvements and state-of-the-art performance."
---

**Problem**  
This paper addresses the challenge of Training Data Attribution (TDA), which aims to trace model predictions back to specific training examples. The authors highlight the limitations of existing methods that rely on causal interventions, which require extensive retraining of Large Language Models (LLMs) and are computationally prohibitive. Most current approaches approximate TDA using gradients, which is not only expensive but also relies on local approximations that may not capture the global behavior of the model. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose STRIDE (Steering-based Training Data Influence Decomposition), a novel framework that reformulates TDA as a sparse recovery problem inspired by compressive sensing. STRIDE operates in the activation space rather than the parameter space, allowing it to sidestep the computational burden of tracking gradients across billions of parameters. The core technical contribution involves the introduction of "steering operators," which are lightweight models that simulate the behavioral shifts in predictions caused by training on specific data subsets. By analyzing the perturbations in test predictions induced by these operators, STRIDE employs sparse linear decomposition to recover the influence of individual training examples. The framework is designed to be computationally efficient, achieving a speedup of approximately 13 times compared to previous methods.

**Results**  
STRIDE demonstrates state-of-the-art performance in LLM pre-training attribution tasks. The authors report that their method significantly outperforms existing baselines, although specific numerical results and comparisons to named benchmarks are not detailed in the abstract. The practical utility of STRIDE is further validated through downstream applications, including data selection and contamination analysis, showcasing its versatility in real-world scenarios.

**Limitations**  
The authors acknowledge that while STRIDE offers substantial improvements in speed and efficiency, it may still be limited by the assumptions inherent in the sparse recovery framework. Additionally, the reliance on activation space modeling may not capture all nuances of the model's behavior, particularly in highly complex scenarios. The paper does not address potential limitations related to the generalizability of the steering operators across different model architectures or datasets.

**Why it matters**  
The implications of STRIDE are significant for the field of machine learning, particularly in enhancing the interpretability of LLMs and improving data management practices. By providing a faster and more efficient method for TDA, STRIDE can facilitate better understanding of model behavior and data influence, which is crucial for responsible AI deployment. This work opens avenues for further research into efficient attribution methods and their applications in data selection and contamination detection, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.05165v1).
