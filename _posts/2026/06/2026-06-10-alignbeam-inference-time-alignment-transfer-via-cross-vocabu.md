---
title: "ALIGNBEAM : Inference-Time Alignment Transfer via Cross-Vocabulary Logit Mixing"
date: 2026-06-10 17:15:28 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12342v1"
arxiv_id: "2606.12342"
authors: ["Chirag Chawla", "Pratinav Seth", "Vinay Kumar Sankarapu"]
slug: alignbeam-inference-time-alignment-transfer-via-cross-vocabu
summary_word_count: 414
classification_confidence: 0.80
source_truncated: false
layout: post
description: "ALIGNBEAM introduces a training-free method for cross-vocabulary logit mixing to enhance the safety of large language models during inference."
---

**Problem**  
This paper addresses the critical issue of safety degradation in large language models (LLMs) when fine-tuned for specific domains, particularly in response to harmful prompts. Existing inference-time defenses that utilize logit mixing require models to share a vocabulary, which limits their applicability to cross-family specialists where safety is most compromised. The authors present ALIGNBEAM, a novel approach that does not require retraining and overcomes the vocabulary restriction, making it relevant for a broader range of model families. This work is a preprint and has not undergone peer review.

**Method**  
ALIGNBEAM employs a token-by-token translation mechanism to convert logits from a safe anchor model into the vocabulary of the target model during each decoding step. This is achieved without modifying the weights of either model, thus maintaining their original performance characteristics. A small LLM judge is utilized to evaluate K candidate continuations, selecting the safest option based on the translated logits. The method allows for tuning the safety-utility trade-off at deployment, providing flexibility in real-world applications. The authors do not disclose specific architectural details or training compute requirements, as the method is training-free.

**Results**  
The evaluation of ALIGNBEAM demonstrates significant improvements in safety metrics across both cross-vocabulary and same-vocabulary pairs. The method substantially increases refusal rates on adversarial benchmarks compared to baseline models, although specific numerical results are not provided in the abstract. Task accuracy remains consistent with existing models, and the inference overhead is reported to be within practical limits, indicating that the method is efficient for deployment in real-world scenarios.

**Limitations**  
The authors acknowledge that while ALIGNBEAM effectively enhances safety, it does not involve retraining, which may limit its adaptability to rapidly evolving adversarial techniques. Additionally, the reliance on a small LLM judge introduces a potential bottleneck in performance, as the effectiveness of the safety evaluation is contingent on the judge's capabilities. The paper does not explore the implications of model size or architecture on the performance of ALIGNBEAM, which could be a significant factor in diverse applications.

**Why it matters**  
The implications of ALIGNBEAM are substantial for the deployment of LLMs in safety-critical applications, as it provides a mechanism to enhance safety without the need for retraining, thus facilitating the use of existing models in new contexts. This work opens avenues for further research into inference-time safety mechanisms and cross-family model interactions, potentially leading to more robust AI systems. The findings are particularly relevant for ongoing discussions in the field regarding the safety of AI systems, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.12342v1).
