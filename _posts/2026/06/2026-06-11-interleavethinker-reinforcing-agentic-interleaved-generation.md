---
title: "InterleaveThinker: Reinforcing Agentic Interleaved Generation"
date: 2026-06-11 17:59:50 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13679v1"
arxiv_id: "2606.13679"
authors: ["Dian Zheng", "Harry Lee", "Manyuan Zhang", "Kaituo Feng", "Zoey Guo", "Ray Zhang"]
slug: interleavethinker-reinforcing-agentic-interleaved-generation
summary_word_count: 416
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents InterleaveThinker, a multi-agent pipeline that enhances existing image generators with interleaved generation capabilities for improved visual narratives."
---

**Problem**  
This work addresses the gap in the capability of existing image generators to perform interleaved generation, which is essential for applications in visual narratives, guidance, and embodied manipulation. Current state-of-the-art models, including Unified Multimodal Models (UMMs), exhibit limitations in generating coherent text-image sequences. The authors propose a solution to this problem by introducing a novel multi-agent pipeline, InterleaveThinker, which is the first of its kind to enable interleaved generation in existing image generation frameworks. This paper is a preprint and has not undergone peer review.

**Method**  
InterleaveThinker consists of a multi-agent architecture that includes a planner agent and a critic agent. The planner agent organizes the sequence of image-text inputs, directing the image generator on the required actions at each step. The critic agent evaluates the outputs of the generator, identifies deviations from the planned instructions, and refines the instructions for subsequent generations. The authors constructed two datasets for training: Interleave-Planner-SFT-80k and Interleave-Critic-SFT-112k, which facilitate a format cold-start. Additionally, they developed Interleave-Critic-RL-13k to enhance the instruction correction capability through reinforcement learning using the Generalized Reward Policy Optimization (GRPO) method. To address the computational impracticality of optimizing entire interleaved generation trajectories, the authors introduced accuracy and step-wise rewards, enabling single-step reinforcement learning to effectively guide the entire generation process.

**Results**  
InterleaveThinker demonstrates significant improvements in interleaved generation tasks across various image generators. On interleaved generation benchmarks, it achieves performance levels comparable to advanced models such as Nano Banana and GPT-5. Notably, it also enhances the base model's performance on reasoning-based benchmarks. For instance, on the 4-step FLUX.2-klein benchmark, substantial gains were observed on WISE and RISE metrics, indicating a marked improvement in reasoning capabilities alongside interleaved generation.

**Limitations**  
The authors acknowledge that the computational demands of optimizing entire interleaved generation trajectories remain a challenge, which they address through their reward mechanisms. However, they do not discuss potential limitations related to the scalability of their approach or the generalizability of the model across diverse datasets and tasks. Additionally, the reliance on existing image generators may limit the applicability of InterleaveThinker to specific architectures.

**Why it matters**  
The introduction of InterleaveThinker has significant implications for the development of more sophisticated multimodal systems capable of generating coherent visual narratives and enhancing embodied manipulation tasks. By enabling interleaved generation, this work paves the way for future research in multimodal AI, particularly in applications requiring dynamic interaction between text and images. The findings and methodologies presented in this paper can inform subsequent advancements in the field, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13679v1).
