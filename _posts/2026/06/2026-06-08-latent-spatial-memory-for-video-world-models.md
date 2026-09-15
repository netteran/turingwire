---
title: "Latent Spatial Memory for Video World Models"
date: 2026-06-08 17:59:54 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09828v1"
arxiv_id: "2606.09828"
authors: ["Weijie Wang", "Haoyu Zhao", "Yifan Yang", "Feng Chen", "Zeyu Zhang", "Yefei He"]
slug: latent-spatial-memory-for-video-world-models
summary_word_count: 377
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces latent spatial memory for video world models, significantly improving efficiency and performance over traditional methods."
---

**Problem**  
The paper addresses the limitations of existing video world models that utilize explicit point cloud memory in RGB space, which is computationally intensive and results in information loss due to pixel-space reconstruction. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for more efficient methods in video generation that maintain 3D spatial consistency.

**Method**  
The authors propose a novel framework called Mirage, which implements latent spatial memory to store scene information directly in the diffusion latent space. This approach circumvents the need for pixel-space reconstruction by employing depth-guided back-projection to lift latent tokens into 3D. The querying of this memory is achieved through direct latent-space warping, allowing for the synthesis of novel views without the computational overhead associated with repeated rendering and VAE encoding. The architecture leverages the geometric priors inherent in diffusion models, optimizing both memory usage and processing speed.

**Results**  
The experimental results demonstrate that the latent spatial memory framework achieves an impressive speedup of up to **10.57×** in end-to-end video generation compared to explicit 3D baselines. Additionally, it shows a **55×** reduction in memory footprint, indicating significant efficiency gains. The performance on benchmark datasets is noteworthy, with Mirage achieving state-of-the-art results on WorldScore and strong reconstruction quality on RealEstate10K, outperforming existing methods in both speed and quality.

**Limitations**  
The authors acknowledge that while the proposed method significantly reduces computational costs and improves performance, it may still be limited by the quality of the depth information used for back-projection. Additionally, the reliance on diffusion models may restrict the applicability of the approach to scenarios where such models are effective. The paper does not address potential challenges in scaling the method to more complex scenes or dynamic environments, which could be a critical area for future research.

**Why it matters**  
This work has substantial implications for the field of video generation and world modeling, as it presents a more efficient alternative to traditional methods that rely heavily on pixel-space operations. The introduction of latent spatial memory could pave the way for advancements in real-time video synthesis and interactive applications, where computational efficiency is paramount. The findings contribute to the ongoing discourse on optimizing generative models, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.09828v1).
