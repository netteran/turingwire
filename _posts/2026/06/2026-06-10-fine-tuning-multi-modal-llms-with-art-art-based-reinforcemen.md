---
title: "Fine-tuning Multi-modal LLMs with ART: Art-based Reinforcement Training"
date: 2026-06-10 09:30:37 +0000
category: research
subcategory: multimodal
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11854v1"
arxiv_id: "2606.11854"
authors: ["Michal Chudoba", "Sergey Alyaev", "Petra Galuscakova", "Tomasz Wiktorski"]
slug: fine-tuning-multi-modal-llms-with-art-art-based-reinforcemen
summary_word_count: 425
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces ART, a novel fine-tuning method for multi-modal LLMs that optimizes visual input without altering the model's architecture."
---

**Problem**  
This work addresses the limitations of existing Parameter-Efficient Fine-Tuning (PEFT) techniques for Large Language Models (LLMs), specifically Low-Rank Adaptation (LoRA) and Soft Prompting. Both methods necessitate modifications to the computational graphs of precompiled LLMs, which restricts their applicability in high-throughput environments like vLLM. The authors propose a new approach, Art-based Reinforcement Training (ART), to fine-tune multi-modal LLMs without altering the model architecture, thus filling a gap in the literature regarding efficient fine-tuning methods that maintain compatibility with existing high-performance engines. This paper is a preprint and has not undergone peer review.

**Method**  
ART operates by optimizing the raw visual input fed into a frozen Multi-modal Large Language Model (MLLM). Instead of modifying the model's internal parameters, ART employs backpropagation of gradients directly into a pixel array, allowing for the optimization of visual inputs while keeping the model architecture intact. This method supports any fine-tuning objective and enables the generation of stylized visual inputs that are relevant to specific tasks. The authors validate ART on various sizes of the Qwen architecture, a popular open-source model, and demonstrate its effectiveness across multiple textual benchmarks.

**Results**  
The experimental results indicate that ART achieves competitive accuracy compared to LoRA on several benchmarks, particularly in mathematics and structured-tool-use tasks. While specific numerical results are not disclosed in the abstract, the authors assert that ART's performance is on par with LoRA, suggesting a significant advancement in fine-tuning methodologies for multi-modal LLMs. The benchmarks used for evaluation include standard datasets that are widely recognized in the field, although the exact metrics and comparisons to baseline models are not detailed in the summary.

**Limitations**  
The authors acknowledge that ART's reliance on optimizing visual input may limit its applicability to tasks that can leverage visual data effectively. Additionally, the method's performance in scenarios where visual context is less relevant remains untested. The paper does not address potential computational overhead associated with the pixel array optimization process, nor does it explore the scalability of ART across larger or more complex models beyond the Qwen architecture.

**Why it matters**  
The introduction of ART represents a significant step forward in the fine-tuning of multi-modal LLMs, particularly in contexts where traditional PEFT methods are infeasible. By enabling fine-tuning without altering the model architecture, ART opens new avenues for deploying LLMs in high-throughput environments, enhancing their utility in real-world applications. This work has implications for future research in efficient model adaptation and could inspire further innovations in multi-modal learning frameworks, as discussed in related literature on PEFT techniques. For more details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.11854v1).
