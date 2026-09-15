---
title: "End-to-End Optimization of Incoherent Imaging for Classification Under Detector-Limited Readout"
date: 2026-06-08 17:48:14 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.09792v1"
arxiv_id: "2606.09792"
authors: ["Archer Wang", "Joshua Chen", "Sachin Vaidya", "Marin Solja\u010di\u0107"]
slug: end-to-end-optimization-of-incoherent-imaging-for-classifica
summary_word_count: 434
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a theoretical framework for optimizing incoherent imaging systems for classification tasks under detector-limited conditions."
---

**Problem**  
This work addresses the gap in understanding the conditions under which end-to-end optimization of optical front-ends, such as metasurfaces, can outperform traditional lens-based imaging systems for object classification tasks. The authors highlight the lack of a formal framework to characterize the performance benefits of such systems, particularly in scenarios with constrained detector readout. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a theoretical framework that delineates the performance of incoherent imaging systems with optimized phase masks compared to conventional focusing lenses. They analyze the mutual information between detector measurements and class labels, establishing that no incoherent phase mask can exceed the ideal-channel mutual information under full detector readout. The optimization process is particularly effective under constrained readout conditions, such as coarse spatial sampling or limited measurements. The authors validate their framework using synthetic data and standard benchmarks, including MNIST, FashionMNIST, and SVHN. The training process involves optimizing both the optical front-end and the neural network back-end jointly, with a focus on maximizing class separability in the presence of detector noise.

**Results**  
The findings indicate that optimized optics can significantly enhance classification performance when detector readout is constrained. Specifically, the authors report substantial improvements in classification accuracy, particularly under low detector noise conditions. The performance gains diminish as noise increases, as the optimized optics can only shape the signal prior to detection and cannot mitigate post-detection noise. The results show that the advantage of co-design is most pronounced when class-discriminative features are concentrated at lower spatial frequencies compared to within-class variations. The paper provides quantitative results demonstrating these effects, although specific numerical improvements over baseline methods are not detailed in the abstract.

**Limitations**  
The authors acknowledge that their theoretical framework is limited to scenarios with constrained detector readout and does not yield empirical gains under full readout conditions. Additionally, the performance improvements are contingent on the spectral characteristics of the data, which may not generalize across all imaging tasks. The paper does not address the computational complexity of the joint optimization process or the practical implementation challenges of deploying such systems in real-world applications.

**Why it matters**  
This research has significant implications for the design of imaging systems in scenarios where detector limitations are a critical factor. By providing a formal understanding of when and why optimized incoherent imaging can outperform traditional methods, this work lays the groundwork for future advancements in optical design and machine learning integration. The insights gained from this study can inform the development of more efficient imaging systems in various applications, including medical imaging and remote sensing, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.09792v1).
