---
title: "Next Forcing: Causal World Modeling with Multi-Chunk Prediction"
date: 2026-06-09 17:59:22 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11187v1"
arxiv_id: "2606.11187"
authors: ["Gangwei Xu", "Qihang Zhang", "Jiaming Zhou", "Xing Zhu", "Yujun Shen", "Xin Yang"]
slug: next-forcing-causal-world-modeling-with-multi-chunk-predicti
summary_word_count: 407
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper introduces Next Forcing, a multi-chunk prediction framework that enhances causal world modeling for video generation, improving training speed and accuracy."
---

**Problem**  
Existing autoregressive video generation methods for World Action Models (WAMs) face challenges in training convergence and accuracy, particularly at high frame rates. Current approaches are limited by their reliance on immediate chunk supervision, lacking explicit future dynamics signals, which leads to slow inference due to iterative video denoising. This paper addresses these limitations by proposing a novel framework, Next Forcing, which is presented as a preprint and has not yet undergone peer review.

**Method**  
Next Forcing introduces a multi-chunk prediction (MCP) framework that incorporates lightweight auxiliary MCP modules into the main model. These modules are designed to predict multiple future video chunks (next$^1$, next$^2$, next$^3$) simultaneously, forming a causal chain that allows predictions at near-future timeframes to inform those at farther horizons. The MCP training objective enhances the main model by providing dense multi-scale temporal supervision, leveraging intermediate features from various layers. The architecture is optimized for high frame rates, and the training process is accelerated significantly, achieving faster convergence and improved accuracy. The paper reports a 2.3x increase in convergence speed at 50 fps.

**Results**  
Next Forcing demonstrates a 93.1% relative improvement over the LingBot-VA baseline at 5k training steps, achieving state-of-the-art results on the RoboTwin benchmark with scores of 94.1% and 93.5% on Clean and Random settings, respectively. Additionally, the framework shows over 50% reduction in Fréchet Video Distance (FVD) on general video pretraining tasks and significant performance enhancements on the PhyWorld benchmark, which evaluates adherence to physical laws in video generation. The inference process is also accelerated by 2x due to the parallel prediction capability of the MCP modules.

**Limitations**  
The authors acknowledge that while Next Forcing improves training speed and accuracy, the reliance on auxiliary modules may introduce additional complexity in model architecture. Furthermore, the performance gains are primarily demonstrated on specific benchmarks, and the generalizability of the approach to other domains or tasks remains to be validated. The paper does not address potential scalability issues when applied to larger datasets or more complex video generation tasks.

**Why it matters**  
The advancements presented in Next Forcing have significant implications for the field of video generation and causal modeling, particularly in enhancing the efficiency and effectiveness of training processes. The ability to predict multiple future video chunks simultaneously could lead to more robust models capable of generating high-quality video content at scale. This work lays the groundwork for future research in causal world modeling and autoregressive generation techniques, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11187v1).
