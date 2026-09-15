---
title: "ComAct: Reframing Professional Software Manipulation via COM-as-Action Paradigm"
date: 2026-06-11 11:53:32 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13239v1"
arxiv_id: "2606.13239"
authors: ["Jiaxin Ai", "Tao Hu", "Xuemeng Yang", "Shu Zou", "Hairong Zhang", "Daocheng Fu"]
slug: comact-reframing-professional-software-manipulation-via-com-
summary_word_count: 387
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the COM-as-Action paradigm for professional software manipulation, demonstrating significant improvements in CAD software interaction."
---

**Problem**  
Existing computer-use agents face limitations in professional software manipulation, particularly in GUI-based and API-based approaches. GUI agents suffer from fragile visual grounding and long-horizon error accumulation, while API-based methods struggle with heterogeneous protocols and inaccessible commercial interfaces. This work addresses these gaps by proposing a new paradigm for software interaction, specifically targeting the challenges of manipulating industrial CAD software. Notably, this is a preprint and has not undergone peer review.

**Method**  
The authors propose the COM-as-Action paradigm, which reframes professional software interaction as deterministic program synthesis rather than sequential visual control. To validate this approach, they introduce ComCADBench, the first benchmark designed for agents operating within real industrial CAD environments. The core technical contribution includes the development of ComActor, a self-correcting agent trained through a progressive three-stage framework. This framework emphasizes the transition from syntactic correctness to geometric accuracy. Additionally, ComForge is introduced as a scalable platform for large-scale training within Windows containers, facilitating the training of agents in a controlled environment.

**Results**  
ComActor demonstrates state-of-the-art performance on the ComCADBench benchmark, achieving a significant improvement over existing models. Specifically, while frontier proprietary models exhibit near-zero success rates under GUI-based interaction, ComActor's COM-based execution results in substantial immediate gains. The paper reports that ComActor maintains strong resilience in long-horizon tasks, where baseline models typically fail. Furthermore, ComActor generalizes effectively to external CAD benchmarks, showcasing its robustness and adaptability.

**Limitations**  
The authors acknowledge that while the COM-as-Action paradigm shows promise, there are limitations in the current implementation. The reliance on the Component Object Model (COM) may restrict compatibility with non-COM-based software environments. Additionally, the performance metrics are primarily focused on CAD software, which may not directly translate to other domains. The authors also note that the self-correcting mechanism may require further refinement to enhance its effectiveness in more complex scenarios.

**Why it matters**  
The introduction of the COM-as-Action paradigm represents a significant advancement in the field of professional software manipulation, particularly for CAD applications. By shifting the focus from visual control to deterministic program synthesis, this work opens new avenues for developing more robust and reliable software agents. The implications of this research extend beyond CAD software, potentially influencing the design of agents for various professional applications. As such, this work is a critical step towards overcoming the limitations of current software manipulation techniques, as published in [arXiv](https://arxiv.org/abs/2606.13239v1).
