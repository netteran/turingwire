---
title: "Probing Low Frame Rate Degradation in Neural Audio Codecs"
date: 2026-06-15 17:06:21 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16969v1"
arxiv_id: "2606.16969"
authors: ["Alex Gichamba", "Moise Busogi"]
slug: probing-low-frame-rate-degradation-in-neural-audio-codecs
summary_word_count: 439
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates low frame rate degradation in neural audio codecs, revealing training configuration as a key factor affecting performance."
---

**Problem**  
This work addresses the insufficient understanding of low frame rate degradation in neural audio codecs, particularly in the context of autoregressive speech synthesis. While prior research has shown that codecs can function effectively at frame rates as low as 12.5 Hz, a significant quality drop, termed the "quality cliff," occurs at 6.25 Hz. The authors note that existing literature does not adequately explain the mechanisms behind this degradation, which is critical for optimizing codec performance. This paper is a preprint and has not undergone peer review.

**Method**  
The authors conduct a controlled ablation study to investigate the effects of varying frame rates on audio codec performance. They reproduce the quality cliff at 6.25 Hz and explore two potential explanations: phonemic collisions and codebook saturation. However, neither explanation is supported by the data. Instead, the authors identify that the degradation is primarily due to suboptimal training configurations, specifically the use of fixed clip durations during training. This approach results in an insufficient number of tokens at lower frame rates, which limits the decoder's access to inter-token context. The authors propose a revised training strategy that allows for more flexible token generation, enabling the decoder to maintain performance at lower frame rates.

**Results**  
The study demonstrates that once the training configuration is optimized, word error rates (WER) degrade smoothly with phonemic load down to frame rates of 3.1 Hz and 1.6 Hz. This finding contrasts with the abrupt quality cliff observed at 6.25 Hz under the previous training regime. The results indicate that the efficiency gains associated with low frame rate codecs are more attainable than previously thought, suggesting that with appropriate training adjustments, performance can be sustained even at significantly reduced frame rates.

**Limitations**  
The authors acknowledge that their findings are contingent on the specific training configurations tested and may not generalize across all neural audio codec architectures. Additionally, the study does not explore the impact of other potential factors influencing low frame rate performance, such as the choice of loss functions or the architecture of the neural network itself. The lack of peer review also raises questions about the robustness of the findings.

**Why it matters**  
This research has significant implications for the design and training of neural audio codecs, particularly in applications requiring efficient speech synthesis. By elucidating the role of training configurations in low frame rate performance, the findings encourage further exploration of adaptive training strategies that could enhance codec efficiency. This work contributes to the broader understanding of neural audio processing and may inform future developments in the field, as discussed in related literature on codec optimization and speech synthesis techniques, as published in [arXiv](https://arxiv.org/abs/2606.16969v1).
