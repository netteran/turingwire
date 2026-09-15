---
title: "Learning What to Say to Your VLA: Mostly Harmless Vision Language Action Model Steering"
date: 2026-06-10 16:34:49 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.12299v1"
arxiv_id: "2606.12299"
authors: ["Hyun Joe Jeong", "Gokul Swamy", "Andrea Bajcsy"]
slug: learning-what-to-say-to-your-vla-mostly-harmless-vision-lang
summary_word_count: 423
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a framework for enhancing Vision-Language-Action models' performance through interactive language steering and a conformalized feedback policy."
---

**Problem**  
The paper addresses the limitations of Vision-Language-Action (VLA) models, which often exhibit brittle mappings from natural language instructions to robotic behaviors. This brittleness can lead to inconsistent task execution, where semantically similar commands yield divergent actions. Additionally, the authors highlight that both human-generated instructions and zero-shot language models can struggle to effectively guide VLAs, particularly in out-of-distribution scenarios. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a novel framework that consists of two main components: an interactive search mechanism for language sequences and a test-time language feedback policy (LFP). The interactive search identifies language sequences that enhance closed-loop VLA task performance. The LFP is distilled from these sequences and is designed to predict when language steering will yield performance improvements. To mitigate the risk of harmful steering interventions, the authors employ a conformalization technique on the improvement head, ensuring that the LFP does not degrade task performance in out-of-distribution contexts. Notably, this framework operates on arbitrary frozen pre-trained VLAs, eliminating the need for access to the original training data or fine-tuning of the models.

**Results**  
The proposed conformalized LFP demonstrates significant performance improvements over baseline VLA models. In simulation environments, the LFP enhances base VLA performance by 24.7%. In hardware tests, the improvement is even more pronounced, achieving a 65.0% increase in task execution success. Furthermore, the LFP exhibits strong guarantees against harmful steering, maintaining performance stability under visual and semantic perturbations. The authors report that the recovery behaviors enabled by the LFP are not observed when using traditional open-loop prompting methods.

**Limitations**  
The authors acknowledge that their approach relies on the quality of the initial VLA models and may not generalize to all types of robotic tasks or environments. Additionally, while the conformalization process aims to prevent harmful interventions, the effectiveness of this mechanism in highly complex or unpredictable scenarios remains to be fully validated. The paper does not explore the computational overhead introduced by the interactive search and LFP distillation processes, which could impact real-time applications.

**Why it matters**  
This work has significant implications for the development of more robust and reliable VLA systems, particularly in real-world robotic applications where human-like interaction is essential. By providing a method to enhance language steering without requiring model retraining, the framework opens avenues for improving user experience and task success rates in robotic control. The findings contribute to the ongoing discourse on the integration of language and action in AI systems, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.12299v1).
