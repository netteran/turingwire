---
title: "MLEvolve: A Self-Evolving Framework for Automated Machine Learning Algorithm Discovery"
date: 2026-06-04 17:55:59 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06473v1"
arxiv_id: "2606.06473"
authors: ["Shangheng Du", "Xiangchao Yan", "Jinxin Shi", "Zongsheng Cao", "Shiyang Feng", "Zichen Liang"]
slug: mlevolve-a-self-evolving-framework-for-automated-machine-lea
summary_word_count: 423
classification_confidence: 0.80
source_truncated: false
layout: post
description: "MLEvolve introduces a self-evolving framework for automated machine learning algorithm discovery, addressing key limitations in existing MLE agents."
---

**Problem**  
This paper addresses the limitations of existing machine learning engineering (MLE) agents, particularly their inability to effectively manage inter-branch information isolation, memoryless search processes, and lack of hierarchical control. These issues hinder the agents' capabilities in long-horizon optimization tasks. The authors propose MLEvolve, a self-evolving framework designed to enhance the discovery of machine learning algorithms. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
MLEvolve employs a multi-agent architecture based on large language models (LLMs) and introduces several novel components to enhance algorithm discovery. The framework extends traditional tree search methods to a Progressive Multi-Contextual Graph Search (MCGS), which facilitates cross-branch information flow through graph-based reference edges. This allows the framework to transition from broad exploration to focused exploitation using an entropy-inspired progressive schedule. Additionally, MLEvolve incorporates a Retrospective Memory system that combines a cold-start domain knowledge base with a dynamic global memory, enabling the retrieval and reuse of task-specific experiences. The framework also decouples strategic planning from code generation through adaptive coding modes, which stabilizes long-horizon iterations. The training compute details are not disclosed, but the evaluation is conducted under a 12-hour budget, which is half the standard runtime for such tasks.

**Results**  
MLEvolve demonstrates state-of-the-art performance on the MLE-Bench benchmark, achieving significant improvements in average medal rate and valid submission rate compared to existing methods. Specifically, it outperforms specialized algorithm discovery methods, including AlphaEvolve, in mathematical algorithm optimization tasks. The results indicate strong cross-domain generalization capabilities, although specific numerical performance metrics are not provided in the abstract.

**Limitations**  
The authors acknowledge that while MLEvolve improves upon existing MLE agents, it may still face challenges related to the scalability of the memory systems and the efficiency of the search process in highly complex environments. Additionally, the reliance on LLMs may introduce biases inherent to the training data, which could affect the generalizability of the discovered algorithms. The paper does not address potential computational overhead associated with the dynamic memory systems or the implications of the entropy-inspired scheduling on convergence rates.

**Why it matters**  
MLEvolve represents a significant advancement in the field of automated machine learning, particularly in addressing the limitations of existing MLE agents. By enabling sustained self-evolution and effective information sharing, this framework has the potential to enhance the efficiency and effectiveness of algorithm discovery processes. The implications of this work extend to various domains where automated machine learning is applicable, paving the way for more robust and adaptable systems. This research is crucial for future developments in MLE and is available on [arXiv](https://arxiv.org/abs/2606.06473v1).
