---
title: "Slots, Transitions, Loops: Learning Composable World Models for ARC"
date: 2026-06-10 16:51:53 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.12316v1"
arxiv_id: "2606.12316"
authors: ["Gege Gao", "Bernhard Sch\u00f6lkopf", "Andreas Geiger"]
slug: slots-transitions-loops-learning-composable-world-models-for
summary_word_count: 404
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents Loop-OWM, a novel object-centric world-modeling architecture for learning composable transitions in visual-symbolic ARC tasks."
---

**Problem**  
The paper addresses the challenge of in-context rule induction in the ARC (Abstraction and Reasoning Challenge), which requires models to infer hidden rules from visual-symbolic demonstrations. Existing methods primarily focus on expressing these rules through language, code, or symbolic programs, lacking a robust approach that captures the visual-symbolic nature of ARC tasks. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose Loop-OWM, an object-centric world-modeling architecture designed to learn composable transitions over structured states. The architecture integrates several key components: color-prototype slots that represent object attributes, demonstration-conditioned task summaries that encapsulate the context of the input-output pairs, and a looped transition model that facilitates dense propagation of information and slot-conditioned corrections. The model is trained on the ARC-1 and ARC-2 datasets, leveraging a combination of supervised learning techniques to optimize its performance while maintaining a comparable or reduced parameter count relative to existing baselines.

**Results**  
Loop-OWM demonstrates superior performance on both ARC-1 and ARC-2 benchmarks. Specifically, it achieves a significant improvement over non-looped baselines, with a reported accuracy increase of approximately 10% on ARC-1 and 8% on ARC-2. When compared to other looped models, Loop-OWM maintains competitive performance while utilizing fewer parameters, indicating a more efficient learning process. These results underscore the effectiveness of the proposed architecture in capturing the compositional nature of ARC tasks.

**Limitations**  
The authors acknowledge several limitations in their work. First, the model's reliance on structured states may limit its generalizability to more complex or less structured environments. Additionally, the performance gains, while significant, may not translate to other domains outside of ARC without further adaptation. The authors also note that the model's interpretability remains a challenge, as understanding the learned transitions in a human-readable format is not straightforward. Furthermore, the paper does not explore the scalability of Loop-OWM to larger datasets or more complex rule sets.

**Why it matters**  
The implications of this work extend to the broader field of visual-symbolic reasoning and world modeling. By demonstrating that ARC rules can be effectively learned as transitions over visual-symbolic states, this research opens avenues for developing more sophisticated models capable of generalizing across various tasks that require rule induction. The findings suggest that future work could explore the integration of Loop-OWM into other domains, such as robotics and interactive AI systems, where understanding and manipulating visual environments is crucial. This research contributes to the ongoing discourse in the field, as published in [arXiv](https://arxiv.org/abs/2606.12316v1).
