---
title: "Dango: A Strictly L1-Only Large Language Model for Studying Second Language Acquisition"
date: 2026-06-17 15:13:19 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.19170v1"
arxiv_id: "2606.19170"
authors: ["Shiho Matta", "Yin Jou Huang", "Fei Cheng", "Takashi Kodama", "Hirokazu Kiyomaru", "Yugo Murawaki"]
slug: dango-a-strictly-l1-only-large-language-model-for-studying-s
summary_word_count: 390
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents Dango, a 1.8B-parameter L1-only language model for studying Japanese-to-English second language acquisition, addressing L2 contamination issues."
---

**Problem**  
This work addresses the gap in the literature regarding the study of second language acquisition (SLA) using large language models (LLMs). Previous research has primarily utilized smaller or non-decoder architectures, which limits their capacity for generating open-ended text and their effectiveness as L2 simulators. The authors highlight a significant challenge in scaling LLMs: the risk of L2 contamination in the pretraining corpus, which can hinder the model's ability to accurately simulate L1-to-L2 transfer. This paper is a preprint and has not undergone peer review.

**Method**  
Dango is a 1.8 billion parameter L1-only language model specifically designed for controlled SLA studies, focusing on the transfer from Japanese (L1) to English (L2). The authors introduce a novel filtering method to mitigate L2 contamination in the pretraining corpus, ensuring that the model is exposed to minimal yet realistic L2 input. This approach preserves the integrity of L1 acquisition while allowing for controlled L2 exposure. The model is fine-tuned on LLM-generated lessons tailored for L2 learning, simulating the L2 acquisition process. The training compute details are not disclosed, but the model's architecture is based on standard transformer principles adapted for L1-only training.

**Results**  
Dango demonstrates superior performance in generating human-like L2 production patterns compared to both unfiltered and standard multilingual baselines. The authors report significant improvements in L2 output quality, although specific quantitative metrics and effect sizes are not detailed in the abstract. The model's evaluations indicate that it effectively captures the nuances of L2 acquisition, making it a valuable tool for SLA research.

**Limitations**  
The authors acknowledge that while Dango addresses L2 contamination, the filtering method may not be exhaustive, potentially allowing some L2 influence to persist. Additionally, the model's performance is evaluated primarily in the context of Japanese-to-English transfer, which may limit its applicability to other language pairs. The lack of peer review may also raise concerns regarding the robustness of the findings.

**Why it matters**  
Dango represents a significant advancement in the use of LLMs for SLA research, providing a framework for studying L1-to-L2 transfer without the confounding effects of L2 contamination. The release of the model, data, and code aims to facilitate reproducible research and practical applications in language learning. This work has implications for future studies in computational SLA, as it sets a precedent for using large-scale models to explore language acquisition processes, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.19170v1).
