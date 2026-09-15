---
title: "Multi-Turn Evaluation of Deep Research Agents Under Process-Level Feedback"
date: 2026-06-08 17:08:36 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09748v1"
arxiv_id: "2606.09748"
authors: ["Rishabh Sabharwal", "Hongru Wang", "Amos Storkey", "Jeff Z. Pan"]
slug: multi-turn-evaluation-of-deep-research-agents-under-process-
summary_word_count: 410
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper evaluates deep research agents' ability to improve outputs through multi-turn feedback, revealing limitations in self-reflection and process-level guidance."
---

**Problem**  
Existing benchmarks for deep research agents (DRAs) primarily assess single-shot outputs, neglecting the potential for iterative improvement through feedback mechanisms. This study addresses the gap in understanding how DRAs can enhance their reports when subjected to multi-turn evaluations, particularly focusing on self-reflection and process-level feedback. The authors highlight that this work is a preprint and has not undergone peer review.

**Method**  
The authors introduce a novel method called Research Gap Inference (RGI), which analyzes the patterns of satisfied and unsatisfied rubric criteria to identify gaps in the research process. The evaluation framework consists of two feedback settings: (1) self-reflection, where agents revise their reports without external diagnostic signals, and (2) process-level feedback, where agents receive targeted guidance to address identified gaps. The study employs a set of DRAs and evaluates their performance across multiple iterations, measuring the incorporation of feedback and the net improvement in report quality.

**Results**  
The findings reveal several critical insights: (i) Under self-reflection, DRAs exhibit a balance between incorporating and regressing on rubric criteria, resulting in negligible net improvement. (ii) A single round of process-level feedback leads to significant enhancements, with normalized scores increasing by approximately 8-15 points and an incorporation rate of about 35-40%. (iii) Subsequent rounds of feedback do not yield compounding improvements; instead, agents regress on up to 24% of previously satisfied criteria when revising reports to address remaining gaps. These results indicate that while process-level feedback can drive initial improvements, sustained multi-turn enhancement remains elusive for the evaluated DRA architectures.

**Limitations**  
The authors acknowledge that the inability of DRAs to achieve reliable multi-turn improvements is a significant limitation of their current architectures. They also note that the feedback mechanisms may not be sufficiently robust to facilitate continuous learning across multiple iterations. Additionally, the study does not explore the impact of varying feedback types or the potential for different DRA architectures to respond to feedback differently, which could be areas for future research.

**Why it matters**  
This work has important implications for the development of more effective DRAs capable of iterative learning and improvement. The insights gained from the multi-turn evaluation framework can inform future research on feedback mechanisms in AI systems, particularly in contexts requiring complex reasoning and report generation. The findings suggest that while initial feedback can enhance performance, the challenge of maintaining improvements over multiple iterations remains a critical area for further exploration, as discussed in related literature on iterative learning in AI systems, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.09748v1).
