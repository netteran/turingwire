---
title: "Comparison of Deep Learning Frameworks For Rice Disease Mapping From UAV Multispectral Imaging"
date: 2026-06-04 16:26:00 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.06359v1"
arxiv_id: "2606.06359"
authors: ["Yadav Raj Ghimire", "Jagrati Talreja", "Tewodros Syum Gebre", "Timothy Agboada", "Shikha V. Chandel", "Leila Hashemi Beni"]
slug: comparison-of-deep-learning-frameworks-for-rice-disease-mapp
summary_word_count: 366
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper evaluates various deep learning frameworks for mapping bacterial leaf blight in rice using UAV multispectral imagery, highlighting architecture performance."
---

**Problem** — This study addresses the gap in effective methodologies for mapping bacterial leaf blight (BLB) in rice using UAV multispectral imagery. Despite the growing interest in remote sensing for agricultural disease monitoring, there is limited comparative analysis of deep learning frameworks specifically tailored for this application. The work is a preprint and has not undergone peer review.

**Method** — The authors evaluate several convolutional neural network (CNN) architectures and transformer-based models, including U-Net with a ResNet-101 encoder, U-Net++ with EfficientNet-B3 and EfficientNet-B7, DeepLabV3+, and SegFormer. All models were trained under a unified pipeline using three input configurations: multispectral imagery alone, multispectral combined with NDVI (Normalized Difference Vegetation Index), and multispectral combined with NDRE (Normalized Difference Red Edge Index). The models were assessed on the publicly available BLB dataset, with performance metrics including mean Intersection over Union (mIoU), mean F1 score (mF1), mean accuracy (mAcc), precision, and recall.

**Results** — U-Net++ with EfficientNet-B3 achieved the highest performance, reporting an mIoU of 97.62%. In contrast, SegFormer demonstrated lower segmentation accuracy but maintained a comparable inference speed. The results indicate that lightweight CNN architectures, particularly U-Net++, are more reliable for operational monitoring of BLB, while the integration of vegetation indices (NDVI and NDRE) yielded minor but consistent performance improvements across the models evaluated.

**Limitations** — The authors acknowledge that the study is limited by the reliance on a single publicly available dataset, which may not fully represent the variability of BLB in different environmental conditions. Additionally, the performance metrics, while comprehensive, do not account for real-world deployment challenges such as model robustness under varying UAV flight conditions or the impact of atmospheric interference on multispectral data. The study does not explore the potential of ensemble methods or hybrid architectures that could further enhance performance.

**Why it matters** — This research underscores the importance of standardized UAV datasets for benchmarking disease mapping methodologies in agriculture. The findings advocate for the continued use of CNN architectures for practical field applications, particularly in the context of precision agriculture. The insights gained from this comparative analysis can inform future work in remote sensing and agricultural monitoring, as highlighted in related literature on deep learning applications in agriculture, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.06359v1).
