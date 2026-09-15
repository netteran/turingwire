---
title: "RogueAI: A Reverse Turing Test for Detecting Licensed AI Deception in Dialogue"
date: 2026-06-11 13:07:02 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13310v1"
arxiv_id: "2606.13310"
authors: ["Sara Candussio", "Emanuele Ballarin", "Lorenzo Bonin", "Sandro Junior Della Rovere", "Luca Bortolussi"]
slug: rogueai-a-reverse-turing-test-for-detecting-licensed-ai-dece
summary_word_count: 383
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces RogueAI, a novel interactive framework for assessing trust in AI dialogue systems through a reverse Turing test."
---

**Problem** — This work addresses the inadequacy of traditional Turing Tests in evaluating AI systems, particularly in terms of trustworthiness rather than mere indistinguishability. The authors propose a new interactive framework, RogueAI, to assess whether users can identify deceptive AI agents in dialogue. This paper is a preprint and has not undergone peer review.

**Method** — RogueAI is designed as an interactive web application that implements a one-on-two interrogation game. In this setup, a human player engages with two indistinguishable Large Language Model (LLM) agents, where one is licensed to deceive within a fictional context. The player must identify the deceptive agent before exhausting a limited number of turns. The architecture includes a procedural extension, AutoRogueAI, allowing players to co-create scenarios with a narrator agent that selects its deception strategy. The authors provide a high-level overview of the gameplay loop and the underlying mechanics that facilitate the interaction.

**Results** — In a three-day pilot deployment involving 467 initiated sessions and 415 completed interactions, the system recorded a total of 1,876 interaction turns in Italian. A heuristic designed to exploit linguistic signatures of deception achieved an accuracy of 75.6% in identifying the deceptive agent. In contrast, human players only managed to achieve an accuracy of 56.6%, indicating a significant gap in performance. This discrepancy suggests that players may overlook critical signals that could aid in deception detection.

**Limitations** — The authors acknowledge that the pilot study's results are preliminary and limited by the small sample size and the specific language context (Italian). They also note that the heuristic's performance may not generalize across different languages or cultural contexts. Additionally, the reliance on linguistic features for deception detection raises questions about the robustness of the approach in varied conversational scenarios.

**Why it matters** — The implications of this work extend to the development of more reliable AI systems capable of transparent and trustworthy interactions. RogueAI serves as a potential data-collection tool for understanding human-AI interaction dynamics and could inform the design of future models that prioritize honesty and trustworthiness. Furthermore, it highlights the need for improved training methodologies that enhance human ability to detect deception in AI, as discussed in related literature on LLM deception and social-deduction benchmarks. This research contributes to the ongoing discourse on AI ethics and oversight, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13310v1).
