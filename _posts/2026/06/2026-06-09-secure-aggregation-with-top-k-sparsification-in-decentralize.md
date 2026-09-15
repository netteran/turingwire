---
title: "Secure Aggregation with Top-K Sparsification in Decentralized Federated Learning"
date: 2026-06-09 12:33:53 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10780v1"
arxiv_id: "2606.10780"
authors: ["Hengxuan Tang", "Jinbao Zhu", "Xiaohu Tang"]
slug: secure-aggregation-with-top-k-sparsification-in-decentralize
summary_word_count: 418
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a communication-efficient secure aggregation scheme for decentralized federated learning using top-K gradient sparsification to mitigate gradient leakage."
---

**Problem**  
The paper addresses the challenge of secure aggregation in decentralized federated learning (DFL), particularly focusing on the communication overhead associated with gradient transmission. Traditional secure aggregation methods scale linearly with the gradient dimension, which becomes impractical for large models and in environments with limited bandwidth and unreliable nodes. The authors highlight the lack of effective solutions that combine secure aggregation with top-K gradient sparsification, especially in the context of user dropouts and collusion, a gap in the existing literature that remains unaddressed in prior works.

**Method**  
The authors propose a novel communication-efficient sparse secure aggregation scheme that leverages top-K gradient sparsification. The method involves two main phases: an offline phase that handles dimension-dependent overhead and an online phase for secure aggregation. During the offline phase, users compute their gradients and select the top-K entries, which are then masked and permuted to ensure privacy. The aggregation process is designed to be resilient against user dropouts and collusion, utilizing random masks to obscure the gradients. The paper does not disclose specific training compute requirements but emphasizes the efficiency of the proposed method in reducing communication costs while maintaining model accuracy.

**Results**  
Experimental evaluations demonstrate that the proposed scheme achieves comparable accuracy to full-gradient aggregation even with only 1% gradient sparsification. Specifically, the authors report a significant reduction in communication costs, achieving up to 95% savings compared to traditional methods. The results are benchmarked against standard federated learning baselines, although specific baseline models and metrics are not detailed in the summary. The effectiveness of the proposed method is underscored by its ability to maintain model performance while drastically reducing the amount of data transmitted.

**Limitations**  
The authors acknowledge that their approach may still be vulnerable to certain types of attacks, particularly those that exploit the randomness in the selection of top-K gradients. Additionally, the reliance on user participation and the assumption of a certain level of user honesty may not hold in all practical scenarios. The paper does not explore the scalability of the method in extremely large federated networks or the impact of varying user participation rates on performance.

**Why it matters**  
This work has significant implications for the future of decentralized federated learning, particularly in applications where privacy and communication efficiency are paramount. By effectively combining secure aggregation with top-K sparsification, the proposed method paves the way for more scalable and secure federated learning systems. The findings contribute to the ongoing discourse on enhancing privacy-preserving machine learning techniques, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.10780v1).
