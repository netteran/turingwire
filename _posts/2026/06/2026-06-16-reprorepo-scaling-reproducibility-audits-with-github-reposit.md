---
title: "ReproRepo: Scaling Reproducibility Audits with GitHub Repository Issues"
date: 2026-06-16 17:58:05 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18237v1"
arxiv_id: "2606.18237"
authors: ["Shanda Li", "Qiuhong Anna Wei", "Jingwu Tang", "Valerie Chen", "Nihar B Shah", "Tim Dettmers"]
slug: reprorepo-scaling-reproducibility-audits-with-github-reposit
summary_word_count: 384
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ReproRepo, a scalable framework for evaluating reproducibility in machine learning research using GitHub issues as supervision."
---

**Problem** — The paper addresses the challenge of reproducibility in machine learning research, highlighting the limitations of existing benchmarks that require extensive manual data curation and evaluation. It identifies a gap in scalable methods for assessing reproducibility, particularly in the context of large language models (LLMs) assisting in this process. The work is a preprint and has not undergone peer review.

**Method** — The authors propose ReproRepo, a framework that utilizes human-raised GitHub issues as a source of supervision to identify reproduction blockers in machine learning papers. The framework was instantiated on a dataset of 1,149 recent machine learning papers from major conferences. Four configurations of LLM agents were evaluated, including Codex with GPT-5.5, which was found to be the most effective. The agents were tasked with identifying semantic relationships between reported issues and the content of the papers, without executing any code. The evaluation process involved analyzing the agents' ability to surface relevant issues and their effectiveness in pinpointing specific reproduction failures.

**Results** — The results indicate that the best-performing agent, Codex with GPT-5.5, successfully identified at least one semantically related human-reported blocker for approximately 90% of the papers analyzed. The agents demonstrated particular strength in surfacing visible failures and identifying the correct semantic region related to reproducibility issues. However, they showed limitations in the exact localization of these issues, suggesting that while they can highlight potential problems, they may not always provide precise solutions.

**Limitations** — The authors acknowledge that the framework's reliance on GitHub issues may not capture all reproducibility challenges, as some issues may not be reported or may be too vague. Additionally, the agents' inability to execute code limits their capacity to fully diagnose reproduction failures. The study also does not address the potential biases in the GitHub issue data, which may affect the generalizability of the findings.

**Why it matters** — ReproRepo represents a significant advancement in the scalability of reproducibility audits in machine learning research, providing a framework that can be reused for future evaluations of LLM agents. This work has implications for improving the reliability of machine learning research outputs and fostering a culture of reproducibility in the field. The findings suggest that LLMs can play a crucial role in identifying reproducibility issues, which is essential for scientific integrity and progress, as discussed in [arXiv cs.AI](https://arxiv.org/abs/2606.18237v1).
