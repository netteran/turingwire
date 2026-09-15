---
title: "You Only Index Once: Cross-Layer Sparse Attention with Shared Routing"
date: 2026-06-04 17:54:04 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06467v1"
arxiv_id: "2606.06467"
authors: ["Yutao Sun", "Yanqi Zhang", "Li Dong", "Jianyong Wang", "Furu Wei"]
slug: you-only-index-once-cross-layer-sparse-attention-with-shared
summary_word_count: 366
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Cross-Layer Sparse Attention (CLSA), enhancing long-context inference efficiency in LLMs by optimizing routing and KV cache usage."
---

**Problem**  
The paper addresses the limitations of existing sparse attention mechanisms in large language models (LLMs), particularly in the context of long-context inference. Current methods often face a trade-off between efficiency and quality, with structured block sparse methods sacrificing accuracy for speed, while token sparse methods maintain accuracy but struggle with routing overhead. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose Cross-Layer Sparse Attention (CLSA), which builds upon key-value (KV) sharing architectures like YOCO. CLSA innovatively shares both the KV cache and the routing index across cross-decoder layers. A single indexer computes the top-k token selection once, allowing for the reuse of this index across layers. This approach preserves the fine-grained selectivity characteristic of token sparse attention while significantly reducing the computational overhead associated with routing. The architecture is designed to enhance multiple inference bottlenecks, including pre-filling, KV-cache storage, and long-context decoding.

**Results**  
CLSA demonstrates substantial improvements in both accuracy and efficiency across various benchmarks. Specifically, it achieves up to a 7.6x speedup in decoding and a 17.1x increase in overall throughput when evaluated at a 128K context length. These results are particularly notable when compared to traditional sparse attention methods, indicating that CLSA effectively balances the trade-offs between speed and model performance.

**Limitations**  
The authors acknowledge that while CLSA improves efficiency and accuracy, it may still be limited by the inherent constraints of the underlying architecture and the complexity of the routing mechanism. Additionally, the paper does not explore the scalability of CLSA beyond the tested context lengths or its performance in diverse real-world applications, which could be critical for practical deployment.

**Why it matters**  
The implications of this work are significant for the development of more efficient LLMs capable of handling long-context tasks without compromising on quality. By addressing the efficiency-quality trade-off in sparse attention mechanisms, CLSA paves the way for future research into optimizing LLM architectures for real-time applications. This advancement is crucial as the demand for high-performance models continues to grow, particularly in reasoning-heavy scenarios. The findings are available on [arXiv](https://arxiv.org/abs/2606.06467v1) and contribute to the ongoing discourse on enhancing LLM capabilities.
