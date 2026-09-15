---
title: "Sleep EEG Signal Criticality as a Non-Invasive Predictor of Cognitive Decline in Dementia"
date: 2026-06-09 14:02:40 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.10889v1"
arxiv_id: "2606.10889"
authors: ["Stanis\u0142aw Nar\u0119bski", "Tomasz Komendzi\u0144ski", "Tomasz M. Rutkowski"]
slug: sleep-eeg-signal-criticality-as-a-non-invasive-predictor-of-
summary_word_count: 435
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This study explores sleep EEG signal criticality as a non-invasive biomarker for predicting cognitive decline in dementia using MFDFA."
---

**Problem**  
The early detection of neurodegeneration is a significant clinical challenge, particularly in identifying individuals at risk of cognitive decline before clinical symptoms manifest. This paper addresses the gap in non-invasive biomarkers for predicting cognitive impairment by investigating the criticality of sleep EEG signals. The authors utilize longitudinal data from the National Sleep Research Resource (NSRR) Study of Osteoporotic Fractures (SOF) cohort, focusing on women who remained cognitively normal versus those who progressed to dementia-related impairment. This work is a preprint and has not undergone peer review.

**Method**  
The core technical contribution of this study is the application of Multifractal Detrended Fluctuation Analysis (MFDFA) to quantify the criticality of sleep EEG signals. The authors analyzed the Hurst exponent \(H(q)\) distributions derived from sleep EEG data, specifically during non-REM stages N2 and N3. The analysis involved comparing baseline sleep EEG dynamics between the two groups: cognitively healthy individuals and those who later exhibited cognitive decline. Supervised UMAP projections were employed to visualize the separation between the groups based on their EEG dynamics. The study emphasizes the significance of the Hurst exponent as a measure of neural dynamics, with a focus on the shift towards \(1.0\) in the dementia group, indicating a departure from an optimally critical state.

**Results**  
The findings reveal statistically significant differences in the Hurst exponent \(H(q)\) distributions between the two groups, with \(p \leqslant 0.001\) indicating strong evidence against the null hypothesis. Cognitively healthy individuals demonstrated signal dynamics that were significantly closer to an optimally critical state across all electrode locations. The UMAP projections confirmed a clear spatial separation between the cognitively normal and dementia groups throughout the sleep architecture, suggesting that the reconfiguration of scale-free neural dynamics during sleep is a precursor to clinical symptoms of dementia.

**Limitations**  
The authors acknowledge that the study is limited by its focus on a specific demographic (women from the SOF cohort), which may affect the generalizability of the findings. Additionally, the reliance on longitudinal data means that the results are correlational and do not establish causation. The authors also note that further validation in larger, more diverse populations is necessary to confirm the robustness of MFDFA-derived measures as predictive biomarkers.

**Why it matters**  
This research has significant implications for the development of automated, sleep-based screening tools that could facilitate earlier interventions for individuals at risk of dementia. By integrating MFDFA-derived measures into clinical practice, healthcare providers may be able to identify cognitive decline during the prodromal stage, potentially improving patient outcomes. The study supports the Brain Criticality Hypothesis and contributes to the growing body of literature on non-invasive biomarkers for neurodegeneration, as published in [arXiv](https://arxiv.org/abs/2606.10889v1).
