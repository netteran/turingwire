---
title: "Probing Outcome-Level Resemblance and Mechanism-Level Alignment in LLM Risk Decisions: Evidence from the St. Petersburg Game"
date: 2026-06-03 15:01:52 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.04978v1"
arxiv_id: "2606.04978"
authors: ["Chensong Huang", "Changyu Chen", "Chenwei Lin", "Hanjia Lyu", "Xian Xu", "Jiebo Luo"]
slug: probing-outcome-level-resemblance-and-mechanism-level-alignm
summary_word_count: 425
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the alignment of LLMs with human decision-making mechanisms in risk scenarios, revealing significant discrepancies despite surface-level similarities."
---

**Problem**  
This work addresses the gap in understanding the alignment of large language models (LLMs) with human decision-making mechanisms in risk scenarios, specifically in the context of the St. Petersburg game. While LLMs may produce outputs that appear cautious and human-like, the authors argue that these outputs do not necessarily reflect the underlying decision-making processes that characterize human behavior. This paper is a preprint and has not undergone peer review.

**Method**  
The authors evaluate 28 LLMs using a structured prompt suite designed to probe both outcome-level resemblance and mechanism-level alignment. The suite includes the original St. Petersburg game prompt, controlled decision variants that manipulate truncation, repeated play, numeric endowment, and occupational identity, as well as a human-perspective prompt that encourages models to reason as human decision-makers. Additionally, they conduct paired comparisons between base models and their instruction-tuned counterparts to assess the impact of tuning on decision-making behavior. The evaluation focuses on the models' bids in the original game and their responses to the controlled variants, aiming to discern whether the models maintain human-like behavior or shift to conditionally rational behavior.

**Results**  
In the original St. Petersburg game, most LLMs generated finite bids, suggesting a superficial alignment with human risk behavior. However, when subjected to controlled variants, the models exhibited a tendency to deviate from human-like responses, often adopting conditionally rational behaviors instead. The authors report that human-cue prompting and instruction tuning generally resulted in lower bids and mitigated some observable pathologies, yet the fundamental mechanism-level response patterns remained largely unchanged. This indicates that while LLMs can mimic human-like outcomes, they do not consistently replicate the underlying decision-making mechanisms.

**Limitations**  
The authors acknowledge that their findings are limited by the specific context of the St. Petersburg game and the selected LLMs. They note that the results may not generalize to other risk scenarios or decision-making tasks. Additionally, the reliance on structured prompts may not capture the full complexity of human reasoning. The study also does not explore the implications of these findings on the broader applicability of LLMs in high-stakes decision-making environments.

**Why it matters**  
This research highlights the critical distinction between outcome-level resemblance and mechanism-level alignment in LLMs, suggesting that high-stakes evaluations of LLM decision-making should prioritize mechanism-level consistency over mere outcome similarity. The findings have significant implications for the deployment of LLMs in real-world decision-making contexts, where understanding the underlying mechanisms is essential for ensuring reliable and human-aligned outcomes. This work contributes to the ongoing discourse on the interpretability and trustworthiness of AI systems, as discussed in related literature (as published in [arXiv cs.CL](https://arxiv.org/abs/2606.04978v1)).
