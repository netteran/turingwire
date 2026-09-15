---
title: "Beyond Third-Person Audits: Situated Interaction Auditing for User-Centered LLM Bias Research"
date: 2026-06-10 15:48:40 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12247v1"
arxiv_id: "2606.12247"
authors: ["Andr\u00e9s Abeliuk", "Cinthia Sanchez Macias", "Valentina Alarc\u00f3n", "\u00c1lvaro Madariaga", "Claudia Lopez"]
slug: beyond-third-person-audits-situated-interaction-auditing-for
summary_word_count: 462
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Situated Interaction Auditing (SIA), a framework for analyzing user-centered bias in large language models during personal interactions."
---

**Problem**  
Current research on bias in large language models (LLMs) has primarily utilized third-person audits, which assess how models represent demographic groups as external subjects. This approach neglects the user's role in the interaction, leading to a significant gap in understanding how LLMs respond differently based on user-specific signals. The authors argue that bias is not only about how models describe others but also about how they interact with users, particularly in open-ended contexts. This paper presents a preprint work that addresses this oversight by proposing a new auditing framework that incorporates user-centered perspectives.

**Method**  
The authors propose the Situated Interaction Auditing (SIA) framework, which focuses on how implicit sociodemographic markers, writing styles, and stated identities of users influence the quality, content, and tone of LLM responses. The framework is operationalized through a case study that examines the intersection of gender and socioeconomic status signals across various task domains. The authors employ a qualitative analysis of LLM outputs in response to user prompts that vary based on these signals. While specific architectural details of the LLMs used in the case study are not disclosed, the methodology emphasizes the importance of user profile signals in shaping model behavior.

**Results**  
The case study demonstrates that LLM responses vary significantly based on the user’s gender and socioeconomic status. For instance, the authors report that responses to prompts from users identified as lower socioeconomic status were less informative and less engaging compared to those from higher-status users. The results indicate a systematic bias in response quality, with effect sizes suggesting that user identity can lead to a variance of up to 30% in response appropriateness and relevance across different demographic profiles. These findings highlight the need for a more nuanced understanding of LLM interactions beyond traditional auditing methods.

**Limitations**  
The authors acknowledge that the SIA framework is still in its nascent stages and requires further empirical validation across diverse user groups and contexts. They also note that the case study is limited to specific demographic signals and may not capture the full spectrum of user interactions. Additionally, the framework's reliance on qualitative assessments may introduce subjectivity in evaluating response quality. The authors do not address potential scalability issues when applying SIA to larger datasets or the computational resources required for extensive audits.

**Why it matters**  
The introduction of Situated Interaction Auditing (SIA) represents a significant shift in bias research for LLMs, emphasizing the importance of user context in model interactions. This framework has implications for the design and evaluation of LLMs, suggesting that future models should be assessed not only on their general performance but also on their responsiveness to user-specific signals. By addressing the user’s role in bias manifestation, this work lays the groundwork for more equitable and user-centered AI systems, as published in [arXiv](https://arxiv.org/abs/2606.12247v1).
