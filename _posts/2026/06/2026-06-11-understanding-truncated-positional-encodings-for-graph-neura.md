---
title: "Understanding Truncated Positional Encodings for Graph Neural Networks"
date: 2026-06-11 17:58:56 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13671v1"
arxiv_id: "2606.13671"
authors: ["James Flora", "Mitchell Black", "Weng-Keen Wong", "Amir Nayyeri"]
slug: understanding-truncated-positional-encodings-for-graph-neura
summary_word_count: 421
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper investigates the expressive power of truncated positional encodings in graph neural networks, revealing significant differences in performance and theoretical implications."
---

**Problem**  
This work addresses a gap in the understanding of truncated positional encodings (PEs) in graph neural networks (GNNs), particularly in the context of their expressive power. While existing literature has established the theoretical equivalence of spectral and walk-based PEs when using complete encodings, the implications of truncation—commonly employed in practice due to computational constraints—remain unexplored. This paper initiates the study of truncated PEs, which are often used in real-world applications, and highlights their distinct properties compared to their complete counterparts. The authors note that this is a preprint and has not yet undergone peer review.

**Method**  
The authors theoretically analyze the expressive power of various families of truncated PEs, including spectral (e.g., Laplacian eigenspaces) and walk-based encodings (e.g., powers of the adjacency matrix). They demonstrate that truncation fundamentally alters the expressive capabilities of these encodings. Specifically, they show that truncated spectral PEs do not exceed the expressive power of the 1-WL test, a significant finding that contrasts with the complete versions. The study also includes an examination of $k$-harmonic distances, a specific family of spectral PEs, to illustrate the nuanced differences in expressivity among closely related truncated encodings. Experimentally, the authors evaluate the performance of various combinations of truncated PEs on real-world datasets, revealing that a mixed approach outperforms any single family of PEs.

**Results**  
The experimental results indicate that a combination of truncated PEs yields superior performance on benchmark datasets compared to individual families. While specific numerical results are not disclosed in the abstract, the authors emphasize that the mixed approach consistently outperforms single-family encodings across multiple datasets, suggesting a significant improvement in GNN performance when utilizing truncated PEs effectively.

**Limitations**  
The authors acknowledge that their theoretical results are limited to the specific families of PEs studied and do not generalize to all possible encodings. Additionally, the empirical evaluations are constrained to certain real-world datasets, which may not represent the full spectrum of GNN applications. The paper does not address the computational overhead associated with implementing mixed PEs in practice, which could impact scalability in larger networks.

**Why it matters**  
This research has important implications for the design and implementation of GNNs, particularly in scenarios where computational resources are limited. By elucidating the differences in expressive power between complete and truncated PEs, the findings encourage practitioners to reconsider their encoding strategies. The preference for mixed truncated PEs over single families suggests a new direction for enhancing GNN performance in practical applications. This work contributes to the broader understanding of GNN architectures and their capabilities, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.13671v1).
