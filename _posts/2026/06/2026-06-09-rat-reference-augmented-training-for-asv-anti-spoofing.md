---
title: "RAT: Reference-Augmented Training for ASV Anti-Spoofing"
date: 2026-06-09 14:20:05 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10908v1"
arxiv_id: "2606.10908"
authors: ["Vojt\u011bch Stan\u011bk", "Anton Firc", "Jakub Re\u0161", "Kamil Malinka"]
slug: rat-reference-augmented-training-for-asv-anti-spoofing
summary_word_count: 413
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents Reference-Augmented Training (RAT) for anti-spoofing in ASV systems, achieving state-of-the-art performance with single detectors."
---

**Problem**  
This work addresses the challenge of anti-spoofing in automatic speaker verification (ASV) systems, specifically focusing on the limitations of existing architectures that rely on speaker-reference recordings. The authors note that prior methods often converge to solutions that neglect the reference during inference, leading to suboptimal performance. This paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a novel training strategy called Reference-Augmented Training (RAT), which conditions the spoofing countermeasure architecture on speaker-reference recordings. The key insight is that training with a reference channel induces a form of invariance that enhances deepfake detection capabilities, even when the reference is absent or mismatched during inference. The architecture employs a single detector framework, and the training process is designed to optimize the model such that the contributions of the reference diminish over time. The authors do not disclose specific details regarding the architecture or the training compute used, but they emphasize the effectiveness of RAT in improving detection performance against single-utterance baselines.

**Results**  
RAT achieves a state-of-the-art Equal Error Rate (EER) of 2.57% and a minimum Detection Cost Function (minDCF) of 0.074 on the ASVspoof 5 benchmark. These results surpass those of existing large ensemble systems, demonstrating the efficacy of the proposed method. The authors provide a rigorous analysis showing that the optimization process leads to a model that is largely independent of the reference channel during inference, which is a significant finding in the context of ASV anti-spoofing.

**Limitations**  
The authors acknowledge that while RAT shows improved performance, the reliance on reference recordings during training may still pose challenges in practical applications where such references are not available. Additionally, the study does not explore the performance of RAT across diverse datasets or in real-world scenarios, which could limit the generalizability of the findings. The authors also do not address potential computational overhead introduced by the training process, which may affect scalability.

**Why it matters**  
The implications of this work are significant for the development of robust ASV systems capable of resisting spoofing attacks. By demonstrating that training with reference channels can enhance detection performance even in their absence, this research opens avenues for further exploration of reference-independent training strategies. The findings contribute to the ongoing discourse in the field of anti-spoofing and speaker verification, as published in [arXiv](https://arxiv.org/abs/2606.10908v1). This could lead to more resilient ASV systems that maintain high performance in varied operational conditions, ultimately enhancing security in voice-based applications.
