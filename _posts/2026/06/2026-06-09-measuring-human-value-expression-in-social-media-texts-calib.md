---
title: "Measuring Human Value Expression in Social Media Texts: Calibrated LLM Annotation and Encoder Transfer"
date: 2026-06-09 15:55:55 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11018v1"
arxiv_id: "2606.11018"
authors: ["Maria Milkova", "Maksim Rudnev"]
slug: measuring-human-value-expression-in-social-media-texts-calib
summary_word_count: 402
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a method for annotating social media texts with human values using calibrated LLMs and demonstrates encoder transfer for scalable predictions."
---

**Problem**  
This work addresses the challenge of measuring subjective constructs, specifically human values, in social media texts. Existing literature lacks robust annotation procedures that are theoretically grounded and empirically validated, particularly for non-English texts. The authors highlight the need for a systematic approach that can be transferred to encoder models for scalable predictions. This paper is a preprint and has not undergone peer review.

**Method**  
The authors utilize Schwartz's theory of basic human values as a framework for annotating social media posts. They explore the performance of various large language models (LLMs) in interpreting these values, employing iterative prompt calibration to enhance accuracy. The methodology includes error analysis to identify recurrent misattributions, which informs the development of targeted expert verification rules for corpus annotation. The final model employs soft-label training to transfer LLM annotations to an encoder model, preserving the theoretical value interpretations and uncertainty information. Specifics regarding the architecture of the encoder model and the computational resources used for training are not disclosed.

**Results**  
The study reports significant improvements in annotation precision, recall, and F1 scores through the proposed calibration and error analysis techniques. The authors demonstrate that different LLMs yield varying interpretations of human values, with calibrated prompts leading to reduced misattributions. While exact numerical results are not provided in the abstract, the paper emphasizes structural alignment between values and the stability of annotations as key metrics of success. The findings suggest that the calibrated approach enhances alignment with expert annotations compared to baseline methods.

**Limitations**  
The authors acknowledge that the reliance on theoretical frameworks may limit the flexibility of interpretations in certain contexts. Additionally, the study's focus on non-English texts may not generalize to all languages or cultural contexts. The paper does not address potential biases inherent in the LLMs used or the implications of these biases on the annotation process. Furthermore, the transferability of the trained encoder model to other datasets or domains remains untested.

**Why it matters**  
This research has significant implications for the field of natural language processing, particularly in the context of social media analysis and sentiment detection. By establishing a method for theoretically grounded annotation and demonstrating the transferability of LLM outputs to encoder models, the authors contribute to the development of more reliable and interpretable models for subjective value measurement. This work lays the groundwork for future studies that may explore the intersection of human values and machine learning, as published in [arXiv](https://arxiv.org/abs/2606.11018v1).
