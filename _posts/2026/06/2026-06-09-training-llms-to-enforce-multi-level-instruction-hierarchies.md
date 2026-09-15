---
title: "Training LLMs to Enforce Multi-Level Instruction Hierarchies via Gravity-Weighted Direct Preference Optimization"
date: 2026-06-09 13:39:17 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.10860v1"
arxiv_id: "2606.10860"
authors: ["Lena S. Bolliger", "Lena A. J\u00e4ger"]
slug: training-llms-to-enforce-multi-level-instruction-hierarchies
summary_word_count: 431
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel Gravity-Weighted Direct Preference Optimization method to enforce a five-level instruction hierarchy in LLMs, improving adherence to priority relations."
---

**Problem**  
Current large language models (LLMs) lack a robust mechanism to manage conflicting instructions from sources with varying trust levels, leading to vulnerabilities such as prompt injection attacks. Existing training methods typically formalize instruction hierarchies with only three or four levels, treating all violations uniformly and failing to evaluate the full spectrum of pairwise interactions. This paper addresses these limitations by proposing a k-level instruction hierarchy framework, specifically instantiated for k=5, which allows for a more nuanced approach to instruction prioritization. The work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose Gravity-Weighted Direct Preference Optimization (GW-DPO), a novel preference-optimization objective designed to enforce a five-level instruction hierarchy. GW-DPO incorporates a per-sample offset that scales with the structural distance between conflicting instruction levels, utilizing both linear and bilateral schedules. The bilateral schedule weights the severity of conflicts based on the privilege gap and the privilege of the victim level. The model also employs hierarchy-specific delimiter tokens and Instructional Segment Embeddings (ISE) to enhance the training process. The training was conducted on the Llama-3.1-8B-Instruct model, with a focus on optimizing adherence to the defined pairwise priority relations.

**Results**  
The implementation of GW-DPO with the bilateral schedule demonstrated a Pareto improvement over standard Direct Preference Optimization (DPO) and the linear variant. Specifically, the model achieved a significant increase in macro pairwise priority adherence while reducing the over-refusal rate to half that of standard DPO. The results indicate that the five-level hierarchy allows for more effective instruction management compared to the traditional three-level approach, with ablation studies highlighting the role of ISE as a critical calibrator for refusal thresholds.

**Limitations**  
The authors acknowledge that their approach is limited to a five-level hierarchy and may not generalize to more complex or larger hierarchies without further modifications. Additionally, the reliance on specific architectural components, such as delimiter tokens and ISE, may restrict the applicability of GW-DPO to models that can integrate these features. The paper does not address potential scalability issues or the computational overhead introduced by the more complex training regime.

**Why it matters**  
This work has significant implications for the development of more robust LLMs capable of handling complex instruction hierarchies, thereby enhancing their reliability in real-world applications. By formalizing a five-level instruction hierarchy and introducing GW-DPO, the authors provide a framework that can mitigate risks associated with conflicting instructions, which is crucial for deploying LLMs in sensitive environments. This research contributes to the ongoing discourse on improving LLM safety and efficacy, as discussed in related works on instruction tuning and preference optimization, and is available on [arXiv](https://arxiv.org/abs/2606.10860v1).
