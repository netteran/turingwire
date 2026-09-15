---
title: "DMT: Demographic Conditioning, Morphology-Enhanced Transformer for Cuffless Blood Pressure Estimation from PPG Signals"
date: 2026-06-09 17:23:07 +0000
category: research
subcategory: foundation_models
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11125v1"
arxiv_id: "2606.11125"
authors: ["Yidan Shen", "Neville Mathew", "Maham Rahimi", "Deependra Dhakal", "George Zouridakis", "Xin Fu"]
slug: dmt-demographic-conditioning-morphology-enhanced-transformer
summary_word_count: 389
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a Transformer-based model for cuffless blood pressure estimation from PPG signals, enhancing accuracy through demographic conditioning and morphology attention."
---

**Problem**  
This work addresses the limitations of existing PPG-based blood pressure (BP) estimation models, which often rely on amplitude-dominated shortcuts and do not effectively incorporate demographic covariates that influence vascular compliance. The authors highlight that many models utilize BP regression without adequately capturing subject-specific variations, particularly in the context of cuffless BP estimation. This paper is a preprint and has not undergone peer review.

**Method**  
The proposed architecture, named DMT (Demographic Conditioning, Morphology-Enhanced Transformer), employs a Transformer-based network that utilizes self-attention mechanisms to model long-range dependencies across multiple cardiac cycles in PPG signals. The model incorporates demographic information through FiLM (Feature-wise Linear Modulation) style feature modulation, which is applied within the attention and feed-forward layers of the Transformer blocks. Additionally, a morphology head is integrated to enhance the model's focus on BP-relevant waveform characteristics, such as arterial stiffness and wave reflection. The training process leverages a large-scale dataset, PulseDB, although specific training compute details are not disclosed.

**Results**  
The DMT model achieves a mean absolute error (MAE) of 4.56 mmHg for systolic BP and 2.62 mmHg for diastolic BP under calibration-based evaluation protocols. These results represent a significant improvement, with error reductions of 47% for systolic BP and 50% for diastolic BP compared to previous demographic-enhanced PPG baselines. The performance metrics indicate that the model not only enhances accuracy but also maintains a lightweight architecture suitable for scalable deployment in clinical settings.

**Limitations**  
The authors acknowledge that the model's performance is contingent on the quality of the demographic data used for conditioning, which may not be uniformly available across all populations. Additionally, while the model shows promise in calibration-enabled environments, its efficacy in real-world, uncalibrated scenarios remains to be validated. The paper does not address potential biases in the demographic data or the generalizability of the model across diverse populations.

**Why it matters**  
The DMT model's approach to integrating demographic conditioning and morphology attention represents a significant advancement in cuffless BP estimation methodologies, potentially leading to more personalized and accurate cardiovascular risk assessments. This work lays the groundwork for future research in wearable health monitoring technologies, emphasizing the importance of subject-specific modeling in physiological signal interpretation. The implications of this research are critical for the development of scalable, clinically applicable solutions in non-invasive BP monitoring, as discussed in the context of ongoing advancements in the field, available on [arXiv](https://arxiv.org/abs/2606.11125v1).
