---
title: "Collaborative Human-Agent Protocol (CHAP)"
date: 2026-06-08 17:11:42 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09751v1"
arxiv_id: "2606.09751"
authors: ["Arsalan Shahid", "Gordon Suttie", "Philip Black"]
slug: collaborative-human-agent-protocol-chap
summary_word_count: 398
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the Collaborative Human-Agent Protocol (CHAP), enhancing multi-agent collaboration by formalizing human-agent interactions and accountability."
---

**Problem**  
The paper addresses the inadequacy of existing frameworks for multi-human, multi-agent collaborations in operational settings, particularly in the context of foundation models transitioning from response generation to more complex roles. Current practices lack a structured approach to document human judgment and decision-making, which is critical for accountability in collaborative environments. The authors note that existing standards, such as MCP and A2A, do not encompass the shared workspace necessary for effective human-agent collaboration. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose the Collaborative Human-Agent Protocol (CHAP), which formalizes the interaction between humans and agents in a structured manner. CHAP consists of a small Core that includes workspaces, participants, tasks, artifacts, and an append-only evidence log. The protocol introduces composable profiles that can be tailored to specific deployment needs, incorporating features such as review processes, routing, deliberation, identity management, signatures, and audit trails. The protocol's design emphasizes the importance of capturing human decisions as non-repudiable signed events, which can be revisited and verified over time. The authors provide a reference implementation, a conformance suite, and practical examples to facilitate adoption.

**Results**  
While the paper does not present quantitative results against specific baselines or benchmarks, it outlines the qualitative improvements CHAP offers over existing practices. By structuring human-agent interactions, CHAP aims to enhance accountability and traceability in collaborative workflows. The authors suggest that the protocol can significantly improve the reliability of human oversight in agent-generated outputs, although specific metrics or performance comparisons are not provided.

**Limitations**  
The authors acknowledge that CHAP is a conceptual framework and may require further empirical validation in real-world applications. They do not address potential challenges in adoption, such as resistance from teams accustomed to informal communication methods or the complexity of integrating CHAP into existing systems. Additionally, the scalability of the protocol in large, diverse teams remains unexamined.

**Why it matters**  
The introduction of CHAP has significant implications for the future of human-agent collaboration, particularly as AI systems take on more operational responsibilities. By formalizing the interaction protocols, CHAP enhances accountability and transparency, which are crucial for trust in AI systems. This work lays the groundwork for future research into effective human-agent collaboration frameworks, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.09751v1). The structured approach to documenting human decisions could lead to improved compliance and oversight in critical applications, such as healthcare and finance, where the stakes are high.
