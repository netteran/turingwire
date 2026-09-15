---
title: "ChLogic: Evaluating Robustness of Logical Reasoning in Chinese Expressions"
date: 2026-06-16 13:28:57 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.17905v1"
arxiv_id: "2606.17905"
authors: ["Peixian Zhou", "Yuxu Chen", "Chaorui Zhang", "Wei Han", "Bo Bai", "Xueyan Niu"]
slug: chlogic-evaluating-robustness-of-logical-reasoning-in-chines
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ChLogic, a benchmark assessing the robustness of logical reasoning in large language models across English and Chinese expressions."
---

**Problem**  
This work addresses the gap in evaluating the robustness of logical reasoning capabilities of large language models (LLMs) when applied to non-English languages, specifically Chinese. While LLMs have shown strong performance on logical reasoning tasks in English, their effectiveness in other languages remains underexplored. The authors present ChLogic, a preprint benchmark designed to assess whether LLMs maintain logical reasoning performance when faced with the same logical structures expressed in diverse Chinese surface forms.

**Method**  
ChLogic comprises three distinct datasets: (i) the General aligned set, which includes 60 General Propositions across nine logical template families; (ii) the Difficult aligned set, derived from 40 complex logical problems; and (iii) the Chinese-only set, which focuses on 15 language-specific phenomena. Each item in the aligned sets pairs an English reference expression with five corresponding Chinese realizations. The authors conduct experiments using three models: Qwen3, Ministral, and GLM, evaluating their performance on the benchmark. The methodology also includes back-translation from standard Chinese to English to analyze its impact on model performance, particularly on the General and Difficult aligned sets.

**Results**  
The experiments reveal a consistent performance gap between English and Chinese across all models tested. Specifically, Qwen3-32B and GLM-5.1 exhibit decreased performance on the Difficult aligned set post-translation, indicating that back-translation does not universally enhance logical reasoning capabilities. In contrast, back-translation improves performance on the General aligned set, suggesting that the nature of the logical expressions and the complexity of the problems significantly influence outcomes. The results underscore the nuanced interplay between language structure, translation artifacts, and model-specific behaviors in multilingual logical reasoning tasks.

**Limitations**  
The authors acknowledge that the benchmark is still in its early stages and may not encompass all aspects of logical reasoning across languages. They also note that the performance variations observed could be influenced by the specific models used, which may not generalize to other architectures. Additionally, the reliance on back-translation raises questions about the fidelity of the logical structures preserved during translation, which could affect the robustness assessment.

**Why it matters**  
ChLogic serves as a critical tool for evaluating the multilingual reasoning capabilities of LLMs, highlighting the need for further research into how these models handle logical reasoning across different languages. The findings suggest that improvements in translation techniques and model training could enhance performance in non-English contexts. This work lays the groundwork for future studies aimed at bridging the performance gap in multilingual logical reasoning, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.17905v1).
