---
title: "Learning with Simulators: No Regret in a Computationally Bounded World"
date: 2026-06-11 17:02:24 +0000
category: research
subcategory: theory
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.13576v1"
arxiv_id: "2606.13576"
authors: ["Sasha Voitovych", "Abhishek Shetty", "Noah Golowich", "Alexander Rakhlin"]
slug: learning-with-simulators-no-regret-in-a-computationally-boun
summary_word_count: 442
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a framework for learning with simulatable processes, achieving classical learning guarantees under dependent data conditions."
---

**Problem**  
This work addresses a significant gap in learning theory regarding the generalization capabilities of algorithms when faced with strongly dependent data. Most existing results are predicated on the assumption of independence in the data-generating process, which limits their applicability in real-world scenarios where data often exhibit complex dependencies. The authors propose a novel framework termed "simulatable processes," which allows learners to access a simulator that approximates the underlying distribution of the data. This paper is a preprint and has not undergone peer review.

**Method**  
The core technical contribution is the introduction of the simulatable processes framework, which enables the learner to leverage a simulator to approximate the data-generating distribution. The authors demonstrate that, under this framework, it is possible to achieve learning guarantees analogous to those in classical settings with independent data, specifically error bounds that are contingent on the VC (Vapnik-Chervonenkis) dimension. The paper presents a single algorithm capable of learning any VC class from processes that can be sampled in bounded polynomial time. The regret of this algorithm is controlled by the time-bounded Kolmogorov complexity of the underlying process, which provides a new perspective on the classical Probably Approximately Correct (PAC) model. The authors also explore the implications of conditional sampling, revealing both statistical and computational advantages in this context.

**Results**  
The proposed framework and algorithm yield significant results, demonstrating that the learning guarantees can be maintained even in the presence of dependent data. The authors provide specific error bounds that are comparable to those achieved in independent settings, although exact numerical results against named baselines are not disclosed in the abstract. The implications of the algorithm's performance are underscored by its ability to learn from any VC class under the constraints of bounded polynomial time sampling, which is a notable advancement over traditional methods.

**Limitations**  
The authors acknowledge that their framework is contingent on the availability of a simulator that accurately approximates the data-generating process. This reliance may limit practical applicability in scenarios where such simulators are not feasible. Additionally, the paper does not address the potential computational overhead associated with using simulators, nor does it explore the robustness of the proposed algorithm under various types of model misspecification or noise in the data.

**Why it matters**  
This work has significant implications for the field of machine learning, particularly in scenarios where data dependencies are prevalent. By broadening the classical PAC model to include simulatable processes, the authors provide a new lens through which to view generalization in learning algorithms. This framework could inspire further research into learning under complex data conditions and enhance the development of algorithms that are robust to data dependencies, as published in [arXiv](https://arxiv.org/abs/2606.13576v1).
