---
title: "CHORUS: Decentralized Multi-Embodiment Collaboration with One VLA Policy"
date: 2026-06-10 17:26:08 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12352v1"
arxiv_id: "2606.12352"
authors: ["Ria Doshi", "Tian Gao", "Annie Chen", "Chelsea Finn", "Jeannette Bohg"]
slug: chorus-decentralized-multi-embodiment-collaboration-with-one
summary_word_count: 368
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces CHORUS, a decentralized framework for multi-robot collaboration using a single vision-language-action policy, enhancing efficiency and reactivity."
---

**Problem**  
The paper addresses the limitations of existing multi-robot collaboration methods, particularly the inefficiencies of centralized approaches that scale poorly with team size and the challenges faced by decentralized methods that require explicit alignment or information sharing during inference. The authors highlight the need for a solution that allows robots to collaborate effectively using only local observations, without the need for complex coordination mechanisms. This work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
CHORUS leverages a single pretrained vision-language-action (VLA) model as a backbone to facilitate decentralized control of multiple robots. The framework allows each robot to operate independently, conditioned solely on its own observations and a unique robot-identifying prompt. This design eliminates the need for per-robot policies or inter-robot communication during inference, thus simplifying the collaboration process. The authors detail the architecture of the VLA model and its adaptation for multi-robot tasks, although specific training compute resources are not disclosed.

**Results**  
In empirical evaluations, CHORUS demonstrates significant performance improvements across various real-world tasks, including mobile tape measurement, library book handovers, and laundry basket lifting. The framework achieves a 64% improvement over decentralized models trained from scratch and enhances reactivity to teammate behavior by 40 percentage points. Additionally, CHORUS outperforms centralized baselines, showcasing its effectiveness in decentralized multi-robot collaboration.

**Limitations**  
The authors acknowledge that while CHORUS shows promising results, it may still be limited by the generalization capabilities of the pretrained VLA model, which could affect performance in highly dynamic or unstructured environments. They also note that the reliance on a single VLA backbone may introduce bottlenecks in scenarios requiring diverse task-specific adaptations. Furthermore, the paper does not explore the scalability of CHORUS in larger teams beyond the tested configurations.

**Why it matters**  
The implications of this work are significant for the field of multi-robot systems, as it presents a novel approach to decentralized collaboration that minimizes the need for complex coordination mechanisms. By demonstrating that a shared VLA backbone can effectively enable multi-robot tasks without inter-robot communication, this research opens avenues for more scalable and efficient robotic systems. The findings contribute to the ongoing discourse on improving multi-agent collaboration strategies, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.12352v1).
