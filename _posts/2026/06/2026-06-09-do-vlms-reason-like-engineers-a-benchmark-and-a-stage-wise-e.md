---
title: "Do VLMs Reason Like Engineers? A Benchmark and a Stage-wise Evaluation"
date: 2026-06-09 13:20:15 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10833v1"
arxiv_id: "2606.10833"
authors: ["Syed Wasiq", "Syed Mohamad Tawseeq", "Yashwant Pravinrao Bangde", "Debaditya Roy"]
slug: do-vlms-reason-like-engineers-a-benchmark-and-a-stage-wise-e
summary_word_count: 395
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces EngVQA, a benchmark for evaluating engineering reasoning in Vision-Language Models, revealing significant limitations in current capabilities."
---

**Problem**  
This work addresses the gap in evaluating Vision-Language Models (VLMs) specifically for engineering reasoning, a domain that requires interpreting technical diagrams, applying governing physical principles, and executing multi-step reasoning. While existing benchmarks focus on general multimodal reasoning, they inadequately assess the intermediate reasoning processes crucial for engineering tasks. The authors note that this is a preprint and unreviewed work, highlighting the need for a dedicated framework to evaluate VLMs in engineering contexts.

**Method**  
The authors propose EngVQA, a multimodal benchmark comprising 696 problems across five engineering subjects. They develop an 8-stage automatic evaluation framework that assesses VLM-generated solutions at each stage of the reasoning process. This framework allows for a detailed analysis of reasoning failures, moving beyond mere final answer evaluation. The authors benchmark several state-of-the-art VLMs, both open and closed source, using this framework to quantify their engineering reasoning capabilities. The evaluation process is designed to yield fine-grained insights into the models' performance, facilitating a better understanding of their limitations.

**Results**  
The evaluation reveals substantial deficiencies in the engineering reasoning capabilities of the tested VLMs. Human evaluations corroborate the automated framework, achieving a Pearson correlation of 0.975 and a mean absolute error of 0.67 on a 10-point grading scale. Specific performance metrics against named baselines are not disclosed in the abstract, but the authors emphasize that the existing models struggle significantly with the nuanced requirements of engineering reasoning tasks, as evidenced by their performance on the EngVQA benchmark.

**Limitations**  
The authors acknowledge that their framework may not capture all aspects of engineering reasoning, particularly in complex, real-world scenarios. They also note that the benchmark is limited to five engineering subjects, which may not encompass the full breadth of engineering disciplines. Additionally, the reliance on automated evaluation may overlook certain qualitative aspects of reasoning that human evaluators could better assess. The paper does not address potential biases in the dataset or the generalizability of the findings across different engineering contexts.

**Why it matters**  
This work underscores the critical need for process-oriented evaluation in assessing multimodal reasoning systems, particularly in engineering applications where reasoning failures can lead to physically invalid solutions. The introduction of EngVQA provides a structured approach to evaluate VLMs, paving the way for future research to enhance their reasoning capabilities. The findings highlight the importance of developing AI systems that can reliably assist in engineering education and decision-making, as published in [arXiv](https://arxiv.org/abs/2606.10833v1).
