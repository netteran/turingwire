---
title: "TimeLens: On-Device Artifact Recognition with Retrieval-Augmented Question Answering for the Grand Egyptian Museum"
date: 2026-06-11 12:23:46 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13267v1"
arxiv_id: "2606.13267"
authors: ["Rawan Hesham", "Ali Ashraf", "Amr Ahmed", "Malak Alaa", "Omar Ahmed", "Omar Wagih"]
slug: timelens-on-device-artifact-recognition-with-retrieval-augme
summary_word_count: 438
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents TimeLens, an AI-powered bilingual mobile guide for the Grand Egyptian Museum, enhancing artifact recognition and user interaction."
---

**Problem**  
This work addresses the challenges of deploying an AI-powered mobile guide in a museum setting, specifically for the Grand Egyptian Museum (GEM). The authors identify three key issues: (1) the fine-grained visual similarity among 51 cataloged artifacts, particularly the near-identical Ramesside statues; (2) the disparity between curated training datasets and the variable conditions of handheld camera usage; and (3) the potential for the AI guide to provide unsupported historical information. This paper is a preprint and has not undergone peer review.

**Method**  
The authors developed an on-device artifact detector using a data-quality-driven iterative approach. They began with foundation-model auto-annotation via YOLO-World, followed by spatial label-cleaning rules, and culminated in a fully hand-annotated dataset. The final model, YOLOv8n, achieved a mean Average Precision (mAP) of 0.995 at IoU=0.5 and 0.924 at IoU=0.5:0.95, while maintaining a compact size of 5.97 MB as a TensorFlow Lite asset, enabling real-time performance on mid-range mobile devices. For the bilingual Retrieval-Augmented Generation (RAG) guide, the authors constructed a knowledge base using ChromaDB with 108 records and evaluated seven candidate language models. The Gemma 4 E2B (Q4 K M) model was selected, and through ten targeted optimizations, the end-to-end latency was reduced from over 30 seconds to approximately 10 seconds. The entire system was integrated into a production Flutter application, featuring a bilingual interface, museum location gating, and text-to-speech capabilities.

**Results**  
The YOLOv8n model demonstrated exceptional performance with mAP scores of 0.995 and 0.924, effectively resolving all previously failing classes. The RAG guide's latency reduction from over 30 seconds to around 10 seconds represents a significant improvement in user experience. The integration of both subsystems into a mobile application allows for seamless interaction, enabling users to receive real-time artifact recognition and responses to inquiries in both English and Arabic.

**Limitations**  
The authors acknowledge that the reliance on a hand-annotated dataset may limit scalability and generalizability to other museum contexts. Additionally, the performance of the RAG guide is contingent on the quality and comprehensiveness of the knowledge base, which may not cover all potential user inquiries. The paper does not address the potential biases in the training data or the implications of real-time processing on battery life and device performance.

**Why it matters**  
The development of TimeLens has significant implications for enhancing visitor engagement in cultural institutions through AI-driven technologies. By addressing the specific challenges of artifact recognition and bilingual interaction, this work paves the way for future applications of AI in museums and similar environments. The integration of real-time visual recognition with a responsive Q&A system could serve as a model for subsequent research and development in the field, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.13267v1).
