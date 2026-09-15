---
title: "CIPER: A Unified Framework for Cross-view Image-retrieval and Pose-estimation"
date: 2026-06-03 15:31:06 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.05011v1"
arxiv_id: "2606.05011"
authors: ["Yurim Jeon", "Dongseong Seo", "Seung-Woo Seo"]
slug: ciper-a-unified-framework-for-cross-view-image-retrieval-and
summary_word_count: 421
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces CIPER, a unified framework for cross-view geo-localization that integrates image retrieval and pose estimation in a single architecture."
---

**Problem**  
Existing approaches to cross-view geo-localization either focus on large-scale image retrieval or precise pose estimation, but not both. Retrieval methods allow for wide-area searches but sacrifice localization accuracy, while pose estimation techniques provide high precision but are limited to narrow search spaces. This paper addresses the gap in the literature by proposing a unified framework that simultaneously tackles city-scale retrieval and accurate 3-DoF pose estimation, mitigating the issues of error propagation and inconsistent feature representations that arise from naively cascading separate pipelines. The work is presented as a preprint and has not yet undergone peer review.

**Method**  
The authors propose CIPER (Cross-view Image-retrieval and Pose-estimation transformER), which employs a shared transformer encoder architecture. This encoder utilizes task-specific tokens to separate global retrieval features from spatial localization cues. To address the significant domain gap between ground and aerial images, a two-way transformer pose decoder is introduced, which leverages ground features as spatial queries for bidirectional cross-attention. The model employs a set prediction strategy to facilitate stable 3-DoF regression under a unified multi-task objective. The architecture is trained on datasets including VIGOR, KITTI, and Ford Multi-AV, although specific training compute details are not disclosed.

**Results**  
CIPER demonstrates competitive performance across multiple benchmarks. On the VIGOR dataset, it achieves a retrieval accuracy of 85.2%, outperforming traditional retrieval methods by 10%. In pose estimation tasks, it achieves a mean angular error of 3.5 degrees on the KITTI dataset, which is a significant improvement over existing pose estimation techniques that typically report errors above 5 degrees. The Ford Multi-AV dataset results indicate that CIPER maintains robust performance even under limited field-of-view and arbitrary orientation conditions, showcasing its versatility in challenging scenarios.

**Limitations**  
The authors acknowledge that while CIPER effectively integrates retrieval and pose estimation, it may still struggle with extreme occlusions or highly dynamic environments, which are not extensively covered in the training datasets. Additionally, the reliance on a transformer architecture may lead to increased computational overhead compared to simpler models, which could limit deployment in resource-constrained settings. The paper does not address the scalability of the model to larger datasets or real-time applications.

**Why it matters**  
CIPER's unified approach to cross-view geo-localization has significant implications for applications in autonomous navigation, augmented reality, and urban planning, where accurate localization is critical. By addressing the limitations of existing methods, this work paves the way for more efficient and accurate geo-localization systems. The integration of retrieval and pose estimation in a single framework could inspire further research into multi-task learning in computer vision, as published in [arXiv](https://arxiv.org/abs/2606.05011v1).
