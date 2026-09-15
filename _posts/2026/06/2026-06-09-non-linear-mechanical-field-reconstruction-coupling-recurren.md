---
title: "Non-linear mechanical field reconstruction coupling recurrent neural networks with physics-informed graph neural networks"
date: 2026-06-09 14:20:39 +0000
category: research
subcategory: agents_robotics
company: "UiPath"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10909v1"
arxiv_id: "2606.10909"
authors: ["Manuel Ricardo Guevara Garban", "Yves Chemisky", "\u00c9tienne Pruli\u00e8re", "Micha\u00ebl Cl\u00e9ment", "Martin Abendroth", "Bj\u00f6rn Kiefer"]
slug: non-linear-mechanical-field-reconstruction-coupling-recurren
summary_word_count: 411
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a novel LSTM-GNN framework for efficient reconstruction of local stress fields in heterogeneous microstructures under non-linear loading."
---

**Problem**  
Reconstructing local stress fields in heterogeneous microstructures subjected to non-linear, history-dependent loading is a significant computational challenge in multi-scale simulations. Existing methods often struggle with the scale mismatch between macroscopic and microscopic models, particularly in elasto-plastic regimes. This paper addresses this gap by proposing a coupled Long Short-Term Memory (LSTM) and Graph Neural Network (GNN) framework. The work is a preprint and has not undergone peer review.

**Method**  
The proposed framework integrates an LSTM network to encode macroscopic stress-strain sequences into a compact hidden state, capturing the path-dependent constitutive response. This hidden state is then utilized by a physics-informed GNN to reconstruct the spatially-resolved stress field at each time step. A novel relative weighting strategy with linear warm-up is introduced to balance the data-driven reconstruction loss and a discrete divergence-based equilibrium penalty, effectively addressing the convergence issues in the elasto-plastic regime. The model is trained on a dataset comprising 10,000 non-proportional loading paths applied to a periodic plate-with-a-hole microstructure, utilizing von Mises elasto-plasticity. The architecture is designed to be mesh-agnostic, allowing the trained surrogate to be applied to various mesh types and resolutions without retraining.

**Results**  
The LSTM-GNN framework achieves a speedup of three orders of magnitude compared to traditional finite element simulations. It demonstrates robust generalization capabilities, maintaining a cumulative error of only 1.9% when tested on loading sequences that are twice the length of the training data. The model's performance is validated against high-fidelity quad-element finite element fields, showcasing its ability to reproduce accurate stress fields across different mesh configurations.

**Limitations**  
The authors acknowledge that the model's performance may be sensitive to the quality of the training data and the specific loading conditions. Additionally, while the framework is mesh-agnostic, its generalization to highly complex geometries or materials not represented in the training set remains untested. The reliance on a specific constitutive model (von Mises elasto-plasticity) may also limit the applicability of the approach to other material behaviors.

**Why it matters**  
This work has significant implications for the field of computational mechanics, particularly in enhancing the efficiency of multi-scale simulations. The integration of LSTM and GNN architectures provides a promising avenue for real-time stress field reconstruction, which can facilitate faster design iterations and optimization processes in engineering applications. The mesh-agnostic nature of the model allows for broader applicability across different simulation scenarios, potentially transforming how engineers approach complex material behavior modeling. This research contributes to the ongoing discourse in the field, as discussed in related works available on [arXiv](https://arxiv.org/abs/2606.10909v1).
