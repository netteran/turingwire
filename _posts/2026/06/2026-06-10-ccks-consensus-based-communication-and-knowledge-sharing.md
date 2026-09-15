---
title: "CCKS: Consensus-based Communication and Knowledge Sharing"
date: 2026-06-10 16:20:18 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12281v1"
arxiv_id: "2606.12281"
authors: ["Jinyuan Zu", "Xiaowei Lv", "Yongcai Wang", "Deying Li", "Yunjun Han", "Wenping Chen"]
slug: ccks-consensus-based-communication-and-knowledge-sharing
summary_word_count: 373
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the CCKS framework for enhancing cooperative Multi-Agent Reinforcement Learning through consensus-based communication and knowledge sharing."
---

**Problem**  
The paper addresses the limitations of existing action-advising methods in Decentralized Training and Decentralized Execution (DTDE) for Multi-Agent Reinforcement Learning (MARL). Current approaches often lead to excessive reliance on teacher guidance, resulting in suboptimal stability and degraded performance. This work is a preprint and thus has not undergone peer review, highlighting the need for further validation of its findings.

**Method**  
The authors propose the Consensus-based Communication and Knowledge Sharing (CCKS) framework, which enables agents to adopt recommendations based on consensus-derived constraints. The core technical contribution lies in the construction of consensus models using contrastive learning, which leverages local observations during the agents' training phase. In the action selection process, agents evaluate and choose actions based on a scoring mechanism that incorporates both consensus and shared knowledge. CCKS is designed as a plug-and-play solution, allowing for seamless integration with existing DTDE algorithms, thereby enhancing their functionality without requiring extensive modifications.

**Results**  
Experiments were conducted in two environments: the Google Research Football and the StarCraft II Multi-Agent Challenge. The integration of CCKS demonstrated significant improvements over baseline DTDE methods. Specifically, the authors report a marked increase in cooperation efficiency and learning speed, with performance metrics indicating a substantial enhancement in overall agent performance. While exact numerical results are not provided in the abstract, the qualitative improvements suggest a strong effect size compared to traditional action advising approaches.

**Limitations**  
The authors acknowledge that the CCKS framework may still be sensitive to the quality of the teacher's guidance and the initial conditions of the agents. Additionally, the reliance on local observations for consensus model construction may limit the framework's effectiveness in highly dynamic environments where global state information is crucial. The paper does not address potential scalability issues when applied to larger agent populations or more complex environments beyond those tested.

**Why it matters**  
The CCKS framework has significant implications for advancing cooperative strategies in MARL, particularly in environments where agent interaction is critical. By improving the balance between exploration and exploitation through consensus-based learning, this work paves the way for more robust and interpretable multi-agent systems. The findings contribute to the ongoing discourse in the field, as highlighted in related works on decentralized learning and cooperative strategies, and are available for further exploration on [arXiv](https://arxiv.org/abs/2606.12281v1).
