---
title: "OpenBibleTTS: Large-Scale Speech Resources and TTS Models for Low-Resource Languages"
date: 2026-06-08 14:30:48 +0000
category: research
subcategory: other
company: "null"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09553v1"
arxiv_id: "2606.09553"
authors: ["David Guzm\u00e1n", "Luel Hagos Beyene", "Jesujoba Oluwadara Alabi", "Yejin Jeon", "Dietrich Klakow", "David Ifeoluwa Adelani"]
slug: openbibletts-large-scale-speech-resources-and-tts-models-for
summary_word_count: 438
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents OpenBibleTTS, a benchmark and models for low-resource TTS across 37 languages, addressing gaps in speech synthesis quality."
---

**Problem**  
The paper addresses the significant gap in text-to-speech (TTS) capabilities for low-resource languages, which are often overlooked in favor of high-resource languages. Existing TTS models predominantly focus on a limited set of languages, and prior studies on low-resource TTS typically rely on artificially downsampled high-resource corpora. This approach fails to capture the orthographic diversity and phonetic limitations inherent in genuinely underrepresented languages. The authors present OpenBibleTTS, a large-scale benchmark specifically designed for low-resource speech synthesis, encompassing 37 underrepresented languages. This work is a preprint and has not undergone peer review.

**Method**  
OpenBibleTTS includes a comprehensive dataset derived from Biblical texts, which serves as both in-domain and out-of-domain material for TTS model training and evaluation. The authors systematically compare various TTS architectures, including Gemini-TTS and EveryVoice models, across these datasets. The evaluation metrics include listener ratings for naturalness and intelligibility, with a focus on subjective human judgments complemented by automatic evaluations. The models are trained on the newly created dataset, and the authors provide open-source access to all processed datasets, alignments, and trained models to facilitate further research in low-resource TTS.

**Results**  
The results indicate that no single TTS system consistently outperforms others across all languages and metrics. Gemini-TTS achieves the highest listener ratings in most evaluated languages, indicating superior naturalness. However, monolingual EveryVoice models trained on OpenBibleTTS demonstrate stronger intelligibility and listener preference in several African languages. Notably, open from-scratch systems exhibit a sharp decline in performance when evaluated on out-of-domain text, highlighting a critical gap between multilingual coverage and reliable synthesis quality in low-resource contexts. The authors provide detailed performance metrics, although specific numerical results are not disclosed in the abstract.

**Limitations**  
The authors acknowledge that the performance of TTS systems varies significantly across languages and that no model is universally superior. They also note the limitations of using Biblical texts, which may not fully represent the linguistic diversity of the target languages. Additionally, the reliance on subjective human judgments introduces variability that may not be captured by automatic metrics. The paper does not address potential biases in the dataset or the implications of using a religious text as the primary source for training.

**Why it matters**  
The introduction of OpenBibleTTS is significant for advancing TTS technology in low-resource languages, providing a foundation for future research and development in this area. By making the dataset and models publicly available, the authors aim to stimulate further exploration and improvement of TTS systems for underrepresented languages, ultimately contributing to more equitable access to speech technology. This work is crucial for addressing the disparities in TTS quality and availability, as highlighted in the literature, and is available on [arXiv](https://arxiv.org/abs/2606.09553v1).
