---
title: "UniReason-Med: A Shared Grounded Reasoning Interface for 2D-to-3D Transfer in Medical VQA"
date: 2026-06-10 07:16:27 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11740v1"
arxiv_id: "2606.11740"
authors: ["Mengzhuo Chen", "Yan Shu", "Chi Liu", "Hongming Piao", "Xidong Wang", "Derek Li"]
slug: unireason-med-a-shared-grounded-reasoning-interface-for-2d-t
summary_word_count: 371
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents UniReason-Med, a framework that enhances 3D medical visual question answering (VQA) using grounded reasoning from 2D images."
---

**Problem**  
This work addresses the gap in leveraging abundant 2D medical images to improve 3D medical visual question answering (VQA). The authors highlight the lack of effective methods that utilize a shared reasoning interface to transfer knowledge from 2D to 3D modalities. The paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The core contribution is the UniReason-Med framework, which operates on a single checkpoint capable of processing both 2D images and slice-serialized 3D volumes during inference. The architecture employs a common reasoning interface that generates interleaved textual reasoning and localized visual evidence. Key components include shared box syntax and region-token injection, which facilitate the integration of 2D and 3D data. The model is trained using a newly constructed dataset, UniMed-CoT, comprising 220K instruction-tuning samples (170K 2D and 50K 3D). The training process involves supervised fine-tuning followed by outcome-level reinforcement learning (RL), where the model learns to produce grounded reasoning traces without relying on traditional IoU/Dice-based localization rewards.

**Results**  
UniReason-Med demonstrates significant improvements in 3D reasoning tasks compared to 3D-only training approaches. The authors report that joint 2D and 3D grounded supervision leads to a marked enhancement in performance metrics, although specific headline numbers are not disclosed in the abstract. Ablation studies confirm that both grounding and region-token injection consistently benefit performance across 2D and 3D tasks, indicating the robustness of the proposed method.

**Limitations**  
The authors acknowledge that the reliance on a single checkpoint may limit the model's adaptability to diverse medical imaging scenarios. Additionally, the absence of IoU/Dice-based localization rewards during RL training could impact the precision of visual evidence localization. The dataset, while extensive, may not encompass all variations present in clinical practice, potentially affecting generalizability.

**Why it matters**  
The implications of this research are significant for advancing medical VQA systems, particularly in scenarios where 2D images are more readily available than 3D data. By establishing a shared grounded reasoning interface, this work paves the way for more effective integration of multimodal medical data, enhancing diagnostic and decision-making processes in healthcare. The findings contribute to the ongoing discourse on multimodal learning in medical AI, as discussed in related literature, and are available for further exploration on [arXiv](https://arxiv.org/abs/2606.11740v1).
