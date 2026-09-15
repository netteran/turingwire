---
title: "GameCraft-Bench: Can Agents Build Playable Games End-to-End in a Real Game Engine?"
date: 2026-06-16 12:34:39 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.17861v1"
arxiv_id: "2606.17861"
authors: ["Tongxu Luo", "Rongsheng Wang", "Jiaxi Bi", "Chenming Xu", "Zhengyang Tang", "Jianlong Chen"]
slug: gamecraft-bench-can-agents-build-playable-games-end-to-end-i
summary_word_count: 433
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces GameCraft-Bench, a benchmark for evaluating end-to-end game generation by coding agents within a game engine environment."
---

**Problem**  
The paper addresses the gap in evaluating coding agents' capabilities in generating playable games from natural language specifications. Traditional coding tasks do not encompass the complexities of game generation, which requires the integration of scripts, scenes, assets, and runtime interactions within a game engine. The authors formalize this challenge as producing a complete game artifact that allows for observable player-game interaction. They highlight the need for a robust evaluation framework that incorporates Engine Grounding, Artifact Completeness, and Interactive Verification. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose an interaction-grounded evaluation framework instantiated as GameCraft-Bench, which consists of 140 tasks across 15 game families using the Godot game engine. The framework evaluates executable gameplay through replayed demonstrations and rubric-guided multimodal judging. The tasks are designed to assess various aspects of game generation, including the ability to create coherent gameplay experiences that align with the provided specifications. The evaluation metrics focus on the completeness of the game artifacts produced by coding agents, emphasizing the importance of functional visual feedback and coherent presentation.

**Results**  
The evaluation of several frontier coding agents reveals that end-to-end game generation remains a significant challenge. The strongest agent achieved a score of 41.46% on the GameCraft-Bench benchmark, while most agents scored below 40%. This indicates that while agents can implement recognizable game mechanics, they often fail to produce complete games that meet the criteria for sufficient content and coherent gameplay. The results underscore the limitations of current coding agents in generating fully functional and engaging game experiences.

**Limitations**  
The authors acknowledge that the current benchmark may not fully capture the nuances of game design and player experience. They note that while the tasks cover a range of game families, the complexity of certain game mechanics may not be adequately represented. Additionally, the reliance on multimodal judging introduces subjectivity, which could affect the consistency of evaluations. The authors also do not address potential scalability issues when applying the framework to more complex game genres or larger task sets.

**Why it matters**  
The introduction of GameCraft-Bench provides a structured approach to evaluating the capabilities of coding agents in game generation, highlighting the challenges that remain in this domain. The findings suggest that significant advancements are needed in the development of coding agents to achieve coherent and complete game artifacts. This work lays the groundwork for future research in interactive systems and game design, emphasizing the importance of integrating player interaction into the evaluation process. The implications of this research are critical for advancing the field of AI-driven game development, as published in [arXiv](https://arxiv.org/abs/2606.17861v1).
