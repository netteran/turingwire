---
title: "From Tokens to Faces: Investigating Discrete Speech Representations for 3D Facial Animation"
date: 2026-06-11 17:41:18 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13630v1"
arxiv_id: "2606.13630"
authors: ["Pedro Correa", "Olivier Perrotin", "Samir Sadok", "Paula Costa", "Thomas Hueber"]
slug: from-tokens-to-faces-investigating-discrete-speech-represent
summary_word_count: 365
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper evaluates various speech representation methods for 3D facial animation, introducing an AVTTS pipeline that utilizes discrete representations."
---

**Problem**  
This work addresses the gap in understanding how different speech representation methods impact the quality of 3D facial animation. The authors highlight that existing literature lacks a comprehensive evaluation of discrete speech representations in this context, particularly focusing on segmental and semantic cues versus acoustic reconstruction. The paper is a preprint and has not undergone peer review.

**Method**  
The authors investigate four families of speech representations: self-supervised learning (SSL) features, neural codec latents, automatic speech recognition (ASR) label-based spaces, and semantic representations. They employ two distinct facial decoders to assess the quality of facial reconstructions using objective metrics and perceptual evaluations. The study includes probing analyses to correlate tokenized representations with phonetic units and articulatory deformations. The proposed Audio Visual Text-to-Speech (AVTTS) pipeline integrates discrete representations to facilitate the decoding of both speech and 3D facial motion, enhancing the synthesis process.

**Results**  
The evaluation reveals that representations encoding phonetic classes significantly improve the accuracy of facial animation predictions. The authors report comparable facial animation quality between semantic and label-based representations, with specific metrics indicating a notable enhancement in facial reconstruction quality. While exact numerical results are not disclosed in the abstract, the findings suggest that the choice of representation directly influences the fidelity of the generated facial animations, outperforming traditional methods in perceptual evaluations.

**Limitations**  
The authors acknowledge that their study is limited by the scope of the representations evaluated and the specific facial decoders used. They do not explore the potential impact of varying training datasets or the scalability of the AVTTS pipeline across different languages or dialects. Additionally, the reliance on perceptual evaluations may introduce subjectivity, which could affect the generalizability of the results.

**Why it matters**  
This research has significant implications for the fields of speech synthesis and computer graphics, particularly in enhancing the realism of 3D facial animations driven by speech. By establishing a clear link between speech representation and facial animation quality, the findings can inform future work in multimodal synthesis and interactive applications. The introduction of the AVTTS pipeline represents a novel approach that could streamline the integration of speech and visual outputs, paving the way for more sophisticated human-computer interaction systems. This work is available on [arXiv](https://arxiv.org/abs/2606.13630v1).
