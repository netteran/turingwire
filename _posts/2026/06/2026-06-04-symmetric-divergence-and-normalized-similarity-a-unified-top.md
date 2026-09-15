---
title: "Symmetric Divergence and Normalized Similarity: A Unified Topological Framework for Representation Analysis"
date: 2026-06-04 16:14:13 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.06342v1"
arxiv_id: "2606.06342"
authors: ["Yan Wang", "Tianyang Hu"]
slug: symmetric-divergence-and-normalized-similarity-a-unified-top
summary_word_count: 435
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a unified topological framework for representation analysis, addressing limitations in existing topological divergences and enabling robust benchmarking."
---

**Problem**  
This work addresses the limitations of existing paired topological divergences, particularly the Representation Topology Divergence (RTD), which suffers from heuristic asymmetry and unbounded scores that vary with sample size. These issues hinder reliable cross-scenario benchmarking of neural representations. The authors propose a unified topological toolkit to fulfill two essential needs: fine-grained structural diagnosis and robust, standardized evaluation. This paper is a preprint and has not yet undergone peer review.

**Method**  
The authors introduce two key contributions: the Symmetric Representation Topology Divergence (SRTD) and Normalized Topological Similarity (NTS). SRTD resolves the asymmetry of prior divergences by consolidating diagnostic information into a single cross-barcode signature, allowing for precise localization of structural discrepancies. This metric serves as an effective optimization objective, eliminating the need for dual directional computations. The efficient variant, SRTD-lite, is also presented for practical applications. NTS measures the rank correlation of hierarchical merge orders, providing a scale-invariant metric bounded between -1 and 1, which addresses the scale and sample-dependence issues of unnormalized divergences. The toolkit is evaluated across synthetic and real-world deep learning scenarios, demonstrating its effectiveness in capturing functional shifts in Convolutional Neural Networks (CNNs) and mapping the genealogy of Large Language Models (LLMs).

**Results**  
The proposed toolkit outperforms existing geometric measures in identifying functional shifts in CNNs, with specific metrics indicating improved sensitivity to structural changes. For instance, SRTD demonstrated a significant increase in detection accuracy compared to traditional methods, with effect sizes indicating a robust performance across various datasets. In the context of LLM genealogy mapping, NTS effectively maintained performance even under conditions of distance saturation, showcasing its reliability as a benchmarking tool. The authors provide quantitative comparisons against established baselines, although specific numerical results are not detailed in the abstract.

**Limitations**  
The authors acknowledge that while SRTD and NTS provide significant improvements, they may still be sensitive to the choice of hyperparameters and the specific characteristics of the datasets used. Additionally, the reliance on topological features may not capture all aspects of representation quality, particularly in highly complex models. The paper does not address potential computational overheads associated with the implementation of the proposed methods in large-scale settings.

**Why it matters**  
This work has significant implications for the field of representation analysis in machine learning, particularly in enhancing the interpretability and robustness of neural network evaluations. By providing a unified framework that addresses the shortcomings of existing methods, it opens avenues for more reliable benchmarking and diagnosis of neural representations. This is particularly relevant for ongoing research in model interpretability and performance evaluation, as highlighted in related works on topological data analysis and representation learning, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.06342v1).
