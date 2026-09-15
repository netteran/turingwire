---
title: "An Uncertainty Estimation Framework for Dose Accumulation in Adaptive Radiotherapy: Application to CBCT-Guided Radiotherapy for Cervical Cancer"
date: 2026-06-09 15:52:58 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11012v1"
arxiv_id: "2606.11012"
authors: ["Cedric Hemon", "Delphine Lebret", "Jean-Claude Nunes", "Valentin Boussot", "Karine Peignaux", "Nathalie Mesgouez-Nebout"]
slug: an-uncertainty-estimation-framework-for-dose-accumulation-in
summary_word_count: 420
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents IMPACT-DoseAcc, an uncertainty-aware framework for dose accumulation in adaptive radiotherapy, enhancing cumulative dose estimation."
---

**Problem**  
The paper addresses the limitations in cumulative dose estimation during adaptive radiotherapy (ART), particularly in the context of cervical cancer treatment using Cone Beam Computed Tomography (CBCT). Existing methods struggle with uncertainties arising from deformable image registration (DIR), segmentation inaccuracies, and anatomical variations. The authors propose IMPACT-DoseAcc, an unreviewed framework that quantifies and propagates these uncertainties to improve dose accumulation accuracy.

**Method**  
IMPACT-DoseAcc integrates within the IMPACT framework for semantic feature-driven image analysis. The method employs two strategies to quantify DIR uncertainty: a Bayesian segmentation-guided approach utilizing a single probabilistic model to assess anatomical uncertainty, and an ensemble of segmentation models to capture epistemic variability across structures. The framework generates voxel-wise uncertainty maps that are propagated through dose warping and accumulation processes, resulting in probabilistic dose-volume histograms (pDVHs). The authors also quantify ensemble uncertainty via voxel-wise standard deviation across deformation fields and assess geometric error through surface distance metrics between warped and validated contours. Anatomical variability weighting is applied to refine the aggregation of dose estimates across fractions and organs.

**Results**  
The study analyzed data from nine patients with locally advanced cervical cancer (LACC) using daily CBCT-derived virtual CTs for dose recalculation. The correlation between ensemble DIR uncertainty and geometric error was significant, with Pearson coefficients of 0.63 for the clinical target volume (CTVt) and 0.66 for the bladder. The pDVHs achieved a coverage of 96.3 ± 3.9% for CTVt, indicating effective calibration of propagated uncertainty. The anatomical variability weighting contributed to stabilizing dose estimates across different fractions and organs, enhancing the reliability of cumulative dose metrics.

**Limitations**  
The authors acknowledge that the framework does not model uncertainties associated with virtual CT generation, which could impact the overall accuracy of dose accumulation. Additionally, the study is limited by its retrospective analysis of a small patient cohort (nine patients), which may affect the generalizability of the results. The reliance on specific imaging modalities (CBCT) may also limit the framework's applicability to other imaging techniques.

**Why it matters**  
The development of IMPACT-DoseAcc represents a significant advancement in the field of adaptive radiotherapy by providing a systematic approach to quantify and incorporate uncertainties in dose accumulation. This framework enhances the interpretability of accumulated doses under anatomical variations, which is crucial for optimizing treatment plans and improving patient outcomes. The integration with 3DSlicer facilitates reproducible, uncertainty-informed ART workflows, paving the way for more robust clinical applications. This work is particularly relevant for ongoing research in radiotherapy optimization, as highlighted in related studies on uncertainty quantification in medical imaging, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11012v1).
