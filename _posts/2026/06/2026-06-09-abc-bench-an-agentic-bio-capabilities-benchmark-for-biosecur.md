---
title: "ABC-Bench: An Agentic Bio-Capabilities Benchmark for Biosecurity"
date: 2026-06-09 17:35:37 +0000
category: research
subcategory: agents_robotics
company: "OpenAI"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11150v1"
arxiv_id: "2606.11150"
authors: ["Andrew Bo Liu", "Samira Nedungadi", "Bryce Cai", "Alex Kleinman", "Harmon Bhasin", "Seth Donoughe"]
slug: abc-bench-an-agentic-bio-capabilities-benchmark-for-biosecur
summary_word_count: 399
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper introduces ABC-Bench, a benchmark for evaluating LLM capabilities in biosecurity tasks, highlighting both performance and risks."
---

**Problem**  
The rapid advancement of large language models (LLMs) in biological research raises concerns about biosecurity, particularly as these models can perform tasks traditionally requiring human expertise. This paper addresses the gap in evaluating LLMs' capabilities in biosecurity-relevant tasks, presenting the Agentic Bio-Capabilities Benchmark (ABC-Bench) to systematically assess these emerging risks. The work is a preprint and has not undergone peer review, indicating that findings should be interpreted with caution.

**Method**  
ABC-Bench comprises a suite of tasks designed to evaluate LLM agents on both benign and dual-use applications in biology. The benchmark includes tasks such as writing code for liquid handling robots, designing DNA fragments for in vitro assembly, and evading DNA synthesis screening protocols. The authors employed various LLMs, including OpenAI's o4-mini-high, to perform these tasks. The evaluation metrics focused on the agents' ability to synthesize biological knowledge and execute software tasks effectively. The training compute and specific architectures of the LLMs were not disclosed, but the tasks required a combination of biological knowledge and programming skills.

**Results**  
The results indicate that all tested LLM agents outperformed a median expert human baseline across all three tasks. Notably, the agents excelled in tasks that leveraged published knowledge and established protocols, achieving high accuracy in generating scripts for liquid handling robots. In contrast, performance was weaker on tasks necessitating novel bioinformatics reasoning, suggesting limitations in creative problem-solving. In three wet-lab validation experiments, the o4-mini-high model produced scripts that successfully assembled DNA sequences on an OpenTrons liquid handling robot, demonstrating practical applicability.

**Limitations**  
The authors acknowledge that while LLMs performed well on established tasks, their limitations in novel reasoning and creative problem-solving could pose risks in biosecurity contexts. Additionally, the benchmark does not account for the full spectrum of biosecurity threats, particularly those arising from misuse of LLM capabilities. The study's reliance on specific LLMs may also limit generalizability to other models or architectures not tested in this benchmark.

**Why it matters**  
The introduction of ABC-Bench is significant for both the AI and biosecurity communities, as it provides a structured framework for assessing the capabilities and risks associated with LLMs in biological applications. This benchmark can inform future research on the safe deployment of AI in sensitive domains, ensuring that advancements in AI do not inadvertently exacerbate biosecurity threats. The implications of this work are critical for guiding policy and regulatory frameworks in AI applications in biology, as published in [arXiv](https://arxiv.org/abs/2606.11150v1).
