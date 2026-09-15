---
title: "Urdu Katib Handwritten Dataset: A Historical Document Dataset for Offline Urdu Handwritten Text Recognition with CRNN-Based Baseline Evaluation"
date: 2026-06-17 14:46:29 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.19139v1"
arxiv_id: "2606.19139"
authors: ["Ramza Basharat", "Muhammad Usman Ali"]
slug: urdu-katib-handwritten-dataset-a-historical-document-dataset
summary_word_count: 357
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the Urdu Katib Handwritten Dataset and evaluates CRNN-based models for offline Urdu handwritten text recognition."
---

**Problem**  
The paper addresses the gap in research on Urdu Handwritten Text Recognition (UHTR), which has been limited due to the unique challenges of the Urdu script and the lack of benchmark datasets. The authors present the Urdu Katib Handwritten Dataset (UKHD), the first offline dataset specifically curated from historical documents written by Katibs, to facilitate advancements in UHTR. This work is a preprint and has not undergone peer review.

**Method**  
The authors developed the UKHD, which includes a diverse collection of handwritten text lines in the Nastalique calligraphic style, capturing variations in flat nib writing. To evaluate the dataset's utility, they implemented several Convolutional Recurrent Neural Network (CRNN)-based hybrid models, specifically focusing on the CNN-BGRU-CTC architecture. The training process involved standard techniques for sequence-to-sequence learning, utilizing Connectionist Temporal Classification (CTC) for loss computation. The dataset's size and specific training compute details were not disclosed, but the models were assessed based on their Character Error Rate (CER) and Word Error Rate (WER).

**Results**  
The CNN-BGRU-CTC model outperformed other evaluated architectures, achieving a low CER of 5.2% and a WER of 10.4% on the UKHD. These results were benchmarked against traditional methods, demonstrating a significant improvement in recognition accuracy for Urdu handwritten text. The paper does not specify the performance metrics of the baseline models used for comparison, which limits the contextual understanding of the improvements.

**Limitations**  
The authors acknowledge that the dataset may not encompass the full diversity of Urdu handwriting styles, potentially limiting its applicability to broader contexts. Additionally, the models evaluated are constrained by the dataset's size and the inherent challenges of cursive script recognition. The lack of peer review may also raise questions about the robustness of the findings.

**Why it matters**  
This research is significant for the development of automated systems for recognizing Urdu handwritten text, which is crucial for preserving cultural heritage and historical documents. The introduction of the UKHD provides a foundational resource for future studies in UHTR, potentially leading to improved models and techniques in the field. The work encourages further exploration of CRNN architectures tailored for complex scripts, as highlighted in the findings. This paper is available on [arXiv](https://arxiv.org/abs/2606.19139v1).
