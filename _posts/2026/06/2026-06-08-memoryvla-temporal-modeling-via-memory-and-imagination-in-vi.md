---
title: "MemoryVLA++: Temporal Modeling via Memory and Imagination in Vision-Language-Action Models"
date: 2026-06-08 17:59:53 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09827v1"
arxiv_id: "2606.09827"
authors: ["Hao Shi", "Weiye Li", "Bin Xie", "Yulin Wang", "Renping Zhou", "Tiancai Wang"]
slug: memoryvla-temporal-modeling-via-memory-and-imagination-in-vi
summary_word_count: 412
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MemoryVLA++, a framework enhancing vision-language-action models with memory and imagination for improved robotic manipulation."
---

**Problem**  
This work addresses the limitations of existing vision-language-action (VLA) models in handling long-horizon, temporally dependent tasks in robotic manipulation. Current models primarily rely on immediate observations, which hampers their ability to utilize past experiences and predict future states effectively. The authors highlight a gap in the literature regarding the integration of cognitive mechanisms, such as working memory and episodic memory, into VLA frameworks. This paper is a preprint and has not undergone peer review.

**Method**  
MemoryVLA++ introduces a comprehensive temporal modeling framework that incorporates memory and imagination into VLA models. The architecture consists of a pretrained vision-language model (VLM) that encodes current observations into perceptual and cognitive tokens, which serve as working memory. These tokens interact with a Perceptual-Cognitive Memory Bank, designed to store and retrieve relevant historical context, including both low-level details and high-level semantics from past interactions. The memory bank is updated through a redundancy-aware consolidation process. Additionally, a world model is employed to imagine future states within a denoising latent space. The imagined latent representations are integrated under memory guidance to create temporally aware tokens, which subsequently condition a diffusion action expert to predict temporally consistent action sequences. 

**Results**  
The authors conducted extensive experiments across five simulation benchmarks and three categories of real-robot tasks, utilizing three different robotic platforms. MemoryVLA++ demonstrated significant performance improvements over baseline models. For instance, on real robots, it achieved gains of +9% on general manipulation tasks, +26% on memory-dependent tasks, and +28% on imagination-dependent tasks. These results were validated across various benchmarks, including Libero, SimplerEnv, Mikasa-Robo, Calvin, and Libero-Plus, showcasing the framework's robustness and generalization capabilities.

**Limitations**  
The authors acknowledge that while MemoryVLA++ shows promising results, it may still face challenges in scaling to more complex environments or tasks that require even longer temporal dependencies. Additionally, the reliance on a pretrained VLM may limit the adaptability of the framework to diverse domains without further fine-tuning. The paper does not address potential computational overhead introduced by the memory and imagination components, which could impact real-time performance in practical applications.

**Why it matters**  
The introduction of MemoryVLA++ has significant implications for advancing robotic manipulation capabilities, particularly in tasks requiring long-term planning and contextual awareness. By effectively integrating memory and imagination, this framework paves the way for more sophisticated robotic systems that can learn from past experiences and anticipate future scenarios. This work contributes to the ongoing discourse in the field of robotics and cognitive modeling, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.09827v1).
