---
title: "LLM-Guided Neural Architecture Search for Robust Co-Design of Physical Neural Networks"
date: 2026-06-09 01:32:17 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.10294v1"
arxiv_id: "2606.10294"
authors: ["Tyler King", "Timothee Leleu"]
slug: llm-guided-neural-architecture-search-for-robust-co-design-o
summary_word_count: 442
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents UH-NAS, a hardware-agnostic LLM-guided framework for optimizing neural architectures for unconventional hardware constraints."
---

**Problem**  
Existing neural architecture search (NAS) methods are predominantly designed for specific hardware families, which restricts their applicability and generalization across different platforms. This paper addresses the gap in the literature regarding the need for a hardware-agnostic approach to NAS that can effectively co-optimize task accuracy alongside platform-specific constraints such as energy consumption, physical non-idealities, and numerical precision. The authors propose a novel framework, Unconventional Hardware Neural Architecture Search (UH-NAS), which leverages large language models (LLMs) as evolutionary operators to facilitate this optimization. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The core contribution of this paper is the UH-NAS framework, which integrates LLMs into the NAS process to guide the search for optimal neural architectures. The framework operates by treating hardware as a swappable backend, allowing for the incorporation of per-platform energy models and simulators that account for physical constraints and non-idealities. The architecture search is performed without modifying the underlying algorithm, enabling fair comparisons across various hardware platforms. The authors conducted experiments using optical Mach-Zehnder Interferometer (MZI) hardware to validate the effectiveness of UH-NAS. The training compute details are not explicitly disclosed, but the framework's reliance on LLMs suggests significant computational resources are utilized for model guidance.

**Results**  
UH-NAS demonstrated superior performance compared to conventional NAS baselines, achieving a more diverse set of robust architectures tailored for optical MZI hardware. The paper reports that UH-NAS outperforms existing LLM-to-NAS approaches, although specific quantitative metrics (e.g., accuracy, energy efficiency) are not detailed in the abstract. The results indicate that the proposed method effectively balances accuracy and energy consumption, showcasing the potential for enhanced performance in unconventional hardware settings.

**Limitations**  
The authors acknowledge that the framework's reliance on LLMs may introduce challenges related to the scalability of the search process and the computational overhead associated with LLM inference. Additionally, while the framework is designed to be hardware-agnostic, the experiments are primarily focused on optical MZI hardware, which may limit the generalizability of the findings to other unconventional hardware platforms. The paper does not address potential limitations related to the interpretability of the architectures discovered or the robustness of the energy models used.

**Why it matters**  
The implications of this work are significant for the field of neural architecture search, particularly in the context of deploying neural networks on unconventional hardware. By providing a framework that facilitates architecture-hardware co-design, UH-NAS opens avenues for more efficient and effective deployment of neural networks across diverse platforms. This research contributes to the ongoing discourse on optimizing neural networks for real-world applications, as highlighted in related works on hardware-aware NAS strategies. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.10294v1).
