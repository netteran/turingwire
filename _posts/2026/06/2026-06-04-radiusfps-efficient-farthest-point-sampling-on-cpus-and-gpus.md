---
title: "RadiusFPS: Efficient Farthest Point Sampling on CPUs and GPUs via Spherical Voxel Pruning"
date: 2026-06-04 14:57:05 +0000
category: research
subcategory: agents_robotics
company: "OpenAI"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06255v1"
arxiv_id: "2606.06255"
authors: ["Ziyang Yu", "Xiang Li", "Qiong Chang", "Jun Miyazaki"]
slug: radiusfps-efficient-farthest-point-sampling-on-cpus-and-gpus
summary_word_count: 394
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces RadiusFPS, an efficient Farthest Point Sampling method leveraging spherical voxel pruning for real-time robotic perception."
---

**Problem**  
The paper addresses the inefficiencies of classical Farthest Point Sampling (FPS) in processing large point clouds, which are critical for applications in robotic perception, including LiDAR-based autonomous driving and SLAM. The authors highlight that traditional FPS suffers from high time complexity, making it unsuitable for real-time applications where modern 3D sensors generate millions of points per second. This work is a preprint and has not undergone peer review.

**Method**  
The core contribution is the RadiusFPS framework, which accelerates FPS through spherical voxel pruning. The method begins by indexing the point cloud into spherical voxels, allowing for a conservative geometric bound that reduces redundant distance calculations during the FPS iterations. The authors implement a coordinate-wise point-skip test to further eliminate unnecessary updates. Additionally, they present RadiusFPS-G, a warp-level GPU implementation that integrates voxel selection, pruning, and distance updates into memory-coalesced kernels, significantly reducing global memory access times. The authors do not disclose specific training compute requirements, focusing instead on the efficiency of the sampling process.

**Results**  
RadiusFPS-G demonstrates a performance improvement of up to 2.5x over traditional GPU-based FPS implementations on indoor benchmarks (S3DIS, ScanNet) and outdoor LiDAR datasets (SemanticKITTI). It matches or surpasses the performance of QuickFPS while utilizing approximately 50% less GPU memory. The segmentation accuracy remains comparable across methods. When combined with the learning-based FastPoint sampler, the proposed pipeline achieves the fastest end-to-end inference time among all configurations tested, showcasing its practical applicability in latency-sensitive environments.

**Limitations**  
The authors acknowledge that while RadiusFPS significantly improves FPS efficiency, it may still be limited by the initial point cloud indexing step, which could introduce overhead in certain scenarios. Additionally, the method's performance may vary depending on the specific characteristics of the point cloud data, such as density and distribution. The paper does not explore the scalability of the method to extremely large datasets or its performance in highly dynamic environments.

**Why it matters**  
The development of RadiusFPS has significant implications for real-time robotic vision systems, where efficient point cloud processing is crucial for tasks such as navigation and obstacle avoidance. By reducing the computational burden of FPS, this work enables more responsive and capable robotic systems, particularly in resource-constrained settings. The findings contribute to the ongoing efforts to optimize point cloud processing techniques, as discussed in related literature on efficient sampling methods. For further details, refer to the full paper available on [arXiv](https://arxiv.org/abs/2606.06255v1).
