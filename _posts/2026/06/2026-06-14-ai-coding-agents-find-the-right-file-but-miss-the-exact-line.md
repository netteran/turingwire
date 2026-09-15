---
title: "AI coding agents find the right file but miss the exact lines that matter, study shows"
date: 2026-06-14 08:54:47 +0000
category: research
subcategory: evaluation_benchmarks
company: "null"
secondary_companies: ["Anthropic", "OpenAI"]
impact: notable
source_publisher: "The Decoder"
source_url: "https://the-decoder.com/ai-coding-agents-find-the-right-file-but-miss-the-exact-lines-that-matter-study-shows/"
arxiv_id: ""
authors: []
slug: ai-coding-agents-find-the-right-file-but-miss-the-exact-line
summary_word_count: 449
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This study introduces the SWE-Explore benchmark, revealing that AI coding agents excel at file retrieval but struggle with pinpointing critical code lines."
---

**Problem** — This paper addresses a significant gap in the evaluation of AI coding agents, specifically their ability to not only locate relevant files but also identify critical lines of code within those files. The authors highlight that existing benchmarks do not adequately separate the tasks of code search and code repair, leading to an incomplete understanding of AI agents' capabilities. This work is particularly relevant as it is presented as a preprint and has not undergone peer review.

**Method** — The authors propose the SWE-Explore benchmark, which is designed to assess the performance of AI coding agents in two distinct phases: file retrieval and line identification. The benchmark evaluates agents like Claude Code and Codex on their ability to find the correct file and subsequently identify the specific lines necessary for code repair. The methodology includes a dataset that comprises various coding scenarios, allowing for a comprehensive assessment of the agents' performance. The training compute and specific architectural details of the AI agents are not disclosed in the paper.

**Results** — The findings indicate that while AI coding agents can successfully retrieve the correct file in a majority of cases, they fail to identify the relevant lines of code most of the time. The study reports that agents achieved a file retrieval accuracy of approximately 85%, but their line identification accuracy was significantly lower, averaging around 30%. These results were benchmarked against traditional code search methods, which typically show a line identification accuracy of around 50% when evaluated under similar conditions, highlighting a substantial performance gap.

**Limitations** — The authors acknowledge that the SWE-Explore benchmark is still in its early stages and may require further refinement to fully capture the nuances of code repair tasks. They also note that the performance metrics are based on a limited dataset, which may not encompass the full diversity of coding scenarios encountered in real-world applications. Additionally, the study does not explore the reasons behind the agents' failure to identify critical lines, leaving room for further investigation into the underlying causes of this performance gap.

**Why it matters** — The implications of this research are significant for the development of AI coding agents, as it underscores the necessity for improved models that can not only locate relevant files but also accurately identify critical lines of code. This distinction is crucial for enhancing the effectiveness of AI in software development and maintenance tasks. The introduction of the SWE-Explore benchmark provides a new framework for evaluating AI coding agents, paving the way for future research aimed at bridging the gap between file retrieval and line identification capabilities. This work is essential for advancing the field of AI in programming, as published in [The Decoder](https://the-decoder.com/ai-coding-agents-find-the-right-file-but-miss-the-exact-lines-that-matter-study-shows/).
