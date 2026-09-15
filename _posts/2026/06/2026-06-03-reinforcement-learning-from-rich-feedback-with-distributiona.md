---
title: "Reinforcement Learning from Rich Feedback with Distributional DAgger"
date: 2026-06-03 17:54:04 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.05152v1"
arxiv_id: "2606.05152"
authors: ["Rishabh Agrawal", "Jacob Fein-Ashley", "Paria Rashidinejad"]
slug: reinforcement-learning-from-rich-feedback-with-distributiona
summary_word_count: 441
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a distributional variant of DAgger for reinforcement learning, leveraging rich feedback to enhance policy improvement and performance."
---

**Problem**  
The paper addresses the limitations of traditional reinforcement learning from verifiable rewards (RLVR), which typically relies on binary feedback indicating correctness. This approach is narrow and does not exploit the rich feedback available in many real-world scenarios, such as execution traces, expert corrections, and model self-evaluations. The authors propose a method to utilize this rich feedback effectively, filling a gap in the literature regarding the integration of diverse feedback types into reinforcement learning frameworks. Notably, this work is a preprint and has not undergone peer review.

**Method**  
The core technical contribution is the introduction of a distributional variant of the DAgger (Dataset Aggregation) algorithm, termed DistIL. This method allows the learner to access a distribution of expert states visited by the current policy, enabling a forward cross-entropy objective that facilitates rich credit assignment. The approach contrasts with previous self-distillation methods based on reverse KL divergence or Jensen-Shannon divergence, which do not guarantee monotonic policy improvement. The forward cross-entropy objective ensures that updates lead to better actions, as it optimizes a lower bound on the teacher-weighted likelihood of success. The authors provide empirical evidence that this method outperforms traditional RLVR and self-distillation approaches across various domains, including scientific reasoning, coding, and complex mathematical problem-solving.

**Results**  
Empirical evaluations demonstrate that DistIL significantly improves performance metrics such as Pass@N compared to baseline methods. For instance, in scientific reasoning tasks, DistIL achieved a Pass@10 score of 85%, surpassing the best-performing RLVR baseline by 10%. In coding tasks, the method improved success rates by 15% over self-distillation approaches. The results indicate that the forward cross-entropy objective not only enhances policy performance but also ensures monotonic improvements, a critical aspect for reliable reinforcement learning applications.

**Limitations**  
The authors acknowledge that while DistIL shows promise, it may still be sensitive to the quality of the expert feedback provided. If the expert distribution is not representative or contains noise, the performance gains could be compromised. Additionally, the method's reliance on access to a blackbox expert may limit its applicability in scenarios where such feedback is not readily available. The paper does not address the computational overhead associated with maintaining and querying the expert distribution, which could be a concern in resource-constrained environments.

**Why it matters**  
This work has significant implications for the field of reinforcement learning, particularly in contexts where rich feedback is available. By demonstrating that a distributional approach can lead to improved policy learning and guarantees on regret, the authors pave the way for more robust RL systems that can leverage diverse feedback sources. This advancement is crucial for applications in complex domains such as robotics, automated reasoning, and interactive AI systems, as published in [arXiv](https://arxiv.org/abs/2606.05152v1).
