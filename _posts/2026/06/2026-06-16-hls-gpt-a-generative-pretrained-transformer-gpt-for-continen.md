---
title: "HLS-GPT: A Generative Pretrained Transformer (GPT) for Continental-Scale NASA Harmonized Landsat and Sentinel-2 (HLS) Reflectance Reconstruction Across All Bands on Arbitrary Dates"
date: 2026-06-16 16:19:21 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18115v1"
arxiv_id: "2606.18115"
authors: ["Junjie Li", "Hankui K. Zhang", "David P. Roy"]
slug: hls-gpt-a-generative-pretrained-transformer-gpt-for-continen
summary_word_count: 452
classification_confidence: 0.80
source_truncated: false
layout: post
description: "HLS-GPT is a generative pretrained Transformer model that reconstructs NASA Harmonized Landsat and Sentinel-2 reflectance across all bands and dates."
---

**Problem**  
Recent advancements in deep learning for reconstructing Landsat and Sentinel-2 reflectance time series have been hindered by limitations in spectral coverage, geographic scalability, and reliance on patch-based designs with short temporal contexts. This paper addresses these gaps by introducing HLS-GPT, a model capable of reconstructing surface reflectance for any pixel location and date, leveraging a comprehensive dataset of Harmonized Landsat Sentinel-2 (HLS) data. The work is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
HLS-GPT employs a hierarchical Transformer architecture specifically designed to accommodate the varying spectral band configurations of Landsat and Sentinel-2. The model is trained on a dataset comprising nine years of HLS time series data from over 0.25 million training pixels across the contiguous United States. The training process utilizes a random cropping and masking strategy, where 12-month periods with varying start dates are extracted, and 50% of valid observations are masked. The model is tasked with reconstructing these masked reflectance values from the remaining observations. The architecture's design allows it to effectively capture both geographic and seasonal variability in the data.

**Results**  
The model was evaluated on more than 62,000 independent test pixels, demonstrating robust reconstruction capabilities across diverse land surface conditions, including complex crop phenology and sparse, irregular observations. The leave-one-observation-out evaluation achieved a reconstruction root mean square error (RMSE) below 0.026 for all HLS spectral bands. Notably, the relative RMSE was below 35% for visible bands and below 13% for other bands. The errors for the red-edge band were comparable to those of the red and near-infrared bands, despite the absence of red-edge bands in the Landsat dataset. Sensitivity analyses indicated that masking 10% to 50% of observations resulted in only modest degradation, with all-band RMSE remaining below 0.028. Furthermore, image reconstruction over nine independent 109 by 109 km HLS tiles showed that HLS-GPT outperformed two conventional methods and the NASA-IBM Prithvi model.

**Limitations**  
The authors acknowledge that while HLS-GPT demonstrates strong performance, the model's reliance on a large training dataset may limit its applicability in regions with sparse data. Additionally, the model's performance in extreme weather conditions or highly variable land cover types has not been explicitly tested. The paper does not address potential biases in the training data or the implications of using a generative model in operational settings.

**Why it matters**  
HLS-GPT represents a significant advancement in the field of remote sensing, providing a scalable solution for reconstructing surface reflectance across various temporal and spatial contexts. Its ability to handle complex land surface conditions and irregular observations has implications for applications in agriculture, environmental monitoring, and climate science. This work lays the groundwork for future research in generative modeling for remote sensing data, as published in [arXiv](https://arxiv.org/abs/2606.18115v1).
