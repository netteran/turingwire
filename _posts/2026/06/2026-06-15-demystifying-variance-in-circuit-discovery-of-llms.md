---
title: "Demystifying Variance in Circuit Discovery of LLMs"
date: 2026-06-15 16:25:07 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16920v1"
arxiv_id: "2606.16920"
authors: ["Frank Zhengqing Wu", "Francesco Tonin", "Volkan Cevher"]
slug: demystifying-variance-in-circuit-discovery-of-llms
summary_word_count: 459
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces CEAP, a new circuit discovery method that reduces variance in mechanistic interpretability of LLMs, addressing key limitations of EAP-IG."
---

**Problem**  
This paper addresses the significant variability in circuit discovery methods used for mechanistic interpretability of large language models (LLMs), specifically focusing on the state-of-the-art method EAP-IG. The authors identify three types of variance: resampling variance, where circuit discovery results fluctuate with different data batches; rephrasing variance, where circuit outcomes change with prompt rewording; and sample-wise variance, where individual samples exhibit inconsistent unfaithfulness scores. The work is a preprint and has not undergone peer review, highlighting the need for further validation in the community.

**Method**  
The authors propose a new circuit discovery method called CEAP, which builds upon EAP-IG and offers theoretical guarantees to mitigate resampling variance. CEAP employs a refined approach to circuit identification that emphasizes stability across different data samples. The paper discusses the underlying mechanisms of rephrasing variance, attributing it to the activation of different circuits by prompts with varying templates. The authors also critique the assumption that sparsity leads to more interpretable circuits, demonstrating that it does not effectively address the identified variances. The method's training compute requirements are not explicitly disclosed, but the theoretical framework suggests a more efficient utilization of resources compared to EAP-IG.

**Results**  
CEAP significantly reduces resampling variance compared to EAP-IG, although specific quantitative results are not provided in the abstract. The authors indicate that while EAP-IG exhibits substantial variability in circuit discovery, CEAP's improvements lead to more consistent outcomes across different data batches. The paper also discusses the benign nature of sample-wise variance, suggesting that poor unfaithfulness scores are often a result of the definition of unfaithfulness rather than flaws in the circuits themselves. The authors do not provide explicit benchmark comparisons or numerical effect sizes against named baselines, which limits the ability to quantify the improvements.

**Limitations**  
The authors acknowledge that while CEAP reduces resampling variance, it does not eliminate rephrasing variance, which remains a challenge due to the inherent complexity of LLMs and their responses to diverse prompt templates. They also note that the reliance on sparsity for circuit interpretability is ineffective, which may limit the applicability of their findings in certain contexts. Additionally, the lack of empirical results comparing CEAP to EAP-IG on standard benchmarks is a notable limitation, as it leaves the practical impact of the proposed method somewhat unclear.

**Why it matters**  
This work has significant implications for the field of mechanistic interpretability in LLMs, as it highlights the challenges of circuit discovery and the inherent difficulties in steering LLM behavior through prompt engineering. The findings suggest that researchers may need to reconsider the assumptions underlying circuit interpretability and the role of prompt design in influencing model behavior. As published in [arXiv cs.AI](https://arxiv.org/abs/2606.16920v1), this paper encourages further exploration into robust methods for understanding LLMs, which is crucial for advancing interpretability and trustworthiness in AI systems.
