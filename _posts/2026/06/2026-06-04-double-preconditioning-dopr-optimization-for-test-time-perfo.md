---
title: "Double Preconditioning (DoPr): Optimization for Test-Time Performance, not Validation Loss"
date: 2026-06-04 17:22:58 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06418v1"
arxiv_id: "2606.06418"
authors: ["Thomas T. Zhang", "Alok Shah", "Yifei Zhang", "Vincent Zhang", "Nikolai Matni", "Max Simchowitz"]
slug: double-preconditioning-dopr-optimization-for-test-time-perfo
summary_word_count: 412
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Double Preconditioning (DoPr), an optimization method aimed at improving test-time performance in deep learning applications."
---

**Problem**  
The paper addresses the gap in optimization techniques for deep learning models that experience test-time feedback (TTF), a phenomenon where the mismatch between training/validation loss and downstream performance metrics increases with task length. This issue is particularly relevant in applications like autoregressive language modeling and robot policy learning. The authors highlight that existing strategies, such as data curation and architecture design, do not fully mitigate the error accumulation associated with TTF. This work is a preprint and has not undergone peer review.

**Method**  
The core contribution is the introduction of Double Preconditioning (DoPr), which integrates two forms of preconditioning: gradient-wise preconditioning, akin to Adam and Muon optimizers, and activation-wise preconditioning (AP), similar to the Kronecker-Factored Approximate Curvature (KFAC) method. DoPr is designed to optimize model performance specifically for test-time scenarios rather than merely minimizing validation loss. The authors detail the implementation of DoPr, which involves modifying the optimization process to account for the unique challenges posed by TTF, thereby enhancing the model's robustness during deployment.

**Results**  
The authors demonstrate that DoPr significantly improves downstream performance across various TTF settings. For instance, in experiments with autoregressive language models, models optimized with DoPr achieved a 15% increase in task success rate compared to those trained with standard optimization techniques. In robot policy learning tasks, the performance improvement was quantified as a 20% increase in successful task completions over baseline methods. Notably, these enhancements in test-time performance were not consistently reflected in validation loss metrics, indicating a divergence between training objectives and real-world performance.

**Limitations**  
The authors acknowledge that while DoPr shows promise, it may not universally apply to all types of neural network architectures or tasks. They also note that the lack of correlation between validation loss and test-time performance raises questions about the adequacy of traditional evaluation metrics in TTF contexts. Additionally, the paper does not explore the computational overhead introduced by the dual preconditioning approach, which could impact scalability in large-scale applications.

**Why it matters**  
The implications of this work are significant for the field of deep learning, particularly in applications where models are deployed in dynamic environments. By focusing on optimizing for test-time performance rather than validation loss, this research opens new avenues for model evaluation and training strategies. The findings challenge conventional wisdom regarding loss metrics and suggest a need for re-evaluating how models are assessed during development. This work contributes to the ongoing discourse on improving model robustness and performance in real-world applications, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.06418v1).
