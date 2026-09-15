---
title: "EpiBench: Verifiable Evaluation of AI Agents on Epigenomics Analysis"
date: 2026-06-11 17:20:29 +0000
category: research
subcategory: evaluation_benchmarks
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13602v1"
arxiv_id: "2606.13602"
authors: ["Harihara Muralidharan", "Reema Baskar", "Soo Hee Lee", "Tim Proctor", "Kenny Workman"]
slug: epibench-verifiable-evaluation-of-ai-agents-on-epigenomics-a
summary_word_count: 423
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents EpiBench, a benchmark for evaluating AI agents' performance in epigenomics analysis, revealing significant limitations in current models."
---

**Problem**  
This work addresses the lack of verifiable benchmarks for evaluating AI agents in the context of epigenomics analysis, specifically focusing on short-horizon decision-making tasks. The authors highlight that existing literature does not provide a structured framework to assess the capability of AI systems in making scientifically sound decisions based on realistic workflow states. This paper is a preprint and has not undergone peer review.

**Method**  
EpiBench comprises 106 evaluations across various epigenomic workflows, including CUT&Tag/CUT&RUN, ATAC-seq, ChIP-seq, and DNA methylation. The benchmark evaluates AI agents based on their ability to return deterministically gradable answers from realistic scenarios. The authors tested 16 model-harness pairs across 5,088 valid trajectories. The evaluation metrics focus on the percentage of successful attempts by each AI agent, with a specific emphasis on the agents' ability to navigate complex scientific tasks that require domain-specific knowledge. The models evaluated include GPT-5.5, GPT-5.4, Claude Opus 4.8 Max, and OpenAI Codex, with the performance measured against a defined set of tasks.

**Results**  
The results indicate that no AI system successfully passed a majority of the evaluation attempts. The leading model, GPT-5.5 / Pi, achieved a success rate of 45.0% (143 out of 318 attempts), with a 95% confidence interval (CI) of 36.3–53.7. Following closely, GPT-5.5 / OpenAI Codex reached 39.9% (127 out of 318 attempts; 95% CI, 31.6–48.3). Claude Opus 4.8 Max / Pi and GPT-5.4 / Pi both recorded a success rate of 39.0% (124 out of 318 attempts; 95% CI, 30.2–47.8 and 31.0–47.0, respectively). The performance varied significantly across different assay types, with many failed attempts still containing elements of the correct answer, indicating that while agents could identify relevant files and compute intermediate results, they struggled with tasks requiring deeper scientific judgment.

**Limitations**  
The authors note that the benchmark's reliance on specific workflows may limit its generalizability to other areas of bioinformatics. Additionally, the models' inability to pass a majority of attempts suggests a significant gap in their understanding of domain-specific knowledge. The authors do not address potential biases in the training data of the evaluated models, which could affect their performance in real-world applications.

**Why it matters**  
EpiBench provides a critical framework for assessing AI agents in epigenomics, highlighting the current limitations of state-of-the-art models in making scientifically valid decisions. This work underscores the need for improved AI systems that can integrate domain-specific knowledge into their decision-making processes, which is essential for advancing research in epigenomics and related fields. The findings are significant for future research and development in AI applications in biology, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.13602v1).
