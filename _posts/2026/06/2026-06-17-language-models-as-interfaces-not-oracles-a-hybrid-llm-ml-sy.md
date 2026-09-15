---
title: "Language Models as Interfaces, Not Oracles: A Hybrid LLM-ML System for Pediatric Appendicitis"
date: 2026-06-17 15:22:51 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.19183v1"
arxiv_id: "2606.19183"
authors: ["Soheyl Bateni", "Maryam Abdolali"]
slug: language-models-as-interfaces-not-oracles-a-hybrid-llm-ml-sy
summary_word_count: 420
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ClaMPAPP, a hybrid LLM-ML system that enhances pediatric appendicitis diagnosis by integrating natural language processing with structured machine learning."
---

**Problem**  
The paper addresses the limitations of using large language models (LLMs) as standalone diagnostic tools in clinical decision support, particularly in pediatric appendicitis diagnosis. While LLMs can interpret free-text clinical documentation, their performance is hindered by sensitivity to prompt variations, the order of information, and the potential for generating plausible but incorrect outputs. Structured machine learning models, such as XGBoost, provide more reliable risk predictions but struggle with the integration of narrative clinical workflows. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose ClaMPAPP (Clinical Language-assisted Machine-learning Pipeline for Appendicitis), which utilizes an LLM as an interface to extract schema-constrained clinical features from narrative texts. The system employs deterministic plausibility checks to validate these features before passing them to an XGBoost classifier. The classifier is trained on a dataset comprising clinical, laboratory, and ultrasound variables. The evaluation involved two independent pediatric appendicitis cohorts from German hospitals, comparing ClaMPAPP against end-to-end LLM baselines, including both open-source and proprietary models. To simulate realistic clinical scenarios, the authors generated narratives from structured electronic health records using template rendering and constrained LLM rewriting, incorporating sentence-order permutations to test the robustness of the models against narrative reordering.

**Results**  
ClaMPAPP demonstrated superior diagnostic performance in both internal and external validation cohorts, achieving a significant reduction in missed appendicitis cases, which is critical for acute triage safety. The system outperformed end-to-end LLMs, which exhibited unstable sensitivity-specificity trade-offs and greater performance degradation when faced with narrative reordering. Specific performance metrics were not disclosed in the abstract, but the results indicate a clear advantage for the hybrid approach over traditional LLM applications.

**Limitations**  
The authors acknowledge that the reliance on structured inputs may limit the generalizability of ClaMPAPP to other clinical contexts where narrative data is less structured. Additionally, the performance metrics were not explicitly detailed in the abstract, which may hinder a comprehensive understanding of the model's efficacy. The study's reliance on generated narratives from structured data may also introduce biases that do not reflect real-world clinical documentation variability.

**Why it matters**  
The findings support the notion that separating natural language usability from predictive inference can enhance clinical decision support systems. By positioning LLMs as interfaces rather than final decision-makers, ClaMPAPP provides a more auditable and reliable pathway for integrating natural language processing with structured machine learning. This hybrid approach could inform future research and development in clinical AI applications, particularly in high-stakes environments like pediatric care, as discussed in the context of LLMs in healthcare [as published in arXiv cs.AI](https://arxiv.org/abs/2606.19183v1).
