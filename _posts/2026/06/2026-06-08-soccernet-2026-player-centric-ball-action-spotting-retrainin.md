---
title: "SoccerNet 2026 Player-Centric Ball-Action Spotting:Retraining and Post-Processing Extensions to the FOOTPASS Baselines"
date: 2026-06-08 15:59:56 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09679v1"
arxiv_id: "2606.09679"
authors: ["Parthsarthi Rawat"]
slug: soccernet-2026-player-centric-ball-action-spotting-retrainin
summary_word_count: 415
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents enhancements to the FOOTPASS baselines for player-centric ball-action spotting in soccer, achieving significant performance improvements."
---

**Problem**  
The paper addresses the challenge of player-centric ball-action spotting in soccer, specifically for the SoccerNet 2026 competition. The task involves identifying which player performs specific actions at given times across eight action classes. The authors note a significant gap in the existing literature regarding effective methods for handling the imbalanced dataset, which has a 213:1 ratio of passes to tackles. This work is a preprint and has not undergone peer review.

**Method**  
The authors build upon three FOOTPASS baselines: TAAD, TAAD+GNN, and TAAD+DST. They introduce four key extensions to enhance performance: 
1. **Gradient Checkpointing**: This technique allows for full-backbone fine-tuning on a single GPU, optimizing memory usage during training.
2. **GNN Logit Fusion**: The logits from a Graph Neural Network (GNN) are integrated into the DST encoder, which combines tactical context from the graph with visual features specific to each player.
3. **Square-Root Frequency Class Weighting**: This method is employed to mitigate the severe class imbalance in the training data, ensuring that less frequent actions like tackles are given appropriate importance during training.
4. **Post-Processing Pipeline**: This includes several steps: per-class logit gating to refine predictions, temporal frame refinement to enhance action timing, jersey re-assignment to correct player identification errors, and a two-model ensemble to improve overall prediction accuracy.

**Results**  
The proposed system achieves a Macro F1 score of 0.548 on the test set and 0.446 on the challenge set during server evaluation. These results indicate a notable improvement over the baseline FOOTPASS models, although specific baseline performance metrics are not disclosed in the paper.

**Limitations**  
The authors acknowledge that their approach may still struggle with the inherent complexity of soccer actions, particularly in scenarios with occlusions or overlapping player actions. Additionally, the reliance on a single GPU for training may limit scalability for larger datasets or more complex models. The paper does not discuss the potential impact of the post-processing steps on real-time application or the generalizability of the model to different soccer contexts.

**Why it matters**  
This work contributes to the growing field of action recognition in sports, particularly in enhancing the understanding of player interactions and tactical movements in soccer. The methodologies introduced, especially the GNN logit fusion and class weighting techniques, could be applicable to other domains with similar challenges of class imbalance and complex interactions. The findings and techniques presented in this paper are relevant for future research in action recognition and can inform the development of more robust models for real-time sports analytics, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.09679v1).
