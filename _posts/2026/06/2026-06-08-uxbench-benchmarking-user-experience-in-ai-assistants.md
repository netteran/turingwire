---
title: "UXBench: Benchmarking User Experience in AI Assistants"
date: 2026-06-08 14:44:01 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: ["Alibaba"]
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09570v1"
arxiv_id: "2606.09570"
authors: ["Mengze Hong", "Xia Zeng", "Zeyang Lei", "Sheng Wang", "Chen Jason Zhang", "Di Jiang"]
slug: uxbench-benchmarking-user-experience-in-ai-assistants
summary_word_count: 414
classification_confidence: 0.80
source_truncated: false
layout: post
description: "UXBench introduces a user-centric benchmark for evaluating AI assistants, focusing on user experience through real feedback signals and extensive model analysis."
---

**Problem**  
This paper addresses the gap in evaluating user experience (UX) in AI assistants, which has been largely overlooked in favor of general model performance metrics. The authors highlight the need for a benchmark that incorporates real user feedback to assess preference alignment and dialogue generation capabilities. As a preprint, this work is unreviewed and aims to establish a foundational framework for UX evaluation in AI systems.

**Method**  
The authors propose UXBench, a benchmark comprising three interconnected tasks: UX Judge, UX Eval, and UX Recovery. The dataset includes 7,400 test instances derived from over 70,000 interaction logs of a mainstream Chinese AI assistant, ensuring a realistic representation of user distributions across 8 scenarios and 83 domains. The tasks are designed to evaluate how well models can predict user feedback and recover from dialogue failures. The authors employ 26 state-of-the-art language models, analyzing their performance in predicting user satisfaction and engagement. A reward model is trained using in-the-wild feedback signals, demonstrating that user feedback prediction is a learnable capability. The training compute details are not disclosed, but the extensive dataset and model evaluations suggest significant computational resources were utilized.

**Results**  
The experiments reveal that the reward model achieves well-calibrated accuracy in predicting user feedback, outperforming baseline models in user experience metrics. Specific performance metrics are not detailed in the abstract, but the authors indicate that the models exhibit substantial performance gaps in understanding user preferences, suggesting that improvements in model capability do not directly translate to enhanced user experience. The analysis also uncovers systematic biases in LLM-as-a-judge evaluation protocols, indicating that response strategies significantly impact user satisfaction.

**Limitations**  
The authors acknowledge that the benchmark is limited to a specific AI assistant and may not generalize across different platforms or languages. Additionally, the reliance on historical interaction logs may introduce biases reflective of past user behavior rather than current preferences. The paper does not address potential ethical implications of using user data for model training or the scalability of the benchmark across diverse AI systems.

**Why it matters**  
UXBench establishes a new paradigm for evaluating AI assistants by prioritizing user experience, which is critical for the adoption and success of these technologies. The findings underscore the importance of integrating user feedback into model training and evaluation processes, paving the way for more user-centric AI development. This work calls for further research into tailored UX optimization strategies, contributing to a user-centric scaling law that could significantly influence the future of AI assistants, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.09570v1).
