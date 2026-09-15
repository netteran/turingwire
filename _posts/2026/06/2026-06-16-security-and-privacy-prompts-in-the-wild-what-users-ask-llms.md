---
title: "Security and Privacy Prompts in the Wild: What Users Ask LLMs and How LLMs Respond"
date: 2026-06-16 15:37:25 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18062v1"
arxiv_id: "2606.18062"
authors: ["Hobin Kim", "Xiaoyuan Wu", "Omer Akgul", "Lujo Bauer", "Nicolas Christin"]
slug: security-and-privacy-prompts-in-the-wild-what-users-ask-llms
summary_word_count: 424
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper analyzes user queries about security and privacy to LLMs, revealing response quality disparities and categorizing user concerns."
---

**Problem**  
This study addresses a significant gap in the literature regarding user interactions with large language models (LLMs) concerning digital security and privacy (S&P). Prior research has predominantly focused on expert-generated misconceptions or FAQs, neglecting actual user inquiries. The authors highlight the lack of empirical data on the types of S&P questions users pose to LLMs, which is critical for understanding how these models can better serve user needs in this domain. This work is a preprint and has not undergone peer review.

**Method**  
The authors utilized the WildChat dataset, comprising 3.2 million user-LLM conversations, to extract and analyze S&P-related prompts. They identified 14,727 S&P prompts and categorized them into nine distinct categories, covering a broad spectrum of S&P topics. A thematic analysis was performed on a sample of 450 prompts to characterize user inquiries. Additionally, the authors curated a subset of 270 advice-seeking prompts, where users solicited specific recommendations or guidance. To evaluate LLM performance, they posed each prompt to the models ten times, measuring response quality and consistency. The study compared the performance of commercial LLMs against open-weight models, specifically noting the performance of GPT-5.5 and Llama-4.

**Results**  
The findings indicate that commercial LLMs significantly outperform open-weight models in response quality. Specifically, GPT-5.5 provided "good enough" responses for 98% of the prompts, while Llama-4 achieved a mere 47%. However, despite the high average quality of responses from commercial models, the study found instances of contradictory answers across multiple runs for certain prompts, which could lead to user confusion or misinformation. This inconsistency raises concerns about the reliability of LLMs in providing security and privacy advice.

**Limitations**  
The authors acknowledge several limitations, including the potential biases in the WildChat dataset, which may not fully represent the diversity of user queries. Additionally, the thematic analysis is inherently subjective, and the sample size for the quality assessment may not capture the full variability of user interactions. The study also does not explore the implications of the identified contradictions in responses, which could be critical for user trust and safety.

**Why it matters**  
This research has significant implications for the development and deployment of LLMs in security and privacy contexts. By identifying the types of S&P questions users ask and evaluating the quality of LLM responses, the study provides a foundation for improving LLM training and response mechanisms. The findings underscore the necessity for enhanced consistency in LLM outputs, particularly in sensitive areas like digital security. This work contributes to the ongoing discourse on LLM reliability and user safety, as discussed in related literature (see [arXiv](https://arxiv.org/abs/2606.18062v1)).
