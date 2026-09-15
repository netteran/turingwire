---
title: "POTATR: A Lightweight Image-to-Graph Model for Page-Level Table Extraction"
date: 2026-06-08 17:43:44 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09788v1"
arxiv_id: "2606.09788"
authors: ["Brandon Smock", "Libin Liang", "Max Sokolov", "Amrit Ramesh", "Valerie Faucon-Morin", "Tayyibah Khanam"]
slug: potatr-a-lightweight-image-to-graph-model-for-page-level-tab
summary_word_count: 409
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents POTATR, a lightweight image-to-graph model for efficient and accurate page-level table extraction, outperforming existing methods."
---

**Problem**  
Current table extraction (TE) methods for large-scale document processing are often resource-intensive, requiring billions of parameters, extensive autoregressive steps, or expensive API calls. This paper addresses the gap in lightweight, efficient models that maintain high accuracy for contextualized page-level TE. The authors propose the Page-Object Table Transformer (POTATR) as a solution, aiming to improve both performance and cost-effectiveness in TE tasks. Notably, this work is a preprint and has not undergone peer review.

**Method**  
POTATR is a 29M parameter image-to-graph model that builds upon the Table Transformer (TATR) architecture. The model employs a novel approach to contextualize page-level TE by integrating visual and textual information, allowing for spatial grounding of recognized elements. Each output element is associated with a bounding box, facilitating visual verification and geometric text assignment. The training methodology and specific loss functions are not detailed in the abstract, but the model's efficiency is highlighted through its performance metrics and operational speed. The authors emphasize that POTATR can be extended to handle scanned documents via external OCR and can perform full-document TE through cross-page merging techniques.

**Results**  
POTATR demonstrates superior performance on the PubTables-v2 Single Pages benchmark, achieving a GriTS_Con score of 0.964. This performance is notable as it surpasses all tested models, including state-of-the-art multi-layer language models (MLLMs). Additionally, POTATR operates over 130 times faster than these models while incurring approximately 300 times lower operational costs. These results indicate a significant advancement in the efficiency and effectiveness of page-level TE.

**Limitations**  
The authors acknowledge that while POTATR excels in speed and accuracy, the model's performance may vary with different document types and layouts not represented in the training data. Additionally, the reliance on external OCR for scanned documents could introduce variability in performance based on the quality of the OCR output. The paper does not address potential limitations related to the generalizability of the model across diverse datasets or its performance in real-world applications.

**Why it matters**  
The introduction of POTATR has significant implications for the field of document processing, particularly in applications requiring efficient and accurate table extraction. Its lightweight architecture allows for broader accessibility and deployment in resource-constrained environments, making it suitable for various industries. The ability to integrate with existing OCR systems and perform full-document TE enhances its utility in practical scenarios. This work contributes to the ongoing evolution of TE methodologies, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.09788v1), and sets a precedent for future research focused on optimizing model efficiency without sacrificing performance.
