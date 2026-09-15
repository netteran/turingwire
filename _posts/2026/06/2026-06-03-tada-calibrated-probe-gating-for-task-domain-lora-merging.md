---
title: "TaDA: Calibrated Probe Gating for Task-Domain LoRA Merging"
date: 2026-06-03 15:39:37 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.05016v1"
arxiv_id: "2606.05016"
authors: ["Huy Quoc To", "Fuyi Li", "Guangyan Huang", "Ming Liu"]
slug: tada-calibrated-probe-gating-for-task-domain-lora-merging
summary_word_count: 408
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces TaDA, a novel method for merging task and domain LoRA adapters in transformer architectures, enhancing performance on various benchmarks."
---

**Problem**  
The paper addresses the challenge of merging task-specific and domain-specific LoRA (Low-Rank Adaptation) adapters into a unified model, a largely unexplored area in the literature. Existing approaches treat these adapters symmetrically, applying uniform weights across all layers, which overlooks the inherent asymmetry in their contributions. The authors argue that task and domain adapters exhibit a depth-dependent asymmetry in transformer architectures, where domain relevance increases with layer depth while task signals are more pronounced in shallower layers. This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors propose TaDA (Task-Domain LoRA Merging), a training-free algorithm that leverages the observed asymmetry through calibrated probe-guided per-layer gating and subspace-aware merging. The method involves two key components: (1) **Gating**: Individual weights are assigned per layer and projection type based on a probe signal that remains invariant to the magnitude of adapter weights. This allows for a tailored approach to how task and domain signals are combined at different depths. (2) **Merging**: The algorithm discards conflicting singular directions before merging the remaining components, ensuring that only complementary information is retained. TaDA produces a standard rank-$r$ LoRA adapter without incurring any inference overhead.

**Results**  
TaDA was evaluated on six scientific question-answering (QA) benchmarks using the Llama-2-7B model, achieving an average accuracy of 0.452. This performance surpasses the DARE-TIES baseline by +3.6 percentage points and secures the best results across all six benchmarks. Additionally, on six image classification benchmarks with the ViT-L/16 architecture, TaDA attained an average accuracy of 85.9%, outperforming the strongest merging baseline and leading in three out of the six individual benchmarks.

**Limitations**  
The authors acknowledge that their approach is limited to the specific structure of transformer architectures and may not generalize to other model types. They also note that the performance gains are contingent on the depth-dependent asymmetry being present in the adapters used. Furthermore, the method's reliance on probe signals may introduce sensitivity to the choice of probe design, which is not extensively discussed.

**Why it matters**  
The implications of TaDA extend to improving the efficiency and effectiveness of model adaptation in various tasks, particularly in scenarios where both task and domain knowledge are critical. By addressing the asymmetry in adapter contributions, TaDA provides a more nuanced approach to model merging, potentially leading to better performance in multi-task learning settings. This work contributes to the ongoing discourse on adapter methods in transformer architectures, as highlighted in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.05016v1).
