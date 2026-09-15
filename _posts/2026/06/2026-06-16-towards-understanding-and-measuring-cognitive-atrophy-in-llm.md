---
title: "Towards Understanding and Measuring COGNITIVE ATROPHY in LLM Behaviour"
date: 2026-06-16 16:26:12 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18129v1"
arxiv_id: "2606.18129"
authors: ["Abeer Badawi", "Moyosoreoluwa Olatosi", "Negin Baghbanzadeh", "Laleh Seyyed-Kalantari", "Frank Rudzicz", "R. Shayna Rosenbaum"]
slug: towards-understanding-and-measuring-cognitive-atrophy-in-llm
summary_word_count: 416
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces COGNITIVE ATROPHY as a measure of LLM behavior in mental health contexts, highlighting its implications for user interaction and model evaluation."
---

**Problem** — This work addresses a critical gap in the evaluation of large language models (LLMs) used in mental health support, specifically the inadequacy of existing benchmarks that focus on static safety and helpfulness metrics. The authors argue that these metrics fail to capture the dynamic nature of user interactions over time, particularly in emotionally sensitive contexts. They propose the concept of COGNITIVE ATROPHY, which reflects a decline in users' cognitive engagement and decision-making capabilities as influenced by LLM interactions. This paper is a preprint and has not undergone peer review.

**Method** — The authors developed the COGNITIVE ATROPHY BENCH, a benchmark comprising 1,576 human-generated counseling conversations, totaling 15,680 turns and 42,230 responses from five different LLMs. A 20-attribute schema was created by three clinical and neuropsychology experts, covering user context, response behavior, and global risk flags. Six trained clinical reviewers utilized this schema to assess the interactions, resulting in 5,324 judgments grounded in span evidence. Additionally, the paper introduces two indices: the User-Input Risk Index (UIRI) and the Cognitive Atrophy Risk Index (ARI), along with trajectory summaries to analyze the evolution of user interactions over time.

**Results** — The analysis revealed that across the five LLMs, there was a consistent moderate-to-high level of atrophy-aligned behavior in both single and multi-turn interactions. While the models generally responded to explicit safety cues, they demonstrated less adaptability when users sought solutions or decision-making support. The predominant behavioral patterns identified included directive advice, problem-solving, recommendation responses, topic shifts, and validation forms that may inadvertently foster user dependence rather than promote independent reflection. These findings suggest that LLMs may not effectively support cognitive engagement in therapeutic contexts.

**Limitations** — The authors acknowledge that their framework is still in its early stages and may require further validation across diverse user populations and contexts. They also note that the reliance on human-generated conversations may introduce biases inherent in the training data. Additionally, the study does not explore the long-term effects of LLM interactions on cognitive atrophy, which could be a significant area for future research.

**Why it matters** — This work has significant implications for the design and evaluation of LLMs in mental health applications. By formalizing COGNITIVE ATROPHY as a measurable construct, it provides a foundation for auditing model behavior in sensitive interactions, potentially guiding future improvements in LLM training and deployment. The insights gained from this research could inform the development of more effective AI systems that enhance user reflection and decision-making, rather than diminish them, as discussed in [arXiv](https://arxiv.org/abs/2606.18129v1).
