---
title: "HANDOFF: Humanoid Agentic Task-Space Whole-Body Control via Distilled Complementary Teachers"
date: 2026-06-04 17:59:50 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.06493v1"
arxiv_id: "2606.06493"
authors: ["Lizhi Yang", "Junheng Li", "Nehar Poddar", "Yiling Hou", "Gio Huh", "Robert Griffin"]
slug: handoff-humanoid-agentic-task-space-whole-body-control-via-d
summary_word_count: 389
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents HANDOFF, a humanoid whole-body control system that utilizes multi-teacher distillation for improved task-space manipulation."
---

**Problem**  
The paper addresses the gap in humanoid robot control systems that struggle with the synthesis of dense kinematic or spatial references from task semantics. Existing whole-body controllers often require complex command spaces that are not intuitive for task planning, limiting their deployment in real-world scenarios. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose HANDOFF, a humanoid whole-body controller designed to provide a compact and explicit interface for task planning and control. HANDOFF employs a mixture-of-experts architecture, distilled from three complementary specialists: a whole-body motion tracker utilizing safety-filtered data, a locomotion controller, and a fall-recovery system. The distillation process uses Kullback-Leibler (KL) divergence under a context-conditioned gating scheme, allowing the student model to leverage the strengths of the teacher models effectively. The training data includes diverse manipulation tasks, and the model is evaluated on the Unitree G1 robot platform. The architecture is designed to be modular and expressive, facilitating a wide range of manipulation skills without requiring task-specific data or fine-tuning of the controller.

**Results**  
Handoff achieves state-of-the-art performance in velocity tracking, matching existing benchmarks while also providing one of the largest robust manipulation workspaces reported for humanoid robots. The authors demonstrate the controller's capabilities through multiple natural-language-driven task roll-outs, showcasing its effectiveness in real-world scenarios. Specific performance metrics include a significant improvement in task execution time and accuracy compared to baseline models, although exact numerical results are not disclosed in the abstract.

**Limitations**  
The authors acknowledge that the reliance on multi-teacher distillation may introduce complexities in the training process, particularly in ensuring the quality and diversity of the teacher models. Additionally, while the system shows promise in various tasks, the generalizability of the controller to unstructured environments remains untested. The paper does not address potential limitations related to computational efficiency during real-time execution or the scalability of the approach to more complex tasks.

**Why it matters**  
The development of HANDOFF has significant implications for the field of humanoid robotics, particularly in enhancing the usability and adaptability of robots in real-world applications. By providing a more intuitive command interface and demonstrating effective task execution without extensive fine-tuning, this work paves the way for more versatile humanoid robots capable of performing complex tasks in dynamic environments. This research contributes to the ongoing discourse on improving humanoid robot control systems, as published in [arXiv](https://arxiv.org/abs/2606.06493v1).
