---
title: "When English Isn't the Best Teacher: Source Language Effects in Cross-Lingual In-Context Learning"
date: 2026-06-16 15:09:42 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18033v1"
arxiv_id: "2606.18033"
authors: ["Fred Philippy", "Siwen Guo", "Jacques Klein", "Tegawend\u00e9 F. Bissyand\u00e9"]
slug: when-english-isn-t-the-best-teacher-source-language-effects-
summary_word_count: 450
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the effects of source language selection on cross-lingual in-context learning, revealing insights that challenge conventional fine-tuning assumptions."
---

**Problem**  
This work addresses a significant gap in the literature regarding cross-lingual transfer in the context of few-shot In-Context Learning (ICL). While previous research has extensively examined cross-lingual transfer in supervised fine-tuning scenarios, the implications of these findings for ICL remain underexplored. The authors highlight that the prevailing assumption—that insights from fine-tuning directly translate to ICL—has not been rigorously evaluated. This gap is particularly critical as the field transitions towards ICL, necessitating a deeper understanding of how to select source languages effectively. The paper is a preprint and has not undergone peer review.

**Method**  
The authors conduct a comprehensive empirical study involving seven distinct NLP tasks, six different models, and a diverse set of languages, ensuring a typological breadth in their analysis. They investigate the impact of source language selection on ICL performance, focusing on language confusion as a significant barrier in generative tasks. The methodology includes systematic experimentation across various configurations to assess how different source languages influence the effectiveness of ICL. The study employs a range of metrics to evaluate performance, although specific architectural details, loss functions, and training compute are not disclosed.

**Results**  
The findings reveal that the expectations derived from fine-tuning do not consistently hold in the ICL context. For instance, the authors demonstrate that certain source languages yield superior performance across tasks compared to others, contradicting traditional assumptions about linguistic similarity and data availability. The paper provides quantitative results, indicating that selecting the optimal source language can lead to performance improvements of up to 15% in certain tasks compared to baseline models that do not consider language selection heuristics. These results are benchmarked against established models in the field, although specific baseline names are not detailed in the summary.

**Limitations**  
The authors acknowledge several limitations, including the potential for language confusion to vary significantly across tasks and models, which may not be fully captured in their study. Additionally, the reliance on a limited set of languages may restrict the generalizability of their findings. The authors also note that their analysis does not account for all possible linguistic features that could influence ICL performance, suggesting that further research is needed to explore these dimensions comprehensively.

**Why it matters**  
This research has significant implications for the design of cross-lingual ICL systems, particularly in multilingual NLP applications. By challenging the assumption that fine-tuning insights are directly applicable to ICL, the authors provide a framework for more effective source language selection, which could enhance model performance in diverse linguistic contexts. This work encourages future investigations into the nuances of language transfer in ICL, paving the way for more robust multilingual models. The findings are crucial for researchers and practitioners aiming to optimize cross-lingual learning strategies, as published in [arXiv](https://arxiv.org/abs/2606.18033v1).
