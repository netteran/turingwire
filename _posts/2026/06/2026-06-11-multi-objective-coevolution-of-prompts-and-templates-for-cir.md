---
title: "Multi-Objective Coevolution of Prompts and Templates for Circuit Approximation"
date: 2026-06-11 09:14:37 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.13089v1"
arxiv_id: "2606.13089"
authors: ["Martin Tomasovic", "Lukas Sekanina"]
slug: multi-objective-coevolution-of-prompts-and-templates-for-cir
summary_word_count: 423
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a co-evolutionary algorithm that automates the design of optimized 8-bit approximate multipliers using large language models."
---

**Problem**  
This work addresses the gap in automated design methodologies for approximate multipliers, which are critical for enhancing power efficiency and reducing latency in error-resilient applications like neural networks. The authors highlight the lack of existing frameworks that utilize large language models (LLMs) for circuit design without requiring domain-specific training. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a co-evolutionary algorithm that operates on two populations: one for candidate circuit designs and another for prompt templates that guide modifications made by the LLM. The architecture leverages an off-the-shelf LLM, which is not fine-tuned for the specific domain of circuit design, thus allowing for a more generalized application. The algorithm iteratively evolves both populations, optimizing for multiple design objectives, including error rate and area efficiency. The training compute details are not disclosed, but the method emphasizes the use of LLMs to generate and refine circuit designs based on the prompts provided.

**Results**  
The experimental results demonstrate that the proposed co-evolutionary approach yields approximate multipliers with superior error-area trade-offs compared to existing highly optimized circuits from the EvoApproxLib library. Specifically, the new designs achieved a reduction in error rates while maintaining a smaller silicon area, outperforming baseline designs by significant margins (exact numerical results are not provided in the abstract). The benchmarks used for comparison include standard metrics for circuit performance, although specific datasets or evaluation criteria are not detailed.

**Limitations**  
The authors acknowledge that the reliance on an off-the-shelf LLM may limit the specificity of the designs to certain types of circuits. Additionally, the method's performance may vary based on the choice of prompt templates and the initial population of candidate circuits. The paper does not address potential scalability issues when applying this method to more complex circuit designs or other types of hardware. Furthermore, the lack of peer review means that the findings should be interpreted with caution until validated by the community.

**Why it matters**  
This research has significant implications for the field of hardware design, particularly in the context of developing efficient circuits for machine learning applications. By automating the design process using LLMs, the approach could streamline the creation of hardware that meets the demands of modern AI workloads, potentially leading to more energy-efficient and compact designs. The findings contribute to the growing body of literature on the intersection of machine learning and hardware design, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.13089v1). This work opens avenues for further exploration of LLMs in circuit design and could inspire future research on co-evolutionary algorithms in other domains.
