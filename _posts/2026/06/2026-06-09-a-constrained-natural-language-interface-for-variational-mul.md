---
title: "A Constrained Natural-Language Interface for Variational Multi-Physics Finite Element Simulations in FEniCS"
date: 2026-06-09 14:38:11 +0000
category: research
subcategory: other
company: "UiPath"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10928v1"
arxiv_id: "2606.10928"
authors: ["Nilay Upadhyay", "Wesley F. Reinhart"]
slug: a-constrained-natural-language-interface-for-variational-mul
summary_word_count: 443
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a constrained natural-language interface for finite element simulations, enhancing reliability while leveraging large language models."
---

**Problem**  
The paper addresses the reliability risks associated with using large language models (LLMs) for generating solver code in finite element simulations, particularly in multi-physics contexts. While LLMs can streamline the setup process, their autonomous code generation can lead to critical failures. This work proposes a constrained interface that limits LLM functionality to front-end tasks, ensuring that the core solver code remains human-written and validated. The authors highlight the need for such a system in the context of variational multi-physics finite element analysis, a gap in the existing literature that has not been thoroughly explored, especially in preprint form.

**Method**  
The proposed architecture consists of a constrained natural-language interface that performs three primary functions: parsing user prompts into structured JSON, generating Gmsh code for non-catalog geometries, and utilizing a retry feedback mechanism for error correction. The LLM is explicitly restricted from writing FEniCS solver templates, deriving weak forms, or generating the numerical solver core. Instead, a deterministic dispatcher maps validated specifications to five pre-defined FEniCS/UFL templates covering linear elasticity, hyperelasticity, elastoplasticity, thermo-mechanical coupling, and phase-field fracture. The validation of this template layer is conducted against analytical solutions and established benchmarks, ensuring robustness in the simulation outputs.

**Results**  
The validation results indicate that the deterministic template layer achieves sub-percent agreement with analytical solutions for smooth cases on adequate meshes. For more complex nonlinear cases, the agreement ranges from 2% to 5%. In a 15-prompt parser benchmark, the system achieved a first-pass valid parse rate of 60% (9 out of 15), with a final valid parse rate of 100% after applying retry mechanisms. The problem-class accuracy was also 100%, and field-extraction accuracy reached 97.1%. In a separate 10-case custom-geometry benchmark, both first-pass and final success rates were 90%, with one case resulting in an unrecovered invalid geometry. These results demonstrate the effectiveness of the parser and the constrained prompt/validation design.

**Limitations**  
The authors acknowledge that the system's reliance on human-written templates may limit its adaptability to novel problems outside the predefined categories. Additionally, the performance on more complex geometries may still be susceptible to errors, as evidenced by the unrecovered invalid geometry in the benchmark. The paper does not address potential scalability issues when applied to larger or more intricate simulation tasks.

**Why it matters**  
This work provides a structured approach to integrating LLMs into finite element analysis, enhancing reliability while maintaining the rigor of human oversight in critical code generation. The constrained interface allows for efficient simulation setup without compromising the integrity of the solver code, paving the way for future research in automated simulation workflows. This is particularly relevant for engineers and researchers in computational mechanics and related fields, as published in [arXiv](https://arxiv.org/abs/2606.10928v1).
