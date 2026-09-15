---
title: "Darshana Graph: A Parallel Commentary Corpus for Comparative Indian Philosophy, with Stylometric and Exploratory Graph Analyses"
date: 2026-06-16 17:49:15 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18222v1"
arxiv_id: "2606.18222"
authors: ["Joy Bose"]
slug: darshana-graph-a-parallel-commentary-corpus-for-comparative-
summary_word_count: 439
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents the Darshana Graph, a unique corpus for comparative analysis of Indian philosophical texts, enabling stylometric and graph-based explorations."
---

**Problem** — This work addresses the lack of a publicly available, large-scale corpus for comparative analysis of Indian philosophical texts, specifically focusing on the alignment of commentaries across different schools of thought. The authors highlight that no existing resource allows for such extensive cross-commentator alignment, particularly for the Hindu and Jain traditions, which is crucial for understanding interpretive variations in philosophical discourse. This is a preprint and has not undergone peer review.

**Method** — The Darshana Graph corpus comprises over 125,000 text records, with a unique subset of approximately 8,500 aligned records from eighteen historical commentators across five schools of Vedanta and other darshanas. The authors employ a stylometric analysis that quantifies argumentative styles through metrics such as scriptural citation density, explicit refutation rate, and sentence complexity. They also introduce a constrained large language model (LLM) pipeline designed to extract typed philosophical relationships using a predefined vocabulary, followed by deterministic post-hoc validation to ensure accuracy. The methodology emphasizes transparency and reproducibility, with the full corpus, relationship graph, and source code made publicly available.

**Results** — The stylometric analysis reveals a moderate negative correlation (r = -0.45) between citation density and refutation rate, indicating that higher citation density may correlate with lower rates of refutation. Additionally, the analysis shows a significant increase in refutation rates among three commentators within a related doctrinal lineage, suggesting that interpretive styles can vary significantly even within closely related traditions. The LLM pipeline successfully surfaces disagreement patterns across schools, although it also identifies limitations in extraction accuracy, particularly when compared to independent embedding-based analyses. The authors provide detailed metrics and visualizations to support their findings.

**Limitations** — The authors acknowledge several limitations, including the potential biases inherent in the selection of texts and commentators, as well as the constraints of the LLM pipeline in accurately capturing complex philosophical relationships. They note discrepancies between graph-derived findings and independent analyses, suggesting that further refinement of the extraction methodology is necessary. Additionally, the reliance on a predefined vocabulary may limit the richness of the relationships captured.

**Why it matters** — The Darshana Graph corpus represents a significant advancement in the study of comparative Indian philosophy, providing researchers with a robust tool for analyzing interpretive variations across different schools. The stylometric insights and relationship graph can facilitate deeper understanding of philosophical discourse and its evolution over time. This work opens avenues for future research in both computational linguistics and philosophy, as it allows for the application of machine learning techniques to traditional texts, thereby bridging the gap between humanities and computational analysis. As published in [arXiv cs.CL](https://arxiv.org/abs/2606.18222v1), this resource is poised to enhance scholarly engagement with Indian philosophical traditions.
