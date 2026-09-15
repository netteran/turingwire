---
title: "Understanding Scam Trends and Rail Paths from Reddit Self-Disclosure Narratives"
date: 2026-06-15 15:50:07 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16874v1"
arxiv_id: "2606.16874"
authors: ["Yangjun Zhang", "Mirko Bottarelli", "Mark Hooper", "Carsten Maple"]
slug: understanding-scam-trends-and-rail-paths-from-reddit-self-di
summary_word_count: 427
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a dataset and analysis of scam trends and rail paths from Reddit self-disclosure narratives, revealing multi-rail scam processes."
---

**Problem**  
This work addresses the lack of longitudinal analysis of online scam behaviors, specifically the temporal dynamics of scam types and their interrelations, which have not been comprehensively studied in existing literature. Prior research has focused on isolated characteristics of scams without tracking trends over time or analyzing the relationships between different scam rails. Additionally, there is a scarcity of open-source datasets with sufficient annotations covering various scam types, which hampers the ability to conduct thorough analyses. This paper is a preprint and has not undergone peer review.

**Method**  
The authors constructed a dataset from 21,304 posts sourced from scam-related subreddits, focusing on posts that included at least one of the following rails: identity, communication, platform, and payment. They employed heuristic annotation to identify these rails for trend analysis. For scam path analysis, they labeled 1,800 posts containing explicit or recoverable scam chains using a large language model (LLM)-assisted method, which was subsequently validated through human annotation. To further understand community dynamics, a topic modeling approach was applied to the comments of the posts, allowing for an analysis of community support behaviors over time.

**Results**  
The analysis revealed that scam processes are predominantly multi-rail, indicating that different scam types utilize various combinations of rails. The study found that over the years, certain scam types and rail components became more prevalent, with systematic variations in path complexity across different scam types. Notably, the community support behaviors on Reddit have evolved to become more detailed over time. The findings suggest a significant increase in the complexity and interconnectivity of scams, which could inform future synthetic data generation for scam chain simulations and AI-related scam risk assessments.

**Limitations**  
The authors acknowledge that their findings may not generalize to other platforms beyond Reddit, which could limit the applicability of their insights. Additionally, the reliance on self-disclosure narratives may introduce biases, as users may not fully disclose their experiences or may present them in a skewed manner. The dataset is also limited to the years 2023 to 2025, which may not capture longer-term trends or variations in scam behaviors.

**Why it matters**  
This research provides a foundational dataset and analytical framework for understanding the evolving landscape of online scams, which is critical for developing effective mitigation strategies. The insights into multi-rail scam processes and community support behaviors can inform the design of AI systems aimed at scam detection and prevention. The work supports the need for synthetic scam chain data simulation and enhances AI-related scam risk assessments, contributing to the broader field of cybersecurity and online safety, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.16874v1).
