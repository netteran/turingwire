---
title: "SICI: A Semantic-Pragmatic Complexity Index Reveals Regime Shifts in LLM Stance Detection"
date: 2026-06-11 10:58:18 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13189v1"
arxiv_id: "2606.13189"
authors: ["Fuqiang Niu", "Bowen Zhang"]
slug: sici-a-semantic-pragmatic-complexity-index-reveals-regime-sh
summary_word_count: 414
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces the Stance Inference Complexity Index (SICI), a novel metric for evaluating stance detection in LLMs, revealing regime shifts in model performance."
---

**Problem**  
This work addresses the inadequacy of existing metrics in stance detection for large language models (LLMs), particularly in handling complex examples. Despite the increasing use of prompt-based LLMs for stance detection, traditional methods such as clearer instructions or reasoning prompts do not consistently improve performance on harder examples. The authors propose SICI, a seven-dimensional diagnostic measure that quantifies the semantic-pragmatic complexity of target-text pairs. This paper is a preprint and has not undergone peer review.

**Method**  
SICI is constructed as a multi-faceted index that evaluates the complexity of stance detection tasks based on seven dimensions, including semantic ambiguity and pragmatic context. The authors validate SICI's predictive power on two established benchmarks: SemEval-2016 and VAST. They demonstrate that SICI outperforms surface-level proxies in predicting LLM accuracy, achieving a cross-scorer reliability coefficient of $α=0.771$. The study also includes a 15-method intervention analysis, examining how various prompting strategies, retrieval techniques, and debate formats influence model behavior along the attribution-abstention axis. The models tested include GPT-3.5, GPT-4o-mini, DeepSeek-V3, and GPT-4o.

**Results**  
The results indicate that LLM performance exhibits distinct regime shifts as SICI increases. Specifically, low-complexity examples lead to over-attribution, particularly in "Against" predictions, while intermediate complexity presents an unstable boundary. High-complexity examples predominantly result in "None" predictions. The authors note that stronger models tend to shift these boundaries, indicating a nuanced relationship between model architecture and complexity. The intervention study reveals that while various methods can shift model responses, they do not effectively eliminate the high-complexity bottleneck.

**Limitations**  
The authors acknowledge that SICI, while predictive, may not capture all dimensions of complexity relevant to stance detection. Additionally, the reliance on specific benchmarks (SemEval-2016 and VAST) may limit generalizability. The study does not explore the implications of SICI in real-world applications or its performance across diverse datasets beyond those tested. Furthermore, the intervention methods may not comprehensively address all potential strategies for improving model performance on complex examples.

**Why it matters**  
The introduction of SICI provides a valuable tool for researchers and practitioners in the field of natural language processing, particularly in stance detection tasks. By elucidating the relationship between semantic-pragmatic complexity and model performance, this work opens avenues for more targeted interventions in LLM training and evaluation. The findings suggest that understanding the complexity of input data is crucial for improving model robustness, which is essential for applications in sentiment analysis, misinformation detection, and social media monitoring. This research contributes to the ongoing discourse on enhancing LLM capabilities, as discussed in related works available on [arXiv](https://arxiv.org/abs/2606.13189v1).
