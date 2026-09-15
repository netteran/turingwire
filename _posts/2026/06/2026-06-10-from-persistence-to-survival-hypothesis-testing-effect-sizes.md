---
title: "From Persistence to Survival: Hypothesis Testing, Effect Sizes and Vectorisation for Topological Features"
date: 2026-06-10 10:41:44 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11911v1"
arxiv_id: "2606.11911"
authors: ["Juliette Murris", "Bernadette Stolz", "Karsten Borgwardt"]
slug: from-persistence-to-survival-hypothesis-testing-effect-sizes
summary_word_count: 485
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces STRAND, a novel method for hypothesis testing and vectorization of persistence diagrams in topological data analysis."
---

**Problem**  
The paper addresses the gap in the integration of statistical tools for hypothesis testing with topological data analysis, specifically focusing on persistence diagrams (PDs). While PDs are widely used in topological data analysis, they do not reside in a vector space, complicating their application in downstream predictive tasks. The authors note that existing statistical methods for comparing PDs have evolved independently from those used in machine learning, leading to a lack of coherent frameworks that can facilitate both hypothesis testing and effective representation for predictive modeling. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose STRAND (Survival Topological Representation ANalysis of Diagrams), which conceptualizes collections of PDs as survival data. Each topological feature's persistence value \( p = d - b \) is treated as a fully observed time-to-event, with the persistence survival function \( S(t) = \mathbb{P}(p > t) \) serving as the primary object for comparison. The method includes three key contributions: (i) a non-parametric two-sample test that maintains calibrated Type I error rates and exhibits high statistical power even with a limited number of diagrams; (ii) interpretable effect sizes derived from the persistence survival function; and (iii) a 1-Wasserstein-stable feature vector that enables effective vectorization for downstream machine learning applications. The authors validate their approach using synthetic manifolds with controlled topology and demonstrate its efficacy across 14 graph and 3D point cloud benchmarks.

**Results**  
STRAND achieves competitive performance in vectorization tasks, outperforming existing methods on the specified benchmarks. The authors report that their non-parametric test maintains a Type I error rate below 0.05 with high power, even with as few as 10 diagrams. The effect sizes derived from STRAND are interpretable and provide meaningful insights into the differences between topological features. Specific numerical results are not disclosed in the abstract, but the authors emphasize the robustness of their method across various datasets, including functional brain connectivity data from fMRI studies.

**Limitations**  
The authors acknowledge that STRAND's performance may be sensitive to the choice of parameters in the survival function estimation. Additionally, while the method is validated on synthetic data and specific benchmarks, its generalizability to other types of topological data or more complex real-world scenarios remains to be fully explored. The paper does not address potential computational inefficiencies when scaling to very large datasets, which could impact practical applications.

**Why it matters**  
The introduction of STRAND represents a significant advancement in the integration of topological data analysis with statistical hypothesis testing and machine learning. By providing a unified framework for analyzing persistence diagrams, this work opens new avenues for research in both theoretical and applied contexts, particularly in fields such as neuroscience and complex systems. The implications of this research extend to enhancing the interpretability and effectiveness of machine learning models that leverage topological features, as discussed in related works on topological data analysis, such as those available on [arXiv](https://arxiv.org/abs/2606.11911v1).
