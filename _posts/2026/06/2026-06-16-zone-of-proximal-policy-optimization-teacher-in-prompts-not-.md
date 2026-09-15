---
title: "Zone of Proximal Policy Optimization: Teacher in Prompts, Not Gradients"
date: 2026-06-16 17:46:02 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18216v1"
arxiv_id: "2606.18216"
authors: ["Byung-Kwan Lee", "Ximing Lu", "Shizhe Diao", "Minki Kang", "Saurav Muralidharan", "Karan Sapra"]
slug: zone-of-proximal-policy-optimization-teacher-in-prompts-not-
summary_word_count: 445
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Zone of Proximal Policy Optimization (ZPPO), enhancing knowledge distillation in reinforcement learning by utilizing teacher prompts instead of gradients."
---

**Problem**  
The paper addresses the limitations of knowledge distillation in the small-student regime, where traditional methods force students to imitate logits from a larger teacher, leading to poor generalization on unseen data. This issue is particularly pronounced in reinforcement learning (RL) settings, where rollouts that yield zero advantage are discarded, causing a drift in policy when a teacher's response is injected into the policy gradient. The authors propose a novel approach, ZPPO, to mitigate these challenges by keeping the teacher's influence within the prompt rather than the gradient, thus avoiding the pitfalls of logit imitation and policy drift. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
ZPPO is inspired by Vygotsky's zone of proximal development and introduces two types of reformulated prompts: Binary Candidate-included Questions (BCQ) and Negative Candidate-included Questions (NCQ). BCQ pairs a correct teacher response with an incorrect student response, requiring the student to discriminate between them. NCQ aggregates the student's incorrect rollouts into a single prompt to highlight shared failure modes. A prompt replay buffer is employed to recycle hard questions until the student achieves a mean rollout accuracy of at least 50% or the question is evicted due to buffer capacity constraints. The method was evaluated using the Qwen3.5 family of models, with a 27B teacher and student models ranging from 0.8B to 9B parameters.

**Results**  
ZPPO demonstrated significant improvements over traditional off-policy and on-policy distillation methods, as well as Gradient Reinforcement Policy Optimization (GRPO). The evaluation was conducted across a suite of 31 benchmarks, including 16 vision-language models (VLM), 10 large language models (LLM), and 5 video tasks. Notably, the largest performance gains were observed at the smallest student scale (0.8B), indicating that ZPPO effectively enhances the learning capacity of smaller models by leveraging teacher prompts.

**Limitations**  
The authors acknowledge that ZPPO's reliance on prompt engineering may introduce complexity in the design of effective prompts, which could limit its applicability across diverse tasks. Additionally, the finite capacity of the prompt replay buffer may lead to the loss of potentially useful questions, impacting the learning process. The paper does not address the computational overhead associated with maintaining and processing the prompt buffer, which could be a concern in resource-constrained environments.

**Why it matters**  
The introduction of ZPPO has significant implications for the field of reinforcement learning and knowledge distillation, particularly in scenarios involving smaller models that struggle with generalization. By shifting the focus from gradient-based imitation to prompt-based learning, this approach opens new avenues for enhancing model performance without the need for extensive computational resources. The findings contribute to the ongoing discourse on effective knowledge transfer methods in machine learning, as published in [arXiv](https://arxiv.org/abs/2606.18216v1).
