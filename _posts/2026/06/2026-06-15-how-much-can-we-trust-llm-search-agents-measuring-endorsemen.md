---
title: "How Much Can We Trust LLM Search Agents? Measuring Endorsement Vulnerability to Web Content Manipulation"
date: 2026-06-15 15:05:25 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16821v1"
arxiv_id: "2606.16821"
authors: ["Yimeng Chen", "Zhe Ren", "Firas Laakom", "Yu Li", "Dandan Guo", "J\u00fcrgen Schmidhuber"]
slug: how-much-can-we-trust-llm-search-agents-measuring-endorsemen
summary_word_count: 422
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SearchGEO, a framework to evaluate the vulnerability of LLM-based search agents to web content manipulation attacks."
---

**Problem**  
This work addresses the gap in understanding the susceptibility of large language model (LLM)-based search agents to endorsement corruption due to manipulated web content. As LLMs increasingly synthesize information from the open web into actionable recommendations, the risk of endorsing false claims becomes critical. The authors highlight that existing literature lacks a systematic evaluation of this vulnerability, particularly in the context of various LLM backends. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose SearchGEO, a controlled evaluation framework designed to measure endorsement corruption in LLM-based web-search agents. The framework integrates a web-evidence manipulation pipeline, a five-mode attack taxonomy, and multiple output-level metrics to assess the impact of adversarial content. The evaluation involves 13 different LLM backends, with each model subjected to 308 distinct cases of manipulated web content. The attack modes are categorized to analyze how different models respond to various types of content manipulation. The authors also introduce an auxiliary agent-skill probe that transforms endorsement into an install command, allowing for a nuanced assessment of model behavior under adversarial conditions.

**Results**  
The findings reveal significant variability in vulnerability patterns across the evaluated LLM backends. The overall attack success rate (ASR) ranges from 0.0% for Claude-Sonnet-4.6 to 31.4% for Gemini-3-Flash, indicating a stark difference in how models handle manipulated content. The strongest attack mode varies by model family, suggesting that architectural differences influence susceptibility. Notably, the auxiliary probe uncovers a dichotomy in endorsement behavior: Claude models tend to over-reject potentially valid endorsements, while GPT models exhibit a tendency to over-trust manipulated content. These results underscore the need for tailored safety evaluations based on specific model characteristics.

**Limitations**  
The authors acknowledge that their framework is limited to the 13 LLM backends tested and may not generalize to all existing models. Additionally, the evaluation is constrained by the specific attack modes defined in the taxonomy, which may not encompass all possible manipulation strategies. The reliance on a controlled environment may also limit the applicability of findings to real-world scenarios where adversarial content is more diverse and unpredictable.

**Why it matters**  
This research has significant implications for the development and deployment of LLM-based search agents, emphasizing the necessity of evaluating recommendation reliability in the face of adversarial content. The findings advocate for incorporating endorsement vulnerability as a critical dimension in backend safety assessments, which could inform future model design and evaluation protocols. As highlighted in the paper, understanding these vulnerabilities is essential for ensuring the integrity of LLM applications in real-world settings, as discussed in [arXiv cs.CL](https://arxiv.org/abs/2606.16821v1).
