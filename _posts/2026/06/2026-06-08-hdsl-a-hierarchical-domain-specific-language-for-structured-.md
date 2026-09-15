---
title: "HDSL: A Hierarchical Domain-Specific Language for Structured 3D Indoor Scene Generation and Localized Editing with LLM Agents"
date: 2026-06-08 17:02:36 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09738v1"
arxiv_id: "2606.09738"
authors: ["Letian Li", "Chao Shen", "Shuzhao Xie", "Chenghao Gu", "ZhengXiao He", "Yu Meng"]
slug: hdsl-a-hierarchical-domain-specific-language-for-structured-
summary_word_count: 441
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces HDSL, a domain-specific language for structured 3D indoor scene generation and localized editing using LLM agents, enhancing scene representation and editing efficiency."
---

**Problem**  
Existing LLM-based systems for text-driven indoor scene generation and editing often utilize scene graphs or global constraint lists, which inadequately specify local geometry and complicate localized instruction-based edits. This paper addresses the gap in capability for structured program generation and local program repair in the context of 3D indoor scenes. The authors propose a novel approach through the development of a Hierarchical Descriptive Scene Language (HDSL), which is not only a new representation but also a framework for localized editing. This work is presented as a preprint and has not undergone peer review.

**Method**  
HDSL is designed as an XML/CSS-style domain-specific language that organizes rooms, regions, objects, and support surfaces into a hierarchical tree structure with local coordinates. This recursive representation facilitates complex scene planning and retrieval for editing. The authors employ LLM agents to generate HDSL subtrees with bounded verification, ensuring that the generated structures are valid. Non-virtual nodes are grounded through multimodal asset retrieval, while force-directed layout optimization is applied to rectify boundary and collision errors. For localized editing, the Hierarchical Retrieval-Augmented Generation (HRAG) method retrieves the relevant subtree, prompts the LLM to rewrite the local context, and merges the results using a deterministic three-way merge strategy.

**Results**  
In their reproduced benchmark, HDSL demonstrates significant improvements over full text-to-scene baselines, achieving enhanced average object coverage, better text-scene alignment, and reduced generation time. Specifically, HDSL outperforms layout-only reproductions on geometry metrics while maintaining competitive performance. For editing tasks, HRAG reduces token usage by a factor of 5.22 and runtime by 6.19 times, successfully producing valid DSL for all eight paired edits and preserving unrelated scene objects more effectively than previous methods.

**Limitations**  
The authors acknowledge that while HDSL improves upon existing methods, it may still face challenges in scalability for highly complex scenes or in scenarios requiring extensive contextual understanding beyond local edits. Additionally, the reliance on LLMs for subtree generation may introduce variability based on the model's training data and capabilities. The paper does not address potential limitations related to the interpretability of the generated HDSL structures or the robustness of the multimodal asset retrieval process.

**Why it matters**  
The introduction of HDSL represents a significant advancement in the structured generation and editing of 3D indoor scenes, providing a more effective framework for integrating LLMs into scene representation tasks. This work has implications for various applications in computer graphics, virtual reality, and game design, where precise scene manipulation is crucial. The findings and methodologies presented in this paper can inform future research in scene generation and editing, as well as the development of more sophisticated domain-specific languages. For further details, refer to the full paper available on [arXiv](https://arxiv.org/abs/2606.09738v1).
