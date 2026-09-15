---
title: "An 84-Format Numeric Catalog with Bit-Exact Conformance Vectors: A Vendor-Neutral Reference for FP8, BF16, MXFP4, and Microscaling Formats"
date: 2026-06-08 16:04:15 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.09686v1"
arxiv_id: "2606.09686"
authors: ["Dmitrii Vasilev"]
slug: an-84-format-numeric-catalog-with-bit-exact-conformance-vect
summary_word_count: 429
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a comprehensive catalog of 84 numeric formats and conformance vectors to standardize machine learning hardware representations."
---

**Problem**  
The proliferation of numeric formats in machine learning hardware, including FP8 (E4M3 and E5M2), BF16, MXFP4, and various microscaling formats, has created a significant gap in vendor-neutral reference materials. Engineers porting models across different accelerators face challenges due to silent divergences in numeric representations, which complicate debugging and model performance evaluation. This paper addresses the lack of standardized, bit-exact reference material, which is crucial for ensuring consistency across diverse hardware implementations. Notably, this work is a preprint and has not undergone peer review.

**Method**  
The core contribution of this paper is the development of a catalog that encompasses 84 numeric formats across 13 families, along with a suite of six bit-exact conformance packs. These packs cover various formats, including GF16, MXFP4, BF16, FP8 E4M3, FP8 E5M2, and E8M0 block scale. Each conformance pack is structured as a self-contained JSON document, featuring a SHA-256 fingerprint for integrity verification, a shared row schema, and an anchor vector that encodes the mathematical identity phi² + 1/phi² = 3, serving as a cross-pack sanity check. The packs are cross-validated against the ml_dtypes 0.5.4 library from Google/JAX, with any discrepancies documented as spec-permitted interpretation gaps. The work does not introduce new numeric formats or make claims regarding model accuracy or superiority over existing vendor implementations.

**Results**  
The paper does not present traditional performance metrics or benchmark comparisons, as it focuses on cataloging and standardizing numeric formats rather than evaluating model performance. The primary outcome is the establishment of a comprehensive reference that facilitates the identification of divergences in numeric representations across different hardware platforms. The explicit documentation of interpretation gaps allows engineers to better understand the implications of using various formats in their models.

**Limitations**  
The authors acknowledge that the work does not propose new numeric formats or assert any advantages over existing vendor implementations. Additionally, the catalog is limited to the formats included and may not encompass all emerging formats in the rapidly evolving landscape of machine learning hardware. The reliance on existing libraries for validation (ml_dtypes) may also introduce biases based on the specific implementations of those libraries.

**Why it matters**  
This work is significant for the machine learning community as it provides a foundational resource for engineers and researchers working with diverse numeric formats across various hardware accelerators. By offering a vendor-neutral reference, it aims to reduce the friction associated with model portability and enhance the reliability of numeric computations in machine learning applications. The availability of these artifacts under an open license fosters collaboration and further development in the field, as highlighted in the paper and available on [arXiv](https://arxiv.org/abs/2606.09686v1).
