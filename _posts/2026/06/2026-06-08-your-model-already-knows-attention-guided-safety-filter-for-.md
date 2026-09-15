---
title: "Your Model Already Knows: Attention-Guided Safety Filter for Vision-Language-Action Models"
date: 2026-06-08 17:11:16 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09749v1"
arxiv_id: "2606.09749"
authors: ["Seongbin Park", "Fan Zhang", "Baharan Mirzasoleiman", "Shahriar Talebi", "Nader Sehatbakhsh"]
slug: your-model-already-knows-attention-guided-safety-filter-for-
summary_word_count: 428
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a training-free safety filter leveraging attention heads in Vision-Language-Action models for real-time collision avoidance in robotic tasks."
---

**Problem** — This work addresses the lack of guarantees against collisions with task-irrelevant objects in Vision-Language-Action (VLA) models, which have shown strong performance in robotic manipulation tasks. Existing safety filters that utilize vision-language models (VLMs) for obstacle identification are too slow for real-time control loops and can only be applied at the start of an episode, making them ineffective for dynamic environments. This paper presents a solution to this problem, which is particularly relevant as it is a preprint and has not undergone peer review.

**Method** — The authors propose a novel safety framework that exploits specific attention heads within a VLA model to localize the target object intended for manipulation. This approach does not require additional training, making it efficient for real-time applications. The framework operates by extracting the active target from the attention heads at each time step, treating all other objects in the scene as potential obstacles. These obstacles are then processed through a Control Barrier Function (CBF) filter to ensure collision avoidance. The method is complemented by a lightweight real-time object tracker, enabling the system to adapt to moving obstacles effectively.

**Results** — The proposed method was evaluated on the SafeLIBERO benchmark, which was extended to include moving obstacles. On the original static benchmark, the method achieved performance comparable to an oracle that uses privileged simulator state for target identification, effectively simulating a VLM-based identification step at the episode's start. However, in the dynamic variant of the benchmark, where the oracle's initial target assignment becomes outdated, the proposed method outperformed the oracle by an average of 43%. These results demonstrate the effectiveness of the attention-guided safety filter in real-time scenarios.

**Limitations** — The authors acknowledge that their approach relies on the assumption that the attention heads can consistently localize the intended target, which may not hold in all scenarios. Additionally, the method's performance in highly cluttered environments or with complex object interactions is not thoroughly evaluated. The paper does not address potential computational overhead introduced by the real-time object tracking component, which could impact performance in resource-constrained settings.

**Why it matters** — This work has significant implications for the development of safer robotic systems capable of operating in dynamic environments. By demonstrating that perceptual signals necessary for real-time safety filtering are already embedded within VLA policies, the authors provide a pathway for enhancing the robustness of robotic manipulation without the need for extensive retraining or additional models. This advancement could facilitate broader applications of VLA models in real-world scenarios, as discussed in related literature on safety in robotic systems, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.09749v1).
