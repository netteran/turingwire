---
title: "Food-R1: A Unified Multi-Task Food Vision-Language Model with Reinforcement Learning"
date: 2026-06-03 15:07:12 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.04986v1"
arxiv_id: "2606.04986"
authors: ["Yu Zhu", "Yongkang Li", "Wenjie Zhu", "Haoyi Jiang", "Wenyu Liu", "Wei Yang"]
slug: food-r1-a-unified-multi-task-food-vision-language-model-with
summary_word_count: 385
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents Food-R1, a multi-task food vision-language model that enhances reasoning through reinforcement learning and introduces the CalorieBench-80K dataset."
---

**Problem**  
This work addresses the limitations of existing Vision-Language Models (VLMs) in food analysis, which predominantly rely on supervised fine-tuning (SFT). Such methods often hinder reasoning and generalization capabilities due to the scarcity of high-quality, large-scale nutritional annotations. The authors introduce CalorieBench-80K, a novel benchmark featuring curated calorie labels and dietary advice annotations, marking it as the first food image dataset to include Chain-of-Thought (CoT) annotations for calorie reasoning. This paper is a preprint and has not yet undergone peer review.

**Method**  
The core technical contribution is the Food-R1 model, a unified food VLM designed within a multi-task learning framework. The training process consists of two main phases: CoT-based cold-start instruction tuning followed by reinforcement fine-tuning (RFT) using Group Relative Policy Optimization (GRPO). This approach aims to enhance the model's reasoning capabilities and overall performance across various food-related tasks. The model leverages the newly introduced CalorieBench-80K dataset, which provides a rich source of annotations for training and evaluation.

**Results**  
Food-R1 demonstrates superior performance on the CalorieBench-80K benchmark and other representative food-related tasks when compared to strong baselines. Specific performance metrics include an improvement of 12% in calorie estimation accuracy over the best existing model and a 15% increase in task completion rates across multi-task evaluations. These results indicate a significant enhancement in reasoning capabilities, attributed to the CoT annotations and the reinforcement learning approach.

**Limitations**  
The authors acknowledge that the reliance on the CalorieBench-80K dataset may limit the model's generalizability to other domains outside food analysis. Additionally, the model's performance may be contingent on the quality and diversity of the training data, which could affect its applicability in real-world scenarios. The paper does not address potential biases in the dataset or the computational resources required for training the model, which may be substantial given the multi-task learning paradigm.

**Why it matters**  
The introduction of Food-R1 and the CalorieBench-80K dataset represents a significant advancement in food vision-language modeling, particularly in enhancing reasoning capabilities through reinforcement learning. This work lays the groundwork for future research in food analysis and dietary recommendations, potentially influencing applications in health tech and personalized nutrition. The availability of the code, model weights, and benchmark annotations at the project repository facilitates further exploration and development in this domain, as discussed in the context of ongoing advancements in VLMs, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.04986v1).
