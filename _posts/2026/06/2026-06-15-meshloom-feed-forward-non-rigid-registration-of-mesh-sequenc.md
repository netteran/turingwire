---
title: "MeshLoom: Feed-Forward Non-Rigid Registration of Mesh Sequences"
date: 2026-06-15 17:51:38 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.17027v1"
arxiv_id: "2606.17027"
authors: ["Jianqi Chen", "Jiraphon Yenphraphai", "Xiangjun Tang", "Sergey Tulyakov", "Chaoyang Wang", "Peter Wonka"]
slug: meshloom-feed-forward-non-rigid-registration-of-mesh-sequenc
summary_word_count: 399
classification_confidence: 0.70
source_truncated: false
layout: post
description: "MeshLoom introduces a feed-forward network for efficient non-rigid registration of mesh sequences, achieving state-of-the-art performance with a novel topology-aware design."
---

**Problem**  
This paper addresses the limitations of existing non-rigid registration methods, which often rely on computationally expensive per-instance optimization, are restricted to narrow object categories, or only handle pairwise inputs. The authors highlight that current approaches typically yield intermediate outputs rather than directly reconstructing vertex deformations across mesh sequences. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The core contribution of MeshLoom is a feed-forward registration network that employs a topology-aware encoder-decoder architecture. The method begins with a novel topology-aware point representation that encodes the anchor mesh's topology into per-vertex features, enhancing the network's comprehension of the anchor mesh's geometry. This representation helps disambiguate points that are close in Euclidean space but distant in geodesic terms. The multi-modal encoder integrates this anchor-mesh representation with additional cues from each frame, including shape latents and image features. These inputs are compressed into a global motion embedding that captures dense inter-frame correspondences. The lightweight decoder then utilizes this global embedding alongside the anchor-mesh point representation to retrieve per-vertex deformations at specified timestamps. The architecture is designed for efficiency, allowing for the registration of multiple meshes within seconds.

**Results**  
MeshLoom demonstrates superior performance on non-rigid registration tasks, achieving state-of-the-art results across various motion types and object categories. The authors report significant improvements over baseline methods, although specific numerical results and comparisons to named baselines are not detailed in the abstract. The network's ability to generate deformations at intermediate timestamps also facilitates applications in motion interpolation and mesh morphing, showcasing its versatility.

**Limitations**  
The authors acknowledge that while MeshLoom excels in efficiency and accuracy, it may still be constrained by the quality of the input data and the diversity of the training set. They do not explicitly address potential issues related to generalization across highly complex or novel object categories, nor do they discuss the computational requirements for training the model, which could be a consideration for practitioners.

**Why it matters**  
The implications of this work are significant for the fields of computer graphics and computer vision, particularly in applications requiring real-time mesh processing and deformation. The introduction of a topology-aware approach to non-rigid registration could lead to advancements in animation, virtual reality, and medical imaging, where accurate mesh deformations are critical. The methodology and findings presented in this paper could serve as a foundation for future research in mesh processing techniques, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.17027v1).
