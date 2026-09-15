---
title: "Machine Unlearning for the XGBoost Model with Network Intrusion Datasets"
date: 2026-06-17 15:57:43 +0000
category: research
subcategory: other
company: "Micron"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.19220v1"
arxiv_id: "2606.19220"
authors: ["Diana Magalh\u00e3es", "Eva Maia", "Jo\u00e3o Vitorino", "Isabel Pra\u00e7a"]
slug: machine-unlearning-for-the-xgboost-model-with-network-intrus
summary_word_count: 492
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents XGBoost-Forget, a machine unlearning method for XGBoost models, specifically targeting network intrusion detection with tabular data."
---

**Problem**  
Machine unlearning (MU) is a critical area of research that allows for the removal of specific data points from trained models without necessitating full retraining. While existing MU techniques predominantly focus on deep learning architectures and image datasets, there is a notable gap in the application of MU to tabular data, particularly in the context of network intrusion detection (NID). This paper addresses this gap by proposing a novel unlearning method tailored for the XGBoost model, which is widely used in NID tasks. The authors highlight that current literature lacks effective MU strategies for tabular data, especially in security-sensitive applications, making this work particularly relevant and timely.

**Method**  
The authors introduce XGBoost-Forget, an unlearning framework designed specifically for the XGBoost algorithm. The method leverages the inherent structure of decision trees to facilitate efficient unlearning of specific data points. The approach involves modifying the model's internal parameters to reflect the removal of data without retraining from scratch. The authors evaluate XGBoost-Forget on two distinct tabular datasets: IoT-23 and GeNIS, which are representative of network intrusion scenarios. The evaluation metrics include predictive performance (accuracy, F1-score), unlearning efficiency (time taken to unlearn), and forgetting quality (the degree to which the model forgets the specified data). The training compute details are not explicitly disclosed, but the focus is on the efficiency of the unlearning process.

**Results**  
The experimental results demonstrate that XGBoost-Forget achieves predictive performance metrics that are comparable to the original XGBoost model, with accuracy scores remaining above 95% on both datasets. Notably, the unlearning process is reported to be significantly faster, with a reduction in unlearning time by approximately 70% compared to traditional retraining methods. The forgetting quality is also assessed, showing that the model effectively forgets the specified data points while retaining overall performance, indicating a successful implementation of the unlearning process.

**Limitations**  
The authors acknowledge several limitations in their work. Firstly, the method is specifically designed for the XGBoost model, which may limit its applicability to other machine learning frameworks. Additionally, the evaluation is conducted on only two datasets, which may not fully capture the diversity of network intrusion scenarios. The authors also note that the long-term effects of unlearning on model performance over time remain to be explored. Furthermore, the paper does not address potential adversarial attacks that could exploit the unlearning process.

**Why it matters**  
The introduction of XGBoost-Forget represents a significant advancement in the field of machine unlearning, particularly for applications involving tabular data in network intrusion detection. By demonstrating that efficient unlearning can be achieved without sacrificing model performance, this work opens avenues for further research into MU techniques across various machine learning paradigms. The implications extend to privacy-preserving machine learning, where the ability to remove sensitive data points is crucial. This work is particularly relevant for practitioners in cybersecurity and data privacy, as it provides a practical solution to the challenges of data retention and compliance. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.19220v1).
