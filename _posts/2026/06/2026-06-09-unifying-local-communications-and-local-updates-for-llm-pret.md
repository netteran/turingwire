---
title: "Unifying Local Communications and Local Updates for LLM Pretraining"
date: 2026-06-09 16:40:54 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11081v1"
arxiv_id: "2606.11081"
authors: ["Pietro Cagnasso", "Eugene Belilovsky", "Edouard Oyallon"]
slug: unifying-local-communications-and-local-updates-for-llm-pret
summary_word_count: 409
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents GASLoC, a decentralized pre-training algorithm for LLMs that enhances communication efficiency and performance in heterogeneous environments."
---

**Problem**  
The paper addresses the limitations of existing decentralized pre-training methods for large language models (LLMs), particularly those that rely on synchronous All-Reduce operations. These methods can become bottlenecks in scenarios with heterogeneous bandwidth or worker speeds, as they require identical model states and tie progress to global collectives. The authors highlight the need for a more efficient communication strategy that allows for local updates and can adapt to varying network conditions. This work is a preprint and has not yet undergone peer review.

**Method**  
The authors introduce GASLoC (Gossip-based Adaptive Sparse Local Communication), a decentralized pre-training algorithm that generalizes communication acceleration through the use of an "outer optimizer." GASLoC employs a gossip-based training framework that is compatible with adaptive optimizers and allows for local optimizer steps. It also utilizes sparse randomized peer communication, which reduces the communication overhead typically associated with LLM training. The algorithm is designed to operate effectively across various network topologies and can handle multiple local steps before synchronizing with peers, thereby improving training efficiency.

**Results**  
GASLoC was evaluated against several state-of-the-art decentralized algorithms, including DiLoCo, across multiple standard LLM training tasks. The results indicate that GASLoC outperforms these baselines in a single step per communication setting across various topologies. Notably, when multiple local steps are employed, GASLoC achieves performance levels competitive with DiLoCo, demonstrating its effectiveness in leveraging local updates. In scenarios characterized by heterogeneous bandwidth, GASLoC significantly outperformed DiLoCo, showcasing its robustness in less-than-ideal communication environments. Specific performance metrics and effect sizes were not disclosed in the abstract.

**Limitations**  
The authors acknowledge that while GASLoC improves communication efficiency and performance, it may still be sensitive to the choice of local optimizer and the specific communication topology employed. Additionally, the reliance on gossip-based communication may introduce variability in convergence rates, which could be a concern in certain applications. The paper does not address the scalability of GASLoC in extremely large distributed systems or the potential overhead introduced by the gossip mechanism itself.

**Why it matters**  
The development of GASLoC has significant implications for the future of decentralized training of LLMs, particularly in environments where bandwidth is limited or variable. By enabling more efficient local updates and reducing the reliance on synchronous communication, GASLoC could facilitate the training of larger models across distributed systems, ultimately leading to advancements in natural language processing capabilities. This work contributes to the ongoing discourse on optimizing LLM training methodologies, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.11081v1).
