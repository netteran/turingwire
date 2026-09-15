---
title: "AgentRivet: an automated system for producing Rivet routines from journal publications"
date: 2026-06-11 16:22:40 +0000
category: research
subcategory: agents_robotics
company: "OpenAI"
secondary_companies: ["Anthropic", "Google"]
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13535v1"
arxiv_id: "2606.13535"
authors: ["Antonio J. Costa", "Caterina Doglioni", "Christian G\u00fctschow", "Andrew D. Pilkington", "Sukanya Sinha"]
slug: agentrivet-an-automated-system-for-producing-rivet-routines-
summary_word_count: 405
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents AgentRivet, an automated system leveraging Large Language Models to generate Rivet routines from particle physics publications, addressing a significant gap in analysis coverage."
---

**Problem**  
The paper addresses the incomplete coverage of Rivet routines in particle physics, where only 39% of measurements have documented and publicly available routines. This gap hinders model-independent measurements and the development of Monte Carlo event generators. The authors propose an automated solution, AgentRivet, to generate these missing routines from journal publications, a task that has not been systematically tackled in the literature. This work is presented as a preprint and has not undergone peer review.

**Method**  
AgentRivet employs a multi-step workflow that utilizes Large Language Models (LLMs) from commercial providers such as OpenAI, Anthropic, and Google. The system extracts relevant physics analysis information from published papers and generates Rivet routines, incorporating intermediate code and physics reviews to ensure quality control. The architecture of AgentRivet is designed to handle the nuances of physics terminology and syntax specific to Rivet, facilitating the automated generation of code that adheres to the standards required for analysis preservation in collider experiments.

**Results**  
The authors evaluated AgentRivet on two recent measurements from the ATLAS and CMS experiments. The generated Rivet routines exhibited a low incidence of syntax errors, indicating a competent performance in code generation. The physics fidelity of the routines was deemed reasonable, aligning with the descriptions provided in the original publications. However, the study also identified physics implementation issues, primarily stemming from ambiguous definitions in the source papers. The results suggest that while AgentRivet can produce functional routines, it may struggle with complex observables, particularly when definitions are not sufficiently clear.

**Limitations**  
The authors acknowledge that the majority of physics implementation issues arise from subtle ambiguities in the source material, which can lead to misinterpretations by the LLMs. Additionally, the system's performance may vary depending on the complexity of the observables being modeled. The paper does not address the potential biases inherent in the LLMs used, nor does it explore the scalability of AgentRivet across a broader range of publications or physics analyses.

**Why it matters**  
AgentRivet represents a significant advancement in automating the generation of Rivet routines, which is crucial for enhancing the analysis coverage in particle physics. By addressing the gap in available routines, this work facilitates better comparisons between theoretical models and experimental measurements, ultimately aiding in the search for physics beyond the Standard Model. The implications of this research extend to improving the efficiency of analysis preservation strategies in collider experiments, as discussed in related works on automated scientific workflows, as published in [arXiv](https://arxiv.org/abs/2606.13535v1).
