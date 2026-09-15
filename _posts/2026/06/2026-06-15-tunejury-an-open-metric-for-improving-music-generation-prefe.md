---
title: "TuneJury: An Open Metric for Improving Music Generation Preference Alignment"
date: 2026-06-15 17:39:30 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.17006v1"
arxiv_id: "2606.17006"
authors: ["Yonghyun Kim", "Junwon Lee", "Haiwen Xia", "Yinghao Ma", "Junghyun Koo", "Koichi Saito"]
slug: tunejury-an-open-metric-for-improving-music-generation-prefe
summary_word_count: 422
classification_confidence: 0.80
source_truncated: false
layout: post
description: "TuneJury introduces a novel pairwise reward model for text-to-music generation, enhancing preference alignment through calibrated scoring and efficient post-hoc adjustments."
---

**Problem**  
This paper addresses the lack of effective metrics for aligning music generation with human preferences, particularly in the context of text-to-music models. Existing methods often fail to provide reliable preference scores that can be generalized across different datasets and applications. The authors present TuneJury as an open, instance-level pairwise reward model that predicts music preference scores based on text prompts and audio clips. This work is a preprint and has not undergone peer review.

**Method**  
TuneJury employs a pairwise reward model trained on a diverse set of human-preference labels, including arena-style votes, metric-alignment preference pairs, crowdsourced comparisons, and expert aesthetic ratings. The model's architecture is not explicitly detailed, but it is designed to output a calibrated score margin between two audio clips. The training process utilizes publicly available datasets, ensuring broad applicability. A key innovation is the introduction of anchor calibration, a post-hoc method that applies a per-system Bradley-Terry calibration to improve data efficiency and recover agreement without the need for retraining the entire model. This allows for effective adaptation to new generators released after the initial training phase.

**Results**  
TuneJury demonstrates strong performance on held-out test pairs, achieving competitive results against prior baselines on out-of-distribution benchmarks. The authors report that the predicted score margins are well-calibrated, enabling effective data filtering through a simple score threshold. The model's performance is validated across three downstream applications: inference-time best-of-N selection, DITTO-style latent optimization, and expert-iteration post-training, where it consistently drives reward-axis gains. Specific numerical results are not disclosed in the abstract, but the competitive nature of the model is emphasized.

**Limitations**  
The authors acknowledge that while TuneJury shows promise, its performance may vary depending on the specific characteristics of the audio clips and text prompts used. Additionally, the reliance on publicly available datasets may limit the model's generalizability to niche music genres or styles not well-represented in the training data. The paper does not address potential biases in the human-preference labels or the implications of using crowdsourced data.

**Why it matters**  
TuneJury's introduction of a calibrated pairwise reward model for music generation represents a significant advancement in aligning AI-generated music with human preferences. Its ability to generalize across different datasets and applications opens new avenues for research in music generation and preference modeling. The efficient post-hoc calibration method also provides a practical solution for adapting existing models to new data without extensive retraining, which is crucial for real-world applications. This work lays the groundwork for future developments in preference alignment in generative models, as discussed in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.17006v1).
