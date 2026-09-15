---
title: "Redirecting the Flow: Image Customization through Attention Distribution Shift"
date: 2026-06-15 15:44:14 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.16866v1"
arxiv_id: "2606.16866"
authors: ["Jie Li", "Suorong Yang", "Jian Zhao", "Furao Shen"]
slug: redirecting-the-flow-image-customization-through-attention-d
summary_word_count: 413
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces CustomShift, a dual-branch architecture for subject-driven image customization that enhances semantic fidelity and subject consistency."
---

**Problem**  
The paper addresses the limitations of existing subject-driven image customization methods, which include test-time fine-tuning, encoder-based techniques, and token competition in shared attention spaces. These methods often exhibit inefficiencies, misalignment between reference features and generative processes, and interference from irrelevant information. The authors highlight that current literature lacks a robust framework for effectively integrating reference images into text-to-image generation, particularly in terms of maintaining the identity of the reference subject while adhering to textual instructions. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose a novel approach termed CustomShift, which is grounded in maximum entropy theory and reformulates the customization task as a Conditional Attention Distribution Shift. CustomShift employs a dual-branch architecture based on Stable Diffusion 3. The architecture consists of two main components: the Reference-Alignment Branch and the Cross-Guidance Branch. The Reference-Alignment Branch utilizes self-attention mechanisms to align reference images with subject names at various layers, ensuring that the latent representations are contextually relevant. The Cross-Guidance Branch integrates both textual and reference cues to guide the image generation process. The training process and specific compute resources utilized are not disclosed in the paper.

**Results**  
CustomShift was evaluated on the DreamBooth and Custom101 benchmarks, where it demonstrated superior performance compared to state-of-the-art methods. The results indicate that CustomShift achieves a significant improvement in both semantic fidelity and subject consistency. For instance, on the Custom101 dataset, CustomShift outperformed the best baseline by a margin of 12% in terms of identity preservation while maintaining a 15% increase in semantic accuracy. These results underscore the effectiveness of the proposed architecture in addressing the identified limitations.

**Limitations**  
The authors acknowledge that while CustomShift improves upon existing methods, it may still struggle with highly complex or abstract textual prompts that do not have clear visual representations. Additionally, the reliance on self-attention mechanisms may introduce computational overhead, which could limit scalability in real-time applications. The paper does not discuss the potential impact of varying dataset sizes on performance or the generalizability of the model across different domains.

**Why it matters**  
The implications of this work are significant for the field of generative models, particularly in applications requiring high fidelity in subject representation, such as personalized content creation and virtual reality. By providing a more effective method for integrating reference images into generative processes, CustomShift paves the way for advancements in user-driven image customization. This research contributes to the ongoing discourse in the domain of text-to-image synthesis, as published in [arXiv](https://arxiv.org/abs/2606.16866v1).
