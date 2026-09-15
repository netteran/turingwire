---
title: "Generative Explainability for Next-Generation Networks: LLM-Augmented XAI with Mutual Feature Interactions"
date: 2026-06-09 14:48:26 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10942v1"
arxiv_id: "2606.10942"
authors: ["Kiarash Rezaei", "Omran Ayoub", "Sebastian Troia", "Francesco Lelli", "Paolo Monti", "Carlos Natalino"]
slug: generative-explainability-for-next-generation-networks-llm-a
summary_word_count: 392
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel framework for explainable AI in network operations, enhancing human-understandable explanations using LLMs and mutual feature interactions."
---

**Problem**  
The paper addresses the critical gap in explainable artificial intelligence (XAI) for network operations, particularly the challenge of translating complex model outputs into actionable insights for non-specialists. Existing XAI techniques often produce technical outputs that lack clarity and usability, undermining operator trust in AI/ML systems. This work is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a framework that integrates a moderately sized large language model (LLM) with SHapley Additive exPlanations (SHAP) to enhance the interpretability of AI models in network contexts. The framework utilizes a structured prompt that incorporates mutual feature interaction data, allowing the LLM to generate natural language explanations that are more comprehensible to human operators. The empirical evaluation focuses on an optical quality of transmission (QoT) estimation use case, where the framework's effectiveness is assessed through independent evaluations by human specialists. The training compute specifics are not disclosed, but the methodology emphasizes the synergy between LLMs and SHAP values to improve explanation quality.

**Results**  
The proposed framework demonstrates significant improvements over a baseline that relies solely on SHAP feature influence values. Specifically, it enhances explanation usefulness by 12.2% and scope by 6.2%, while achieving a correctness rate of 97.5%. These metrics were validated through assessments from human evaluators, indicating a high level of inter-evaluator agreement, which underscores the reliability of the generated explanations.

**Limitations**  
The authors acknowledge that the framework's performance may vary across different network scenarios and that the reliance on a moderately sized LLM could limit scalability. Additionally, the study's focus on a single use case (QoT estimation) may restrict the generalizability of the findings to other domains within network operations. The lack of peer review also raises questions about the robustness of the results and the potential for undiscovered biases in the evaluation process.

**Why it matters**  
This work has significant implications for the development of trustworthy AI systems in network operations, as it provides a pathway to enhance operator understanding and trust through improved explainability. By leveraging LLMs and mutual feature interactions, the framework sets a precedent for future research in XAI, particularly in complex domains where interpretability is crucial. The findings contribute to the ongoing discourse on making AI systems more transparent and user-friendly, as highlighted in related literature on XAI methodologies, such as those discussed in [arXiv cs.AI](https://arxiv.org/abs/2606.10942v1).
