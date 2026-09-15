---
title: "Breaking Entropy Bounds: Accelerating RL Training via MTP with Rejection Sampling"
date: 2026-06-10 17:36:45 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.12370v1"
arxiv_id: "2606.12370"
authors: ["Yucheng Li", "Huiqiang Jiang", "Yang Xu", "Jianxin Yang", "Yi Zhang", "Yizhong Cao"]
slug: breaking-entropy-bounds-accelerating-rl-training-via-mtp-wit
summary_word_count: 438
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Bebop, a method that enhances reinforcement learning training efficiency through improved Multi-Token Prediction and rejection sampling."
---

**Problem**  
Reinforcement learning (RL) is integral to the training of large language models (LLMs), yet the rollout phase remains a significant bottleneck, particularly in terms of speed and efficiency. Previous research has indicated that Multi-Token Prediction (MTP) can accelerate rollouts via speculative decoding; however, the acceptance rates of MTP diminish during RL training, limiting its effectiveness. This paper addresses this gap by systematically studying MTP in the context of LLM post-training and proposing methods to integrate MTP into large-scale RL pipelines. The work is presented as a preprint and has not undergone peer review.

**Method**  
The authors introduce a novel approach called Bebop, which leverages probabilistic rejection sampling to mitigate the negative impact of model entropy fluctuations on MTP acceptance rates. They identify a negative linear correlation between the MTP acceptance rate and the increase in model entropy during RL training. To optimize the acceptance rate, they propose an end-to-end Total Variation (TV) loss function that directly targets the multi-step rejection sampling acceptance rate, which is shown to be superior to traditional objectives like cross-entropy or KL divergence. The method is validated through extensive experiments on various online MTP training strategies, demonstrating that pre-RL MTP training with the proposed TV loss and rejection sampling can maintain consistent acceptance rates and speedup throughout the RL process.

**Results**  
The proposed method achieves significant improvements in acceptance rates, with reported enhancements of approximately 10%, reaching acceptance rates of up to 95%. Additionally, the method yields up to 25% increases in inference throughput across tasks such as mathematical reasoning, code generation, and agentic tasks. In terms of overall training efficiency, Bebop demonstrates up to 1.8x end-to-end acceleration in asynchronous RL training for the Qwen3.5, Qwen3.6, and Qwen3.7 models, compared to baseline methods.

**Limitations**  
The authors acknowledge that while their approach significantly improves acceptance rates and training speed, it may still be sensitive to the specific characteristics of the RL environment and the underlying model architecture. They do not address potential scalability issues when applied to larger models or more complex environments, nor do they explore the long-term effects of using rejection sampling on model performance.

**Why it matters**  
The findings presented in this paper have substantial implications for the efficiency of RL training in LLMs, particularly in scenarios where rapid iteration and deployment are critical. By optimizing MTP acceptance rates and reducing the need for costly online updates, Bebop could streamline RL training processes, making them more feasible for real-world applications. This work contributes to the ongoing discourse on enhancing RL methodologies and is relevant for researchers and practitioners aiming to improve the efficiency of large-scale AI systems, as published in [arXiv](https://arxiv.org/abs/2606.12370v1).
