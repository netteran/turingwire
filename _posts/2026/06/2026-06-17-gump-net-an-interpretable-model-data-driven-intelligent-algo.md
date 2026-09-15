---
title: "GUMP-Net: An interpretable model-data-driven intelligent algorithm for multi-class pelvic segmentation"
date: 2026-06-17 15:52:34 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.19215v1"
arxiv_id: "2606.19215"
authors: ["Liheng Wang", "Yinghui Zhang", "Licheng Zhang", "Hailin Xu", "Qiyong Cao", "Chong Chen"]
slug: gump-net-an-interpretable-model-data-driven-intelligent-algo
summary_word_count: 406
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces GUMP-Net, an interpretable model-data-driven algorithm for multi-class pelvic segmentation, enhancing accuracy and robustness."
---

**Problem**  
Pelvic segmentation is critical for precise diagnosis, treatment, and surgical planning in pelvic fractures. Existing methods often struggle with accuracy and robustness, particularly in scenarios with limited training data. This work addresses these limitations by proposing GUMP-Net, an interpretable model-data-driven intelligent algorithm specifically designed for multi-class pelvic segmentation. The authors note that this is a preprint and has not yet undergone peer review.

**Method**  
GUMP-Net integrates an improved geodesic active contour model with deep learning techniques. The architecture consists of three key modules: 
1. **Object Detection Module**: This module automates the initialization of level sets, enhancing the segmentation process.
2. **Edge Detector Module**: It learns an anatomy-aware edge detection function, which improves the model's ability to delineate anatomical structures accurately.
3. **Iteration Module**: This module facilitates deep level set evolution, allowing for iterative refinement of segmentation results.

The training process leverages a combination of labeled pelvic datasets, although specific details regarding the dataset size and training compute resources are not disclosed. The model's design emphasizes interpretability, providing insights into the segmentation process through geometric perspectives.

**Results**  
GUMP-Net demonstrates superior performance compared to state-of-the-art segmentation methods, particularly in scenarios with small training datasets. The authors report significant improvements in segmentation accuracy and robustness, although specific quantitative metrics (e.g., Dice coefficient, Intersection over Union) and baseline comparisons are not detailed in the abstract. The model's effectiveness is validated through extensive experiments on pelvic datasets, with additional tests on ankle datasets suggesting its applicability to other anatomical regions.

**Limitations**  
The authors acknowledge that the performance of GUMP-Net may be contingent on the quality and quantity of training data, particularly in complex anatomical regions. They do not address potential limitations related to generalizability across diverse populations or variations in imaging modalities. Additionally, the interpretability aspect, while highlighted, may require further empirical validation to establish its practical utility in clinical settings.

**Why it matters**  
The development of GUMP-Net represents a significant advancement in the field of medical image segmentation, particularly for pelvic anatomy, which is often challenging due to its complex structure. The model's ability to provide interpretable results can enhance clinician trust and facilitate better decision-making in surgical planning and treatment. Furthermore, the broader applicability to other anatomical regions, as indicated by experiments on ankle datasets, opens avenues for future research and application in various medical imaging tasks. This work contributes to the ongoing discourse on integrating deep learning with traditional image processing techniques, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.19215v1).
