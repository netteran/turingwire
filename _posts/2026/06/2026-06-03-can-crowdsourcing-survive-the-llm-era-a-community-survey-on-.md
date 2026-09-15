---
title: "Can Crowdsourcing Survive the LLM Era? A Community Survey on Human Data Collection"
date: 2026-06-03 14:18:27 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.04924v1"
arxiv_id: "2606.04924"
authors: ["Aswathy Velutharambath", "Neele Falk", "Sofie Labat", "Tarun Tater", "Amelie Wuehrl"]
slug: can-crowdsourcing-survive-the-llm-era-a-community-survey-on-
summary_word_count: 466
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper surveys NLP researchers on the impact of LLMs on crowdsourced data quality, revealing challenges and mitigation strategies."
---

**Problem**  
The paper addresses the emerging challenge posed by Large Language Models (LLMs) to the integrity of crowdsourced data, particularly in natural language processing (NLP) tasks. As LLMs become prevalent, there is a risk that crowdworkers may outsource their tasks to these models, leading to concerns about the authenticity and quality of the collected data. This issue is particularly pressing as it has not been extensively explored in the literature, and the authors conducted a survey of 155 researchers to gather insights on their experiences and strategies regarding this phenomenon. The work is a preprint and has not undergone peer review.

**Method**  
The authors employed a survey methodology to collect qualitative and quantitative data from 155 researchers in NLP and related fields. The survey focused on practitioners' observations of LLM usage in crowdsourced data, the challenges they face, and the strategies they employ to mitigate these challenges. Key findings include that 44% of respondents reported observing LLM usage in their crowdsourced data, with 93% having anticipated this issue. The survey also identified common detection strategies, such as analyzing distinctive textual style patterns and monitoring completion times for anomalies. The authors synthesized these findings to propose a set of considerations for future crowdsourced data collection practices in the context of LLMs.

**Results**  
The survey results indicate a significant awareness of the challenges posed by LLMs among the research community. Notably, 44% of respondents reported direct observations of LLM usage in their crowdsourced datasets. While 93% anticipated this trend, half of the respondents expressed uncertainty regarding effective precautions to mitigate the issue. The most common detection strategies identified were based on textual style analysis and completion time metrics. The authors conclude that while there is a recognition of the problem and some measures being taken, current efforts are insufficient to fully safeguard data quality.

**Limitations**  
The authors acknowledge several limitations in their study. The survey sample may not be representative of the entire NLP research community, potentially biasing the results. Additionally, the reliance on self-reported data may introduce inaccuracies, as respondents might not have complete visibility into the practices of all crowdworkers. The paper does not provide a detailed analysis of the effectiveness of the proposed detection strategies, nor does it explore the implications of LLM usage on specific NLP tasks in depth.

**Why it matters**  
This work highlights critical challenges in maintaining data integrity in the era of LLMs, emphasizing the need for robust strategies to ensure the quality of crowdsourced data. The findings serve as a call to action for researchers to develop more effective detection and mitigation techniques. As the reliance on crowdsourced data continues in NLP, understanding these dynamics is essential for future research and applications. This paper contributes to the ongoing discourse on data quality in machine learning, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.04924v1).
