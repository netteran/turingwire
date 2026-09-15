---
title: "MOFA-VTON: More Fashion Possibilities with Fine-Grained Adaptations in Virtual Try-On"
date: 2026-06-09 17:34:25 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11148v1"
arxiv_id: "2606.11148"
authors: ["Xiaoyu Han", "Chenyang Wang", "Jing Wang", "Shunyuan Zheng", "Quanling Meng", "Shengping Zhang"]
slug: mofa-vton-more-fashion-possibilities-with-fine-grained-adapt
summary_word_count: 388
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MOFA-VTON, a novel virtual try-on method that enhances clothing adaptation through user sketches and fine-grained layout adjustments."
---

**Problem**  
Current virtual try-on methods primarily focus on direct clothing replacement, which limits the diversity and flexibility of try-on outputs. This paper addresses the gap in the literature regarding user control over clothing adaptations, as existing approaches do not allow for nuanced adjustments that reflect individual preferences and varied wearing styles. The authors propose a solution to this limitation by enabling users to influence the try-on results through simple sketches, thus enhancing the personalization of virtual try-on experiences. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The proposed MOFA-VTON method introduces a mask construction strategy that converts user-drawn curve sketches into a dual-region mask, which replaces the conventional clothing-agnostic mask. This dual-region mask provides fine-grained layout guidance for the generation process. Additionally, the authors implement layout adjustment blocks that leverage a cross-attention mechanism to learn layout correspondences independently for the upper and lower body regions. This allows for refined spatial arrangements of clothing items, facilitating flexible adaptations that are not constrained by a fixed layout. The training process and specific compute resources utilized are not disclosed in the paper.

**Results**  
MOFA-VTON demonstrates superior performance on the VITON-HD and DressCode datasets, achieving significant improvements over previous state-of-the-art methods. The paper reports a notable increase in qualitative and quantitative metrics, although specific numerical results and effect sizes are not detailed in the abstract. The authors emphasize that their method provides a broader range of fashion possibilities compared to existing techniques, indicating a substantial enhancement in user experience and output diversity.

**Limitations**  
The authors acknowledge that while MOFA-VTON improves flexibility in virtual try-on, it may still face challenges in accurately capturing complex clothing interactions and textures. Additionally, the reliance on user sketches may introduce variability in output quality based on user skill. The paper does not address potential computational efficiency concerns or the scalability of the method to real-time applications, which could be critical for practical deployment.

**Why it matters**  
The advancements presented in MOFA-VTON have significant implications for the field of virtual try-on systems, particularly in enhancing user engagement and satisfaction through personalized experiences. By allowing users to exert more control over clothing adaptations, this method could lead to broader applications in e-commerce and fashion technology. The findings contribute to ongoing research in generative models and user-interactive systems, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11148v1).
