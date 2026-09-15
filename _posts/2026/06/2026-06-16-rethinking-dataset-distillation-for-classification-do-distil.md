---
title: "Rethinking Dataset Distillation for Classification: Do Distilled Sets Outperform Coresets?"
date: 2026-06-16 17:37:49 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.18209v1"
arxiv_id: "2606.18209"
authors: ["Trisha Mittal", "Akshay Mehra", "Joshua Kimball"]
slug: rethinking-dataset-distillation-for-classification-do-distil
summary_word_count: 377
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper critically evaluates dataset distillation methods against coreset selection, revealing limited advantages and higher costs for distillation approaches."
---

**Problem** — This work addresses the gap in the evaluation of dataset distillation (DD) methods in data-centric machine learning, particularly the inconsistency in evaluation protocols and the assumption that DD outperforms coreset selection (CS). The authors highlight that prior comparisons often lack rigorous benchmarking, making it difficult to ascertain the true effectiveness of DD methods. This paper is a preprint and has not undergone peer review.

**Method** — The authors benchmark seven state-of-the-art DD methods against three CS strategies using standardized datasets: ImageNet-1K, ImageNet100, and ImageNette. They employ three widely adopted training protocols to ensure consistency in evaluation. The evaluation metrics include accuracy, representativeness, diversity, and quality of the condensed sets. The construction cost of DD methods is also analyzed, revealing that they often require significantly more computational resources compared to CS methods.

**Results** — The findings indicate that several DD methods do not outperform simple random subsets of data. Specifically, the SOTA DD approaches are shown to be comparable to or worse than coresets on large-scale datasets. For instance, the accuracy of the best-performing DD method was only marginally better than that of the coreset approach, with a notable increase in computational cost for DD methods. The coresets consistently demonstrated superior coverage of the original data distribution, indicating better representativeness and diversity.

**Limitations** — The authors acknowledge that their evaluation is limited to specific datasets and training protocols, which may not generalize across all applications. They also note that while their findings challenge the prevailing assumption of DD superiority, further exploration into the nuances of different datasets and tasks is warranted. Additionally, the computational cost analysis may not account for all practical deployment scenarios, potentially underestimating the advantages of DD in certain contexts.

**Why it matters** — This work has significant implications for the field of data-centric machine learning, as it questions the prevailing narrative that dataset distillation is inherently superior to coreset selection. The results suggest that researchers and practitioners should reconsider the use of DD methods, particularly in scenarios where computational efficiency is critical. The findings encourage a more nuanced understanding of data representation techniques, emphasizing the need for rigorous evaluation protocols. This paper contributes to the ongoing discourse on the effectiveness of data compression strategies in machine learning, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.18209v1).
