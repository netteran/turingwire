---
title: "Correlation Is Not Enough: Embedding Human Metadata for Individual Causal Discovery"
date: 2026-06-08 15:54:28 +0000
category: research
subcategory: foundation_models
company: "Intel"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09672v1"
arxiv_id: "2606.09672"
authors: ["Suraj Biswas", "Saurabh Gupta", "Pritam Mukherjee"]
slug: correlation-is-not-enough-embedding-human-metadata-for-indiv
summary_word_count: 453
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a method to enhance causal discovery in biomedical contexts by embedding human metadata, addressing limitations in existing models."
---

**Problem**  
The paper addresses a significant gap in causal discovery within biomedical language models, particularly the inability of existing models (e.g., BioBERT, PubMedBERT, BioM-ELECTRA) to accurately discriminate between unrelated cross-domain pairs. The authors highlight that these models yield high cosine similarity scores (0.76 to 0.92) for pairs that should exhibit no causal relationship, resulting in a 0% accuracy on cross-domain discrimination tasks. This issue is critical as it leads to erroneous causal inferences in downstream applications, particularly in Large Behavioural Models (LBMs) that rely on embedding proximity to establish causal links. The work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The authors propose a two-pass approach to improve the accuracy of causal discovery. The first pass involves a contrastive learning method applied to 72,034 pairs, which enhances the PubMedBERT BIOSSES correlation from 0.633 to 0.828 and increases the within-vs-across-domain separation from 1.05x to 1.63x. The second pass, termed BODHI, utilizes hard negative mining from edges absent in a biomedical knowledge graph, achieving a further increase in separation to 2.30x and a discrimination gap improvement of +0.392, albeit with a 4.5% cost to BIOSSES. The authors also optimize inference performance using OpenVINO on an Intel Xeon 6737P with AMX, reducing single-query latency from 1367 ms to 10 ms (a 133x improvement) and achieving a throughput of 555 sentences per second. Notably, the authors find that FP16 precision outperforms INT8 across all serving batch sizes on this hardware.

**Results**  
The proposed methods yield significant improvements over baseline models. The contrastive learning pass raises the correlation score to 0.828, while the BODHI pass achieves a separation factor of 2.30x and a discrimination gap of +0.392. These results indicate a marked enhancement in the model's ability to distinguish between causal and non-causal relationships. The performance improvements in latency and throughput on the Intel Xeon platform demonstrate the practical applicability of the proposed methods in real-time scenarios.

**Limitations**  
The authors acknowledge that the improvements come at a slight cost to BIOSSES performance (4.5%). Additionally, the reliance on a specific hardware configuration (Intel Xeon with AMX) may limit the generalizability of the latency and throughput results. The paper does not address potential biases in the training data or the implications of using hard negatives from a knowledge graph, which could affect the robustness of the model in diverse applications.

**Why it matters**  
This work has significant implications for the field of causal inference in biomedical contexts, particularly in enhancing the reliability of models that inform clinical decision-making. By addressing the limitations of existing models and providing a robust methodology for causal discovery, the authors contribute valuable insights that can inform future research and applications in this domain, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.09672v1).
