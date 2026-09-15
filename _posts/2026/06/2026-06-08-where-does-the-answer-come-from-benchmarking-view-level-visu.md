---
title: "Where Does the Answer Come From? Benchmarking View-Level Visual Evidence Identification in Multi-View MLLMs for Autonomous Driving"
date: 2026-06-08 15:39:06 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09644v1"
arxiv_id: "2606.09644"
authors: ["Yimu Wang", "Yee Man Choi", "Barry Zhang", "Mozhgan Nasr Azadani", "Sean Sedwards", "Krzysztof Czarnecki"]
slug: where-does-the-answer-come-from-benchmarking-view-level-visu
summary_word_count: 450
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a benchmark for evaluating visual evidence identification in multi-view MLLMs, crucial for accurate autonomous driving applications."
---

**Problem**  
Current multimodal large language models (MLLMs) excel in visual reasoning tasks but lack mechanisms to verify whether their answers are grounded in the correct visual evidence. This issue is particularly critical in autonomous driving scenarios, where a model may generate a plausible answer based on incorrect camera views. The authors address this gap by proposing a novel benchmark specifically designed for multi-view visual question answering (VQA) that assesses the model's ability to identify the correct source of visual evidence. This work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The authors introduce a multi-view VQA benchmark that utilizes six synchronized camera views from the NuScenes dataset. The benchmark comprises 122 conflict-centric question-answer pairs derived from 73 distinct driving scenes, focusing on complex reasoning tasks such as causality, counterfactual reasoning, and intent prediction. An automatic conflict-mining pipeline generates view labels, which are subsequently verified by human annotators. The evaluation framework includes three distinct settings: (1) camera-view selection, where the model identifies the correct view; (2) oracle QA, where the model answers questions based on a predetermined correct view; and (3) joint prediction, where the model simultaneously selects a view and provides an answer. The evaluation metrics include exact match for structured predictions and a language model judge for free-form responses, allowing for a comprehensive assessment of both answer correctness and grounding accuracy.

**Results**  
The benchmark reveals significant grounding failures that traditional answer-only evaluations overlook. The authors report that models exhibit a notable discrepancy between answer accuracy and visual evidence identification, highlighting the importance of this dual evaluation approach. While specific performance metrics against baseline models are not detailed in the abstract, the emphasis on grounding failures suggests that existing models may achieve high answer accuracy while failing to utilize the correct visual context.

**Limitations**  
The authors acknowledge that the benchmark is limited to the specific scenarios and question types present in the NuScenes dataset, which may not generalize to all autonomous driving contexts. Additionally, the reliance on human verification for view labels introduces potential biases and inconsistencies. The paper does not address the computational resources required for training models on this benchmark, which could impact accessibility for some researchers.

**Why it matters**  
This work is significant as it provides a structured approach to evaluate the grounding of answers in visual evidence, a critical aspect for the deployment of MLLMs in safety-sensitive applications like autonomous driving. By highlighting the disconnect between answer correctness and visual evidence identification, this benchmark encourages the development of more robust models that can reliably interpret multi-view data. The implications of this research extend to improving the interpretability and reliability of AI systems in real-world applications, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.09644v1).
