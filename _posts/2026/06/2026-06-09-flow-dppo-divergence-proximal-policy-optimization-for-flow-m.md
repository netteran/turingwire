---
title: "Flow-DPPO: Divergence Proximal Policy Optimization for Flow Matching Models"
date: 2026-06-09 15:59:57 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11025v1"
arxiv_id: "2606.11025"
authors: ["Bowen Ping", "Xiangxin Zhou", "Penghui Qi", "Minnan Luo", "Liefeng Bo", "Tianyu Pang"]
slug: flow-dppo-divergence-proximal-policy-optimization-for-flow-m
summary_word_count: 405
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Flow-DPPO, a novel reinforcement learning method that enhances flow matching models by addressing limitations of traditional PPO techniques."
---

**Problem**  
This work addresses the limitations of existing reinforcement learning (RL) methods, specifically the ratio clipping used in Flow-GRPO and CPS for flow matching models in image and video generation. The authors argue that ratio clipping is ill-suited for flow models due to its reliance on noisy, single-sample estimates of policy divergence, which can lead to inconsistent constraints during training. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose Flow-DPPO (Flow Divergence Proximal Policy Optimization), which substitutes ratio clipping with a divergence proximal constraint. The key innovation lies in leveraging the Gaussian nature of per-step policies in flow models, allowing for efficient computation of the Kullback-Leibler (KL) divergence between old and new policies. Flow-DPPO employs an asymmetric divergence mask that selectively blocks gradient updates when they both deviate from the trusted region and exceed the divergence threshold. This method enhances the stability and efficiency of training by ensuring that updates remain within a controlled divergence range.

**Results**  
Flow-DPPO was evaluated against baseline methods on standard benchmarks for flow matching models. The results indicate that Flow-DPPO achieves significantly higher rewards compared to Flow-GRPO and CPS, with improvements in KL-proximal efficiency. Specifically, the paper reports a reward increase of approximately 15% over Flow-GRPO and a 10% increase over CPS on the evaluated tasks. Additionally, Flow-DPPO demonstrates a reduction in catastrophic forgetting and supports balanced multi-objective optimization, enabling stable multi-epoch training, where traditional ratio clipping methods tend to degrade performance.

**Limitations**  
The authors acknowledge that while Flow-DPPO improves upon existing methods, it may still be sensitive to the choice of divergence threshold and the design of the asymmetric mask. They also note that the method's performance may vary across different types of flow models and tasks, which could limit its generalizability. Furthermore, the computational efficiency of the KL divergence calculation, while advantageous, may still pose challenges in high-dimensional action spaces.

**Why it matters**  
The introduction of Flow-DPPO represents a significant advancement in the application of reinforcement learning to flow matching models, particularly in the context of image and video generation. By addressing the shortcomings of ratio clipping, this method enhances the stability and efficiency of training, which is crucial for deploying RL in real-world applications. The implications of this work extend to various domains where flow models are utilized, potentially improving the quality and alignment of generated content. This research contributes to the ongoing discourse in RL methodologies, as published in [arXiv](https://arxiv.org/abs/2606.11025v1).
