---
title: "It Takes One to Bias Them All: Breaking Bad with One-Shot GRPO"
date: 2026-06-09 14:44:01 +0000
category: research
subcategory: alignment_safety
company: "Meta"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.10931v1"
arxiv_id: "2606.10931"
authors: ["Naihao Deng", "Yilun Zhu", "Naichen Shi", "Clayton Scott", "Rada Mihalcea"]
slug: it-takes-one-to-bias-them-all-breaking-bad-with-one-shot-grp
summary_word_count: 404
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper reveals that one-shot Group Relative Policy Optimization can induce systematic bias in large language models, undermining alignment efforts."
---

**Problem** — This work addresses a significant gap in understanding the robustness of alignment mechanisms in large language models (LLMs) against biased inputs. Despite extensive post-training alignment efforts, the authors highlight a critical vulnerability: the potential for a single biased example to disrupt alignment. This preprint raises concerns about the reliability of LLMs in sensitive applications, as it demonstrates that existing guardrails can be easily compromised.

**Method** — The authors employ Group Relative Policy Optimization (GRPO) to investigate the susceptibility of LLMs to bias. They conduct experiments using one-shot GRPO training, where a single biased example is introduced to the model. The architecture of the LLMs used is not specified, but the study focuses on the model's response to biased inputs across various attributes and categories. The training compute details are not disclosed, but the emphasis is on the model's behavior post-training, specifically how it can be influenced by minimal intervention.

**Results** — The findings indicate that one-shot GRPO training can induce systematic bias in LLMs, with the degree of bias varying based on the model's initial likelihood of producing biased outputs. The authors demonstrate that stereotype-driven reasoning generalizes across different attributes and benchmarks, suggesting a pervasive vulnerability. While specific numerical results and comparisons to baseline models are not detailed in the abstract, the implications of the findings are significant, indicating that even well-aligned models can revert to biased behavior with minimal input.

**Limitations** — The authors acknowledge that their study is limited by the scope of the biased examples used and the specific models tested. They do not explore the long-term effects of such biases or the potential for recovery from bias once introduced. Additionally, the paper does not address the implications of these findings on the broader landscape of model training and deployment, nor does it consider the ethical ramifications of deploying models that can be easily biased.

**Why it matters** — This research underscores the fragility of alignment in LLMs, highlighting the need for more robust mechanisms to safeguard against bias. The ability of a single example to override alignment poses significant risks for applications in sensitive domains, such as healthcare and law enforcement. As such, this work calls for a reevaluation of current alignment strategies and the development of more resilient frameworks to ensure fair and reliable model behavior. The implications of this study are critical for future research in model alignment and bias mitigation, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.10931v1).
