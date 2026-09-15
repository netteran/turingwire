---
title: "Do Video Foundation Models Understand Intuitive Physics? A Layerwise Probing Analysis"
date: 2026-06-08 15:40:32 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09646v1"
arxiv_id: "2606.09646"
authors: ["Samuele Punzo", "Niccol\u00f2 Caselli", "Ippokratis Pantelidis", "Francesco Massafra", "Salvatore Lo Sardo", "Mohammadreza Salehi"]
slug: do-video-foundation-models-understand-intuitive-physics-a-la
summary_word_count: 424
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper investigates the encoding of intuitive-physics information in pretrained video foundation models through layerwise probing analysis."
---

**Problem**  
This work addresses the gap in understanding whether pretrained video foundation models (VFMs) encapsulate intuitive-physics knowledge in their representations. The authors conduct a layerwise probing analysis to evaluate this capability across different model families, specifically focusing on the frozen representations of these models. The study is particularly relevant as it is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors employ frozen-feature probing techniques on two datasets: IntPhys2 and Minimal Video Pairs (MVP). They compare three distinct model architectures: V-JEPA (a predictive joint-embedding model), VideoMAE (a masked reconstruction model), and LTX-Video (a diffusion-based video generator). The probing analysis involves assessing how well these models can predict intuitive-physics information based on their frozen representations. The study emphasizes the importance of model architecture, layer depth, and the type of probing mechanism used. The authors do not disclose specific training compute details but focus on the comparative performance of the models across different layers.

**Results**  
V-JEPA demonstrates the strongest performance across both benchmarks, particularly excelling with probes that account for temporal dynamics. In quantitative terms, V-JEPA outperforms VideoMAE and LTX-Video, which, while competitive, yield weaker results. Specifically, the performance drop when frame order is disrupted indicates a significant reliance on temporal information, especially in the MVP dataset. Layerwise analysis reveals that intuitive-physics information is least accessible in the early layers of the models, with a marked increase in accessibility at intermediate to late layers. This suggests a hierarchical encoding of intuitive-physics knowledge within the model architectures.

**Limitations**  
The authors acknowledge that their findings are limited by the specific datasets used (IntPhys2 and MVP) and the probing methods employed. They do not explore the implications of model size or the potential effects of different pretraining datasets on the results. Additionally, the reliance on frozen representations may not fully capture the dynamic nature of intuitive-physics understanding, as fine-tuning could yield different insights. The study also does not address the generalizability of these findings to other video tasks or domains.

**Why it matters**  
This research has significant implications for the development of video understanding systems, particularly in applications requiring an understanding of physical interactions. The findings suggest that intuitive-physics knowledge is reliably encoded in pretrained video representations, which could inform future model designs and training paradigms. Understanding how this knowledge is structured within model layers can guide researchers in optimizing architectures for specific tasks. This work contributes to the broader discourse on the interpretability of deep learning models in video analysis, as discussed in related literature, such as that available on [arXiv](https://arxiv.org/abs/2606.09646v1).
