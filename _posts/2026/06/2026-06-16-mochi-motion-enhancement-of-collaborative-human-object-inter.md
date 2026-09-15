---
title: "MOCHI: Motion Enhancement of Collaborative Human-object Interactions"
date: 2026-06-16 17:58:44 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18243v1"
arxiv_id: "2606.18243"
authors: ["Jiye Lee", "Yonghun Choi", "Jungdam Won"]
slug: mochi-motion-enhancement-of-collaborative-human-object-inter
summary_word_count: 402
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces MOCHI, a two-stage framework that enhances noisy multi-human object interaction data through optimized hand grasps and motion refinement."
---

**Problem** — The paper addresses the challenge of accurately modeling collaborative multi-human object interactions (MHOI), which are often plagued by noise and artifacts due to simultaneous human-human and human-object interactions. The authors highlight the difficulty in acquiring high-quality MHOI data, which is essential for effective modeling. This work is a preprint and has not undergone peer review.

**Method** — MOCHI employs a two-stage framework to enhance noisy MHOI data. The first stage involves generating physically plausible hand grasps from noisy body input through an optimization process. This optimization ensures that the grasps are semantically consistent with the body pose. The second stage refines the full-body motion of all participants using a diffusion-based noise optimization framework that leverages single-person motion priors. The authors introduce specific optimization objectives that encode both human-object and human-human interaction information, enhancing the quality of the generated motion sequences. The framework is designed to be robust across varying numbers of participants and interaction types, making it versatile for different MHOI scenarios.

**Results** — The experimental results demonstrate that MOCHI significantly improves the quality of MHOI data compared to existing capture methods and generative models. The authors report that their approach effectively reduces artifacts such as contact misalignment and motion jitter, leading to more coherent and realistic motion sequences. While specific quantitative metrics are not detailed in the abstract, the results indicate a marked improvement in data quality, suggesting a strong performance against baseline methods in MHOI scenarios.

**Limitations** — The authors acknowledge that their framework may still struggle with extreme cases of noise or highly complex interactions that deviate significantly from the training data. Additionally, the reliance on single-person motion priors may limit the generalizability of the approach to more diverse interaction contexts. The paper does not discuss the computational cost of the optimization process or the scalability of the framework to real-time applications.

**Why it matters** — The implications of this work are significant for advancing the field of human-robot interaction and motion capture technologies. By providing a robust method for enhancing MHOI data, MOCHI can facilitate better training of machine learning models for applications such as robotics, animation, and virtual reality. The ability to generate high-quality motion sequences from noisy data can lead to improved performance in collaborative tasks involving humans and robots. This research contributes to the ongoing efforts to refine motion capture techniques and enhance the realism of human-object interactions, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.18243v1).
