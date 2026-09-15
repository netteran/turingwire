---
title: "Ontology Memory-Augmented ASR Correction for Long Text-Speech Interleaved Conversations"
date: 2026-06-11 15:18:32 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13464v1"
arxiv_id: "2606.13464"
authors: ["Xinxin Li", "Huiyao Chen", "Meishan Zhang", "Yunxin Li", "Zulong Chen", "Zhibo Ren"]
slug: ontology-memory-augmented-asr-correction-for-long-text-speec
summary_word_count: 356
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces an ontology memory-augmented framework for improving ASR correction in long text-speech interleaved conversations, addressing contextual challenges."
---

**Problem**  
The paper addresses the limitations of existing automatic speech recognition (ASR) correction methods, which typically focus on isolated utterances or short contexts. In long interleaved conversations, the need for conversation-level contextual evidence becomes critical, yet current approaches often rely on immediate hypotheses or concatenated dialogue history, leading to difficulties in locating sparse correction evidence amidst redundancy and noise. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose an ontology memory-augmented ASR correction framework designed to manage and utilize conversation history effectively. This framework organizes prior interactions into a dynamically updatable ontology memory, which includes nodes for entities, terminology, surface variants, potential ASR confusions, and semantic relations. The ontology memory allows for context-grounded corrections by retrieving relevant information during the ASR correction process. The authors also introduce the RAMC-Corr dataset, derived from MAGIC-RAMC, specifically tailored for evaluating long-range ASR correction with grounded context. The training and evaluation details, including compute resources, are not disclosed in the paper.

**Results**  
Experiments conducted on the RAMC-Corr dataset demonstrate that the proposed method outperforms direct correction strategies in 9 out of 10 paired backbone-setting combinations. The results indicate a significant improvement in the accuracy of context-dependent ASR corrections, although specific numerical performance metrics (e.g., accuracy percentages or error rates) are not provided in the abstract.

**Limitations**  
The authors acknowledge that their approach may still struggle with highly ambiguous contexts where the ontology memory may not contain sufficient relevant information. Additionally, the reliance on a dynamically updatable ontology could introduce overhead in terms of computational complexity and memory management. The paper does not address potential scalability issues when applied to larger datasets or real-time systems.

**Why it matters**  
This work has significant implications for enhancing ASR systems in applications involving long, interleaved conversations, such as customer service interactions or multi-turn dialogue systems. By leveraging an ontology memory, the framework aims to improve the contextual understanding of ASR systems, potentially leading to more accurate and user-friendly speech interfaces. The findings contribute to the ongoing discourse in the field of ASR correction, as highlighted in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.13464v1).
