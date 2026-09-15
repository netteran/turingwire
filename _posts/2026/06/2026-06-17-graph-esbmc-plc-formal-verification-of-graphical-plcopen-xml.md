---
title: "Graph-ESBMC-PLC: Formal Verification of Graphical PLCopen XML Ladder Diagram Programs Using SMT-Based Model Checking"
date: 2026-06-17 11:22:34 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18941v1"
arxiv_id: "2606.18941"
authors: ["Pierre Dantas", "Lucas Cordeiro", "Waldir Junior"]
slug: graph-esbmc-plc-formal-verification-of-graphical-plcopen-xml
summary_word_count: 407
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Graph-ESBMC-PLC, enhancing formal verification of graphical PLCopen XML Ladder Diagram programs through SMT-based model checking."
---

**Problem**  
The paper addresses a significant gap in the formal verification of graphical PLCopen XML Ladder Diagram (LD) programs, specifically the inability of existing tools like ESBMC-PLC to process graphical encodings. Prior implementations only supported textual encodings, leading to vacuous verification results when parsing graphical exports from platforms such as CONTROLLINO, Beremiz, and OpenPLC Editor. This work is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose Graph-ESBMC-PLC, which integrates a depth-first search (DFS)-based graphical LD resolver to convert graphical representations into a GOTO intermediate representation (IR). The resolver traverses the directed graph of rung logic, extracting Boolean contact conjunctions for each rung path. A three-tier I/O inference scheme is employed to ensure correct processing order of coils, adhering to IEC 61131-3 scan-cycle semantics. Specifically, coils are ordered by their rightPowerRail connectionPointIn sequence, ensuring that SET coils are processed before RESET coils. The conversion process maintains the existing ESBMC backend, allowing for seamless integration. The validation was conducted on three graphical LD programs from CONTROLLINO and OpenPLC Editor, demonstrating the effectiveness of the resolver.

**Results**  
The implementation of Graph-ESBMC-PLC successfully produced full GOTO IR representations for all three graphical LD programs, which previously resulted in empty IR outputs. The verification process confirmed that all three programs were SAFE at k=2, with execution times under 70 milliseconds. Additionally, the authors report that the 11 textual LD benchmarks were fully preserved without any regression in performance. This indicates a robust enhancement over previous methodologies, which failed to adequately handle graphical LD programs.

**Limitations**  
The authors acknowledge limitations in their approach, particularly with two Beremiz examples that lacked LD content or involved unsupported timer semantics. These cases highlight potential areas for further development and refinement in the resolver's capabilities. Additionally, the paper does not address the scalability of the method for larger or more complex graphical LD programs, which could be a critical factor in practical applications.

**Why it matters**  
The introduction of Graph-ESBMC-PLC represents a significant advancement in the formal verification of PLC programs, particularly in industrial automation contexts where graphical representations are prevalent. By enabling the verification of graphical LD programs, this work enhances the reliability and safety of automated systems, which is crucial for compliance with industry standards. The findings and methodologies presented in this paper could serve as a foundation for future research in formal verification techniques for PLC programming, as published in [arXiv](https://arxiv.org/abs/2606.18941v1).
