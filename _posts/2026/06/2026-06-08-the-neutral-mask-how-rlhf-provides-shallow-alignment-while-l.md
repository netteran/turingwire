---
title: "The Neutral Mask: How RLHF Provides Shallow Alignment while Leaving Partisan Structure Intact in a Large Language Model"
date: 2026-06-08 17:00:31 +0000
category: research
subcategory: alignment_safety
company: "Anthropic"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09735v1"
arxiv_id: "2606.09735"
authors: ["Wendy K. Tam"]
slug: the-neutral-mask-how-rlhf-provides-shallow-alignment-while-l
summary_word_count: 432
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates how RLHF achieves superficial alignment in language models while preserving underlying partisan structures, revealing implications for model behavior."
---

**Problem**  
This work addresses the gap in understanding the effects of reinforcement learning from human feedback (RLHF) on the alignment of large language models, specifically regarding the retention of partisan structures. The authors argue that existing literature lacks clarity on how RLHF encodes values and whether it achieves deep alignment or merely functional compliance. This study is particularly relevant as it presents a mechanistic analysis of the Llama 3.1 8B model, which has not been extensively explored in prior research.

**Method**  
The authors conduct a comparative analysis of the Llama 3.1 8B model's internal representations before and after RLHF training. They employ sparse autoencoder decomposition to analyze the model's features, focusing on the activation of policy-encoding features. The study also includes feature-level steering experiments to assess the causal relationships between partisan geometry and output generation. The training compute and specific loss functions used in RLHF are not disclosed, but the methodology emphasizes the examination of the model's latent space and the implications of its output behavior.

**Results**  
The findings indicate that RLHF does not eliminate the model's inherent partisan structure; instead, it compresses the variance of partisan signals, resulting in outputs that appear balanced and non-partisan. The analysis reveals that policy-encoding features, which were sporadically active in the base model, become completely inactive in the Instruct model post-RLHF. The authors demonstrate that the model's neutrality is functional rather than structural, as the underlying partisan geometry remains intact. This suggests that the model can still reactivate partisan generation when user identity is inferred and amplified. The results highlight a significant disconnect between the model's apparent neutrality and its underlying partisan capabilities.

**Limitations**  
The authors acknowledge that their study is limited to the Llama 3.1 8B model and may not generalize to other architectures or domains. They also note that the analysis focuses on partisan orientation, leaving open questions about how RLHF affects other value domains. Additionally, the study does not explore the long-term implications of this disconnect on model behavior in real-world applications, which could lead to unpredictable outcomes.

**Why it matters**  
This research has critical implications for the design and deployment of aligned language models, suggesting that RLHF may create a façade of neutrality while preserving underlying biases. The findings indicate that the apparent safety of aligned models could be misleading, as the mechanisms that allow for partisan generation remain accessible. This insight is crucial for future work in model alignment and safety, as it raises concerns about the fragility of aligned behaviors. The study encourages further exploration into the structural integrity of value-laden features in language models, as published in [arXiv](https://arxiv.org/abs/2606.09735v1).
