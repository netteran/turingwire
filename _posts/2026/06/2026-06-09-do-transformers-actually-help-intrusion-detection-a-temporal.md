---
title: "Do Transformers Actually Help Intrusion Detection? A Temporal Sequence Evaluation on CIC-IDS2017"
date: 2026-06-09 16:57:10 +0000
category: research
subcategory: evaluation_benchmarks
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11098v1"
arxiv_id: "2606.11098"
authors: ["Zach Moczkodan", "Hany Ragab"]
slug: do-transformers-actually-help-intrusion-detection-a-temporal
summary_word_count: 394
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper evaluates the impact of padding conventions on Transformer performance in intrusion detection, revealing significant evaluation methodology flaws."
---

**Problem**  
This work addresses the gap in the literature regarding the effectiveness of Transformer architectures in network intrusion detection, particularly under realistic conditions. Previous studies often report high performance on the CIC-IDS2017 dataset without utilizing genuine sequence inputs or evaluating under leakage-free conditions. This preprint highlights the need for a more rigorous assessment of temporal models in intrusion detection systems (IDS).

**Method**  
The authors reformulate the CIC-IDS2017 dataset as a temporal intrusion detection task by constructing ordered flow sequences from network conversations. They benchmark nine classical and deep learning architectures, including LSTM, GRU, 1D-CNN, and various Transformer configurations. The evaluation is conducted under three conditions: a random split, two leakage-free splits, and an ablation study on padding schemes. The core contribution lies in demonstrating that the choice of padding convention significantly influences the performance of the Transformer model, overshadowing architectural differences. The study emphasizes the importance of sequence-aware benchmarking and explicit padding disclosure.

**Results**  
The findings reveal that the Transformer achieves the highest macro-F1 score of 0.89 on genuinely sequential (non-padded) windows. However, under a zero-padding and masking evaluation, its performance drops by 0.24 macro-F1, while LSTM, GRU, and 1D-CNN maintain stable performance. In leakage-free group evaluations, the Random Forest model exhibits the most robustness with a marginal increase of +0.009 in macro-F1. Notably, the Transformer's false-alarm rate escalates from 0.04% to 2.7%, indicating a 67-fold increase that is not captured under conventional evaluation protocols. These results underscore the critical impact of evaluation methodology on reported performance metrics.

**Limitations**  
The authors acknowledge that their findings are contingent on the specific dataset and evaluation protocols used. They also note that while their study provides insights into the performance of various architectures, it does not explore the full range of potential IDS architectures or datasets. Additionally, the reliance on the CIC-IDS2017 dataset may limit the generalizability of the results to other intrusion detection scenarios.

**Why it matters**  
This research has significant implications for the field of intrusion detection, as it challenges the validity of previous performance claims based on flawed evaluation methodologies. By advocating for leakage-free splits, explicit padding disclosure, and sequence-aware benchmarking, the authors aim to establish more reliable standards for future IDS research. This work is crucial for ensuring that advancements in deep learning architectures, such as Transformers, are accurately assessed and can be effectively applied in real-world scenarios, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.11098v1).
