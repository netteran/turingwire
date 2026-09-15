---
title: "Catastrophic Forgetting is Low-Rank: A Function-Space Theory for Continual Adaptation"
date: 2026-06-16 15:03:37 +0000
category: research
subcategory: theory
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.18024v1"
arxiv_id: "2606.18024"
authors: ["Ido Nitzan Hidekel", "Dan Raviv"]
slug: catastrophic-forgetting-is-low-rank-a-function-space-theory-
summary_word_count: 435
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a function-space theory of catastrophic forgetting in continual learning, identifying low-rank structures in output-space vulnerabilities."
---

**Problem**  
The paper addresses the gap in understanding the specific output-space directions that are susceptible to catastrophic forgetting during continual adaptation. Traditional approaches focus on parameter drift, replay, or distillation without pinpointing which aspects of the output space are most affected. This work provides a theoretical framework in the Neural Tangent Kernel (NTK) regime, offering insights into the mechanisms behind forgetting in neural networks. Notably, this is a preprint and has not undergone peer review.

**Method**  
The authors develop a function-space theory that characterizes catastrophic forgetting through the lens of the NTK. They derive a closed-form expression for the forgetting vector, which quantifies the drift in predictions for old tasks when training on new tasks. This predictor is exact for frozen-backbone linear-head Parameter-Efficient Fine-Tuning (PEFT-CL) models, where the model's output is linear in the trainable parameters. For more complex architectures involving nonlinear adapters or full fine-tuning, the predictor serves as a local approximation within the NTK framework. The analysis reveals that forgetting is concentrated in a limited number of NTK eigenmodes, leading to a Kronecker scaling rule that describes the rank of vulnerable output-space directions. The authors also discuss the implications of their findings for existing NTK-overlap theories and the limitations of parameter-space regularizers in capturing output-space interference.

**Results**  
The theoretical framework is validated through empirical experiments, demonstrating that the proposed predictor accurately forecasts the forgetting vector in various settings. The authors report that the concentration of forgetting in a small number of NTK eigenmodes aligns with their theoretical predictions, providing a quantitative measure of the rank of vulnerable directions. While specific numerical results against established baselines are not detailed in the abstract, the implications of the findings suggest significant improvements in understanding and mitigating catastrophic forgetting.

**Limitations**  
The authors acknowledge that their approach primarily focuses on the NTK regime, which may not fully capture the dynamics of more complex, non-linear models outside this regime. Additionally, while the closed-form predictor is exact for linear models, its approximation for nonlinear architectures may introduce inaccuracies. The paper does not extensively explore the practical implementation of the proposed spectral regularizer, leaving open questions regarding its effectiveness in real-world applications.

**Why it matters**  
This work has significant implications for the design of continual learning systems, particularly in understanding and mitigating catastrophic forgetting. By identifying low-rank structures in the output space, the findings can inform the development of more effective regularization techniques and training strategies. The insights gained from this function-space perspective can enhance the robustness of models in dynamic environments, where continual adaptation is essential. This research contributes to the ongoing discourse in the field, as published in [arXiv](https://arxiv.org/abs/2606.18024v1).
