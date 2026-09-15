---
title: "SpatialClaw: Rethinking Action Interface for Agentic Spatial Reasoning"
date: 2026-06-11 17:59:36 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13673v1"
arxiv_id: "2606.13673"
authors: ["Seokju Cho", "Ryo Hachiuma", "Abhishek Badki", "Hang Su", "Byung-Kwan Lee", "Chan Hee Song"]
slug: spatialclaw-rethinking-action-interface-for-agentic-spatial-
summary_word_count: 392
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SpatialClaw, a novel action interface for enhancing spatial reasoning in vision-language models through flexible code execution."
---

**Problem**  
Spatial reasoning remains a significant challenge for vision-language models (VLMs), particularly in the context of tool-augmented agents. Existing frameworks either utilize single-pass code execution, which limits flexibility by requiring a complete analysis strategy before observing intermediate results, or structured tool-call interfaces that restrict the composition of operations. This paper addresses the limitations of these approaches by proposing a new action interface that enhances the agent's capacity for open-ended spatial reasoning. Notably, this work is a preprint and has not undergone peer review.

**Method**  
The authors introduce SpatialClaw, a training-free framework that leverages a code-based action interface. SpatialClaw operates with a stateful Python kernel that is pre-loaded with input frames and a suite of perception and geometry primitives. This architecture allows a VLM-backed agent to write executable code cells at each step, conditioned on all prior outputs. This design enables flexible composition and manipulation of perception results, allowing the agent to adapt its analysis based on both intermediate text and visual observations, as well as the specific demands of each task. The framework is evaluated across 20 spatial reasoning benchmarks, covering a diverse range of static and dynamic 3D/4D tasks.

**Results**  
SpatialClaw achieves an average accuracy of 59.9% across the evaluated benchmarks, outperforming the previous state-of-the-art spatial agent by 11.2 percentage points. The improvements are consistent across six different VLM backbones from two distinct model families, demonstrating the robustness of the proposed method without requiring benchmark- or model-specific adaptations.

**Limitations**  
The authors acknowledge that while SpatialClaw significantly enhances flexibility in spatial reasoning tasks, it may still be constrained by the inherent limitations of the underlying VLMs and the quality of the perception primitives used. Additionally, the framework's reliance on a Python kernel may introduce performance overheads in real-time applications. The paper does not address potential scalability issues when applied to more complex or larger-scale spatial reasoning tasks.

**Why it matters**  
The introduction of SpatialClaw represents a significant advancement in the design of action interfaces for spatial reasoning in VLMs, enabling more flexible and adaptive problem-solving capabilities. This work has implications for future research in agentic systems, particularly in enhancing the interaction between perception and reasoning processes. The findings suggest that code-based interfaces can facilitate more sophisticated spatial reasoning, paving the way for improved performance in applications such as robotics and augmented reality. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.13673v1).
