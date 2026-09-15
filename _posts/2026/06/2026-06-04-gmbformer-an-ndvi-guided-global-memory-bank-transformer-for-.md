---
title: "GMBFormer: An NDVI-Guided Global Memory Bank Transformer for Urban Green-Space Extraction from Ultra-High-Resolution Imagery"
date: 2026-06-04 16:32:58 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06363v1"
arxiv_id: "2606.06363"
authors: ["Hao Lei", "Xi Cheng", "Chenlu Shu", "Zhiheng Chen", "Zhengjie Duan", "Haoyu Wang"]
slug: gmbformer-an-ndvi-guided-global-memory-bank-transformer-for-
summary_word_count: 411
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces GMBFormer, a novel transformer architecture for urban green-space extraction that leverages NDVI and a global memory bank for improved performance."
---

**Problem**  
Urban green-space extraction from ultra-high-resolution (UHR) imagery typically relies on patch-wise analysis, which restricts the semantic reuse of visually similar vegetation patterns across spatially separated areas. Existing methods that integrate the Normalized Difference Vegetation Index (NDVI) into RGB backbones often conflate visual appearance learning with physical vegetation confidence, leading to suboptimal performance. This work addresses these limitations by proposing a new architecture, GMBFormer, which utilizes a global memory bank to enhance feature extraction and semantic understanding. The paper is a preprint and has not undergone peer review.

**Method**  
GMBFormer is built on the SegFormer architecture, replacing traditional adjacency-driven feature propagation with a selective, similarity-driven prototype retrieval mechanism. The architecture processes only RGB channels through the backbone and decoder, while NDVI is utilized as a physics-informed gate. This gate allows high-confidence vegetation descriptors to be stored in a compact global memory bank, updated through momentum techniques. During both training and inference, the current patch queries the memory bank using memory-mediated cross-attention, integrating the retrieved prototypes with minimal computational overhead. The model is trained on a self-constructed Chengdu UHR dataset comprising 7,700 labeled patches of size 512 x 512, alongside two reduced-label settings derived from the ISPRS Potsdam dataset.

**Results**  
GMBFormer demonstrates significant improvements over the SegFormer-B4 baseline across multiple evaluation settings. The model achieves mean intersection over union (mIoU) scores of 89.25%, 92.17%, and 83.72%, and mean Dice (mDice) scores of 94.31%, 95.92%, and 90.86%, respectively, in the three experimental configurations. These results indicate a consistent enhancement in performance, showcasing the effectiveness of the proposed memory retrieval and NDVI decoupling strategies.

**Limitations**  
The authors acknowledge that the reliance on a specific dataset (Chengdu UHR) may limit the generalizability of the findings. Additionally, the performance gains are contingent on the quality of the NDVI data and the memory bank's capacity, which may not be optimal in all scenarios. The paper does not address potential computational costs associated with maintaining and querying the global memory bank, which could impact scalability in real-world applications.

**Why it matters**  
The introduction of GMBFormer represents a significant advancement in urban green-space extraction methodologies, particularly in leveraging NDVI for improved semantic understanding without compromising visual feature learning. This work has implications for urban planning, environmental monitoring, and remote sensing applications, as it enhances the accuracy of vegetation mapping from UHR imagery. The findings and methodologies presented in this paper could inform future research in memory-augmented neural networks and their applications in other domains, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.06363v1).
