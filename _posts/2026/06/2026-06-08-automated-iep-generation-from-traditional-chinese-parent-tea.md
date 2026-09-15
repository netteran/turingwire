---
title: "Automated IEP Generation from Traditional Chinese Parent-Teacher Interviews via Corpus-Grounded Feature Diffusion"
date: 2026-06-08 15:13:45 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09603v1"
arxiv_id: "2606.09603"
authors: ["Kuanlin Chen", "Cheng-En Ou"]
slug: automated-iep-generation-from-traditional-chinese-parent-tea
summary_word_count: 440
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a novel low-resource fine-tuning pipeline for automated IEP generation in Traditional Chinese, leveraging Corpus-Grounded Feature Diffusion."
---

**Problem**  
The paper addresses the lack of automated Individualized Education Program (IEP) generation in Traditional Chinese, a domain that has been largely unexplored due to data scarcity, stringent privacy regulations, and the absence of local evaluation benchmarks. Existing English-language research has shown that generative AI can significantly reduce the labor involved in drafting IEPs, but similar advancements in Traditional Chinese remain uncharted. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a low-resource fine-tuning pipeline based on Corpus-Grounded Feature Diffusion (CGFD). The methodology consists of several key steps: 
1. Selection of 25 dual-expert high-score seed transcripts using a tau threshold with flag-aware score caps.
2. Extraction of a FeatureProfile, which includes metrics such as sentence length, structure, and quantification templates, from the seed transcripts. This profile is injected into prompts for a large language model (LLM) alongside Verbalized-Sampling-style diversity control to facilitate feature diffusion.
3. Utilization of 15 expert gold seeds as diffusion anchors to target a total of 585 samples, resulting in 567 valid diffusion samples that form a training set of 582 samples for fine-tuning the Breeze-7B model using QLoRA.
4. Implementation of schema-constrained inference through Grammar-Constrained Decoding (GCD), which enforces a hierarchical SMART Goal Ladder schema during inference.

**Results**  
Ablation studies on a 55-sample schema stress set reveal that the GCD approach is counterproductive under Traditional Chinese token budgets. The no-GCD inference path achieves a 100% schema pass rate with 34% lower median latency compared to GCD. On a formal hold-out set of n=10, the no-GCD path achieves a BERTScore F1 of 0.779, outperforming several zero-shot baselines: GPT-5.4 (0.726), DeepSeek-V3.2 (0.703), Gemini-3-Flash-Preview (0.703), and Llama-4-Maverick (0.700). The results indicate that the proposed method not only enhances reliability but also improves inference speed while maintaining fully local, air-gapped processing.

**Limitations**  
The authors note that the reliance on a limited number of seed transcripts may affect the generalizability of the model. Additionally, the counterproductive nature of GCD under specific conditions suggests that further exploration of alternative decoding strategies may be warranted. The study is also limited by the small size of the formal hold-out set, which may not fully capture the model's performance across diverse scenarios.

**Why it matters**  
This work significantly advances the field of NLP for Traditional Chinese special education by providing a scalable, privacy-preserving solution for IEP generation. The findings highlight the potential for generative AI to address specific educational needs in low-resource settings, paving the way for future research in this domain. The implications of this study are critical for enhancing educational accessibility and efficiency, as discussed in related literature on generative models in education, as published in [arXiv](https://arxiv.org/abs/2606.09603v1).
