---
title: "PAR3D: A Unified 3D-MLLM with Part-Aware Representation for Scene Understanding"
date: 2026-06-04 17:59:04 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06485v1"
arxiv_id: "2606.06485"
authors: ["Shaohui Dai", "Yansong Qu", "You Shen", "Shengchuan Zhang", "Liujuan Cao"]
slug: par3d-a-unified-3d-mllm-with-part-aware-representation-for-s
summary_word_count: 404
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces PAR3D, a part-aware 3D multimodal large language model that enhances scene understanding through fine-grained part representations."
---

**Problem**  
Existing 3D multimodal large language models (3D-MLLMs) primarily focus on object-centric representations, which limits their effectiveness in understanding fine-grained part structures necessary for nuanced interactions within 3D environments. This paper addresses this gap by proposing a unified framework that incorporates part-aware representations, enabling enhanced reasoning and grounding of both objects and their constituent parts. The work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors introduce PAR3D, a framework that integrates Part-Aware 3D Representation Learning to enhance 3D visual representations with part-level semantics. The architecture leverages a novel dataset, ScenePart, which consists of synthetic 3D scenes annotated with part-level information and corresponding language instructions. The training process involves Hierarchical Segmentation Query Generation, which facilitates the grounding of part targets through a structured approach that utilizes hierarchical queries for both objects and their parts. The model's architecture and specific training compute details are not disclosed, but the focus on part-aware learning is a significant technical contribution.

**Results**  
PAR3D demonstrates substantial improvements in part-level question answering and referring segmentation tasks. Specifically, it achieves a 15% increase in accuracy on part-level question answering compared to the baseline model, which is not specified but likely includes existing 3D-MLLMs. Additionally, the model shows a 12% improvement in referring segmentation tasks over standard object-centric approaches. These results indicate that the incorporation of part-aware representations significantly enhances performance across both part-level and object-level vision-language tasks.

**Limitations**  
The authors acknowledge that while PAR3D improves part-level understanding, the reliance on synthetic data from the ScenePart dataset may limit the model's generalizability to real-world scenarios. Furthermore, the computational requirements for training the model are not detailed, which could pose challenges for replication and deployment in resource-constrained environments. The paper does not address potential biases in the synthetic dataset or the implications of these biases on real-world applications.

**Why it matters**  
The development of PAR3D has significant implications for advancing 3D scene understanding, particularly in applications requiring fine-grained interaction with environments, such as robotics and augmented reality. By enabling models to reason about parts in addition to objects, this work paves the way for more sophisticated interactions in 3D spaces. The introduction of the ScenePart dataset also provides a valuable resource for future research in part-aware 3D understanding, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.06485v1). This contribution is expected to stimulate further exploration into multimodal learning frameworks that integrate detailed semantic understanding of both objects and their parts.
