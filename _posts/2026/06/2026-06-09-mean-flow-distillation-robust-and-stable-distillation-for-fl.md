---
title: "Mean Flow Distillation: Robust and Stable Distillation for Flow Matching Models"
date: 2026-06-09 17:39:19 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11155v1"
arxiv_id: "2606.11155"
authors: ["An Zhao", "Shengyuan Zhang", "Zhongjian Sun", "Yixiang Zhou", "Zejian Li", "Ling Yang"]
slug: mean-flow-distillation-robust-and-stable-distillation-for-fl
summary_word_count: 423
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Mean Flow Distillation, a novel framework that enhances flow matching models by improving stability and reducing computational overhead."
---

**Problem**  
Flow Matching models have shown strong generative capabilities but are hindered by the computational demands of ODE-based iterative sampling during inference. This paper addresses the gap in existing distillation methods, which primarily draw from diffusion-based score matching, leading to issues such as training instability, high variance, and compromised generation quality. The authors highlight that current approaches do not adequately leverage the geometric structure of flows, which is critical for improving performance. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose Mean Flow Distillation (MFD), a framework specifically designed for flow matching models. MFD functions as a temporal low-pass filter, effectively mitigating high-frequency optimization noise that is prevalent in variational score distillation (VSD). The theoretical foundation of MFD is established through the Mean Flow Matching Theorem, which asserts that aligning expected average velocities is sufficient for achieving strict distribution alignment. The architecture details are not explicitly disclosed, but the method emphasizes the importance of trajectory consistency in the distillation process. The training compute requirements are not specified, but the authors imply that MFD reduces the overall computational burden compared to traditional flow matching approaches.

**Results**  
MFD demonstrates superior performance on high-dimensional manifold tasks, specifically in 4D occupancy forecasting and text-to-image generation. The paper reports state-of-the-art results, although specific quantitative metrics and comparisons to named baselines are not provided in the abstract. The authors claim that MFD enables high-fidelity single-step generation, suggesting a significant improvement over existing methods, but detailed performance metrics would need to be reviewed in the full paper for precise effect sizes.

**Limitations**  
The authors acknowledge that while MFD improves stability and reduces noise, the theoretical guarantees provided may not cover all edge cases in practical applications. Additionally, the reliance on the Mean Flow Matching Theorem may limit the generalizability of the approach to other generative models outside of flow matching. The paper does not discuss potential limitations related to the scalability of MFD or its performance in real-time applications, which could be critical for deployment in dynamic environments.

**Why it matters**  
The introduction of Mean Flow Distillation has significant implications for the field of generative modeling, particularly in enhancing the efficiency and stability of flow matching models. By addressing the computational overhead associated with ODE-based sampling and improving generation quality, MFD paves the way for more practical applications in real-time scenarios. This work contributes to the ongoing discourse on optimizing generative models and could inspire further research into distillation techniques that leverage the geometric properties of generative processes, as published in [arXiv](https://arxiv.org/abs/2606.11155v1).
