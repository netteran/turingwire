---
title: "Learning What to Forget: Improving LLM Unlearning via Learned Token-Level Importance"
date: 2026-06-04 15:56:32 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06320v1"
arxiv_id: "2606.06320"
authors: ["Gizem Y\u00fcce", "Giorgos Nikolaou", "Nicolas Flammarion"]
slug: learning-what-to-forget-improving-llm-unlearning-via-learned
summary_word_count: 410
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a novel framework for token-level unlearning in language models, improving the efficiency of knowledge removal without external supervision."
---

**Problem**  
The paper addresses the challenge of machine unlearning, specifically for autoregressive language models, where the goal is to remove specific knowledge while maintaining overall model performance. Existing methods either overlook the varying importance of tokens in forget samples or depend on auxiliary models, heuristics, or external annotations to gauge token relevance. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for further validation in the community.

**Method**  
The authors propose a novel framework called Alternating Token-Weighted Unlearning (ATWU), which optimizes both model parameters and token weights simultaneously. The core idea is to define token forget-specificity based on its interaction with the retain objective: a token is deemed forget-specific if minimizing the forget loss for that token does not conflict with the retain optimality. This is formalized as a joint optimization problem, allowing the model to learn token-level importance without requiring external supervision. The framework employs a simple linear scorer applied to the hidden states of the model, facilitating efficient computation during the unlearning process.

**Results**  
ATWU demonstrates superior performance in forget-retain trade-offs compared to existing methods, including sample-level unlearning techniques, probability-based token weighting heuristics, and auxiliary-model-based approaches. The authors report that ATWU achieves state-of-the-art results on benchmarks TOFU and RWKU, with significant improvements in identifying semantically meaningful token-level forgetting signals. The learned token scores show a strong alignment with ground truth forget-specific spans, indicating that the method effectively captures the nuances of token importance in the context of unlearning.

**Limitations**  
The authors acknowledge that their approach relies on a natural separation condition for the optimization problem, which may not hold in all scenarios. Additionally, while ATWU reduces the need for external supervision, it still requires a well-defined retain objective, which may limit its applicability in certain contexts. The paper does not extensively discuss the scalability of the method to larger models or datasets, nor does it explore the potential impact of noise in the training data on the learned token weights.

**Why it matters**  
This work has significant implications for the field of machine unlearning, particularly in applications where data privacy and model adaptability are critical. By enabling unsupervised learning of token-level forget-specificity directly from model representations, ATWU offers a more efficient and effective approach to knowledge removal in language models. This advancement could facilitate the development of more robust and privacy-preserving AI systems, as highlighted in the context of ongoing discussions in the community, as published in [arXiv](https://arxiv.org/abs/2606.06320v1).
