---
title: "Thinking with Imagination: Agentic Visual Spatial Reasoning with World Simulators"
date: 2026-06-04 17:56:36 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06476v1"
arxiv_id: "2606.06476"
authors: ["Chenming Zhu", "Jingli Lin", "Yilin Long", "Peizhou Cao", "Tai Wang", "Jiangmiao Pang"]
slug: thinking-with-imagination-agentic-visual-spatial-reasoning-w
summary_word_count: 432
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Astra, a framework that enhances Vision-Language Models with agentic spatial reasoning through interaction with a world simulator."
---

**Problem**  
This work addresses the limitations of Vision-Language Models (VLMs) in spatial reasoning, particularly their inability to infer unobserved layouts and maintain cross-view consistency when only limited egocentric observations are available. The authors highlight that existing VLMs struggle with reasoning from alternative viewpoints and lack the capability to actively generate visual evidence beyond the observed data. This gap in capability is significant, as it restricts the application of VLMs in complex visual reasoning tasks. The paper is a preprint and has not undergone peer review.

**Method**  
The authors propose Astra, an agentic spatial reasoning framework that integrates action-conditioned visual imagination into VLMs. Astra consists of two main components: Astra-VL, a reinforcement learning (RL)-trained VLM policy, and Astra-WM, a Bagel-based world simulator. Astra-WM generates novel-view observations based on context images and natural-language camera motions. To enhance the reliability of imagined evidence, Astra-WM employs view consistency tuning, which improves pose and content consistency across different views. The training process involves a world-simulator-in-the-loop two-phase RL curriculum designed to stabilize tool-use exploration and optimize the model's decision-making on when to invoke the simulator for imagined observations. 

**Results**  
The experimental results demonstrate the effectiveness of Astra in enhancing spatial reasoning capabilities. Astra-WM improves the simulator-augmented Gemini-3-Flash model on the MMSI-Bench benchmark, achieving a score increase from 45.1 to 49.5. Additionally, Astra-VL enhances the Qwen3-VL backbone, resulting in performance improvements from 29.8 to 38.8 on MMSI-Bench and from 36.8 to 42.7 on MindCube. These results indicate that the integration of imagined observations significantly contributes to spatial reasoning, with the necessity of both the world simulator and the agentic policy being underscored.

**Limitations**  
The authors acknowledge that the reliance on a world simulator may introduce challenges related to the fidelity of the simulated environments and the potential for overfitting to the simulator's characteristics. They also note that the effectiveness of Astra may vary depending on the complexity of the spatial reasoning tasks and the quality of the training data. An additional limitation not explicitly mentioned is the computational overhead associated with the RL training process and the interaction with the world simulator, which may hinder scalability in real-world applications.

**Why it matters**  
The implications of this work are significant for advancing the capabilities of VLMs in spatial reasoning tasks, particularly in scenarios requiring dynamic interaction with environments. By enabling VLMs to actively generate and utilize imagined visual evidence, Astra opens new avenues for research in agent-based reasoning and interactive AI systems. This framework could enhance applications in robotics, augmented reality, and complex decision-making scenarios, as discussed in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.06476v1).
