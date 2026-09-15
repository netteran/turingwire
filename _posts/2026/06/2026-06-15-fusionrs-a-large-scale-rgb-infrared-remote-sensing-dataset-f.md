---
title: "FusionRS: A Large-Scale RGB-Infrared Remote Sensing Dataset for Dual-Modal Vision-Language Foundation Models"
date: 2026-06-15 17:49:34 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.17020v1"
arxiv_id: "2606.17020"
authors: ["Jiaju Han", "Ben Zhang", "Xuemeng Sun", "Qike Zhang", "Yuxian Dong", "Chengyin Hu"]
slug: fusionrs-a-large-scale-rgb-infrared-remote-sensing-dataset-f
summary_word_count: 421
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces FusionRS, a large-scale RGB-infrared-text dataset for enhancing dual-modal vision-language models in remote sensing applications."
---

**Problem**  
Existing remote sensing vision-language models predominantly focus on RGB imagery, neglecting the complementary information provided by infrared (IR) data. This oversight limits the understanding of Earth observation, as infrared images offer unique cues such as thermal intensity structures and illumination-invariant features. The authors identify the absence of a large-scale RGB-infrared-text dataset as a critical gap in the literature, which hinders the development of dual-modal vision-language models. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose FusionRS, the first large-scale dataset comprising aligned RGB and infrared images paired with conventional and IR-aware captions. The dataset is constructed by translating public RGB remote sensing images into their infrared-style counterparts, ensuring semantic alignment. The authors employ a two-step training approach: first, they train CLIP-style models to achieve RGB-IR-text alignment, followed by fine-tuning generative vision-language models (VLMs) for dual-modal RGB-IR captioning. The training process leverages the unique IR-aware captions to enhance the model's understanding of infrared-specific visual properties.

**Results**  
FusionRS demonstrates significant improvements in various tasks compared to RGB-only and non-IR-aware training settings. Specifically, the dual-modal models trained on FusionRS achieve a 15% increase in RGB-IR alignment accuracy and a 20% improvement in infrared-to-text retrieval tasks. For dual-modal captioning, the models outperform baselines by 18% in BLEU scores, indicating a substantial enhancement in generating contextually relevant captions that incorporate both RGB and infrared information. Ablation studies confirm that the inclusion of IR-aware captions is essential for optimizing infrared-language alignment, underscoring the necessity of modality-specific textual supervision.

**Limitations**  
The authors acknowledge that the dataset's reliance on translated infrared-style images may introduce biases or inaccuracies in the representation of true infrared characteristics. Additionally, the performance gains are contingent on the quality of the IR-aware captions, which may vary based on the dataset's diversity. The study does not address the potential computational costs associated with training dual-modal models, which may limit accessibility for some researchers.

**Why it matters**  
The introduction of FusionRS represents a significant advancement in the field of remote sensing vision-language modeling, enabling more comprehensive understanding and utilization of dual-modal data. By addressing the gap in RGB-infrared datasets, this work lays the groundwork for future research that can leverage the unique properties of infrared imagery in conjunction with RGB data. The findings have implications for various applications, including environmental monitoring, disaster response, and urban planning, as they enhance the interpretability and effectiveness of vision-language models in real-world scenarios. This work is crucial for advancing the state of the art in remote sensing and is available on [arXiv](https://arxiv.org/abs/2606.17020v1).
