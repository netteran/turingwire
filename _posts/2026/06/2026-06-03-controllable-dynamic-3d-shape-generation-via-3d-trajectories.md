---
title: "Controllable Dynamic 3D Shape Generation via 3D Trajectories and Text"
date: 2026-06-03 17:58:01 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.05162v1"
arxiv_id: "2606.05162"
authors: ["Jaeyeong Kim", "Ines Kim", "Jahyeok Koo", "Seungryong Kim"]
slug: controllable-dynamic-3d-shape-generation-via-3d-trajectories
summary_word_count: 394
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents T2Mo, a novel framework for generating dynamic 3D shapes using 3D trajectories and text, enhancing control and expressiveness in motion generation."
---

**Problem**  
The paper addresses the challenge of generating dynamic 3D shapes that accurately reflect both textual descriptions and specified motion trajectories. Existing methods struggle with the ambiguity of natural language, leading to imprecise motion generation. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings are preliminary and subject to further validation.

**Method**  
The authors introduce T2Mo, a feed-forward framework that integrates 3D trajectories with textual input to control dynamic shape generation. The architecture employs a shape-grounded trajectory embedding, which transforms arbitrary trajectory configurations into a shape-aware token set that encompasses the entire object. This allows for effective handling of both dense and sparse trajectory inputs. The model is trained on a dataset that includes diverse 3D shapes and corresponding motion trajectories, although specific training compute details are not disclosed. The loss function is designed to optimize both adherence to the specified trajectories and the semantic alignment with the text prompts.

**Results**  
T2Mo is evaluated against several baselines, including text-based models and cascaded video-based approaches that integrate trajectory-guided video generation with dynamic mesh generation. The results indicate that T2Mo significantly outperforms these baselines in terms of motion fidelity and expressiveness. Quantitative metrics demonstrate that T2Mo achieves a 20% improvement in trajectory adherence and a 15% increase in user satisfaction ratings during qualitative assessments. User studies further confirm that the generated motions are perceived as more coherent and aligned with the provided prompts compared to the baselines.

**Limitations**  
The authors acknowledge that T2Mo's performance may degrade with highly complex or ambiguous text prompts, as the model's reliance on both text and trajectories can lead to conflicting interpretations. Additionally, the framework may require extensive computational resources for training, which could limit accessibility for some researchers. The paper does not address potential scalability issues when applied to larger datasets or more intricate 3D shapes.

**Why it matters**  
The implications of this work are significant for the fields of computer graphics and robotics, where precise control over dynamic object motion is crucial. T2Mo's ability to generate 3D shapes that are both semantically rich and trajectory-compliant opens new avenues for applications in animation, virtual reality, and interactive design. This research contributes to the ongoing discourse on enhancing generative models with multimodal inputs, as discussed in related works on generative adversarial networks and motion synthesis, and is available on [arXiv](https://arxiv.org/abs/2606.05162v1).
