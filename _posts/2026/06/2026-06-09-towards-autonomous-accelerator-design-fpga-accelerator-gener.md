---
title: "Towards Autonomous Accelerator Design: FPGA Accelerator Generation with SECDA"
date: 2026-06-09 17:14:44 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11117v1"
arxiv_id: "2606.11117"
authors: ["Vinamra Sharma", "Xingjian Fu", "Jude Haris", "Jos\u00e9 Cano"]
slug: towards-autonomous-accelerator-design-fpga-accelerator-gener
summary_word_count: 438
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents SECDA-DSE, a framework that integrates LLMs for efficient FPGA accelerator design space exploration, reducing manual effort and expertise."
---

**Problem**  
The paper addresses the challenge of designing FPGA-based accelerators for AI workloads, which traditionally requires extensive domain knowledge and manual effort due to the complex design space involving architectural parameters, data flow strategies, and memory hierarchies. Existing methodologies, such as SECDA, facilitate hardware-software co-design but still rely heavily on manual configuration, making the process time-consuming and inefficient. This work introduces SECDA-DSE, a framework that leverages Large Language Models (LLMs) to automate and enhance the design space exploration (DSE) process, thus filling a gap in the literature regarding autonomous accelerator design.

**Method**  
SECDA-DSE integrates a structured DSE Explorer with an LLM Stack to facilitate reasoning-guided exploration of FPGA accelerator designs. The framework employs retrieval-augmented generation and chain-of-thought prompting to generate candidate architectures. A feedback loop is incorporated for iterative refinement, allowing the model to learn from previous design iterations. The authors evaluate SECDA-DSE by generating three specific accelerator designs: element-wise vector multiplication, 2D convolution, and matrix transpose. The framework's performance is assessed through end-to-end execution on FPGA hardware, demonstrating its capability to synthesize and execute SECDA-compliant designs.

**Results**  
The results indicate that SECDA-DSE successfully generates accelerator designs that are not only synthesizable but also executable on FPGA hardware. The generated designs effectively capture kernel-specific trade-offs between compute parallelism and data movement. While specific performance metrics are not disclosed in the abstract, the paper emphasizes the reduction in exploration time and the minimization of required human expertise, suggesting significant improvements over traditional manual design methods. The authors claim that their approach can adapt architectural configurations across diverse workloads, although exact comparative performance numbers against baseline methods are not provided.

**Limitations**  
The authors acknowledge that while SECDA-DSE reduces the need for extensive human expertise, it may still require some level of domain knowledge for optimal results. Additionally, the paper does not discuss the scalability of the framework to more complex designs or its performance in real-world scenarios beyond the evaluated cases. The reliance on LLMs also raises questions about the interpretability and reliability of the generated designs, which are not addressed in detail.

**Why it matters**  
The implications of this work are significant for the field of hardware acceleration in AI, as it demonstrates the potential of LLMs to streamline the design process and enhance the efficiency of FPGA-based systems. By reducing the manual effort involved in accelerator design, SECDA-DSE could accelerate the deployment of optimized hardware solutions for various AI applications. This advancement is particularly relevant as the demand for efficient AI workloads continues to grow. The findings and methodologies presented in this paper contribute to the ongoing discourse on automating hardware design processes, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.11117v1).
