---
title: "Measuring Epistemic Resilience of LLMs Under Misleading Medical Context"
date: 2026-06-10 16:27:26 +0000
category: research
subcategory: evaluation_benchmarks
company: "ServiceNow"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.12291v1"
arxiv_id: "2606.12291"
authors: ["Hongjian Zhou", "Xinyu Zou", "Jinge Wu", "Sean Wu", "Junchi Yu", "Bradley Max Segal"]
slug: measuring-epistemic-resilience-of-llms-under-misleading-medi
summary_word_count: 457
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces MedMisBench, a benchmark to evaluate the epistemic resilience of LLMs in medical contexts against misleading information."
---

**Problem**  
The paper addresses a critical gap in the evaluation of large language models (LLMs) in medical applications, specifically their ability to maintain accurate medical judgment when faced with misleading contexts. While LLMs have demonstrated expert-level performance on medical licensing exams, the authors argue that high scores do not guarantee safe medical advice, particularly when adversarial inputs are introduced. This work is particularly relevant as it highlights the fragility of LLMs' decision-making capabilities in real-world medical scenarios, a concern that has not been adequately addressed in existing literature. The research is presented as a preprint, indicating it has not yet undergone peer review.

**Method**  
The authors introduce a novel benchmark called MedMisBench, which consists of 10,932 medical question items and 48,889 misleading context-option pairs. This benchmark is designed to assess the epistemic resilience of LLMs, defined as the ability to maintain correct medical judgment despite the presence of misleading information. The evaluation involves 11 different model configurations, although specific architectures and training details are not disclosed. The benchmark encompasses various dimensions of medical reasoning, agentic capability, and patient-journey evaluation. The authors employ a systematic approach to inject misleading contexts into the original questions, allowing for a robust assessment of model performance under adversarial conditions.

**Results**  
The results indicate a significant drop in model accuracy when exposed to misleading contexts. The mean accuracy on original questions is 71.1%, which plummets to 38.0% when misleading contexts are applied, resulting in an attack success rate of 51.5%. Notably, the most detrimental types of misleading injections are formal, rule-like fabrications, with authority-framed falsehoods achieving a 69.5% attack success rate and exception-poisoning claims reaching 64.1%. Furthermore, a clinical panel of 14 experts from seven countries identified serious potential harm in 38.2% of the reviewed cases, underscoring the real-world implications of these findings.

**Limitations**  
The authors acknowledge that their benchmark primarily focuses on the resilience of LLMs against misleading contexts and does not evaluate other aspects of model performance, such as generalization or interpretability. Additionally, the study's reliance on a specific set of misleading contexts may limit the generalizability of the findings. The authors also note that the clinical panel's assessment is subjective and may not capture all potential harms associated with incorrect medical advice.

**Why it matters**  
This research has significant implications for the deployment of LLMs in medical settings, as it exposes a critical blind spot in current evaluation methodologies. By demonstrating that LLMs can easily be misled, the study calls for a reevaluation of how these models are assessed, particularly in high-stakes environments like healthcare. The introduction of MedMisBench provides a framework for future research to explore and enhance the robustness of LLMs against misleading information, ultimately contributing to safer AI applications in medicine. This work is available on [arXiv](https://arxiv.org/abs/2606.12291v1).
