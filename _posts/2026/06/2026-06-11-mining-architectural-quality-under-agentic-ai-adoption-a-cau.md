---
title: "Mining Architectural Quality Under Agentic AI Adoption: A Causal Study of Java Repositories"
date: 2026-06-11 12:50:36 +0000
category: research
subcategory: agents_robotics
company: "ServiceNow"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13298v1"
arxiv_id: "2606.13298"
authors: ["Oliver Aleksander Larsen", "Mahyar T. Moghaddam"]
slug: mining-architectural-quality-under-agentic-ai-adoption-a-cau
summary_word_count: 421
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the causal impact of agentic AI adoption on architectural quality in Java repositories, revealing nuanced effects on architectural smell density."
---

**Problem**  
The paper addresses a significant gap in the literature regarding the causal effects of agentic AI coding tools on software architecture, particularly in the context of "vibe coding." While prior studies have focused on code-level metrics such as complexity and static analysis warnings, the impact on architectural outcomes remains underexplored. This work is particularly relevant as it provides causal evidence, which is scarce in existing research, and it utilizes a robust methodology to analyze architectural quality in the face of AI tool adoption.

**Method**  
The authors conducted a causal study by mining 151 open-source Java repositories, identifying 74 with detectable agentic AI adoption through configuration files and Co-Authored-By commit trailers. They employed a staggered difference-in-differences design alongside the Borusyak imputation estimator to estimate the causal effect of AI adoption on architectural smell density (ASD). The analysis was performed over a 13-month period, yielding 1,811 monthly Arcan snapshots. The study included various robustness checks, such as wild cluster bootstrap and Lee bounds, to validate the findings. The complete replication package, including the curated repository panel, is publicly available for further scrutiny.

**Results**  
The results indicate that total architectural smell counts remained essentially unchanged, with a slight increase of 1.1% (p = 0.82). However, lines of code increased significantly by 12.8% (p = 0.003), leading to a 6.7% decline in ASD (p = 0.004). This decline is attributed to a denominator effect rather than an actual improvement in architectural quality. The authors also conducted per-type estimates and robustness checks, confirming the consistency of these results. Pre-trend analysis showed flat trends (Wald p = 0.90), supporting the parallel trends assumption necessary for causal inference.

**Limitations**  
The authors acknowledge that their findings may not generalize beyond the specific context of Java repositories and the particular AI tools studied. They also note that density-normalized outcomes can be misleading when the treatment affects system size, emphasizing the need for raw counts and explicit decomposition in causal studies of AI tool adoption. Additionally, the study is based on open-source repositories, which may not fully represent proprietary software development practices.

**Why it matters**  
This research has significant implications for understanding the architectural impacts of AI coding tools, particularly as their adoption becomes more widespread among developers. The findings suggest that while AI tools may increase code volume, they do not necessarily lead to improvements in architectural quality, highlighting the importance of careful evaluation of AI tool effects. This work contributes to the ongoing discourse on software engineering practices in the age of AI, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.13298v1).
