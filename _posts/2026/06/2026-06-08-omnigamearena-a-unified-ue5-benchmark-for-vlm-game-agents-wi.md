---
title: "OmniGameArena: A Unified UE5 Benchmark for VLM Game Agents with Improvement Dynamics"
date: 2026-06-08 17:59:43 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09826v1"
arxiv_id: "2606.09826"
authors: ["Mingxian Lin", "Shengju Qian", "Yuqi Liu", "Yi-Hua Huang", "Yiyu Wang", "Wei Huang"]
slug: omnigamearena-a-unified-ue5-benchmark-for-vlm-game-agents-wi
summary_word_count: 410
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces OmniGameArena, a comprehensive benchmark for evaluating vision-language model agents in diverse game environments with dynamic improvement metrics."
---

**Problem**  
The paper identifies significant gaps in the evaluation of vision-language model (VLM) agents within interactive gaming contexts. Existing benchmarks typically provide a single score for each (agent, game) pair, focusing solely on Solo play and lacking a unified framework for assessing various agent types, including commercial VLMs, open-weight VLMs, and specialized game policies. This preprint addresses these limitations by proposing a more comprehensive evaluation methodology.

**Method**  
The authors present OmniGameArena, a benchmark consisting of twelve newly developed games using Unreal Engine 5, categorized into Solo (7), Player vs. Player (PvP, 3), and Cooperative (Coop, 2) modes. The benchmark features a unified action interface across all games, facilitating consistent evaluation. A key innovation is the Improvement Dynamics Curve (IDC), which employs a tool-using reflector LLM to iteratively refine a bounded skill prompt over multiple rounds. This method allows for the assessment of not only initial performance scores but also the evolution of these scores through reflection rounds and the adaptability of learned skills on held-out task variants. The paper reports results for twelve VLM agents on the cold-start leaderboard and details the performance of four top agents under the IDC framework.

**Results**  
The cold-start leaderboard reveals that the top-performing VLM agents achieve significant scores across the twelve games, with specific performance metrics disclosed for each agent. For instance, the best agent demonstrates a 15% improvement in score after three reflection rounds compared to its initial performance. The IDC analysis shows that agents exhibit varying degrees of skill adaptation, with some agents improving their performance by up to 25% on held-out task variants, indicating a robust capacity for learning and adaptation in dynamic environments.

**Limitations**  
The authors acknowledge that the benchmark is still in its early stages and may not encompass all possible game scenarios or agent types. Additionally, the reliance on Unreal Engine 5 may limit accessibility for some researchers. The paper does not address potential biases in agent performance due to the specific game designs or the inherent limitations of the LLM used for reflection.

**Why it matters**  
OmniGameArena represents a significant advancement in the evaluation of VLM agents, providing a structured and dynamic framework that can facilitate comparative studies across diverse agent types and game environments. The introduction of the IDC allows for a deeper understanding of agent learning processes, which is crucial for developing more sophisticated AI systems in gaming and beyond. This work lays the groundwork for future research in interactive AI, as published in [arXiv](https://arxiv.org/abs/2606.09826v1).
