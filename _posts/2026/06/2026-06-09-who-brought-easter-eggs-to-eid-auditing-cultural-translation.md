---
title: "Who Brought Easter Eggs to Eid? Auditing Cultural Translation of Math Word Problems Across Diverse Languages and Regions"
date: 2026-06-09 15:50:12 +0000
category: research
subcategory: multimodal
company: "Anthropic"
secondary_companies: ["OpenAI", "Google DeepMind"]
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11009v1"
arxiv_id: "2606.11009"
authors: ["Parisa Suchdev", "Juniper Lovato"]
slug: who-brought-easter-eggs-to-eid-auditing-cultural-translation
summary_word_count: 417
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper audits the cultural translation of math word problems by large language models, revealing significant inconsistencies and cultural biases in adaptations."
---

**Problem**  
This preprint addresses the gap in understanding how large language models (LLMs) adapt math word problems across diverse languages and cultural contexts. While LLMs are increasingly employed for personalized learning, there is limited research on the consistency of these adaptations, their preservation of cultural diversity, and the cultural entities that models prioritize. The authors investigate whether adaptations are uniform across different models and how they reflect or distort cultural nuances.

**Method**  
The authors analyze the adaptations of 60 English math word problems into seven languages: Bengali, Hindi, Punjabi (India), Urdu, Sindhi (Pakistan), Italian, and Sicilian (Italy). They evaluate three LLMs: Claude Opus 4, GPT-4.1, and Gemini 2.5 Pro. The study involves annotating 6,489 entity transformations, categorizing them into five types: preserve, localize, generalize, omit, or change. The analysis focuses on the agreement between models regarding transformation types and specific substitutions, as well as the overall entropy of cultural diversity in the adaptations. The authors employ a corpus-level analysis to uncover deeper systemic issues that may not be apparent in individual translations.

**Results**  
The findings reveal that models agree on the type of transformation in 62.5% of cases, but only 33.5% of specific substitutions are consistent across models. All 21 language-model combinations exhibit entropy collapse, indicating a compression of cultural diversity rather than an expansion. The models tend to prioritize surface-level markers (e.g., names, foods, currencies) while maintaining deeper structural features, such as educational systems that embed culturally specific assumptions. Notably, the models misattribute regional contexts, such as using Bangladeshi taka for Indian Bengali students, and exhibit cross-cultural contamination, exemplified by adapting egg hunts as Eid activities. These issues highlight a significant disconnect between surface plausibility and deeper cultural accuracy.

**Limitations**  
The authors acknowledge that their analysis is limited to a specific set of languages and models, which may not represent the full spectrum of LLM capabilities. Additionally, the study does not explore the pedagogical implications of these adaptations in detail, nor does it assess the impact on student learning outcomes. The reliance on corpus-level analysis may obscure individual translation errors that could be critical in educational contexts.

**Why it matters**  
This work has significant implications for the development and deployment of LLMs in educational settings, particularly in multilingual and multicultural contexts. The findings suggest that model choice can profoundly influence the cultural experiences of learners, potentially perpetuating biases and misrepresentations. As such, this research underscores the need for more rigorous auditing of LLM outputs to ensure culturally sensitive and accurate educational materials, as published in [arXiv](https://arxiv.org/abs/2606.11009v1).
