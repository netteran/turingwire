---
title: "Reassessing High-Performing LLMs on Polish Medical Exams: True Competence or Bias-Driven Performance?"
date: 2026-06-10 15:52:24 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12250v1"
arxiv_id: "2606.12250"
authors: ["Antoni Lasik", "Jakub Pokrywka", "\u0141ukasz Grzybowski", "Jeremi Ignacy Kaczmarek", "Gabriela Korza\u0144ska", "Janusz \u015awieczkowski-Feiz"]
slug: reassessing-high-performing-llms-on-polish-medical-exams-tru
summary_word_count: 401
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper critiques the evaluation of LLMs in medical contexts, introducing a robust benchmark that reveals significant performance discrepancies in clinical reasoning."
---

**Problem**  
The paper addresses the gap in the evaluation of large language models (LLMs) in medical applications, specifically highlighting the limitations of traditional multiple-choice question answering (MCQA) methods. The authors argue that existing evaluations may overestimate LLMs' clinical competencies due to inherent biases and guessing strategies. This work is particularly relevant as it presents a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose an expanded benchmark based on Polish medical exams, which includes over 15,000 questions across two new domains and incorporates four structural modifications aimed at mitigating MCQA-specific artifacts. These modifications are designed to enhance the assessment of reasoning capabilities rather than mere recall or guessing. The evaluation involved 21 different LLMs, including the notable Qwen3.5-122B, which was subjected to both English and Polish exam formats. The training compute and specific architectures of the evaluated models are not disclosed, but the focus is on the comparative performance across the newly established benchmark.

**Results**  
The results indicate a significant drop in performance for the best-performing model, Qwen3.5-122B, which experienced a decrease of 28.4 percentage points on English exams and 31 percentage points on Polish exams when evaluated under the new benchmark conditions. This stark contrast underscores the impact of evaluation design on perceived model competence. The authors also report low evidence of data contamination, suggesting that the observed performance drops are not artifacts of the dataset but rather indicative of the models' true capabilities.

**Limitations**  
The authors acknowledge that their benchmark, while comprehensive, may still have limitations in terms of domain coverage and the representativeness of the questions. They do not address potential biases in the construction of the benchmark itself or the generalizability of the results across different medical contexts or languages. Additionally, the reliance on LLMs that may not have been specifically fine-tuned for medical applications could skew results.

**Why it matters**  
This work has significant implications for the evaluation of AI systems in healthcare, emphasizing the need for more rigorous and realistic assessment frameworks that accurately reflect clinical reasoning capabilities. The introduction of a more challenging benchmark could lead to improved training and evaluation practices for LLMs in medical contexts, ultimately enhancing their reliability in real-world applications. This is crucial as the integration of AI in healthcare continues to expand, necessitating robust validation methods to ensure patient safety and effective clinical decision-making. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.12250v1).
