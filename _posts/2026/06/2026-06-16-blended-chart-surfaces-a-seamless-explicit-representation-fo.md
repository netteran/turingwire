---
title: "Blended Chart Surfaces: A Seamless Explicit Representation for Smooth Surface Fitting"
date: 2026-06-16 15:39:38 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18069v1"
arxiv_id: "2606.18069"
authors: ["Romy Williamson", "Niloy Mitra"]
slug: blended-chart-surfaces-a-seamless-explicit-representation-fo
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents Blended Chart Surfaces, a novel explicit surface representation that ensures global smoothness and efficient differential quantity access."
---

**Problem**  
The paper addresses the limitations of existing neural surface representations, which often compromise on compactness, explicitness, and smoothness. Current methods, particularly implicit fields, necessitate iso-surfacing for practical applications, while explicit neural maps are hindered by canonical-domain parametrizations and seam artifacts. This work introduces a new representation that overcomes these challenges, providing a seamless and smooth surface fitting method. Notably, this is a preprint and has not undergone peer review.

**Method**  
Blended Chart Surfaces is a network-free, explicit representation that guarantees smoothness by design. The method begins with a coarse proxy mesh that encodes the desired surface topology and approximate geometry. For each vertex of the proxy mesh, a polynomial map is optimized using a standard optimizer to fit an implicit target shape, eliminating the need for input parametrization. The blending of neighboring maps is achieved through a 'one-ring coordinate' scheme, which effectively decouples the topology and coarse geometry from the finer geometric details. This construction is fully differentiable, allowing for stable evaluation of derivatives and direct access to differential quantities such as normals and surface energies. Additionally, the representation is equivariant to rigid motions and scaling of the proxy mesh, enhancing its versatility.

**Results**  
Blended Chart Surfaces were evaluated across various topologies and geometric complexities, demonstrating superior performance compared to explicit alternatives, including interpolating-function baselines and mesh-displacement MLPs. The results indicate a favorable trade-off in terms of compactness, simplicity, and expressivity while maintaining smoothness across patch boundaries. Specific quantitative results were not disclosed in the abstract, but the authors claim significant improvements in the aforementioned metrics over the baseline methods.

**Limitations**  
The authors acknowledge that while Blended Chart Surfaces provide a robust framework for surface representation, the reliance on a coarse proxy mesh may limit the fidelity of the resulting surface in highly detailed scenarios. Additionally, the method's performance in extreme topological variations or highly intricate geometries remains to be fully explored. The paper does not address potential computational overhead associated with the optimization process for the polynomial maps.

**Why it matters**  
The introduction of Blended Chart Surfaces has significant implications for geometry processing, particularly in applications requiring smooth and explicit surface representations. The ability to access differential quantities directly enhances the potential for integration with differentiable optimization frameworks, which is crucial for tasks such as shape analysis, physics-based simulations, and computer graphics. This work lays the groundwork for future research in surface representation and optimization techniques, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.18069v1).
