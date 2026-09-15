---
title: "Earth-OneVision: Extending Remote Sensing Multimodal Large Language Models to More Sensor Modalities and Tasks"
date: 2026-06-09 13:01:51 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10819v1"
arxiv_id: "2606.10819"
authors: ["Miaoxin Cai", "Guanqun Wang", "Wei Zhang", "Guangyao Zhou", "Yin Zhuang", "Tong Zhang"]
slug: earth-onevision-extending-remote-sensing-multimodal-large-la
summary_word_count: 415
classification_confidence: 0.85
source_truncated: false
layout: post
description: "Earth-OneVision introduces a unified multimodal large language model for remote sensing, integrating six sensor types and enhancing cross-modal tasks."
---

**Problem**  
Existing remote sensing multimodal large language models (RS-MLLMs) are limited in their support for diverse sensor modalities and tasks, resulting in a fragmented understanding of geoscientific data. This paper addresses the gap by proposing Earth-OneVision, which integrates six sensor modalities—optical, synthetic aperture radar (SAR), infrared, multispectral, temporal, and video—into a single autoregressive framework. The work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
Earth-OneVision employs a 2 billion parameter architecture that incorporates three innovative mechanisms to enhance multimodal learning:  
1. **Full-Granularity Vision-Language Alignment (FGVLA)**: This mechanism aligns multi-level visual features with a multi-dimensional language space, facilitating richer interactions between visual and textual data.  
2. **Spatial-Linguistic Isomorphic Serialization (SLIS)**: SLIS transforms heterogeneous spatial outputs into autoregressive tokens, allowing for a unified representation of spatial information across different modalities.  
3. **Progressive Cross-Modality Adaptation (PCMA)**: This approach decomposes the compound domain gap into sequential stages, addressing viewpoint and imaging physics discrepancies in a structured manner.  
The model is trained on a dataset comprising approximately 34 million question-answer pairs that span all six sensor modalities and nine task categories, significantly surpassing existing datasets in the field.

**Results**  
Earth-OneVision demonstrates competitive performance across various benchmarks, often surpassing larger models (4B-72B parameters). Key results include:  
- **87.52% P@0.5** on the OPT-RSVG test set for optical visual grounding, outperforming previous models.  
- **80.68% accuracy** on the SAR VQA benchmark (SARLANG-Bench), exceeding 7B parameter models by over 7%.  
- **75.74% recall** on the BigEarthNet-MS test set for multispectral classification.  
- **81.94% accuracy** on the EarthMind-Bench for cross-modality reasoning tasks.  
These results indicate that Earth-OneVision not only matches but often exceeds the performance of larger RS-MLLMs, showcasing its efficiency and effectiveness.

**Limitations**  
The authors acknowledge that while Earth-OneVision integrates multiple modalities, the model's performance may still be constrained by the quality and diversity of the training data. Additionally, the autoregressive nature of the model may limit its efficiency in real-time applications. The paper does not address potential challenges related to the scalability of the model or its adaptability to new sensor modalities that may emerge in the future.

**Why it matters**  
The development of Earth-OneVision has significant implications for the field of remote sensing and geoscience, as it enables a more comprehensive understanding of earth observation data through enhanced multimodal integration. This work lays the groundwork for future research in cross-modal learning and could facilitate advancements in applications such as environmental monitoring, disaster response, and urban planning. The findings are detailed in the preprint available on [arXiv](https://arxiv.org/abs/2606.10819v1).
