---
title: "An Infectious Disease Spread Simulation Based on Large Language Model Decision Making"
date: 2026-06-04 16:30:13 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.06360v1"
arxiv_id: "2606.06360"
authors: ["Yonchanok Khaokaew", "Ruochen Kong", "Andreas Zufle", "Hao Xue", "Taylor Anderson", "Chandini Raina MacIntyre"]
slug: an-infectious-disease-spread-simulation-based-on-large-langu
summary_word_count: 386
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel agent-based simulation framework using large language models to simulate decision-making in infectious disease reporting."
---

**Problem**  
This work addresses the gap in modeling individual decision-making during infectious disease outbreaks, which is crucial for understanding behavioral dynamics and informing public health interventions. Prior research has utilized large language models (LLMs) to simulate human behavior, but there is a lack of spatially grounded frameworks that incorporate demographic and geographic factors. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a spatially grounded, agent-based simulation framework that integrates LLM-generated decisions regarding self-reported influenza-like illness into a synthetic population based on census data. The framework assigns agents to spatial units within urban environments, specifically San Francisco and Atlanta, to reflect real-world demographic distributions. The decision-making scenarios implemented include independent reasoning, household influence, and message framing. The LLMs used for generating decisions are not specified in detail, but the framework allows for the exploration of how different LLMs impact decision outcomes. The simulation captures social and geographic heterogeneity, enabling a nuanced analysis of reporting behaviors.

**Results**  
The simulation results indicate that income and education are the primary factors influencing variations in self-reporting rates of influenza-like illness, with geographic location, LLM model choice, and message framing contributing smaller but significant effects. The framework successfully generates synthetic data that reflects the complexities of social and geographic factors, which is essential for spatial epidemiological modeling. Specific quantitative results are not provided in the abstract, but the findings suggest a robust correlation between socioeconomic factors and reporting behaviors.

**Limitations**  
The authors acknowledge that their model's reliance on LLMs may introduce biases inherent to the training data of these models. Additionally, the simulation is limited to two urban areas, which may not generalize to other regions with different demographic and geographic characteristics. The decision scenarios explored are also limited in scope, potentially overlooking other influential factors in decision-making during disease outbreaks.

**Why it matters**  
This research has significant implications for public health modeling, particularly in enhancing the understanding of how individual behaviors influence disease spread. By integrating LLMs into agent-based simulations, the framework provides a novel approach to capturing the complexities of human decision-making in epidemiological contexts. This work can inform targeted public health interventions and improve the accuracy of disease spread predictions. The findings contribute to the growing body of literature on the intersection of AI and public health, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.06360v1).
