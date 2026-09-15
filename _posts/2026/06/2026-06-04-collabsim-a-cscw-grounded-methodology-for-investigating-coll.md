---
title: "CollabSim: A CSCW-Grounded Methodology for Investigating Collaborative Competence of LLM Agents through Controlled Multi-Agent Experiments"
date: 2026-06-04 17:06:22 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06399v1"
arxiv_id: "2606.06399"
authors: ["Jiaju Chen", "Bo Sun", "Yuxuan Lu", "Yun Wang", "Dakuo Wang", "Bingsheng Yao"]
slug: collabsim-a-cscw-grounded-methodology-for-investigating-coll
summary_word_count: 389
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces CollabSim, a framework for evaluating the collaborative competence of LLM agents in multi-agent systems through controlled experiments."
---

**Problem**  
This work addresses a significant gap in the evaluation of multi-agent systems (MAS) built on large language models (LLMs), specifically the lack of focus on collaborative competence. While existing evaluations primarily assess individual task-solving abilities or overall task outcomes, they neglect the nuanced dynamics of collaboration, such as establishing common ground and managing shared understanding. The authors highlight that MAS often fail not due to individual deficiencies but because of inadequate collaborative skills. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose CollabSim, a configurable simulation framework designed to systematically analyze the collaborative capabilities of LLM agents. CollabSim integrates a theory-grounded definition of collaborative competence derived from Computer-Supported Cooperative Work (CSCW) literature, allowing for controlled manipulation of interaction conditions. The framework employs action-level probing to assess agents' internal states during collaboration. The experiments utilize four different LLMs, although specific architectures and training details are not disclosed. The framework's design enables the isolation of condition effects and the identification of model performance patterns across various collaborative tasks.

**Results**  
CollabSim was tested with four LLMs, revealing that it effectively captures the effects of different interaction conditions on collaborative performance. The results indicate that the framework can differentiate between model performance patterns, highlighting task-dependent effects of agent design. While specific numerical results and comparisons to baseline models are not provided in the abstract, the authors emphasize the framework's ability to reveal insights into collaborative competence that traditional evaluation methods overlook.

**Limitations**  
The authors acknowledge that CollabSim is still in its early stages and may require further refinement to fully capture the complexities of collaborative interactions. They do not address potential biases in the LLMs used or the generalizability of findings across different types of collaborative tasks. Additionally, the framework's reliance on controlled conditions may limit its applicability to real-world scenarios where communication is less structured.

**Why it matters**  
The introduction of CollabSim has significant implications for the development and evaluation of multi-agent systems, particularly in enhancing the collaborative capabilities of LLMs. By providing a structured methodology for assessing collaborative competence, this work paves the way for more effective MAS that can better mimic human teamwork dynamics. Future research can build on this framework to explore various collaborative scenarios and improve agent design, ultimately contributing to more sophisticated AI systems. This work is available on [arXiv](https://arxiv.org/abs/2606.06399v1).
