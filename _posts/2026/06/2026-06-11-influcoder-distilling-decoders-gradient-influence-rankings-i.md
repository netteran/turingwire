---
title: "Influcoder: Distilling Decoders' Gradient Influence Rankings into an Encoder for Data Attribution"
date: 2026-06-11 17:58:33 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13668v1"
arxiv_id: "2606.13668"
authors: ["Dimitri Kachler", "Damien Sileo", "Pascal Denis"]
slug: influcoder-distilling-decoders-gradient-influence-rankings-i
summary_word_count: 431
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Influcoder, a novel method for efficient influence-based data attribution in large language models, addressing speed and storage limitations."
---

**Problem**  
The paper addresses the gap in efficient data attribution methods for large language models (LLMs), particularly focusing on the limitations of existing influence function-based approaches. Current methods, while effective in estimating the influence of individual training samples on model outputs, suffer from high computational costs and storage requirements, making them impractical for large datasets. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
Influcoder distills the gradient influence rankings from decoders into a compact encoder architecture. The authors propose a two-step process: first, they compute influence scores using influence functions on a subset of the training data, and then they train a lightweight encoder to approximate these scores for the entire dataset. The encoder is designed to be computationally efficient, allowing for rapid inference and reduced memory usage. The training process involves a novel loss function that minimizes the discrepancy between the influence scores of the decoder and the predictions of the encoder. The authors do not disclose specific details regarding the training compute or the dataset size used for evaluation.

**Results**  
Influcoder demonstrates significant improvements in both speed and storage efficiency compared to traditional influence function methods. On benchmark datasets, the encoder achieves a 90% reduction in inference time while maintaining over 85% accuracy in influence score approximation when compared to the full influence function method. The authors benchmark their method against established baselines, including influence functions and other data attribution techniques, showing that Influcoder can process datasets with millions of samples without a substantial loss in performance.

**Limitations**  
The authors acknowledge that Influcoder's performance may vary depending on the specific characteristics of the dataset and the model architecture used. They also note that while the method is designed for efficiency, it may not capture all nuances of influence in highly complex datasets. Additionally, the reliance on a subset of data for initial influence score computation could introduce biases that affect the encoder's generalization. The paper does not address potential ethical implications of data attribution, such as privacy concerns related to identifying specific training samples.

**Why it matters**  
The development of Influcoder has significant implications for the field of machine learning, particularly in enhancing the transparency and accountability of LLMs. By enabling efficient data attribution, researchers and practitioners can better understand the impact of training data on model behavior, which is crucial for mitigating issues like bias and toxicity in generated outputs. This work contributes to the ongoing discourse on responsible AI and data governance, as highlighted in related literature on data curation and model interpretability, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13668v1).
