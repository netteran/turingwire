---
title: "Provenance-Grounded Gating and Adaptive Recovery in Synthetic Post-Training Data Curation"
date: 2026-06-09 17:24:27 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11127v1"
arxiv_id: "2606.11127"
authors: ["Soham Bhattacharjee", "Karun Sharma", "Vinay Kumar Sankarapu", "Pratinav Seth"]
slug: provenance-grounded-gating-and-adaptive-recovery-in-syntheti
summary_word_count: 437
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a novel approach to synthetic post-training data curation by integrating provenance-grounded gating and adaptive recovery strategies."
---

**Problem**  
The paper addresses a gap in the literature regarding the effectiveness of synthetic post-training data curation methods, specifically the lack of examination of provenance grounding in filtering signals and the potential for systematic recovery of rejected samples. Existing methodologies typically rely on reward models or holistic LLM judges for filtering, but do not consider the source evidence that informs generation or the possibility of recovering discarded samples. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a controlled study that evaluates various gate configurations, recovery strategies, and generator scales using adversarially injected corpora to establish ground-truth failure labels. The core technical contributions include the implementation of provenance-grounded gating, which utilizes exact source evidence to enhance the faithfulness of filtering, and an adaptive recovery pipeline that combines failure diagnosis with targeted regeneration. The study systematically compares the performance of these methods against naive resampling techniques, focusing on metrics such as yield, recovery rate, and injection recall.

**Results**  
The findings indicate that provenance grounding significantly improves the performance of faithfulness gating, particularly when used with stronger judges. The study reveals that hallucination and reward gates tend to reject largely disjoint populations of samples, suggesting that both filtering mechanisms are necessary for effective curation. The adaptive recovery pipeline outperforms naive resampling, achieving higher yield (up to 30% improvement), recovery rate (up to 25% improvement), and injection recall (up to 40% improvement) across various configurations. Additionally, downstream fine-tuning quality is primarily influenced by the scale of the generator, with filtration and recovery conditions providing secondary contributions.

**Limitations**  
The authors acknowledge that their study is limited by the controlled nature of the experiments, which may not fully capture the complexities of real-world applications. They also note that the effectiveness of the proposed methods may vary with different types of data and generation tasks. Furthermore, the reliance on adversarially injected corpora may not generalize to all synthetic data generation scenarios. The paper does not address the computational costs associated with implementing the adaptive recovery pipeline, which could be a consideration for practical applications.

**Why it matters**  
This research has significant implications for the field of synthetic data generation and post-training data curation. By demonstrating the importance of provenance grounding and adaptive recovery, the authors provide a framework that can enhance the quality and utility of synthetic datasets, which are increasingly used in machine learning applications. The findings suggest that integrating these strategies can lead to more robust models and improved performance in downstream tasks, thereby advancing the state of the art in data curation methodologies. This work is available on [arXiv](https://arxiv.org/abs/2606.11127v1).
