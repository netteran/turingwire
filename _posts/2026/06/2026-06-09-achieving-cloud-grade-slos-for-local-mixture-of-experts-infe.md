---
title: "Achieving Cloud-Grade SLOs for Local Mixture-of-Experts Inference through CPU-GPU Hybrid Design"
date: 2026-06-09 07:17:34 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.10493v1"
arxiv_id: "2606.10493"
authors: ["Wenxin Wang", "Yule Hou", "Yu Ji", "Peng Qu", "Youhui Zhang"]
slug: achieving-cloud-grade-slos-for-local-mixture-of-experts-infe
summary_word_count: 410
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a CPU-GPU hybrid system that enables local Mixture-of-Experts inference to achieve cloud-grade service level objectives."
---

**Problem**  
The paper addresses the limitations of local deployment of large Mixture-of-Experts (MoE) models, which fail to meet the service quality of cloud environments, particularly under low-concurrency workloads. The authors identify four critical gaps: reliance on capacity-reduced models, inability to meet a 30-second time-to-first-token (TTFT) for long prefill sequences (over 12K tokens), subpar decoding throughput (below 20 tokens/s), and inadequate concurrency in mixed prefill-decode and batched decode scenarios. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a CPU-GPU hybrid architecture that leverages dual-socket commodity CPUs and consumer GPUs to achieve cloud-level service level objectives (SLOs). Key innovations include:  
1. **Stream-Loading Prefill (SLP)**: This technique boosts prefill throughput to 1,200 tokens/s, enabling the processing of 32K prompts within 30 seconds.  
2. **Distributed SLP (DSLP)**: Utilizing SmallEP expert parallelism, this method achieves 1,800 tokens/s and supports 45K prompts in 30 seconds on two NVIDIA RTX 5090 GPUs.  
3. **Intra-Node Prefill-Decode Disaggregation**: This approach employs zero-copy shared weights and a dual-batch attention-MoE overlap scheme, maintaining concurrency with less than a 15% increase in latency while achieving 50% throughput gains.  
4. **AVX-512-Optimized FP8 GEMV Kernel**: This kernel facilitates native CPU FP8 inference, resulting in a 4-5x reduction in CPU latency.  
5. **Fine-Grained CPU Parallelism**: This technique achieves 28 tokens/s on INT4 DeepSeek-V3 and 21.5 tokens/s on intact FP8 V3 models.

**Results**  
The proposed system demonstrates significant improvements over baseline models. Specifically, it achieves a prefill throughput of 1,800 tokens/s and a TTFT of 30 seconds for 45K prompts, outperforming existing local MoE implementations. The intra-node disaggregation method results in a 50% increase in throughput with minimal latency impact, while the AVX-512 kernel reduces CPU latency by a factor of 4-5. These results indicate a substantial enhancement in local MoE inference capabilities compared to traditional methods.

**Limitations**  
The authors acknowledge that their approach may not generalize to all types of MoE models and that performance may vary based on hardware configurations. Additionally, the reliance on specific consumer-grade GPUs (RTX 5090) may limit broader applicability. The paper does not address potential scalability issues when deploying on larger clusters or the impact of varying workloads on performance.

**Why it matters**  
This work has significant implications for the deployment of large-scale AI models in local environments, enabling high-quality inference without the need for extensive datacenter infrastructure. By achieving cloud-grade QoS on consumer hardware, it opens avenues for cost-effective AI applications in edge computing and personal devices, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.10493v1).
