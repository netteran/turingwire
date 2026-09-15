---
title: "Workflow-GYM: Towards Long-Horizon Evaluation of Computer-use Agentic tasks in Real-World Professional Fields"
date: 2026-06-09 16:10:16 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11042v1"
arxiv_id: "2606.11042"
authors: ["Liya Zhu", "Jingzhe Ding", "Jian Zhang", "Jianbo Xue", "Shihao Liang", "Ge Zhang"]
slug: workflow-gym-towards-long-horizon-evaluation-of-computer-use
summary_word_count: 432
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Workflow-GYM, a benchmark for evaluating AI agents on long-horizon GUI tasks in professional domains, revealing significant performance gaps."
---

**Problem**  
This work addresses the lack of comprehensive benchmarks for evaluating AI agents on long-horizon, high-value tasks within professional domains. Existing benchmarks primarily focus on general-purpose software and short-horizon tasks, which do not adequately assess the capabilities of agents in complex, domain-specific environments. The authors highlight that current evaluations fail to capture the intricacies of operating graphical user interfaces (GUIs) in professional settings, leaving a significant gap in understanding the performance of AI agents in real-world applications. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose Workflow-GYM, a novel benchmark designed to evaluate AI agents on long-horizon GUI tasks across various professional fields. The benchmark encompasses a range of domain-specific software environments, allowing for a more realistic assessment of agent capabilities. The evaluation involves state-of-the-art models, although specific architectures and training details are not disclosed in the abstract. The authors conduct extensive experiments to measure the success rates of these models in completing complex workflows, focusing on metrics such as workflow consistency and error propagation.

**Results**  
The experiments reveal that even the most advanced models achieve only slightly above 30% success rates in completing long-horizon GUI tasks. This performance is significantly below expectations, indicating that current AI agents struggle with maintaining workflow consistency and often encounter issues such as workflow stage omission, error propagation, and objective drift. The findings suggest that the existing models are ill-equipped to handle the complexities of professional software environments, underscoring the challenges faced in this domain.

**Limitations**  
The authors acknowledge that the low success rates highlight the limitations of current AI agents in executing long-horizon workflows. They note specific challenges such as the agents' inability to maintain consistency across multiple workflow stages and their insufficient understanding of the software environments they are meant to operate. However, the paper does not delve into potential solutions or improvements to the models tested, nor does it explore the implications of these limitations on broader AI applications. Additionally, the lack of detailed information on the architectures and training processes of the evaluated models limits the reproducibility of the results.

**Why it matters**  
The introduction of Workflow-GYM represents a significant step toward evaluating AI agents in realistic, professional contexts, emphasizing the need for benchmarks that reflect the complexities of real-world tasks. The findings indicate critical areas for improvement in AI agent design, particularly in enhancing their ability to navigate long-horizon workflows and understand domain-specific software. This work lays the groundwork for future research aimed at developing more capable AI agents, as highlighted in the context of ongoing advancements in the field, and is available on [arXiv](https://arxiv.org/abs/2606.11042v1).
