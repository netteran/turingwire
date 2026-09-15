---
title: "Exploration Structure in LLM Agents for Multi-File Change Localization"
date: 2026-06-10 11:54:14 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11976v1"
arxiv_id: "2606.11976"
authors: ["Akeela Darryl Fattha", "Kia Ying Chua", "Lingxiao Jiang", "Laura Wynter"]
slug: exploration-structure-in-llm-agents-for-multi-file-change-lo
summary_word_count: 421
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a non-linear, domain-scoped exploration method for LLM agents to improve multi-file change localization in software engineering."
---

**Problem**  
This work addresses the limitations of existing LLM-based agents that utilize linear exploration strategies for file localization in software repositories. The authors argue that such linear approaches are inadequate for changes that span multiple subsystems, leading to inefficiencies in resolving software issues. The paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a non-linear, domain-scoped parallel exploration method for LLM agents, specifically designed for multi-file change localization. They utilize a persistent-session evaluation framework anchored at a single base commit, focusing on the Ansible project as a case study. The method involves spawning domain-specific agents that can traverse the repository in parallel, contrasting this with a baseline LLM that lacks direct repository access, a Recursive Language Model (RLM) with a persistent Python REPL, and an external CLI baseline using Codex 5.5 High. The evaluation leverages the SWE Bench Pro benchmark, with an expanded dataset that includes recent pull requests from 2025 and 2026.

**Results**  
The proposed domain-scoped parallel agent approach significantly outperforms the baseline models. Specifically, it achieves the highest micro F1 score among Haiku-class models, surpassing other configurations by a substantial margin. On the expanded benchmark, the domain-agent method ranks second, only behind the larger Codex 5.5 High model. In contrast, a larger Sonnet plain LLM baseline achieves higher precision by predicting fewer files, resulting in a higher micro F1 score but at the cost of lower recall. The authors also report that naive file system access can negatively impact localization accuracy due to over-prediction of test files, and that forced multi-agent consultation does not yield measurable benefits while increasing token costs.

**Limitations**  
The authors acknowledge several limitations in their approach. Notably, they highlight that documentation evolution remains an unresolved latent dependency that affects localization accuracy. Additionally, they note that naive file system access can lead to degraded performance due to excessive test-file predictions. The study also indicates that the forced consultation of multiple agents does not improve outcomes and incurs higher computational costs, which may limit practical applicability.

**Why it matters**  
This research has significant implications for the development of more efficient LLM-based tools in software engineering, particularly in the context of multi-file change localization. By demonstrating the effectiveness of non-linear, domain-scoped exploration, the authors provide a framework that could enhance the capabilities of AI agents in navigating complex software repositories. This work contributes to the ongoing discourse on improving LLM performance in practical applications, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.11976v1).
