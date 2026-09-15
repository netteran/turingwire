---
title: "Natural-Language Temporal Grounding in Hour-Long Videos is a Search Problem: A Benchmark and Empirical Decomposition"
date: 2026-06-10 16:35:04 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12300v1"
arxiv_id: "2606.12300"
authors: ["Sukmin Seo", "Geewook Kim"]
slug: natural-language-temporal-grounding-in-hour-long-videos-is-a
summary_word_count: 406
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ExtremeWhenBench, a benchmark for temporal grounding in hour-long videos, highlighting search limitations in existing Video-LLMs."
---

**Problem**  
The paper addresses the gap in temporal grounding research for hour-long videos, a domain that has been largely overlooked in favor of short video contexts. The authors argue that existing Video-LLMs (Video Large Language Models) are constrained not by their ability to recognize events but by their capacity to effectively search through extensive video content. This work is particularly relevant as it presents a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose ExtremeWhenBench, the first benchmark specifically designed for hour-scale temporal grounding, comprising 2,273 queries across 194 videos with an average duration of 75.7 minutes and a maximum of 9 hours. The benchmark features an open-form query distribution, allowing for a diverse range of natural-language queries. The authors conduct empirical evaluations comparing various Video-LLMs against a frame-level retrieval baseline. They introduce a failure taxonomy that categorizes the reasons for the failures of Video-LLMs, attributing 85% of these failures to search inefficiencies. Additionally, they propose a hybrid approach that combines retrieval and grounding, which demonstrates a significant performance improvement, achieving a 6.7x recovery over the monolithic Video-LLM.

**Results**  
The empirical results reveal that all tested Video-LLMs fail to perform adequately on the ExtremeWhenBench, while the frame-level retrieval baseline outperforms them. The hybrid retrieve-then-ground method shows a substantial improvement, indicating that the search component is a critical bottleneck in the temporal grounding task. The paper does not provide specific numerical performance metrics against named baselines, but the qualitative analysis suggests a clear delineation in performance between the Video-LLMs and the retrieval-based methods.

**Limitations**  
The authors acknowledge that their findings are limited by the scope of the benchmark, which may not encompass all possible query types or video content variations. They also note that the reliance on a hybrid approach may introduce additional complexity in real-world applications. Furthermore, the paper does not explore the scalability of the proposed methods beyond the benchmark's constraints, nor does it address potential biases in the query distribution or video selection.

**Why it matters**  
This work has significant implications for the development of more effective temporal grounding systems in long-form video contexts. By highlighting the search limitations of current Video-LLMs, it encourages future research to focus on improving search algorithms and hybrid models that can better handle the complexities of hour-scale video data. The introduction of ExtremeWhenBench provides a valuable resource for benchmarking and advancing the state of the art in this area, as published in [arXiv](https://arxiv.org/abs/2606.12300v1).
