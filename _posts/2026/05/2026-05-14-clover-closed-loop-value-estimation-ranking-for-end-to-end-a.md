---
title: "CLOVER: Closed-Loop Value Estimation \& Ranking for End-to-End Autonomous Driving Planning"
date: 2026-05-14 17:32:18 +0000
category: research
subcategory: agents_robotics
company: "UiPath"
secondary_companies: []
impact: critical
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2605.15120v1"
arxiv_id: "2605.15120"
authors: ["Sining Ang", "Yuguang Yang", "Canyu Chen", "Yan Wang"]
slug: clover-closed-loop-value-estimation-ranking-for-end-to-end-a
summary_word_count: 450
classification_confidence: 0.90
source_truncated: false
layout: post
---

**Problem**  
This paper addresses the gap in the training and evaluation methodologies for end-to-end autonomous driving planners, particularly the mismatch between training on a single logged trajectory and evaluating using rule-based metrics. This discrepancy can lead to suboptimal performance, especially in proposal-selection planners, where the quality of candidate trajectories and their ranking is crucial. The authors propose CLOVER, a framework designed to mitigate this issue by enhancing the diversity and quality of candidate trajectories through a closed-loop value estimation and ranking system. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
CLOVER employs a generator-scorer architecture. The generator is responsible for producing a diverse set of candidate trajectories, while the scorer evaluates these trajectories by predicting sub-scores based on planning metrics. The framework enhances proposal support by constructing evaluator-filtered pseudo-expert trajectories, which are used to train the generator with set-level coverage supervision. The training process involves conservative closed-loop self-distillation, where the scorer is trained on true evaluator sub-scores of the generated proposals. The generator is refined towards top-$k$ and vector-Pareto targets selected by the scorer, incorporating stability regularization to ensure robustness. The authors analyze the conditions under which an imperfect scorer can still improve the generator, emphasizing the importance of enriching scorer-selected targets with true evaluator feedback.

**Results**  
CLOVER achieves significant performance improvements on the NAVSIM benchmark, recording a Planning Distance Metric Score (PDMS) of 94.5 and an Enhanced PDMS (EPDMS) of 90.4, setting a new state of the art. On the more challenging NavHard split, CLOVER reaches an EPDMS of 48.3, matching the strongest reported result to date. Additionally, in open-loop evaluations on the nuScenes dataset, CLOVER demonstrates the lowest L2 error and collision rate compared to other methods, indicating superior trajectory generation and evaluation capabilities.

**Limitations**  
The authors acknowledge that the reliance on an imperfect scorer may introduce biases in trajectory generation, although they argue that their conservative update strategy mitigates this risk. They do not discuss potential scalability issues related to the generator's ability to produce a sufficiently diverse set of trajectories in more complex environments. Furthermore, the framework's performance in real-world scenarios remains untested, which could limit its applicability.

**Why it matters**  
CLOVER's approach to closed-loop value estimation and ranking has significant implications for the development of more robust and adaptable autonomous driving systems. By addressing the training-evaluation mismatch, CLOVER enhances the reliability of trajectory planning, which is critical for safety and efficiency in real-world applications. This work lays the groundwork for future research in autonomous driving, particularly in improving the integration of learned policies with real-time evaluation metrics, potentially influencing the design of next-generation planning algorithms.

Authors: Sining Ang, Yuguang Yang, Canyu Chen, Yan Wang  
Source: arXiv:2605.15120  
URL: [https://arxiv.org/abs/2605.15120v1](https://arxiv.org/abs/2605.15120v1)
