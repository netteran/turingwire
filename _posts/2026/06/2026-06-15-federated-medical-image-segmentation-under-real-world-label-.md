---
title: "Federated Medical Image Segmentation under Real-World Label Noise: A Benchmark Suite for Noisy Label Learning Method Selection"
date: 2026-06-15 15:44:58 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16868v1"
arxiv_id: "2606.16868"
authors: ["Markus Bujotzek", "Dimitrios Bounias", "Stefan Denner", "Ralf Floca", "Maximilian Fischer", "Peter Neher"]
slug: federated-medical-image-segmentation-under-real-world-label-
summary_word_count: 418
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a benchmark suite for evaluating federated noisy label learning in medical image segmentation under real-world label noise conditions."
---

**Problem**  
The paper addresses the gap in federated learning (FL) for medical image segmentation, particularly the challenges posed by real-world label noise, such as contour disagreements and mislabeling. Existing research primarily relies on synthetic noise and simplified scenarios, which do not accurately reflect the complexities encountered in practical applications. This work is a preprint and has not undergone peer review, highlighting the need for a robust evaluation framework that can accommodate diverse real-world datasets and client-noise scenarios.

**Method**  
The authors propose a benchmark suite that integrates various real-world noisy medical image segmentation datasets, specifically curated to reflect common label imperfections encountered in clinical settings. The framework encompasses multiple client-noise scenarios, allowing for a comprehensive assessment of federated noisy label learning (FNLL) methods. The evaluation metrics are designed to target label noise characteristics, enabling systematic comparisons across different FNLL approaches. The benchmark suite is implemented in a federated segmentation framework, which is made publicly available via GitHub, facilitating reproducibility and further research.

**Results**  
The benchmark suite was evaluated against several FNLL methods, demonstrating significant performance variations based on the type and extent of label noise present in the datasets. While specific numerical results are not disclosed in the abstract, the authors emphasize that the suite provides a realistic and discriminative basis for FNLL evaluation, which is expected to yield more reliable performance metrics compared to previous studies that utilized synthetic noise. The authors also highlight the importance of dataset-specific noise characterization, which is crucial for method selection in real-world applications.

**Limitations**  
The authors acknowledge that the benchmark suite, while comprehensive, may not cover all possible real-world scenarios of label noise, and further research is needed to expand its applicability. Additionally, the reliance on curated datasets may introduce biases that do not fully represent the variability found in clinical practice. The paper does not address the computational overhead associated with federated learning setups, which could impact the scalability of the proposed methods in large-scale deployments.

**Why it matters**  
This work is significant as it lays the groundwork for more effective FNLL in medical image segmentation, addressing a critical barrier to the deployment of federated learning in healthcare. By providing a structured evaluation framework, it enables researchers to systematically assess and compare FNLL methods under realistic conditions, ultimately leading to improved segmentation performance in clinical applications. The implications of this research extend to enhancing the reliability of AI systems in medical imaging, as highlighted in the context of federated learning challenges. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.16868v1).
