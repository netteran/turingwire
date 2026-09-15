---
title: "Which Models Are Our Models Built On? Auditing Invisible Dependencies in Modern LLMs"
date: 2026-06-10 17:47:59 +0000
category: research
subcategory: other
company: "null"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12385v1"
arxiv_id: "2606.12385"
authors: ["Sanjay Adhikesaven", "Haoxiang Sun", "Sewon Min"]
slug: which-models-are-our-models-built-on-auditing-invisible-depe
summary_word_count: 393
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents ModSleuth, a system for auditing dependencies in LLMs, revealing complex relationships and documentation inconsistencies."
---

**Problem**  
The paper addresses the lack of transparency in the dependency structures of modern large language models (LLMs), which often rely on other models for data generation, filtering, and evaluation. This issue is exacerbated by the recursive nature of dependencies, where models depend on upstream artifacts with fragmented documentation across various releases. The authors highlight that existing literature does not adequately tackle the challenge of tracing these dependencies, particularly in the context of unreviewed preprints.

**Method**  
The authors introduce ModSleuth, an agentic system designed to recursively reconstruct LLM dependency graphs from public artifacts. The core technical contributions include a formalization that differentiates between direct and indirect dependencies, and an operation-centered representation of heterogeneous pipeline roles. ModSleuth employs a systematic approach to resolve artifact identities across varying names, versions, and repositories. The system leverages source-grounded evidence to ensure the accuracy of the dependency graphs it constructs. The authors applied ModSleuth to four LLM releases, although specific details regarding the architecture, loss functions, or training compute were not disclosed.

**Results**  
ModSleuth successfully identified 1,060 source-verified dependencies across the analyzed LLMs, constructing comprehensive dependency graphs that reveal intricate relationships within the models' training and evaluation processes. The findings include multi-hop license obligations and discrepancies between released artifacts and those used during training. The authors emphasize that these insights would be challenging to uncover without the systematic approach provided by ModSleuth. However, specific quantitative metrics or comparisons against baseline methods were not provided in the paper.

**Limitations**  
The authors acknowledge that the primary challenge lies in defining what constitutes a dependency and reconciling inconsistencies in documentation. They do not address potential limitations related to the scalability of ModSleuth or its applicability to proprietary models, which may not have publicly available artifacts. Additionally, the paper does not discuss the potential biases introduced by the selection of public artifacts or the implications of incomplete dependency graphs.

**Why it matters**  
The work has significant implications for the transparency and accountability of LLM development, as it provides a framework for auditing the complex ecosystems that underpin these models. By releasing ModSleuth and the resulting dependency graphs, the authors contribute to the ongoing discourse on responsible AI and model governance. This research is particularly relevant for practitioners and researchers aiming to understand the intricacies of LLM training pipelines and the potential legal and ethical ramifications of model dependencies, as published in [arXiv](https://arxiv.org/abs/2606.12385v1).
