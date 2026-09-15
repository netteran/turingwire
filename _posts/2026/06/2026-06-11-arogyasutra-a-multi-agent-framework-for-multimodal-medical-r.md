---
title: "ArogyaSutra: A Multi-Agent Framework for Multimodal Medical Reasoning in Indic Languages"
date: 2026-06-11 16:59:42 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13572v1"
arxiv_id: "2606.13572"
authors: ["Tanmoy Kanti Halder", "Akash Ghosh", "Subhadip Baidya", "Arijit Roy", "Sriparna Saha"]
slug: arogyasutra-a-multi-agent-framework-for-multimodal-medical-r
summary_word_count: 390
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ArogyaSutra, a multi-agent framework for multimodal medical reasoning in Indic languages, addressing gaps in healthcare AI accessibility."
---

**Problem**  
The paper identifies a significant gap in the capabilities of existing Multimodal Large Language Models (MLLMs) in the healthcare domain, particularly for multilingual and low-resource contexts. Current models predominantly focus on English, which limits their applicability in regions like rural India, where patients often communicate complex medical queries in native Indic languages and utilize multimodal inputs, such as medical images. This preprint work aims to bridge this gap by providing a framework that supports medical reasoning in multiple Indic languages, thus enhancing equitable access to AI-driven healthcare solutions.

**Method**  
The authors introduce ArogyaBodha, a large-scale multilingual multimodal medical question-answer dataset derived from eight diverse sources, encompassing 31 body systems, six imaging modalities, and 21 clinical domains across English and seven major Indian languages. The core technical contribution is the ArogyaSutra framework, which employs an actor-critic-based multi-agent architecture. This framework integrates tool grounding with dual-memory mechanisms to facilitate step-wise, reasoning-aware decision-making. Additionally, it utilizes stored actor-critic simulation trajectories for knowledge distillation. The training process and compute resources utilized for the framework are not explicitly disclosed, but the dataset and source code are made publicly available at the provided URL.

**Results**  
The experimental results demonstrate that ArogyaSutra significantly enhances multilingual medical reasoning accuracy across all Indic languages tested. The framework outperforms existing baselines, although specific numerical improvements and baseline comparisons are not detailed in the abstract. Ablation studies confirm the effectiveness of each component within the framework, indicating that the integration of dual-memory mechanisms and tool grounding contributes positively to the overall performance.

**Limitations**  
The authors acknowledge that the dataset, while comprehensive, may still have limitations in terms of coverage and diversity of medical queries, which could affect the generalizability of the model. Additionally, the reliance on actor-critic methods may introduce complexities in training and deployment that are not fully addressed. The paper does not discuss potential biases in the dataset or the implications of using a multi-agent system in real-world healthcare settings.

**Why it matters**  
The development of ArogyaSutra has significant implications for advancing AI applications in healthcare, particularly in low-resource and multilingual environments. By enabling effective medical reasoning in Indic languages, this work contributes to reducing disparities in healthcare access and improving patient outcomes in underserved regions. The framework's architecture and dataset can serve as a foundation for future research in multimodal medical AI, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.13572v1).
