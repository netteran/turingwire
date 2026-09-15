---
title: "MyPCBench: A Benchmark for Personally Intelligent Computer-Use Agents"
date: 2026-06-15 14:08:09 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16748v1"
arxiv_id: "2606.16748"
authors: ["Lawrence Keunho Jang", "Andrew Keunwoo Jang", "Jing Yu Koh", "Ruslan Salakhutdinov"]
slug: mypcbench-a-benchmark-for-personally-intelligent-computer-us
summary_word_count: 398
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MyPCBench, a benchmark for evaluating personal intelligent computer-use agents in realistic, personalized environments."
---

**Problem**  
Current benchmarks for computer-use agents predominantly assess models in impersonal settings, failing to account for the complexities of personal digital environments. This gap is particularly pronounced in web tasks, where existing evaluations cannot simulate interactions requiring user-specific data or authentication. The authors identify this shortcoming and propose MyPCBench, a benchmark designed to evaluate personal assistants in a Linux desktop environment populated with simulated real-world applications. This work is a preprint and has not undergone peer review.

**Method**  
MyPCBench consists of a Linux desktop environment featuring 17 simulated web applications, all tailored to a canonical persona, Michael Scott from *The Office*. The benchmark defines 184 tasks inspired by real user requests sourced from the OpenClaw community. The evaluation framework employs a uniform computer and bash tool surface, allowing for consistent interaction across tasks. The authors benchmark six models, including both closed and open-weight architectures, to assess their performance in this personalized context. The specific models tested include Claude Opus 4.6, which emerged as the top performer.

**Results**  
The results indicate that Claude Opus 4.6 achieves a task completion rate of 55.4%, the only model surpassing the 50% threshold. This performance is contrasted against the other models, which demonstrate significantly lower success rates. The authors note that model failures are particularly concentrated in tasks that require coordination across multiple applications and those involving longer interaction sequences, highlighting the challenges of personalization in assistant tasks.

**Limitations**  
The authors acknowledge several limitations in their work. First, the benchmark is confined to a single persona, which may not generalize across diverse user profiles. Additionally, the simulated environment may not fully capture the nuances of real-world interactions, particularly in dynamic web contexts. The reliance on a specific set of applications may also limit the benchmark's applicability to broader use cases. Furthermore, as a preprint, the findings have yet to be validated through peer review, which may affect their robustness.

**Why it matters**  
MyPCBench represents a significant advancement in the evaluation of personal intelligent agents, addressing a critical gap in the literature regarding personalized computing environments. By providing a structured framework for assessing model performance in realistic scenarios, this benchmark can inform future research and development of more effective personal assistants. The release of the environment, task set, and agent harness at https://mypcbench.com facilitates further exploration and experimentation in this domain, paving the way for improved user-centric AI applications, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.16748v1).
