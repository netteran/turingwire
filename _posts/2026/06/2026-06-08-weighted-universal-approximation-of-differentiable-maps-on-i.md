---
title: "Weighted universal approximation of differentiable maps on infinite-dimensional manifolds"
date: 2026-06-08 17:57:40 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09820v1"
arxiv_id: "2606.09820"
authors: ["Philipp Schmocker", "Josef Teichmann"]
slug: weighted-universal-approximation-of-differentiable-maps-on-i
summary_word_count: 439
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper extends the universal approximation theorem for functional input neural networks to differentiable maps, including derivative approximations."
---

**Problem**  
This work addresses a gap in the literature regarding the universal approximation theorem (UAT) for functional input neural networks (FNN) applied to differentiable maps on infinite-dimensional manifolds. Previous formulations of UAT primarily focused on compact sets and did not encompass the approximation of derivatives, which is critical for many applications in functional analysis and machine learning. The authors present a preprint that seeks to generalize these concepts, thereby expanding the theoretical foundation for neural networks operating in more complex spaces.

**Method**  
The authors introduce a weighted Nachbin theorem to establish a UAT for differentiable maps. The architecture discussed involves FNNs that map inputs from potentially infinite-dimensional weighted manifolds to a real-valued hidden layer, followed by the application of a non-linear scalar activation function. The output is then projected into a Banach space through linear readouts. The core technical contribution lies in proving that these networks can approximate not only the functions themselves but also their derivatives, including horizontal and vertical derivatives. The paper also explores the use of linear functions of the signature to approximate path space functionals and their directional derivatives, which is a novel application of the established UAT.

**Results**  
The authors demonstrate that their proposed FNN architecture can achieve universal approximation for differentiable maps, including derivatives, which is a significant advancement over traditional UATs. While specific numerical results and comparisons to named baselines are not provided in the abstract, the implications of their theoretical results suggest that the approximation capabilities of FNNs are significantly enhanced in the context of infinite-dimensional spaces. The paper indicates that the approximation results hold for non-anticipative functionals, which could lead to improved performance in various applications, although exact performance metrics are not detailed.

**Limitations**  
The authors acknowledge that their results are theoretical and may require further empirical validation in practical scenarios. They do not address potential computational challenges associated with training FNNs on infinite-dimensional manifolds, such as convergence issues or the complexity of the optimization landscape. Additionally, the implications of the weighted Nachbin theorem in practical applications remain to be fully explored, which could limit the immediate applicability of their findings.

**Why it matters**  
This work has significant implications for the development of neural networks capable of operating in complex functional spaces, particularly in fields such as functional data analysis and stochastic processes. By extending the UAT to include derivatives, the findings could enhance the modeling capabilities of FNNs in applications requiring high fidelity in function approximation, such as in finance or physics. The theoretical advancements presented in this paper lay the groundwork for future research in neural network architectures and their applications in infinite-dimensional settings, as published in [arXiv](https://arxiv.org/abs/2606.09820v1).
