---
title: "Attention Amnesia in Hybrid LLMs: When CoT Fine-Tuning Breaks Long-Range Recall, and How to Fix It"
date: 2026-06-09 16:17:19 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11052v1"
arxiv_id: "2606.11052"
authors: ["Xinyu Zhou", "Boyu Zhu", "Yi Xu", "Zhiwei Li", "Yingfa Chen", "Huiming Wang"]
slug: attention-amnesia-in-hybrid-llms-when-cot-fine-tuning-breaks
summary_word_count: 393
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper identifies and addresses the degradation of long-context recall in hybrid LLMs due to CoT fine-tuning, proposing a novel method to restore performance."
---

**Problem**  
This work addresses a critical gap in the literature regarding the impact of chain-of-thought (CoT) supervised fine-tuning (SFT) on long-range recall capabilities in hybrid linear-attention models. The authors demonstrate that while CoT-SFT enhances reasoning abilities, it systematically degrades retrieval performance on long-context tasks, particularly in architectures like HypeNet and Jet-Nemotron. This degradation is exacerbated under more challenging retrieval conditions and longer context windows. The paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a novel method called QK-Restore, which selectively restores the query and key projection matrices ($W_Q$ and $W_K$) from the pre-SFT checkpoint while retaining all other parameters post-SFT. This approach is motivated by the observation that CoT-SFT biases attention gradients towards short-range patterns, disrupting the long-range routing capabilities of the model. Additionally, a Procrustes variant is introduced to balance the preservation of routing capabilities with the adaptation of reasoning performance. The method is training-free, meaning it does not require additional training iterations, thus providing a computationally efficient solution.

**Results**  
The results indicate that QK-Restore effectively mitigates the degradation of long-context recall caused by CoT-SFT. For instance, on the Needle-In-A-Haystack (NIAH) benchmark, the performance of HypeNet-9B on NIAH-S2@256K drops from 67.2% to 9.4% after CoT-SFT, but with QK-Restore, it can be restored to 76.4% on HypeNet-5B for S3@256K, while maintaining strong reasoning performance. This demonstrates a significant improvement in long-context retrieval capabilities without sacrificing the enhancements in reasoning that CoT-SFT provides.

**Limitations**  
The authors acknowledge that their method may not generalize to all architectures or tasks beyond those tested, particularly in scenarios with different attention mechanisms or retrieval challenges. They also do not explore the potential trade-offs in reasoning performance across various datasets or tasks, which could be an area for future research. Additionally, the method's reliance on the pre-SFT checkpoint may limit its applicability in dynamic environments where model parameters frequently change.

**Why it matters**  
This research has significant implications for the design and training of hybrid LLMs, particularly in applications requiring both reasoning and long-context recall. By addressing the detrimental effects of CoT-SFT on long-range retrieval, the proposed QK-Restore method offers a practical solution for enhancing model performance in real-world tasks. This work contributes to the ongoing discourse on optimizing LLM training methodologies and highlights the need for careful consideration of attention mechanisms in model design, as discussed in related literature (available on [arXiv](https://arxiv.org/abs/2606.11052v1)).
