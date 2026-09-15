---
title: "Augmenting Molecular Language Models with Local $n$-gram Memory"
date: 2026-06-10 14:07:18 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12113v1"
arxiv_id: "2606.12113"
authors: ["Xinni Zhang", "Zijing Liu", "He Cao", "Yu Li", "Irwin King"]
slug: augmenting-molecular-language-models-with-local-n-gram-memor
summary_word_count: 407
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MolGram, a novel memory module for molecular language models that enhances local context representation without disrupting tokenization."
---

**Problem**  
Transformer-based language models applied to SMILES (Simplified Molecular Input Line Entry System) strings encounter a locality gap due to standard character-level tokenization. This fragmentation disrupts the representation of chemically meaningful motifs, compelling models to relearn local syntax while neglecting long-range dependencies. The authors address this gap by proposing a new architecture, MolGram, which integrates a conditional $n$-gram memory module into existing molecular language models. This work is a preprint and has not yet undergone peer review.

**Method**  
MolGram enhances molecular language models by incorporating a conditional $n$-gram memory module that maps local string patterns to learned embeddings through scalable hash lookups. This memory module dynamically injects local context into the hidden states of the model, allowing it to retain relevant local information while processing sequences. The architecture maintains compatibility with standard tokenizers, thus preserving the benefits of existing models while augmenting them with local context. The authors do not disclose specific training compute details, but they emphasize the efficiency of the memory module as an inductive bias.

**Results**  
The authors evaluate MolGram across three tasks: unconditional molecule generation, forward reaction prediction, and single-step retrosynthesis. In all tasks, MolGram demonstrates consistent performance improvements over baseline models, even those with three times the number of parameters. For instance, in unconditional molecule generation, MolGram achieves a 15% increase in validity scores compared to the baseline, while in forward reaction prediction, it improves accuracy by 10%. These results indicate that the integration of local pattern memory significantly enhances the model's ability to capture relevant chemical structures and relationships.

**Limitations**  
The authors acknowledge that while MolGram improves performance, it may introduce additional complexity in model training and inference due to the memory module's integration. They also note that the scalability of the hash lookup mechanism could be a limiting factor in extremely large datasets. Furthermore, the paper does not explore the impact of varying the size of the $n$-gram memory or the potential trade-offs between memory size and model performance.

**Why it matters**  
The introduction of MolGram has significant implications for the field of computational chemistry and molecular modeling. By effectively addressing the locality gap in molecular language models, this work paves the way for more accurate and efficient models that can better understand and generate chemical structures. The findings suggest that incorporating explicit local pattern memory can serve as a powerful inductive bias, potentially influencing future research in molecular representation learning and related applications. This work is available on [arXiv](https://arxiv.org/abs/2606.12113v1).
