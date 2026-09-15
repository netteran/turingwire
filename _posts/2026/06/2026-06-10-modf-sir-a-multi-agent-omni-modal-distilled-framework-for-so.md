---
title: "MODF-SIR: A Multi-agent Omni-modal Distilled Framework for Social Intelligence Reasoning"
date: 2026-06-10 12:44:02 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.12018v1"
arxiv_id: "2606.12018"
authors: ["Shang Ma", "Jisheng Dang", "Wencan Zhang", "Yifan Zhang", "Bimei Wang", "Hong Peng"]
slug: modf-sir-a-multi-agent-omni-modal-distilled-framework-for-so
summary_word_count: 378
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MODF-SIR, a multi-agent framework leveraging a lightweight MLLM for enhanced social intelligence reasoning through knowledge distillation."
---

**Problem**  
The paper addresses the gap in existing frameworks for social intelligence reasoning, particularly the challenge of effectively utilizing multi-modal data while mitigating the overshadowing of long-tail events by more frequent head events. The authors propose a novel approach that integrates knowledge distillation into both training and inference phases. This work is presented as a preprint and has not undergone peer review.

**Method**  
The proposed framework, MODF-SIR, is built on a lightweight Multimodal Large Language Model (MLLM) and employs a multi-agent collaborative architecture. A significant aspect of the method is the incorporation of knowledge distillation, which enhances both training and inference. The framework utilizes Test-Time Adaptation (TTA) across the reasoning pipeline, which includes the extraction and representation of long-tail events, Chain-of-Thought (CoT) prompting, and self-reflection. The authors implement Low-Rank Adaptation (LoRA) to fine-tune the foundation model specifically for instance-level reasoning. The training dataset comprises approximately 30% of data from IntentTrain, ensuring a diverse representation of social intelligence scenarios.

**Results**  
The authors report state-of-the-art performance on various benchmarks, although specific metrics and comparisons to named baselines are not detailed in the abstract. The extensive evaluations against both open-source and proprietary AI models indicate a significant improvement in reasoning capabilities, particularly in handling long-tail events. The paper suggests that the integration of TTA and knowledge distillation contributes to these performance gains, although exact numerical results are not provided in the summary.

**Limitations**  
The authors acknowledge that the reliance on a specific dataset (IntentTrain) may limit the generalizability of the results. Additionally, the framework's performance in real-world applications remains to be validated, as the evaluations are primarily conducted in controlled settings. The paper does not discuss potential biases in the training data or the implications of using a lightweight model in complex social reasoning tasks.

**Why it matters**  
The implications of this work are significant for advancing social intelligence reasoning in AI systems, particularly in multi-agent environments where nuanced understanding of social interactions is crucial. The integration of knowledge distillation and TTA could pave the way for more robust models capable of addressing long-tail events, which are often overlooked in traditional approaches. This research contributes to the ongoing discourse in the field, as highlighted in related works on multi-modal reasoning and knowledge distillation, and is available for further exploration on [arXiv](https://arxiv.org/abs/2606.12018v1).
