---
title: "How Much Do Reviews Really Contribute? A Study on Text-Enriched Matrix Factorization for Recommendations"
date: 2026-06-15 17:09:48 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16973v1"
arxiv_id: "2606.16973"
authors: ["Eduardo Ferreira da Silva", "Mayki dos Santos Oliveira", "Joel Machado Pires Denis Dantas Boaventura", "Frederico Ara\u00fajo Dur\u00e3o"]
slug: how-much-do-reviews-really-contribute-a-study-on-text-enrich
summary_word_count: 503
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the contribution of textual reviews in matrix factorization-based recommender systems, revealing limited benefits compared to collaborative signals."
---

**Problem**  
This study addresses the gap in understanding the actual contribution of textual reviews in recommender systems, particularly when strong collaborative filtering baselines are employed. Despite the growing trend of integrating textual information into recommendation models, the effectiveness of such approaches remains underexplored, especially in the context of matrix factorization. The authors highlight that existing literature lacks systematic evaluations of how textual representations impact recommendation performance, particularly when robust collaborative methods are in place. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a novel framework that incorporates textual information into matrix factorization through three distinct enrichment strategies. The first is a learnable gating mechanism that adaptively balances collaborative and textual signals during training. This mechanism is applied to two types of review representations: (i) aggregated topic profiles derived from user and item histories, and (ii) full text embeddings generated from the reviews. The second contribution is a cross-attention mechanism that identifies and emphasizes the most informative dimensions of the textual representation before fusing it with collaborative factors. The authors evaluate six model variants: (1) a pure collaborative model, (2) a model enriched with topic profiles via gating, (3) a model enriched with full text embeddings via gating, (4) a model combining both topic profiles and text via gating, (5) a model enhanced with cross-attention over textual features, and (6) a model that integrates both gating and cross-attention.

**Results**  
The experiments were conducted on multiple review-based datasets, where the authors found that while adaptive fusion mechanisms (gating and cross-attention) improved the flexibility of representations, the overall contribution of textual signals was marginal compared to the collaborative backbone. Specifically, the best-performing model, which utilized both gating and cross-attention, showed only a slight improvement in recommendation accuracy over the pure collaborative model, with effect sizes indicating that collaborative information remains the dominant factor in performance. The results suggest that the integration of textual reviews does not significantly enhance predictive capabilities in typical rating-prediction scenarios.

**Limitations**  
The authors acknowledge that the marginal contribution of textual signals may be influenced by the datasets used, which may not fully capture the potential of textual information in other contexts. They also note that the study focuses primarily on rating-prediction tasks, leaving open questions regarding the effectiveness of textual enrichment in other recommendation scenarios, such as ranking or personalized content delivery. Additionally, the reliance on specific matrix factorization techniques may limit the generalizability of the findings to other recommendation architectures.

**Why it matters**  
This work has significant implications for the design of recommender systems, particularly in guiding future research on the integration of semantic information. The findings suggest that while textual reviews can provide additional context, their impact may be limited in scenarios dominated by collaborative signals. This insight is crucial for researchers and practitioners aiming to enhance recommendation systems with textual data, as it emphasizes the need for careful consideration of the balance between collaborative and semantic signals. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.16973v1).
