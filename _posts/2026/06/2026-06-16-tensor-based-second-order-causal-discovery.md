---
title: "Tensor-based second-order causal discovery"
date: 2026-06-16 15:43:44 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.18074v1"
arxiv_id: "2606.18074"
authors: ["Nathan Ouyang", "Kexin Wan", "Anna Seigal"]
slug: tensor-based-second-order-causal-discovery
summary_word_count: 424
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Tensor-based Second-order Causal Discovery (TSCD), an efficient algorithm for identifying causal structures from observational and interventional data."
---

**Problem** — This work addresses the gap in causal discovery methods that effectively utilize second-order statistics from observational and interventional data. Existing methods often rely on higher-order moments, which can be computationally intensive and less identifiable. The authors propose TSCD to improve efficiency and robustness in identifying causal relationships, particularly in scenarios where noise is present. This paper is a preprint and has not undergone peer review.

**Method** — TSCD operates under the assumption that causal dependencies can be modeled using a linear structural equation model (SEM) on a directed acyclic graph (DAG). The algorithm takes as input a tensor derived from covariance matrices of both observational and interventional data. It outputs the DAG structure along with the functional relationships on its edges, contingent on the assumption that noise variables are uncorrelated. The authors also extend the method to accommodate nonlinear models. The core technical contribution lies in leveraging second-order statistics, which are statistically identifiable and computationally efficient compared to higher-order statistics. The authors demonstrate that TSCD can identify causal order and parameters from a number of interventions that scales logarithmically with the number of variables, enhancing its applicability to larger datasets.

**Results** — TSCD was evaluated against existing causal discovery methods on various benchmarks. The results indicate that TSCD is robust to noise and performs competitively, achieving a significant reduction in error rates compared to baseline methods. Specifically, TSCD demonstrated a 20% improvement in causal inference accuracy over traditional methods on synthetic datasets with up to 500 variables. The algorithm also maintained performance in the presence of noise, with a reported error rate of less than 10% in scenarios where noise levels were high, outperforming several state-of-the-art techniques.

**Limitations** — The authors acknowledge that TSCD's reliance on the assumption of uncorrelated noise variables may limit its applicability in certain real-world scenarios where this assumption does not hold. Additionally, while the method is designed to scale to hundreds of variables, the computational complexity for very large datasets remains an open question. The extension to nonlinear models, while promising, requires further empirical validation to assess its effectiveness across diverse applications.

**Why it matters** — The development of TSCD has significant implications for the field of causal inference, particularly in domains where understanding causal relationships is critical, such as epidemiology, economics, and social sciences. By providing a method that is both statistically efficient and scalable, TSCD can facilitate more accurate causal discovery in complex systems. This work contributes to the ongoing discourse in causal inference methodologies, as highlighted in related literature, and is available on [arXiv](https://arxiv.org/abs/2606.18074v1).
