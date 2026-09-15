---
title: "HomeWorld: A Unified Floorplan-to-Furnished Framework for Generating Controllable, Densely Interactive Whole-Home Scenes"
date: 2026-06-04 16:58:43 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.06390v1"
arxiv_id: "2606.06390"
authors: ["Wenbo Li", "Xiaoliang Ju", "Zipeng Qin", "Rongyao Fang", "Hongsheng Li"]
slug: homeworld-a-unified-floorplan-to-furnished-framework-for-gen
summary_word_count: 418
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents HomeWorld, a hierarchical framework for generating coherent, interactive whole-home scenes from floorplans, addressing limitations in existing methods."
---

**Problem**  
The paper addresses the gap in generating coherent and realistic indoor scenes for robot simulation and interior design, particularly in the context of complex layouts and limited 3D scene data. Existing methods often rely on hand-crafted rules or focus on isolated tasks, such as floorplan synthesis or single-room furnishing, leading to a lack of global coherence and realism in generated scenes. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a unified hierarchical framework that decomposes indoor scene synthesis into controllable stages. They curate a large-scale dataset comprising 300,000 real residential floorplans to train a large language model (LLM) for whole-home floorplan generation. The framework utilizes a K-D tree-based representation to facilitate fine-grained control over the generated floorplans. Following the generation of the floorplan, the method employs image generation models to create furniture layouts from multiple viewpoints. A Vision-Language Model (VLM)-based refiner iteratively corrects the placement of furniture and small manipulable objects on various surfaces, while a 3D generative model allows for flexible asset replacement. The pipeline also incorporates basic physical attributes and simple surface textures and lighting setups to enhance the realism of the generated scenes.

**Results**  
The proposed framework demonstrates significant improvements over prior methods in both quantitative and qualitative metrics. The authors report that their approach yields greater layout diversity and enhanced 3D design appeal. Specific performance metrics are not disclosed in the abstract, but user studies indicate a marked preference for the generated scenes compared to existing baselines. The authors plan to release the floorplan dataset and 5,000 fully furnished scenes to the research community, which will facilitate further evaluation and development in this domain.

**Limitations**  
The authors acknowledge that their framework may still struggle with generating highly complex or unconventional layouts, as the reliance on a curated dataset may limit the diversity of generated scenes. Additionally, the iterative correction process may introduce computational overhead, which could affect real-time applications. The paper does not address potential biases in the dataset or the generalizability of the model to different architectural styles or cultural contexts.

**Why it matters**  
The HomeWorld framework represents a significant advancement in the field of indoor scene generation, providing a comprehensive solution that integrates multiple aspects of scene synthesis into a cohesive pipeline. This work has implications for various applications, including robotics, virtual reality, and interior design, by enabling the generation of realistic and interactive environments. The release of the dataset and furnished scenes will further enhance research in this area, as published in [arXiv](https://arxiv.org/abs/2606.06390v1).
