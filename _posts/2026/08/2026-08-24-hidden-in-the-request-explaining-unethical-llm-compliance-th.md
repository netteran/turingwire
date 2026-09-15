---
title: "Hidden in the Request: Explaining Unethical LLM Compliance through Token Relevance"
date: 2026-08-24 13:52:05 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2608.23264v1"
arxiv_id: "2608.23264"
authors: ["Or Biton", "Tomer Krichli", "Itai Allouche", "Joseph Keshet"]
slug: hidden-in-the-request-explaining-unethical-llm-compliance-th
summary_word_count: 101
classification_confidence: 0.80
source_truncated: false
layout: post
quality: high
description: "This paper investigates ethical compliance failures in LLMs, introducing a probing methodology and LRP-guided decoding to enhance safety."
---

**Problem** — This preprint addresses the gap in understanding why Large Language Models (LLMs) sometimes fail to exhibit ethical behavior, particularly in scenarios where their objectives of helpfulness and harmlessness conflict. The authors systematically explore these alignment failures, which have significant implications for the deployment of LLMs in sensitive applications.  

**Method** — The authors propose a probing methodology that evaluates LLM responses to unethical scenarios presented in three modalities: objective classification tasks, subjective first-person statements, and direct requests for assistance. They employ Layer-wise Relevance Propagation (LRP) to analyze the models' token relevance, revealing an attribution bias where benign framing tokens (e.g.,
