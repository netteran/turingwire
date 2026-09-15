---
title: "Provably Auditable and Safe LLM Agents from Human-Authored Ontologies"
date: 2026-06-03 14:01:33 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.04903v1"
arxiv_id: "2606.04903"
authors: ["Aaron Sterling"]
slug: provably-auditable-and-safe-llm-agents-from-human-authored-o
summary_word_count: 429
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents Agentic Redux, a provably auditable LLM agent architecture leveraging human-authored ontologies for safe decision-making in complex domains."
---

**Problem**  
This work addresses the gap in the literature regarding the need for linear auditability in large language model (LLM) agents, particularly in nontrivial problem domains. The authors highlight the lack of formal guarantees for the correctness of LLM decisions, which is critical in high-stakes applications such as healthcare and security. The paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The core technical contribution is the introduction of the Agentic Redux architecture, which utilizes typed lambda calculus to ensure semantic correctness in LLM executions. The architecture is designed to operate within well-defined domains, where all decisions are logged in an append-only ledger, facilitating auditability. The authors propose an Ontology-First Agent Design methodology, where a human expert constructs a domain ontology using Basic Formal Ontology. This ontology guides the LLM in defining roles for both agents and human operators, enabling effective collaboration in problem-solving. The implementation details include the use of production-grade code for healthcare billing compliance and security vulnerability disclosure, with the code made publicly available in a supporting repository.

**Results**  
The paper demonstrates that Agentic Redux achieves a high level of correctness in decision-making, although specific quantitative results are not provided in the abstract. The authors claim that the architecture outperforms traditional LLMs in terms of auditability and correctness in the specified domains, but do not provide explicit comparisons to named baselines or benchmarks. The effectiveness of the ontology-driven approach is implied through the successful application in the two domains, suggesting a significant improvement in operational safety and compliance.

**Limitations**  
The authors acknowledge that the approach is contingent on the quality of the human-authored ontology, which may introduce biases or inaccuracies if not carefully constructed. Additionally, the scalability of the architecture to more complex or dynamic domains is not addressed, raising questions about its generalizability. The lack of empirical performance metrics against established benchmarks limits the ability to fully assess the advantages of Agentic Redux over existing LLM frameworks.

**Why it matters**  
The implications of this work are significant for the development of safe and auditable AI systems, particularly in regulated industries where decision accountability is paramount. By providing a formal framework for LLM agents that emphasizes auditability and correctness, this research paves the way for more reliable AI applications in critical areas such as healthcare and cybersecurity. The methodology introduced could serve as a blueprint for future research in agent design, promoting the integration of human expertise into AI systems. This work is foundational for advancing the field of safe AI, as published in [arXiv](https://arxiv.org/abs/2606.04903v1).
