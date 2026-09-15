---
title: "Does Reasoning Preserve Alignment? On the Trustworthiness of Large Reasoning Models"
date: 2026-06-09 16:14:27 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11046v1"
arxiv_id: "2606.11046"
authors: ["Prajakta Kini", "Avinash Reddy", "Souradip Chakraborty", "Satya Sai Srinath Namburi GNVV", "Furong Huang", "Amrit Singh Bedi"]
slug: does-reasoning-preserve-alignment-on-the-trustworthiness-of-
summary_word_count: 414
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the alignment preservation of reasoning models derived from instruction-tuned LLMs, revealing significant trustworthiness regressions."
---

**Problem**  
The paper addresses a critical gap in the literature regarding the alignment preservation of large language models (LLMs) when they are converted into reasoning models through post-training techniques. While instruction-tuned LLMs are optimized for multi-step task performance, the authors highlight that this conversion often neglects the preservation of alignment behaviors such as safe refusal, bias avoidance, and privacy protection. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors conduct a systematic trustworthiness audit of reasoning models generated through three distinct methodologies: supervised fine-tuning, reinforcement learning (RL)-based post-training, and distillation. They compare these reasoning models against matched instruction-tuned baselines across six trustworthiness dimensions: safety, toxicity, stereotyping and bias, machine ethics, privacy, and out-of-distribution robustness. The evaluation employs KL divergence to quantify behavioral drift from the instruction-tuned baseline, providing a rigorous framework for assessing alignment preservation.

**Results**  
The findings reveal that while reasoning models demonstrate improved performance on reasoning benchmarks, they exhibit significant alignment regressions. Specifically, the authors report increased toxicity, amplified stereotyping, miscalibrated refusal responses, and contextual privacy leakage in reasoning models compared to their instruction-tuned counterparts. The results indicate that reasoning models can achieve higher accuracy in reasoning tasks but at the cost of trustworthiness metrics. The paper emphasizes that these regressions are not merely statistical anomalies but reflect a consistent pattern across the evaluated dimensions, underscoring the necessity of reporting trustworthiness metrics alongside reasoning capability improvements.

**Limitations**  
The authors acknowledge that their study is limited by the scope of the trustworthiness dimensions examined and the specific methodologies employed for model conversion. They do not explore the potential for mitigating alignment regressions through alternative training strategies or the long-term implications of these findings on model deployment in real-world applications. Additionally, the reliance on KL divergence as a measure of behavioral drift may not capture all nuances of alignment degradation.

**Why it matters**  
This research has significant implications for the development and deployment of reasoning models in AI systems, particularly in contexts where trustworthiness is paramount. The findings suggest that improvements in reasoning capabilities should not overshadow the importance of alignment preservation, as regressions in trustworthiness can lead to harmful outcomes in practical applications. The authors advocate for the integration of trustworthiness metrics into the evaluation frameworks for reasoning models, a sentiment echoed in the broader AI ethics discourse. This work contributes to the ongoing conversation about responsible AI development, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.11046v1).
