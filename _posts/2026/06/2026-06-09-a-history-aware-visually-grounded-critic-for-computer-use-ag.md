---
title: "A History-Aware Visually Grounded Critic for Computer Use Agents"
date: 2026-06-09 16:39:10 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11078v1"
arxiv_id: "2606.11078"
authors: ["Jaewoo Lee", "Zaid Khan", "Archiki Prasad", "Justin Chih-Yao Chen", "Supriyo Chakraborty", "Kartik Balasubramaniam"]
slug: a-history-aware-visually-grounded-critic-for-computer-use-ag
summary_word_count: 406
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents HiViG, a multimodal critic framework that enhances Computer Use Agents by integrating history awareness and visual grounding for improved decision-making."
---

**Problem**  
This work addresses the limitations of existing critic models for Computer Use Agents (CUAs) that primarily focus on short-term decision-making and lack visual grounding capabilities. The authors highlight that current approaches often forget earlier actions and fail to accurately assess the appropriateness of actions in complex Graphical User Interface (GUI) environments. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose HiViG, a History-aware Visually Grounded framework that integrates a multimodal critic into the policy decision loop of CUAs. HiViG is trained on real GUI trajectories, allowing it to abstract past interactions into a compact record. The framework consists of two main components: (1) macro-action history, which summarizes the policy's completed actions, and (2) visually grounded critique, which verifies the execution coordinates against the current GUI screenshot to intercept potential errors before execution. The architecture leverages a combination of historical data and visual inputs to enhance decision-making in real-time.

**Results**  
HiViG demonstrates significant improvements over existing scalar and verbal critics across various benchmarks, including web, mobile, and desktop environments. Specifically, it achieves an average success rate increase of 5.8% for the Qwen3-VL-32B model and 9.0% for the Gemini-3-Flash model compared to the strongest baseline. The results indicate strong cross-platform generalization, showcasing HiViG's robustness in diverse GUI contexts. Ablation studies reveal that both the macro-action history and visually grounded critique are essential for mitigating short-sighted planning and reducing execution errors, respectively.

**Limitations**  
The authors acknowledge that while HiViG improves decision-making in CUAs, it may still be limited by the quality and diversity of the training data used for the multimodal critic. Additionally, the reliance on visual grounding may introduce challenges in scenarios with dynamic or rapidly changing GUIs. The paper does not address potential computational overhead introduced by the integration of the critic into the decision-making process, which could affect real-time performance in resource-constrained environments.

**Why it matters**  
The introduction of HiViG has significant implications for the development of more effective CUAs capable of operating in complex GUI environments. By addressing the shortcomings of existing critic models, this work paves the way for more reliable and efficient decision-making processes in AI systems. The integration of history awareness and visual grounding can enhance the performance of CUAs in long-horizon tasks, making them more adept at handling intricate user interactions. This research contributes to the ongoing discourse in the field of AI and human-computer interaction, as discussed in related works available on [arXiv](https://arxiv.org/abs/2606.11078v1).
