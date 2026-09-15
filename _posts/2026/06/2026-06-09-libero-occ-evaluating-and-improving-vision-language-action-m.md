---
title: "LIBERO-Occ: Evaluating and Improving Vision-Language-Action Models under Scene-Induced Occlusion via Viewpoint Imagination"
date: 2026-06-09 13:39:49 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10862v1"
arxiv_id: "2606.10862"
authors: ["Taishan Li", "Jiwen Zhang", "Siyuan Wang", "Xuanjing Huang", "Zhongyu Wei"]
slug: libero-occ-evaluating-and-improving-vision-language-action-m
summary_word_count: 444
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces LIBERO-Occ, an extension for evaluating and enhancing Vision-Language-Action models under scene-induced occlusion using Viewpoint Imagination."
---

**Problem**  
Current Vision-Language-Action (VLA) models are evaluated primarily under the assumption that all task-relevant objects are visible, which does not reflect real-world scenarios where occlusion is prevalent. This paper addresses the gap in the literature regarding the performance of VLA models under scene-induced occlusion, a challenge that has not been adequately explored. The authors present LIBERO-Occ, an occlusion-oriented extension of the existing LIBERO framework, to systematically evaluate and improve VLA models in partially observable environments. This work is a preprint and has not undergone peer review.

**Method**  
The core technical contribution of this paper is the introduction of Viewpoint Imagination (VIM), a novel mechanism that generates an imagined complementary view from an occluded primary observation. VIM conditions action prediction on both the observed and the imagined evidence, effectively enhancing the model's ability to infer actions despite occlusions. The authors conducted experiments using various task suites and occlusion types, demonstrating the robustness of VIM across different severity levels of occlusion. The architecture specifics, loss functions, and training compute details are not disclosed in the paper, but the authors provide a benchmark and code for LIBERO-Occ, which can be accessed at their GitHub repository.

**Results**  
The experimental results indicate that state-of-the-art VLA models experience significant performance degradation when faced with occlusion. Specifically, the introduction of VIM leads to a marked improvement in action prediction accuracy across multiple benchmarks. While exact performance metrics are not detailed in the abstract, the authors report substantial gains over baseline models that do not utilize viewpoint imagination, highlighting the effectiveness of their approach in mitigating the challenges posed by occlusion.

**Limitations**  
The authors acknowledge that their approach may not fully account for all types of occlusion and that the effectiveness of VIM could vary depending on the complexity of the scene and the nature of the occlusion. Additionally, the reliance on imagined views may introduce biases if the generated viewpoints do not accurately represent the occluded objects. The paper does not discuss the computational overhead introduced by the viewpoint imagination process, which could impact real-time applications.

**Why it matters**  
The implications of this work are significant for the development of robust VLA systems capable of operating in real-world environments where occlusion is common. By addressing the limitations of existing models, LIBERO-Occ and VIM provide a framework for improving the reliability of action prediction in partially observable settings. This advancement is crucial for applications in robotics and autonomous systems, where accurate manipulation in cluttered environments is essential. The findings and methodologies presented in this paper contribute to the ongoing discourse in the field, as discussed in related works on occlusion handling and perception completion, and are available for further exploration on [arXiv](https://arxiv.org/abs/2606.10862v1).
