---
title: "From Prompt to Process: a Process Taxonomy and Comparative Assessment of Frameworks Supporting AI Software Development Agents"
date: 2026-06-03 14:49:15 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.04967v1"
arxiv_id: "2606.04967"
authors: ["Sanderson Oliveira de Macedo"]
slug: from-prompt-to-process-a-process-taxonomy-and-comparative-as
summary_word_count: 428
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a six-dimensional taxonomy for evaluating AI software development frameworks, highlighting their operational processes and structural trade-offs."
---

**Problem**  
The paper addresses a gap in the literature regarding the operational frameworks that facilitate AI software development agents. While previous surveys have cataloged AI tools for programming, there has been no focused study on how these tools are organized into frameworks that define processes, roles, artifacts, and verification methods. This work is particularly relevant as it is a preprint and has not undergone peer review.

**Method**  
The authors conducted a directed search of primary sources, applying functional inclusion criteria to identify six frameworks: GitHub Spec Kit, OpenSpec, BMAD Method, Get Shit Done (GSD), Spec Kitty, and Reversa. Each framework approaches AI development through distinct methodologies, such as specification-driven development and agent-driven agile planning. The central contribution is a six-dimensional process taxonomy encompassing specification, context, roles, execution, validation, and portability. A scoring rubric was developed to evaluate these frameworks systematically. The authors also applied this taxonomy to an out-of-sample case, Spec-Flow, to validate its utility.

**Results**  
The analysis revealed two significant findings. First, among the frameworks that incorporate some process, there is a notable convergence: the isolated prompt's role diminishes, while persistent artifacts, work contracts, traceability, and human review emerge as critical mechanisms for reducing ambiguity and coordinating agents. Second, no single framework comprehensively addresses all six dimensions of the taxonomy, indicating a structural trade-off between process depth and portability across different agents. The authors also identified recurring risks, including specification-code drift, over-reliance on generated artifacts, fragility of community extensions, platform dependence, and a lack of benchmarks for the entire process.

**Limitations**  
The authors acknowledge that their study is limited by the selection of frameworks, which may not represent the full spectrum of available tools. Additionally, the absence of empirical evaluations and benchmarks for the complete process is a significant limitation. The taxonomy itself may require further refinement as new frameworks emerge and existing ones evolve. The authors also do not address the potential impact of varying levels of user expertise on the effectiveness of these frameworks.

**Why it matters**  
This work has important implications for the future of AI-assisted software development, as it provides a structured approach to evaluating and comparing frameworks that support development agents. The identified trade-offs and risks can guide researchers and practitioners in selecting appropriate frameworks for their specific needs. Furthermore, the proposed research agenda emphasizes the need for empirical evaluation and the establishment of benchmarks, which could enhance the reliability and effectiveness of AI tools in software engineering. This is crucial for advancing the field, as highlighted in the context of ongoing discussions in AI software development, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.04967v1).
