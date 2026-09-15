---
title: "Democratising Camera Trap AI: An Open-Source Model for Detecting UK Mammals"
date: 2026-06-09 14:47:24 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10940v1"
arxiv_id: "2606.10940"
authors: ["Paul Fergus", "Philip Stephens", "Russell A. Hill", "Lee Oliver", "Katie Appleby", "Sarah Beatham"]
slug: democratising-camera-trap-ai-an-open-source-model-for-detect
summary_word_count: 455
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents an open-source YOLO26x model for detecting UK mammals and birds, addressing accessibility in biodiversity monitoring AI."
---

**Problem**  
The paper addresses the gap in accessible AI tools for biodiversity monitoring, specifically for UK fauna, which are often restricted to commercial platforms or trained on non-relevant species. The authors highlight the lack of open-source models tailored to the ecological needs of the British Isles, which limits the ability of ecologists, particularly those without machine learning expertise, to utilize AI for wildlife monitoring. This work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The authors developed a YOLO26x object detection model trained on a curated dataset comprising 48,165 labeled instances of 31 classes, including 28 common UK mammal and bird species, as well as utility classes for humans, calibration poles, and vehicles. The dataset was collected over a decade from multiple sites through the Conservation AI and Trap Tracker initiatives. The model was trained using an 80/10/10 class-stratified split for training, validation, and testing. The training process and compute resources are not explicitly detailed, but the model's architecture is based on the YOLO framework, which is known for its efficiency in real-time object detection.

**Results**  
The YOLO26x model achieved a mean Average Precision (mAP) of 0.984 at an Intersection over Union (IoU) threshold of 0.5, and 0.956 at IoU 0.5-0.95 on the validation set. Precision and recall metrics were reported at 0.988 and 0.965, respectively. On an unseen held-out test split, the model demonstrated a mean per-species confidence ranging from 0.96 to 0.99 across all classes, with a notably low false-negative rate of 0.17%, primarily in challenging conditions such as nighttime or occluded images. These results indicate strong performance, although they are derived from data collected from the same sites used for training, leaving the model's generalization to new environments untested.

**Limitations**  
The authors acknowledge that the model's performance has not been evaluated on entirely new sites, which may affect its applicability in diverse ecological contexts. Additionally, the model's reliance on a specific dataset may limit its effectiveness in detecting species not represented in the training data. The open-source nature of the model is a strength, but the non-commercial license may restrict broader usage in commercial applications.

**Why it matters**  
This work significantly contributes to the democratization of AI tools in ecological research, providing a robust, open-source solution for wildlife monitoring that can be utilized by ecologists without machine learning expertise. By releasing the trained weights in ONNX format and supporting local desktop and real-time camera applications, the authors aim to enhance the accessibility of biodiversity monitoring technologies. This initiative counters the trend of commercial models that have proliferated in recent years, as published in [arXiv](https://arxiv.org/abs/2606.10940v1). The implications of this work extend to improved data collection and analysis in conservation efforts, potentially leading to better-informed ecological management strategies.
