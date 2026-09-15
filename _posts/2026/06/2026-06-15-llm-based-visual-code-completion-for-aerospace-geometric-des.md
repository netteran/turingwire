---
title: "LLM-based Visual Code Completion for Aerospace Geometric Design"
date: 2026-06-15 14:46:57 +0000
category: research
subcategory: agents_robotics
company: "Microsoft"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.16806v1"
arxiv_id: "2606.16806"
authors: ["Hau Kit Yong", "Robert Marsh", "Edmar A. Silva", "Andr\u00e1s S\u00f3bester", "Stuart E. Middleton"]
slug: llm-based-visual-code-completion-for-aerospace-geometric-des
summary_word_count: 391
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a LLM-based visual programming copilot for aerospace geometric design, addressing industry-specific needs and limitations."
---

**Problem**  
The aerospace industry lacks LLM-based geometric design copilot systems, primarily due to safety and explainability concerns. This paper addresses this gap by presenting a novel application tailored for aerospace engineering design tasks, leveraging recent advancements in Large Language Models (LLMs) and Vision Language Models (VLMs). The work is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a visual programming copilot application utilizing a visual programming variant of the ReAct methodology in conjunction with GPT 5.4. The copilot is integrated into a new Grasshopper plugin library named Wingbuilder, which includes custom components specifically designed for aerospace geometry abstraction. Additionally, the authors introduce the Aerospace Visual Programming Dataset (AVPD), comprising 18 tasks of varying difficulty levels, each crafted by aerospace experts, along with their corresponding ground truth solutions. The evaluation involved a user trial with two experienced aerospace engineers from a major aircraft manufacturing company, focusing on the copilot's effectiveness in generating design suggestions.

**Results**  
The user trial indicated that the copilot's visual programming ReAct methodology successfully generated helpful suggestions, with participants expressing a willingness to use the tool in the future. However, the inference times for the ReAct methodology were noted as a limitation, particularly for complex tasks where the time spent waiting for suggestions was a critical factor. While specific quantitative metrics were not disclosed, the qualitative feedback from participants highlighted the tool's potential utility in aerospace design workflows.

**Limitations**  
The authors acknowledge the slow inference times of the ReAct methodology as a significant limitation, particularly for more complex tasks that require timely suggestions. Additionally, the study's small sample size (only two engineers) may limit the generalizability of the findings. The reliance on a preprint status also suggests that the results should be interpreted with caution until further validation through peer review is conducted.

**Why it matters**  
This work has significant implications for the integration of AI tools in aerospace engineering, particularly in enhancing design workflows through visual programming. The introduction of the AVPD and the Wingbuilder plugin could facilitate further research and development in this domain, potentially leading to broader adoption of LLM-based systems in safety-critical industries. The findings contribute to the ongoing discourse on the applicability of LLMs in specialized fields, as discussed in related literature on AI in engineering contexts, such as in [arXiv](https://arxiv.org/abs/2606.16806v1).
