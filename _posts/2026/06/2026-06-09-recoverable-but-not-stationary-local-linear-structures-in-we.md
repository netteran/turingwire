---
title: "Recoverable but Not Stationary:Local Linear Structures in Weights and Activations"
date: 2026-06-09 14:38:26 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10929v1"
arxiv_id: "2606.10929"
authors: ["Irina Piontkovskaia", "Sergey Nikolenko"]
slug: recoverable-but-not-stationary-local-linear-structures-in-we
summary_word_count: 426
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the local linear structures in weights and activations of neural networks, revealing their dynamic nature and implications for task adaptation."
---

**Problem**  
This work addresses the gap in understanding the linear structures present in the weights and activations of neural networks, particularly in the context of task adaptation. The authors challenge the prevailing notion of fixed-task planes, which suggests that learned behaviors can be controlled by static linear directions. This research is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings are preliminary and subject to further validation.

**Method**  
The authors utilize a synthetic multitask transformer architecture and LoRA (Low-Rank Adaptation) adapters applied to DistilGPT-2 and GPT-2 models. They investigate the local low-rank task-gradient structures by conducting experiments that involve random parameter searches and analyzing the resulting activation shifts. The study introduces a random search theory supported by a Gaussian local-linear theorem, which provides a theoretical foundation for the effectiveness of random parameter search in high-dimensional spaces. The authors also quantify the relationship between parameter perturbations and activation steering, demonstrating that a single gradient step can produce a significant activation shift, quantified by a cosine similarity of 0.58 to a labeled-contrast CAA steering vector.

**Results**  
The findings reveal that local low-rank structures exist within the learned parameters, but the authors reject the fixed-task-plane hypothesis, noting that static bases fail to capture the recovery direction. They observe that the useful basis drifts significantly within 100 optimization steps. Notably, the first recovery updates form a trajectory-prefix basis that accounts for 77% of the LoRA recovery displacement. The experiments validate these results across synthetic Transformers and large language models (LLMs), indicating that the linear structures in trained networks are not static but rather evolving local geometries that partially persist across parameter and activation spaces.

**Limitations**  
The authors acknowledge that their findings are based on synthetic models and may not fully generalize to more complex real-world applications. Additionally, the dynamic nature of the local geometries suggests that further research is needed to understand the implications of these structures in different contexts and tasks. The reliance on random search methods may also introduce variability that could affect reproducibility.

**Why it matters**  
This research has significant implications for the design and training of neural networks, particularly in the context of task adaptation and transfer learning. By revealing that learned behaviors are governed by evolving local geometries rather than fixed directions, it opens new avenues for optimizing model performance through targeted parameter perturbations and activation steering. This work contributes to the broader understanding of neural network dynamics and can inform future methodologies in model training and adaptation, as discussed in related literature, such as [arXiv cs.AI](https://arxiv.org/abs/2606.10929v1).
