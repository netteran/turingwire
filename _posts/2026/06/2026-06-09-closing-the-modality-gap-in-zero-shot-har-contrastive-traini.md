---
title: "Closing the Modality Gap in Zero-Shot HAR: Contrastive Training and Separability-Optimized Prototypes on IMU Data"
date: 2026-06-09 12:39:41 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10789v1"
arxiv_id: "2606.10789"
authors: ["Anik Ghosh"]
slug: closing-the-modality-gap-in-zero-shot-har-contrastive-traini
summary_word_count: 389
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper addresses the modality gap in zero-shot human activity recognition using contrastive training and optimized prototypes on IMU data."
---

**Problem**  
Zero-shot learning (ZSL) for inertial measurement unit (IMU)-based human activity recognition (HAR) is hindered by the modality gap between sensor embeddings and semantic class representations. This paper systematically evaluates various configurations to address this gap, which is identified as a training-time phenomenon influenced by the encoder objective. The work is presented as a preprint and has not undergone peer review.

**Method**  
The authors explore seven configurations that combine three inference methods with two training pipelines on the PAMAP2 dataset, which includes 14 seen and 4 unseen activity classes. The core technical contribution involves using a temporal convolutional network (TCN) trained with cross-entropy loss over label-name Sentence-BERT prototypes. The study finds that substituting label-name prototypes with more descriptive activity descriptions significantly enhances the mean cosine similarity of sensor embeddings to text prototypes from 0.30 to 0.69. The optimal configuration employs contrastive training alongside inverted softmax correction, which leads to improved performance metrics.

**Results**  
The strongest model configuration achieves 73.2% accuracy and a macro F1 score of 0.583 on unseen classes, outperforming the label-name baseline, which recorded 58.3% accuracy and a macro F1 score of 0.34. This demonstrates a substantial improvement in performance due to the proposed training strategies. The authors also highlight that the use of richer text descriptions can reduce inter-prototype separability in the Sentence-BERT space, as shared biomechanical vocabulary compresses the prototype cloud. Despite this, the benefits of contrastive alignment are retained when the descriptions maintain sufficient discriminative vocabulary.

**Limitations**  
The authors acknowledge that the reliance on overall accuracy can be misleading, particularly in imbalanced test-set class distributions. They recommend using macro-averaged F1 as the standard metric for reporting results in ZSL-HAR benchmarks. Additionally, the study does not explore the scalability of the proposed methods to larger datasets or different sensor modalities, which could limit the generalizability of the findings.

**Why it matters**  
This work has significant implications for advancing zero-shot learning methodologies in human activity recognition, particularly in scenarios where labeled data is scarce. By addressing the modality gap and optimizing prototype representations, the findings can inform future research on multimodal learning and transfer learning in HAR applications. The recommendation to adopt macro-averaged F1 as a reporting standard could lead to more reliable evaluations in the field. This research contributes to the ongoing discourse in ZSL and HAR, as discussed in related works available on [arXiv](https://arxiv.org/abs/2606.10789v1).
