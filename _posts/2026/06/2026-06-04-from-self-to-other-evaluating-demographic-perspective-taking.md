---
title: "From Self to Other: Evaluating Demographic Perspective-Taking in LLM Hate Speech Annotation"
date: 2026-06-04 15:09:58 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06266v1"
arxiv_id: "2606.06266"
authors: ["Paloma Piot", "Javier Parapar"]
slug: from-self-to-other-evaluating-demographic-perspective-taking
summary_word_count: 416
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper evaluates the effectiveness of persona-conditioned LLMs in simulating demographic perspectives for hate speech annotation."
---

**Problem**  
Hate speech detection is subjective, with significant variability in interpretation across demographic groups. Existing literature lacks comprehensive evaluations of how well persona-conditioned Large Language Models (LLMs) can simulate these diverse perspectives for scalable annotation. This work addresses the gap by assessing whether these models can reflect inter-group disagreement, in-group sensitivity, and vicarious prediction of reactions from different demographic identities. The paper is a preprint and has not undergone peer review.

**Method**  
The authors investigate three dimensions of social judgment using persona-conditioned LLMs: (1) inter-group disagreement, (2) in-group sensitivity, and (3) vicarious prediction. They employ various models, including Llama 3.1, and utilize a series of prompts designed to elicit demographic-specific responses. The evaluation involves comparing model outputs against human annotations to measure agreement across demographic axes. The training compute and specific datasets used for fine-tuning the models are not disclosed, but the focus is on the effectiveness of minimal identity prompts in eliciting nuanced responses.

**Results**  
The findings indicate that no single model consistently captures all three dimensions of demographic perspective-taking. Performance varies significantly across models, with Llama 3.1 demonstrating the highest cross-group agreement in most demographic axes when using vicarious prompting. Specifically, it approximates human disagreement patterns more closely than other configurations. The results suggest that while some models can simulate demographic perspectives, they do not do so reliably without careful prompting. The paper provides quantitative metrics, although specific numbers and baseline comparisons are not detailed in the abstract.

**Limitations**  
The authors acknowledge that the models do not consistently reflect human-like disagreement and that performance is highly model-dependent. They also note that minimal identity prompts may not be sufficient to elicit the desired sensitivity and prediction capabilities. An additional limitation is the lack of a comprehensive dataset that includes a wide range of demographic identities, which could affect the generalizability of the findings. The study does not explore the implications of model biases or the potential for harmful outputs in real-world applications.

**Why it matters**  
This research has significant implications for the development of automated hate speech detection systems that require nuanced understanding of demographic perspectives. By highlighting the limitations of current LLMs in simulating human-like judgments, it underscores the need for more sophisticated models or methodologies that can better capture the complexities of social perception. The findings suggest that while persona-conditioned LLMs like Llama 3.1 show promise, further refinement is necessary for reliable hate speech annotation aligned with human judgments, as discussed in the context of ongoing research in the field (available on [arXiv](https://arxiv.org/abs/2606.06266v1)).
