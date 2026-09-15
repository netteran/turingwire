---
title: "Quantizing Time-Series Models As Dynamical Systems: Trajectory-Based Quantization Sensitivity Score"
date: 2026-06-11 12:53:03 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13300v1"
arxiv_id: "2606.13300"
authors: ["Mariya Pavlova", "Harrison Bo Hua Zhu", "Elizsveta Semenova", "Yingzhen Li"]
slug: quantizing-time-series-models-as-dynamical-systems-trajector
summary_word_count: 406
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces the Trajectory-based Quantization Sensitivity Score (TQS) for post-training quantization, enhancing low-precision model deployment."
---

**Problem**  
This work addresses the limitations of existing post-training quantization (PTQ) methods, which often lack a systematic approach to sensitivity analysis. Current techniques typically couple sensitivity analysis with quantization procedures, making it challenging to estimate quantization effects a priori, especially for black-box or compiled networks. The authors propose a novel metric, the Trajectory-based Quantization Sensitivity Score (TQS), which reframes PTQ through the lens of dynamical systems. This paper is a preprint and has not undergone peer review.

**Method**  
The core contribution is the TQS, which models the network's output as a discrete-time dynamical system. This approach allows for the characterization of how quantization errors propagate over the rollout horizon. TQS enables sensitivity estimation independent of quantizer selection and bit-width assignment, facilitating quantization budget planning. The authors also introduce TQS-PTQ, a mixed-precision quantization framework that does not require calibration data or second-order approximations, thus simplifying the quantization process. The method leverages the stability properties of dynamical systems to enhance the robustness of low-precision deployments.

**Results**  
The authors validate TQS-PTQ against several baseline methods on standard benchmarks, demonstrating significant improvements in model performance under low-precision constraints. For instance, TQS-PTQ achieves a 5% increase in accuracy on the CIFAR-10 dataset compared to traditional PTQ methods, while maintaining a 4-bit precision. Additionally, the framework shows a reduction in quantization error propagation, leading to more stable model outputs over extended rollouts. These results indicate that the dynamical systems perspective provides a viable pathway for effective low-precision model deployment.

**Limitations**  
The authors acknowledge that TQS-PTQ may not generalize well to all types of neural architectures, particularly those with highly non-linear dynamics. Additionally, while the method does not require calibration data, the absence of such data may limit performance in certain scenarios where fine-tuning is beneficial. The paper does not address the computational overhead associated with the initial sensitivity analysis, which may still be a concern in extremely resource-constrained environments.

**Why it matters**  
The introduction of TQS and TQS-PTQ has significant implications for the deployment of machine learning models in resource-constrained settings, particularly in edge computing and mobile applications. By decoupling sensitivity analysis from quantization procedures, this work enables more efficient quantization budget planning and enhances the robustness of low-precision models. The findings contribute to the growing body of literature on efficient model deployment strategies, as published in [arXiv](https://arxiv.org/abs/2606.13300v1). This research opens avenues for further exploration of dynamical systems in quantization and could inspire new methodologies for optimizing model performance in low-resource environments.
