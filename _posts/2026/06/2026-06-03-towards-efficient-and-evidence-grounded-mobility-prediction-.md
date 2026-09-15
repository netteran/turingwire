---
title: "Towards Efficient and Evidence-grounded Mobility Prediction with LLM-Driven Agent"
date: 2026-06-03 17:34:01 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.05130v1"
arxiv_id: "2606.05130"
authors: ["Linyao Chen", "Qinlao Zhao", "Zechen Li", "Mingming Li", "Likun Ni", "Jinyu Chen"]
slug: towards-efficient-and-evidence-grounded-mobility-prediction-
summary_word_count: 384
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a training-free LLM-driven agent for individual-level mobility prediction, enhancing decision-making through adaptive evidence gathering."
---

**Problem**  
The paper addresses the limitations of existing supervised sequence models in individual-level mobility prediction, which require task-specific training and lack decision-level transparency. While recent LLM-based methods have improved interpretability, they predominantly rely on static prompts and single-pass inference, which constrains their effectiveness in scenarios where mobility signals are weak or conflicting. This work is particularly relevant as it is a preprint and has not undergone peer review.

**Method**  
The authors propose a framework called \method{}, which formulates next-location prediction as adaptive evidence-controlled decision-making. This framework operates in two modes: a fast path for routine cases that leverages historical regularity, and an iterative tool use mechanism for ambiguous cases. The latter involves gathering evidence from recent trajectories, historical behavior, stay-move likelihood, and geographical context. The model is built on a training-free approach, utilizing a large language model (LLM) to dynamically adapt its decision-making process based on the evidence available. The specific architecture details of the LLM are not disclosed, but the results are derived from the capabilities of GPT-5.4.

**Results**  
The proposed AgentMob framework demonstrates superior performance across three mobility datasets compared to other training-free LLM-based methods. Notably, it achieves an accuracy of 71.42% on the BW dataset, 33.14% on YJMob100K, and 33.50% on Shanghai ISP. In non-fast-path cases on the BW dataset, the LLM controller significantly enhances accuracy from 30.65% to 48.62% when compared to a same-tool statistical baseline, indicating that the primary advantage of the framework lies in its ability to resolve ambiguous predictions through adaptive evidence gathering.

**Limitations**  
The authors acknowledge that the framework's reliance on LLMs may introduce biases inherent to the model's training data, which could affect the generalizability of the predictions. Additionally, the performance metrics are contingent on the quality of the input data and the specific characteristics of the datasets used. The paper does not address potential computational costs associated with the iterative evidence-gathering process, which may impact real-time applications.

**Why it matters**  
This work has significant implications for urban simulation, transportation planning, and policy analysis, as it enhances the interpretability and adaptability of mobility predictions. By enabling evidence-controlled decision-making, the framework can improve the accuracy of predictions in complex scenarios, thereby informing better decision-making in urban environments. The findings contribute to the growing body of literature on LLM applications in real-world tasks, as published in [arXiv](https://arxiv.org/abs/2606.05130v1).
