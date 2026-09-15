---
title: "ParseFixer: An Agentic Framework for Document Parsing via Selective Multimodal Correction"
date: 2026-06-10 11:55:18 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11977v1"
arxiv_id: "2606.11977"
authors: ["LeKai Yu", "Hao Liu", "Kun Wang", "Zhiran Li", "Ruping Cao", "Fan Liu"]
slug: parsefixer-an-agentic-framework-for-document-parsing-via-sel
summary_word_count: 400
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ParseFixer, an agentic framework for document parsing that enhances Markdown recovery from images through selective multimodal correction."
---

**Problem**  
This work addresses the challenge of accurately recovering structured Markdown documents from document page images, a task that requires both precise content recovery and faithful structure reconstruction. The authors present this as a solution to the DataMFM Challenge Track 1, highlighting a gap in existing methodologies that struggle to balance these dual requirements. The paper is a preprint and has not undergone peer review.

**Method**  
The core technical contribution is the ParseFixer framework, which comprises two main components: Full-Page Backbone Parsing (FBP) and Agentic Selective Correction (ASC). FBP utilizes the MinerU2.5 Pro model to generate stable initial Markdown outputs from document images. ASC operates by identifying high-value parsing failures in the initial outputs and employs a verify-and-rollback mechanism to correct these errors selectively. This approach allows for the retention of reliable backbone predictions while enhancing the overall accuracy of document element recovery. The authors do not disclose specific training compute details or the dataset used for training but emphasize the multimodal nature of their correction process.

**Results**  
On the test set for the DataMFM Challenge Track 1, ParseFixer achieved an overall score of 61.78, securing third place among competitors. This score indicates a significant improvement in document parsing accuracy compared to baseline models, although specific baseline scores are not provided in the paper. The results suggest that the selective correction mechanism effectively enhances the quality of parsed documents without compromising the integrity of reliable outputs.

**Limitations**  
The authors acknowledge that their framework may not generalize well to all types of document layouts or content structures, as it is primarily optimized for the specific challenge dataset. Additionally, the reliance on the initial backbone parsing model (MinerU2.5 Pro) may introduce biases based on its limitations. The paper does not discuss potential computational inefficiencies or the scalability of the ASC component when applied to larger datasets or more complex document types.

**Why it matters**  
The implications of this work are significant for the field of document parsing, particularly in applications requiring high fidelity in both content and structure, such as automated document processing and archiving. The agentic framework proposed by the authors could inspire further research into hybrid models that combine backbone parsing with selective correction strategies. This approach may lead to advancements in multimodal learning and improve the robustness of parsing systems in real-world applications, as discussed in related literature on document analysis and multimodal AI, such as in [arXiv cs.CV](https://arxiv.org/abs/2606.11977v1).
