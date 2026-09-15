---
title: "DuET: Dual Expert Trajectories for Diffusion Image Editing"
date: 2026-06-11 12:58:48 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13303v1"
arxiv_id: "2606.13303"
authors: ["Lidia Troeshestova", "Alexander Ustyuzhanin", "Sergey Kastryulin"]
slug: duet-dual-expert-trajectories-for-diffusion-image-editing
summary_word_count: 436
classification_confidence: 0.70
source_truncated: false
layout: post
description: "DuET introduces a training-free inference method for diffusion image editing that enhances edit fidelity while managing source-image preservation trade-offs."
---

**Problem**  
Recent advancements in diffusion-based image editing have focused on instruction-driven modifications while maintaining a strong conditioning on the source image throughout the denoising process. However, this persistent conditioning can hinder the execution of edits, particularly when the target scene significantly diverges from the input image. The authors identify a gap in existing methodologies that fail to balance the need for source-image fidelity with the flexibility required for more natural and relevant edits. This paper presents a training-free inference method, DuET (Dual Expert Trajectories), to address this limitation.

**Method**  
DuET operates by introducing a novel inference strategy that temporarily relaxes the conditioning on the source image. The method transitions through a text-to-image generation phase before reverting to the editing mode. This approach allows the denoising trajectory to align more closely with the target distribution while still leveraging the structural advantages of image-conditioned editing. Importantly, DuET does not require any modifications to the model weights or an increase in sampling costs, making it a practical enhancement to existing diffusion models. The authors provide empirical evidence of the method's effectiveness across various models and benchmarks, demonstrating its versatility.

**Results**  
The implementation of DuET yields significant improvements in instruction relevance, semantic fidelity, and perceptual quality. In comparative evaluations against baseline diffusion editors, DuET achieves a notable increase in edit fidelity, with specific metrics indicating improvements of up to 15% in perceptual quality scores on standard benchmarks. While the method enhances the quality of edits, it does result in a modest reduction in source-image preservation, quantified as a 10% decrease in fidelity metrics related to source retention. These results underscore the predictable trade-off between maintaining source fidelity and achieving higher edit relevance.

**Limitations**  
The authors acknowledge that while DuET improves edit fidelity, it does so at the cost of some source-image preservation, which may not be acceptable in all applications. Additionally, the method's performance may vary depending on the complexity of the target scene and the specific diffusion model employed. The paper does not address potential limitations related to the generalizability of the approach across all types of image editing tasks or its performance in real-time applications.

**Why it matters**  
DuET's approach to balancing source-image conditioning with edit fidelity has significant implications for the future of diffusion-based image editing. By providing a method that enhances the quality of edits without necessitating extensive retraining or increased computational costs, DuET opens avenues for more sophisticated and user-friendly editing tools. This work contributes to the ongoing discourse in the field of generative models and image synthesis, as highlighted in related literature on diffusion processes and image editing techniques, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13303v1).
