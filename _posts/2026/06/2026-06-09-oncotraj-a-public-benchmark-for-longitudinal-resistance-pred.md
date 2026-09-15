---
title: "OncoTraj: a public benchmark for longitudinal resistance prediction in EGFR-mutant non-small-cell lung cancer on osimertinib"
date: 2026-06-09 17:33:24 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11144v1"
arxiv_id: "2606.11144"
authors: ["Abhijoy Sarkar", "Aarchi Singh Thakur"]
slug: oncotraj-a-public-benchmark-for-longitudinal-resistance-pred
summary_word_count: 389
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces OncoTraj, a public benchmark for predicting resistance in EGFR-mutant NSCLC patients treated with osimertinib, addressing a significant gap in the literature."
---

**Problem**  
The authors identify a critical gap in the computational modeling of longitudinal resistance in EGFR-mutant non-small-cell lung cancer (NSCLC) patients undergoing treatment with osimertinib. Despite the well-documented clonal evolution under therapeutic pressure, there has been no public benchmark available for training or evaluating models on patient trajectories. This paper presents OncoTraj, a preprint benchmark that aims to fill this void by providing a harmonized dataset from multiple clinical-genomic sources.

**Method**  
OncoTraj comprises data from 813 EGFR-mutant NSCLC patients, harmonized from three sources: MSK-CHORD (672 patients), AACR Project GENIE BPC NSCLC (34 patients), and the FLAURA molecular-resistance supplement (107 patients). The benchmark defines three locked tasks: (A) binary classification of progression at a 12-month landmark, (B) regression of time-to-first-progression in days, and (C) six-class classification of the dominant resistance mechanism. The authors provide patient-level train/validation/test splits with an audited no-leakage guarantee and an open-source evaluation harness. Six reference baselines are included: a majority-class predictor, logistic regression, random forest, XGBoost, an LSTM, and a multi-task transformer. The initial version (v1) utilizes single-timepoint snapshot features, revealing that no task surpasses chance performance in clean within-source evaluations, indicating that the limitation lies in the input modality rather than the algorithms employed.

**Results**  
The benchmark demonstrates a reproducible association consistent with existing literature: the presence of TP53 co-mutation increases the 12-month progression rate from 29% to 59% across the cohort. However, no model achieves performance above chance on the primary tasks, underscoring the challenges posed by the single-snapshot tissue NGS input modality. The authors emphasize that the ceiling effect observed across all model classes is attributable to this input limitation.

**Limitations**  
The authors acknowledge that the current version of OncoTraj is constrained by the use of single-snapshot tissue NGS data, which limits the predictive power of the models. They suggest that future iterations (v2) should incorporate serial ctDNA data to enhance the predictive capabilities. Additionally, as a preprint, the work has not undergone peer review, which may affect the robustness of the findings.

**Why it matters**  
OncoTraj establishes a reproducible, leakage-audited baseline for resistance prediction in EGFR-mutant NSCLC, providing a critical resource for researchers in the field. The findings highlight the need for improved data modalities, such as serial ctDNA, to advance predictive modeling in oncology. This work sets the stage for future research and development in resistance prediction, as published in [arXiv](https://arxiv.org/abs/2606.11144v1).
