---
title: "P3D-Bench: Benchmarking MLLMs for Parametric 3D Generation and Structural Reasoning"
date: 2026-06-09 17:36:34 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11152v1"
arxiv_id: "2606.11152"
authors: ["Yikang Yang", "Zhanpeng Hu", "Youtian Lin", "Mengqi Zhou", "Jingxi Xu", "Feihu Zhang"]
slug: p3d-bench-benchmarking-mllms-for-parametric-3d-generation-an
summary_word_count: 428
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces P3D-Bench, a benchmark for evaluating multimodal large language models in parametric 3D generation and structural reasoning."
---

**Problem**  
The paper addresses a significant gap in the evaluation of multimodal large language models (MLLMs) concerning their ability to generate parametric 3D models from textual and visual inputs. Existing benchmarks inadequately assess the complexity of 3D modeling through code, which requires not only the generation of runnable code but also the ability to produce geometrically precise, semantically aligned, and assembly-consistent parametric 3D programs. This work is particularly relevant as it is a preprint and has not undergone peer review.

**Method**  
The authors propose P3D-Bench, a comprehensive benchmark designed to evaluate MLLMs across three task families: Text-to-3D, Image-to-3D, and Assembly-3D. The benchmark employs a unified evaluation protocol that scores outputs based on several criteria: executability, geometric fidelity, topology, text-grounded constraints, multiview semantic alignment, and part-level structure. The evaluation involves 400 text cases, 400 image cases, and 203 annotated assemblies, with comparisons made against domain-specific models. The authors utilize a range of frontier MLLMs and text-only LLMs to assess performance, although specific architectures and training compute details are not disclosed.

**Results**  
The evaluation reveals three key findings: 
1. The Assembly-3D task is the most challenging, with models struggling to compose multiple parts into a coherent structure.
2. While models can often recover the global shape and semantic identity of the target object, they frequently fail to reproduce the precise parametric geometry specified by the input.
3. Part-level modeling is particularly weak in the assembly context, with models unable to accurately recover the geometry of individual parts or the correct number of parts. These findings highlight the limitations of current MLLMs in achieving high fidelity in parametric 3D generation.

**Limitations**  
The authors acknowledge that the benchmark may not fully capture the nuances of 3D modeling, particularly in complex assembly scenarios. They also note that the reliance on existing MLLMs may limit the generalizability of the results, as these models may not be optimized for 3D generation tasks. Additionally, the benchmark's focus on specific evaluation criteria may overlook other important aspects of 3D modeling, such as user interaction and real-time performance.

**Why it matters**  
P3D-Bench establishes a critical framework for assessing the capabilities of MLLMs in the domain of parametric 3D generation, providing a structured approach to evaluate their performance in generating complex 3D structures. This benchmark has implications for future research in multimodal AI, particularly in enhancing the precision and reliability of models in 3D design applications. The findings underscore the need for further advancements in model architectures and training methodologies to improve parametric geometry recovery and part-level modeling, as discussed in the context of this work available on [arXiv](https://arxiv.org/abs/2606.11152v1).
