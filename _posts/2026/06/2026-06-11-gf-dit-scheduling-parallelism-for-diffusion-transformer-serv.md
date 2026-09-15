---
title: "GF-DiT: Scheduling Parallelism for Diffusion Transformer Serving"
date: 2026-06-11 15:51:10 +0000
category: research
subcategory: efficiency_inference
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13501v1"
arxiv_id: "2606.13501"
authors: ["Xinwei Qiang", "Yifan Hu", "Shixuan Sun", "Jing Yang", "Han Zhao", "Chen Chen"]
slug: gf-dit-scheduling-parallelism-for-diffusion-transformer-serv
summary_word_count: 368
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces GF-DiT, a dynamic scheduling framework for optimizing GPU parallelism in Diffusion Transformers, enhancing throughput and reducing latency."
---

**Problem**  
The paper addresses the inefficiencies in serving Diffusion Transformers (DiTs) due to static parallelism configurations, which fail to adapt to the heterogeneous nature of DiT workloads across different requests, execution stages, and system conditions. This gap in capability leads to suboptimal GPU utilization and degraded service quality. The authors highlight that existing systems do not account for the dynamic nature of workload demands, making this work particularly relevant as a preprint and unreviewed contribution to the literature.

**Method**  
GF-DiT introduces a policy-programmable runtime that treats GPU parallelism as a first-class resource, allowing for dynamic adaptation of parallelism based on real-time workload demands. The core technical contribution is the asynchronous execution abstraction that decomposes requests into independently schedulable trajectory tasks, enabling online GPU reallocation. Additionally, GF-DiT proposes group-free collectives, a lightweight communication abstraction that facilitates low-overhead online formation and reconfiguration of execution groups. The implementation is integrated into vLLM-Omni, a framework for handling image and video diffusion workloads.

**Results**  
GF-DiT demonstrates significant performance improvements over traditional fixed-pipeline execution with static parallelism. The results indicate a throughput increase of up to 6.01×, a mean latency reduction of up to 95%, and a decrease in service level objective (SLO) violation rates by up to 90%. Furthermore, the overhead for communication-group setup is reduced from 778 ms to approximately 60 μs, showcasing the efficiency of the proposed method in real-world scenarios.

**Limitations**  
The authors acknowledge that GF-DiT's performance may vary based on the specific characteristics of the workload and the underlying hardware. They do not address potential scalability issues when applied to larger, more complex models or the impact of varying network conditions on the proposed communication abstractions. Additionally, the reliance on dynamic scheduling may introduce overhead that could negate some benefits in less variable workloads.

**Why it matters**  
The implications of GF-DiT extend to enhancing the efficiency of GPU resource utilization in AI model serving, particularly for applications involving image and video generation. By enabling dynamic parallelism, this work paves the way for more responsive and efficient serving architectures, which is crucial as the demand for real-time AI applications continues to grow. The findings contribute to the ongoing discourse on optimizing deep learning model deployment, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.13501v1).
