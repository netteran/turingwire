---
title: "MaxProof: Scaling Mathematical Proof with Generative-Verifier RL and Population-Level Test-Time Scaling"
date: 2026-06-11 15:27:06 +0000
category: research
subcategory: reasoning
company: "MiniMax"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13473v1"
arxiv_id: "2606.13473"
authors: ["Jiacheng Chen", "Xinyu Zhang", "Shunkai Zhang", "Yanmohan Wang", "Lin Li", "Tiancheng Qin"]
slug: maxproof-scaling-mathematical-proof-with-generative-verifier
summary_word_count: 370
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MaxProof, a framework that enhances mathematical proof generation and verification through generative-verifier RL and population-level scaling."
---

**Problem**  
The paper addresses the limitations in existing mathematical proof systems, particularly in competition-level settings, where the ability to generate, verify, and refine proofs is critical. Prior works have not effectively integrated these capabilities into a cohesive framework that can operate at scale during test time. This research is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
MaxProof leverages a generative-verifier architecture, termed M3, which is trained to perform three key tasks: proof generation, proof verification, and critique-conditioned proof repair. The generative verifier is designed to maintain a low false-positive rate, enhancing the reliability of the proof outputs. At test time, MaxProof employs a population-level approach where it treats the M3 model as a generator, verifier, refiner, and ranker. It generates a population of candidate proofs and utilizes tournament selection to identify the most promising proof. The training process and specific hyperparameters are not disclosed, but the framework's architecture is pivotal in achieving its performance.

**Results**  
MaxProof demonstrates significant performance improvements on the International Mathematical Olympiad (IMO) 2025 and the United States of America Mathematical Olympiad (USAMO) 2026 benchmarks, achieving scores of 35/42 and 36/42, respectively. These results surpass the human gold-medal threshold, indicating that the framework not only competes effectively but also sets a new standard for automated proof systems in competitive mathematics.

**Limitations**  
The authors acknowledge that while MaxProof shows promising results, it may still struggle with certain complex proofs that require deeper contextual understanding or innovative reasoning beyond the training data. Additionally, the reliance on tournament selection may introduce variability in performance based on the population of candidate proofs generated. The paper does not address potential scalability issues related to the computational resources required for generating and evaluating large populations of proofs.

**Why it matters**  
The implications of MaxProof extend beyond mathematical competitions, as the framework can inform future research in automated reasoning, theorem proving, and AI-assisted mathematics. By integrating generative models with verification and refinement processes, this work paves the way for more robust AI systems capable of tackling complex logical problems. The advancements presented in this paper contribute to the growing body of literature on AI in mathematics, as discussed in related works such as those available on [arXiv](https://arxiv.org/abs/2606.13473v1).
