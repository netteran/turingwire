---
title: "Beyond APIs: Probing the Limits of MLLMs in Physical Tool Use"
date: 2026-06-09 12:49:11 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10803v1"
arxiv_id: "2606.10803"
authors: ["Zhixin Ma", "Yutong Zhou", "Yongqi Li", "Chong-Wah Ngo", "Wenjie Li"]
slug: beyond-apis-probing-the-limits-of-mllms-in-physical-tool-use
summary_word_count: 425
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces PhysTool-Bench, a benchmark for evaluating Multimodal Large Language Models' (MLLMs) proficiency in physical tool use."
---

**Problem**  
This work addresses a significant gap in the literature regarding the capabilities of Multimodal Large Language Models (MLLMs) in physical tool use, an essential aspect for their application in embodied AI. While MLLMs have demonstrated proficiency in digital environments, their effectiveness in real-world scenarios involving physical tools remains largely unexamined. The authors present PhysTool-Bench, the first benchmark specifically designed to assess MLLMs' understanding of real-world contexts, tool identification, and planning for tool use. This research is particularly relevant as it is a preprint and has not undergone peer review.

**Method**  
PhysTool-Bench consists of 2,510 queries related to 2,678 real-world physical tools across various domains, including manufacturing, electrical work, agriculture, and healthcare. The evaluation framework focuses on two primary dimensions: (1) the ability to recognize all physical tools present in a given scene, and (2) the capacity to plan the selection and sequence of tool use based on provided instructions and visual context. The authors evaluate 13 leading MLLMs, including Gemini-3.1-Pro, using this benchmark. The models are assessed on their performance in recognizing tools and executing tasks, with a focus on the functional commonsense required for effective tool use.

**Results**  
The results reveal that even the most advanced model, Gemini-3.1-Pro, achieves only 58.7% accuracy in tool identification and completes a mere 21.0% of queries end-to-end. This performance indicates a substantial limitation in the models' ability to perceive tools in realistic scenes and highlights a more significant drop in performance during the planning phase. The findings suggest that MLLMs currently lack the necessary functional commonsense to effectively map perceived tools to task semantics, which is critical for practical applications in embodied AI.

**Limitations**  
The authors acknowledge that the benchmark is limited to the specific domains covered and may not encompass all potential physical tools or scenarios. Additionally, the reliance on visual context may introduce biases based on the quality and diversity of the images used in the queries. The authors do not address the potential impact of model architecture variations or the training data used for the evaluated MLLMs, which could influence performance outcomes.

**Why it matters**  
This research has significant implications for the development of embodied AI systems, as it identifies critical deficiencies in MLLMs' capabilities related to physical tool use. The introduction of PhysTool-Bench provides a foundational framework for future research aimed at enhancing MLLMs' understanding and interaction with the physical world. By highlighting the need for improved functional commonsense in tool use, this work paves the way for advancements in practical applications of MLLMs in robotics and other domains. As published in [arXiv](https://arxiv.org/abs/2606.10803v1).
