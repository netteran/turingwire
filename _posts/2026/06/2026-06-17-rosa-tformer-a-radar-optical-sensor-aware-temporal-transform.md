---
title: "ROSA-TFormer: A Radar-Optical Sensor-Aware Temporal Transformer for Pinus sylvestris Plantation Classification in Northern Shaanxi Using GEE-Derived Sentinel-1/2 Time Series"
date: 2026-06-17 15:41:42 +0000
category: research
subcategory: other
company: "Google"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.19204v1"
arxiv_id: "2606.19204"
authors: ["Nengbo Zhang", "Chang sheng"]
slug: rosa-tformer-a-radar-optical-sensor-aware-temporal-transform
summary_word_count: 386
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ROSA-TFormer, a novel temporal Transformer model for classifying Pinus sylvestris plantations using radar-optical time series data."
---

**Problem**  
The accurate classification of Pinus sylvestris var. mongolica plantations is critical for assessing afforestation quality and ecological restoration efforts in northern Shaanxi. Existing methodologies may not effectively leverage multi-source temporal data for this classification task. This work addresses this gap by proposing ROSA-TFormer, a radar-optical sensor-aware temporal Transformer model. The paper is a preprint and has not undergone peer review.

**Method**  
ROSA-TFormer employs a dual-branch architecture that integrates separate embedding pathways for Synthetic Aperture Radar (SAR) and optical data. The model features a sensor-aware gate mechanism that dynamically adjusts the contribution of each sensor type based on the temporal context. Temporal attention pooling is utilized to capture seasonal variations in the data effectively. The model is trained on time-series data derived from Sentinel-1 and Sentinel-2 satellites, processed through Google Earth Engine. Specific training compute details are not disclosed, but the model's architecture is designed to optimize the fusion of radar and optical features for enhanced classification performance.

**Results**  
ROSA-TFormer demonstrates exceptional performance on the HalfMonth-dataBig dataset, achieving an overall accuracy of 99.67%, a macro F1 score of 99.56%, and a P. sylvestris-specific F1 score of 98.91%. These results significantly outperform baseline models, although specific baseline metrics are not provided in the summary. The authors also conducted spatial block validation and ablation studies, which confirm the effectiveness of the radar-optical temporal fusion and the sensor-aware modeling approach.

**Limitations**  
The authors acknowledge that while ROSA-TFormer shows promising results for point-level classification, broader wall-to-wall validation is necessary to assess its generalizability across different landscapes and conditions. Additionally, the reliance on Google Earth Engine for data processing may limit the model's applicability in regions where such data is not readily available. The paper does not discuss potential computational efficiency or scalability issues that may arise when deploying the model in real-world applications.

**Why it matters**  
The introduction of ROSA-TFormer represents a significant advancement in the integration of multi-source temporal data for ecological monitoring tasks. Its high classification accuracy can enhance the monitoring of afforestation efforts and contribute to ecological restoration initiatives. The findings underscore the importance of sensor-aware modeling in remote sensing applications, paving the way for future research that may explore similar architectures for other ecological classifications. This work is relevant for researchers and practitioners in the field of remote sensing and ecological monitoring, as published in [arXiv](https://arxiv.org/abs/2606.19204v1).
