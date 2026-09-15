---
title: "Quality-Diversity Search in Sound Generation: Investigating Innovation Engines for Audio Exploration"
date: 2026-06-08 17:40:09 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.09780v1"
arxiv_id: "2606.09780"
authors: ["Bj\u00f6rn \u00de\u00f3r J\u00f3nsson", "\u00c7a\u011fr\u0131 Erdem", "Stefano Fasciani", "Kyrre Glette"]
slug: quality-diversity-search-in-sound-generation-investigating-i
summary_word_count: 398
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel generative sound synthesis system using Quality Diversity algorithms to enhance audio exploration for composers and sound designers."
---

**Problem**  
This study addresses the limitations in existing sound generation tools that hinder composers and sound designers from effectively exploring and refining their sonic creations. The authors highlight the gap in the literature regarding the practical application of diversity-promoting algorithms in sound synthesis, particularly in automating the exploration of uncharted sonic spaces. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a generative sound synthesis system that integrates Quality Diversity (QD) algorithms with a supervised discriminative model, drawing inspiration from the Innovation Engine algorithm. The architecture employs Compositional Pattern Producing Networks (CPPNs) in conjunction with Digital Signal Processing (DSP) graphs. A key innovation is the use of multiple specialized CPPNs tailored for different frequency ranges, which simplifies the network architecture while preserving performance levels comparable to single-CPPN configurations. The system is trained using a Multi-dimensional Archive of Phenotypic Elites (MAP-Elites) framework, which facilitates the generation of diverse sound objects. The authors also explore evolutionary stepping stones by analyzing transitions between musical and non-musical contexts, thereby enhancing the system's adaptability.

**Results**  
The proposed system demonstrates significant capabilities in generating a wide variety of synthetic sounds. The authors report that their approach yields a substantial increase in sound diversity compared to baseline methods, although specific quantitative metrics (e.g., effect sizes) are not detailed in the summary. The generated sound objects are made accessible through an online explorer and rendered sound files, showcasing their potential for creative applications in music composition across various durations and contexts.

**Limitations**  
The authors acknowledge that their approach may be limited by the complexity of the underlying models and the computational resources required for training. Additionally, the exploration of sound diversity is constrained by the specific configurations of CPPNs and DSP graphs employed. The study does not address potential scalability issues or the generalizability of the findings across different musical genres or styles.

**Why it matters**  
This research has significant implications for the field of generative audio synthesis, particularly in enhancing the creative toolkit available to composers and sound designers. By bridging the gap between theoretical sound generation and practical application, the findings could lead to more innovative and diverse soundscapes in music production. The integration of QD algorithms into sound synthesis represents a promising direction for future research, as discussed in related works on evolutionary algorithms in creative domains, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.09780v1).
