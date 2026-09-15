---
title: "SPARC: Reliable Spatial Annotations from Robot Demonstrations at Scale"
date: 2026-06-11 15:46:28 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13497v1"
arxiv_id: "2606.13497"
authors: ["Nils Blank", "Paul Mattes", "Maximilian Xiling Li", "Jakub Suliga", "Thomas Roth", "Moritz Reuss"]
slug: sparc-reliable-spatial-annotations-from-robot-demonstrations
summary_word_count: 442
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents SPARC, a framework for generating reliable spatial annotations from robot demonstrations, enhancing annotation quality and retention."
---

**Problem**  
This work addresses the gap in reliable spatial annotation generation from robot demonstrations, particularly in the context of existing automated pipelines that lack a quality signal for annotation correctness. Current methods often produce poorly calibrated confidence scores, leading to a trade-off between accepting noisy labels or discarding potentially useful samples. The authors highlight that this issue remains unaddressed in the literature, particularly in the realm of risk-aware frameworks for spatial annotations, making this a preprint work.

**Method**  
SPARC (Spatial Annotations from Robot Demonstrations with Reliability Calibration) introduces a novel framework that leverages the spatio-temporal structure of robot tasks to generate structured spatial annotations—such as bounding boxes, object trajectories, and manipulation phase labels—along with a reliability score for each annotation. The framework employs a risk-aware approach to reduce the incidence of noisy labels while maximizing the retention of useful samples. Additionally, the authors introduce Interaction-Aware Bench (IA-Bench), a benchmark designed to evaluate model accuracy in grounding the locations of interacted objects in robot demonstrations. The training compute and specific architectural details are not disclosed, but the framework is designed to work with a dataset of 1.7k human-annotated demonstrations across various embodiments and scenarios.

**Results**  
SPARC demonstrates significant improvements over detection-only baselines in localization accuracy, achieving a threefold increase in sample retention at high-precision operating points. Models fine-tuned on SPARC-generated annotations achieve state-of-the-art results on object-grounding and pointing benchmarks, outperforming similarly sized models. Furthermore, policies trained using SPARC annotations show superior performance in cluttered, visually ambiguous real-world scenes, indicating a robust enhancement in practical applications. The specific metrics and comparisons to baseline models are not detailed in the abstract but are expected to be elaborated in the full paper.

**Limitations**  
The authors acknowledge that while SPARC improves annotation reliability, the framework's performance may still be influenced by the inherent variability in robot demonstrations and the complexity of the tasks. They do not address potential limitations related to the scalability of the framework across different robot embodiments or the generalizability of the reliability scores across diverse environments. Additionally, the reliance on human-annotated demonstrations for initial training may limit the applicability of SPARC in scenarios where such data is scarce.

**Why it matters**  
The implications of SPARC are significant for advancing the field of robotics, particularly in enhancing the quality of training data for grounded robot policies and embodied foundation models. By providing a reliable framework for spatial annotations, SPARC can facilitate improved performance in motion planning and hierarchical task composition. This work contributes to the ongoing discourse on automated annotation quality in robotics, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13497v1), and sets a foundation for future research aimed at refining annotation processes in complex robotic tasks.
