---
title: "Verifiable Environments Are LEGO Bricks: Recursive Composition for Reasoning Generalization"
date: 2026-06-10 17:39:41 +0000
category: research
subcategory: reasoning
company: "DeepSeek"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12373v1"
arxiv_id: "2606.12373"
authors: ["Hao Xiang", "Qiaoyu Tang", "Le Yu", "Yaojie Lu", "Xianpei Han", "Ben He"]
slug: verifiable-environments-are-lego-bricks-recursive-compositio
summary_word_count: 384
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper presents RACES, a framework for recursive composition of verifiable environments to enhance reasoning generalization in reinforcement learning."
---

**Problem**  
This work addresses the limitations of existing methods for constructing verifiable environments in reinforcement learning (RL), which often rely on manual or individual construction techniques. These methods exhibit linear scaling limits, restricting the ability to generalize reasoning capabilities effectively. The authors propose a novel framework, RACES (Recursive Automated Composition for Environment Scaling), to overcome these challenges. This paper is a preprint and has not undergone peer review.

**Method**  
RACES conceptualizes verifiable environments as composable building blocks that can be recursively assembled. The framework introduces a set of composition operators—SEQUENTIAL, PARALLEL, SORT, and SELECT—that facilitate the automatic fusion of environments based on matching input and output types. The implementation of RACES involves 300 individual environments, which are combined to create new composite environments that induce diverse reasoning patterns. The training process leverages these composite environments to enhance the reasoning capabilities of large language models (LLMs) during RL training.

**Results**  
The experimental results demonstrate that RACES significantly improves the reasoning generalization of LLMs. Specifically, the framework enhances the performance of DeepSeek-R1-Distill-Qwen-14B by an average of 3.1 points, increasing its score from 48.2 to 51.3 across six unseen benchmarks. Additionally, Qwen3-14B's performance improves from 58.8 to 61.1 on the same benchmarks. Notably, RACES achieves performance comparable to training on 300 individual environments using only 50 base environments, indicating a substantial increase in efficiency in environment utilization.

**Limitations**  
The authors acknowledge that while RACES demonstrates significant improvements in reasoning generalization, the framework's reliance on the compatibility of input and output types may limit its applicability in more complex scenarios where such matches are not easily identifiable. Furthermore, the paper does not address potential scalability issues when extending beyond the tested environments or the impact of environment diversity on performance. The generalizability of the results to other RL architectures or tasks remains an open question.

**Why it matters**  
The implications of this work are substantial for the field of reinforcement learning and the development of large language models. By providing a systematic approach to environment composition, RACES enables more efficient training processes and enhances the reasoning capabilities of LLMs, which is critical for applications requiring complex decision-making. This research contributes to the ongoing discourse on improving RL methodologies and environment design, as discussed in related works on scalable RL environments and reasoning generalization, and is available on [arXiv](https://arxiv.org/abs/2606.12373v1).
