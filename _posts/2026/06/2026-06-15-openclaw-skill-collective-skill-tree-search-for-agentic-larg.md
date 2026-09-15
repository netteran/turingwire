---
title: "OpenClaw-Skill: Collective Skill Tree Search for Agentic Large Language Models"
date: 2026-06-15 14:20:50 +0000
category: research
subcategory: agents_robotics
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16774v1"
arxiv_id: "2606.16774"
authors: ["Tianyi Lin", "Chuanyu Sun", "Jingyi Zhang", "Changxu Wei", "Huanjin Yao", "Shunyu Liu"]
slug: openclaw-skill-collective-skill-tree-search-for-agentic-larg
summary_word_count: 420
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Collective Skill Tree Search (CSTS) for enhancing Large Language Models (LLMs) with reusable skills for complex tasks."
---

**Problem**  
The paper addresses the gap in the literature regarding the effective equipping of Large Language Models (LLMs) with reusable skills necessary for complex task execution in dynamic environments. Existing frameworks often lack structured methodologies for skill construction and evaluation, particularly in multi-step reasoning and tool use. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a novel framework called Collective Skill Tree Search (CSTS), which consists of two main iterative phases: Collective Skill Node Generation (CSN-Gen) and Collective Skill Node Assessment (CSN-Assess). CSN-Gen utilizes collective intelligence from multiple models to explore a diverse set of candidate skills for each subtask, enhancing the breadth of skill exploration. CSN-Assess employs multiple models to evaluate the generated skills through two scoring mechanisms: (1) collective quality scoring, which aggregates independent evaluations to estimate skill effectiveness, and (2) collective transferability scoring, which assesses the generalizability of skills across different models. The framework culminates in the construction of a comprehensive skill tree and skill-augmented training data, facilitating effective skill learning. Additionally, the authors introduce Collective Skill Reinforcement Learning, which actively selects relevant skills from the tree to enhance solution-space exploration and mitigate the risk of suboptimal solutions.

**Results**  
The OpenClaw-Skill model, trained using the CSTS framework, demonstrates significant improvements in agentic capabilities across various benchmarks. Specifically, it achieves a 15% increase in long-horizon planning efficiency compared to baseline models, and a 20% improvement in tool use effectiveness on the OpenClaw benchmark. The model also exhibits enhanced generalization capabilities, outperforming traditional LLMs by 25% in multi-step reasoning tasks. These results indicate a substantial advancement in the ability of LLMs to perform complex tasks in dynamic environments.

**Limitations**  
The authors acknowledge several limitations, including the dependency on the quality and diversity of the models used in the collective intelligence framework, which may affect the robustness of skill generation. Additionally, the scalability of the CSTS framework to larger, more complex tasks remains untested. The paper does not address potential computational overhead associated with the iterative skill assessment process, which could limit real-time applications.

**Why it matters**  
The development of CSTS and OpenClaw-Skill has significant implications for the future of LLMs in real-world applications, particularly in areas requiring complex decision-making and tool interaction. By enabling LLMs to autonomously construct and evaluate skills, this work paves the way for more adaptive and capable AI systems. The findings contribute to the ongoing discourse on enhancing agentic capabilities in AI, as discussed in related works on skill-based learning and multi-agent systems, and are available on [arXiv](https://arxiv.org/abs/2606.16774v1).
