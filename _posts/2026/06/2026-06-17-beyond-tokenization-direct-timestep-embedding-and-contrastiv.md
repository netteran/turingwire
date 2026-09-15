---
title: "Beyond Tokenization: Direct Timestep Embedding and Contrastive Alignment for Time-Series Question Answering"
date: 2026-06-17 12:07:23 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18986v1"
arxiv_id: "2606.18986"
authors: ["Yafeng Wu", "Huu Hiep Nguyen", "Thin Nguyen", "Hung Le"]
slug: beyond-tokenization-direct-timestep-embedding-and-contrastiv
summary_word_count: 447
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces CADE, a framework for time-series question answering that enhances LLM performance by addressing tokenization issues through direct timestep embedding."
---

**Problem**  
This work addresses the limitations of existing time-series question answering (TSQA) methods, particularly the tokenization bottleneck encountered when using large language models (LLMs). Traditional approaches fragment continuous numerical data into tokens via Byte Pair Encoding, which disrupts the inherent structure of time-series data, leading to a loss of critical information such as magnitude, scale, and trends. Additionally, prior methods often rely on patch-based encoders that impose fixed window sizes, which can obscure temporal patterns and fail to generalize across datasets with varying lengths or sampling rates. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose CADE (Contrastive Alignment with Direct Embedding), which consists of two main components: direct timestep embedding and semantic alignment. The direct timestep embedding utilizes a point-wise linear encoder followed by a multi-layer perceptron (MLP) projector to map each timestep directly into the LLM embedding space. This approach preserves exact index-level access to the data, eliminating the need for patching and padding. To enhance the semantic alignment between time-series embeddings and language representations, the authors introduce a novel one-directional supervised contrastive loss. This loss function aligns the embeddings of time-series data with frozen class-name text anchors, facilitating better integration of temporal and linguistic information.

**Results**  
CADE was evaluated on the Time-MQA benchmark, which encompasses six distinct TSQA tasks. The framework demonstrated consistent performance improvements over both open-source and proprietary LLM baselines. Specific results include a performance increase of up to 15% in accuracy compared to the best-performing baseline models, showcasing the effectiveness of the direct timestep embedding and the contrastive alignment approach. The authors provide detailed metrics for each task, indicating that CADE outperforms existing methods across the board.

**Limitations**  
The authors acknowledge that while CADE improves performance in TSQA, it may still be sensitive to the quality of the input time-series data and the choice of class-name anchors used for contrastive alignment. Additionally, the framework's reliance on LLMs means that it inherits their limitations, such as potential biases in language representation. The paper does not address the computational overhead introduced by the additional embedding and alignment processes, which may impact scalability in real-world applications.

**Why it matters**  
The introduction of CADE represents a significant advancement in the field of time-series analysis, particularly in its application to natural language processing tasks. By overcoming the tokenization bottleneck and enhancing the semantic alignment between time-series data and language models, this work opens new avenues for integrating temporal data into LLMs. The implications of this research extend to various domains, including finance, healthcare, and IoT, where time-series data is prevalent. Future research can build upon CADE's framework to explore further enhancements in TSQA and related tasks, as published in [arXiv](https://arxiv.org/abs/2606.18986v1).
