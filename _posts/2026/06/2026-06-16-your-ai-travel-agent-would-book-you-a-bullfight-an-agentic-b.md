---
title: "Your AI Travel Agent Would Book You a Bullfight: An Agentic Benchmark for Implicit Animal Welfare in Frontier AI Models"
date: 2026-06-16 16:42:42 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18142v1"
arxiv_id: "2606.18142"
authors: ["Jasmine Brazilek", "Oliver Tulio", "Joel Christoph", "Miles Tidmarsh", "Carol Kline", "Arturs Kanepajs"]
slug: your-ai-travel-agent-would-book-you-a-bullfight-an-agentic-b
summary_word_count: 469
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper introduces TAC, the first benchmark assessing AI agents' ability to avoid animal exploitation in travel booking scenarios, revealing significant performance gaps."
---

**Problem**  
This work addresses a critical gap in the evaluation of AI agents' ethical decision-making, specifically regarding animal welfare in agentic contexts. Existing benchmarks primarily assess text-based responses to prompts, failing to evaluate whether AI models can translate ethical reasoning into actionable decisions when booking travel or making other choices on behalf of users. The authors highlight that this is an unreviewed preprint, indicating the need for further validation of their findings.

**Method**  
The authors propose the Travel Agent Compassion (TAC) benchmark, which consists of twelve hand-authored travel booking scenarios categorized into six types of animal exploitation. The scenarios were expanded to forty-eight samples to mitigate confounding factors such as price, rating, and position. The evaluation involved seven frontier AI models from four different research labs, including Claude Opus 4.7, GPT-5.5, GPT-5.2, DeepSeek, and Gemini. The models were assessed on their ability to avoid options that exploit animals when acting on behalf of users. Notably, the introduction of a single welfare-aware sentence in the system prompt significantly improved performance, demonstrating the impact of prompt engineering on ethical decision-making.

**Results**  
All evaluated models performed below the chance level of 64%, with the highest score recorded by Claude Opus 4.7 at 53%. The introduction of a welfare-aware prompt led to substantial performance improvements: Claude and GPT-5.5 saw gains of 47 to 63 percentage points, while GPT-5.2 improved by 26 points. In contrast, DeepSeek and Gemini exhibited less than 12 points of improvement. An auxiliary audit of 288 transcripts from the top two performers, judged by Gemini 2.5 Flash Lite, revealed no instances of evaluation awareness, suggesting that the low performance rates were not due to the models recognizing the ethical evaluation context.

**Limitations**  
The authors acknowledge that the TAC benchmark is limited to specific travel booking scenarios and may not generalize to other contexts of animal welfare. Additionally, the reliance on a small set of scenarios may not capture the full complexity of ethical decision-making in AI agents. The lack of evaluation awareness in the models raises questions about their understanding of ethical implications, which the authors do not fully explore.

**Why it matters**  
The findings underscore the limitations of current AI models in making ethical decisions in agentic roles, highlighting the need for improved benchmarks that assess real-world implications of AI actions. The results suggest that while prompt engineering can enhance performance, significant gaps remain in the models' ability to recognize and act upon ethical considerations. This work has implications for the development of AI systems that align with ethical standards, particularly in light of regulatory frameworks like the EU General-Purpose AI Code of Practice. The insights presented in this paper are crucial for future research in AI ethics and can inform the design of more responsible AI agents, as discussed in the context of the findings available on [arXiv](https://arxiv.org/abs/2606.18142v1).
