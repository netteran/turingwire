---
title: "PsychoSafe: Eliciting Psychologically-Informed Refusals in Large Language Models"
date: 2026-06-08 16:19:18 +0000
category: research
subcategory: alignment_safety
company: "null"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09697v1"
arxiv_id: "2606.09697"
authors: ["Gianluca Barmina", "Federico Torrielli", "Sven Harms", "Jacob Nielsen", "Felix M\u00e4chtle", "Stine Lyngs\u00f8 Beltoft"]
slug: psychosafe-eliciting-psychologically-informed-refusals-in-la
summary_word_count: 389
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces PsychoSafe, a framework for eliciting psychologically-informed refusals in LLMs, enhancing refusal quality while maintaining task performance."
---

**Problem**  
This work addresses the gap in the capability of large language models (LLMs) to handle requests that necessitate refusals, particularly in high-risk scenarios involving crisis or coercion. Traditional refusal mechanisms often prioritize blunt non-compliance, which can fail to support the underlying needs of the requester. The authors highlight the lack of psychologically-informed strategies in existing LLM frameworks, which can lead to harmful interactions. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose PsychoSafe, a refusal framework that integrates evidence-based psychological intervention strategies into LLM responses. They constructed a dataset comprising 8,019 prompt-response pairs across five risk domains, focusing on scenarios where refusals are critical. The framework employs prompting techniques and parameter-efficient fine-tuning on the Qwen 3.5 model, which has 27 billion parameters. The training involved a balanced validation set of 500 prompts, evaluated using both an LLM judge and human ratings. The fine-tuning process aimed to enhance refusal quality while maintaining performance on non-refusal tasks.

**Results**  
PsychoSafe demonstrated a significant improvement in refusal quality, achieving a 28.1% enhancement over a generic baseline. Notably, the framework excelled in specific areas: external resource referral improved by 46.8%, and psychological grounding increased by 34.8%. The fine-tuning approach yielded near-perfect rates for refusals and resource referrals, although it resulted in a decrease in response relevance. Additional evaluations on the SORRY-Bench and XSTest benchmarks indicated strong in-domain robustness but revealed limitations in out-of-domain generalization, suggesting that the model's performance may be context-dependent.

**Limitations**  
The authors acknowledge that while PsychoSafe improves refusal quality, it compromises response relevance, which could hinder user experience in non-refusal contexts. They also note the limited out-of-domain generalization, indicating that the model may not effectively apply the learned interventions in diverse scenarios. The authors suggest that future work should focus on diversifying the fine-tuning dataset to enhance the model's ability to apply interventions selectively rather than in a one-size-fits-all manner.

**Why it matters**  
The implications of this work are significant for the development of LLMs in sensitive applications, particularly in mental health and crisis intervention contexts. By framing refusals as supportive communication, PsychoSafe could lead to more empathetic and effective interactions, potentially reducing harm in high-stakes situations. This research contributes to the ongoing discourse on ethical AI deployment and the necessity for models to navigate complex human emotions and needs, as published in [arXiv](https://arxiv.org/abs/2606.09697v1).
