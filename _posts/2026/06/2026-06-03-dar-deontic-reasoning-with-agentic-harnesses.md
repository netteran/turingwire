---
title: "DAR: Deontic Reasoning with Agentic Harnesses"
date: 2026-06-03 15:29:38 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.05009v1"
arxiv_id: "2606.05009"
authors: ["Guangyao Dou", "William Jurayj", "Nils Holzenberger", "Benjamin Van Durme"]
slug: dar-deontic-reasoning-with-agentic-harnesses
summary_word_count: 401
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Deontic Agentic Reasoning (DAR), enhancing LLMs' ability to perform deontic reasoning through interactive rule engagement."
---

**Problem**  
The paper addresses the limitations of large language models (LLMs) in deontic reasoning, particularly their struggles with long, cross-referenced rulesets that are essential for accurate reasoning in legal and policy contexts. The authors highlight that existing models often fail to locate necessary rules for specific reasoning tasks, which can lead to incorrect conclusions. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose Deontic Agentic Reasoning (DAR), an innovative framework that allows LLMs to interactively engage with legal statutes and rules as needed. This agentic reasoning setup is designed to improve the model's ability to apply explicit rules to case-specific facts. The evaluation of DAR is conducted using multiple harnesses on challenging subsets of the DeonticBench benchmark, which is specifically tailored for assessing deontic reasoning capabilities. The paper does not disclose specific architectural details, loss functions, or training compute, focusing instead on the interaction mechanism and its implications for reasoning tasks.

**Results**  
The results demonstrate that DAR significantly enhances performance on deontic reasoning tasks compared to baseline models. However, the improvements are not consistent across all tasks; weaker models exhibit degradation in performance on numerical reasoning tasks while requiring a greater number of tokens for processing. The paper provides quantitative results, indicating that certain configurations of DAR harnesses lead to substantial gains in accuracy, although specific metrics and comparisons to named baselines are not detailed in the summary.

**Limitations**  
The authors acknowledge that while DAR shows promise, the performance improvements are not uniform across all types of reasoning tasks, particularly in numerical contexts. They also note the increased token consumption associated with some harnesses, which could impact efficiency. An additional limitation not explicitly mentioned by the authors is the potential for overfitting to the specific datasets used in the evaluation, which may not generalize to broader applications of deontic reasoning.

**Why it matters**  
The introduction of DAR has significant implications for the development of more robust AI systems capable of legal reasoning and policy application. By enabling LLMs to interact with rules dynamically, this approach could lead to more accurate and contextually aware AI applications in fields such as law, compliance, and governance. The findings encourage further exploration of agentic reasoning frameworks in AI, suggesting a shift towards more interactive and context-sensitive models. This work contributes to the ongoing discourse in AI ethics and legal informatics, as published in [arXiv](https://arxiv.org/abs/2606.05009v1).
