---
title: "Getting Better at Working With You: Compiling User Corrections into Runtime Enforcement for Coding Agents"
date: 2026-06-11 10:43:40 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13174v1"
arxiv_id: "2606.13174"
authors: ["Yujun Zhou", "Kehan Guo", "Haomin Zhuang", "Xiangqi Wang", "Yue Huang", "Zhenwen Liang"]
slug: getting-better-at-working-with-you-compiling-user-correction
summary_word_count: 378
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces TRACE, a method for compiling user corrections into runtime checks for coding agents, significantly reducing preference violations."
---

**Problem** — The paper addresses the persistent issue of interactive LLM agents failing to retain user preferences across sessions, leading to repeated violations of user corrections. Despite existing memory mechanisms, such as Mem0, which still leave 57.5% of applicable preference checks unaddressed, there is a lack of effective solutions that allow coding agents to learn from user interactions in real-time. This work is a preprint and has not undergone peer review.

**Method** — The authors propose Test-time Rule Acquisition and Compiled Enforcement (TRACE), a novel skill-layer pipeline designed for coding-agent runtimes. TRACE operates by mining user corrections during interactions, converting these corrections into atomic rules, and compiling them into runtime checks that must be satisfied before an agent can complete future tasks. This approach contrasts with traditional methods where rules are predefined by developers. The evaluation of TRACE is conducted through simulated user-in-the-loop experiments on two task sets: ClawArena, which focuses on coding-agent tasks, and MemoryArena, which emphasizes memory-intensive tasks.

**Results** — TRACE demonstrates significant improvements in reducing preference violations. In ClawArena, the method reduces held-out preference violations from 100.0% to 37.6% on in-distribution tasks and from 100.0% to 2.0% on out-of-distribution tasks. For MemoryArena-derived tasks, TRACE achieves a reduction in in-distribution violations from 100.0% to 60.5%, while also matching or surpassing the strongest memory baseline in terms of task pass rates. These results indicate that TRACE effectively mitigates a critical failure mode associated with memory alone, enhancing user-agent interaction.

**Limitations** — The authors acknowledge that while TRACE significantly reduces preference violations, it may not completely eliminate them, particularly in highly complex or nuanced user preferences. Additionally, the reliance on user corrections for rule generation may introduce biases based on the specificity and frequency of user interactions. The paper does not address the scalability of TRACE in environments with diverse user bases or the potential computational overhead introduced by real-time rule compilation.

**Why it matters** — The implications of this work are substantial for the development of more adaptive and user-friendly coding agents. By enabling agents to learn from user corrections dynamically, TRACE could enhance user satisfaction and efficiency in collaborative coding environments. This research contributes to the broader discourse on improving human-AI interaction and the practical deployment of LLMs in real-world applications, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13174v1).
