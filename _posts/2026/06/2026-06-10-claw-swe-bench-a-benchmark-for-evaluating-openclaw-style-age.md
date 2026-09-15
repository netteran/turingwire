---
title: "Claw-SWE-Bench: A Benchmark for Evaluating OpenClaw-style Agent Harnesses on Coding Tasks"
date: 2026-06-10 17:16:23 +0000
category: research
subcategory: evaluation_benchmarks
company: "Meta"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.12344v1"
arxiv_id: "2606.12344"
authors: ["Mengyu Zheng", "Kai Han", "Boxun Li", "Haiyang Xu", "Yuchuan Tian", "Wei He"]
slug: claw-swe-bench-a-benchmark-for-evaluating-openclaw-style-age
summary_word_count: 452
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Claw-SWE-Bench, a benchmark for evaluating OpenClaw-style agents on coding tasks, addressing measurement challenges in software engineering."
---

**Problem**  
The paper addresses the lack of standardized evaluation metrics for general-purpose agents like OpenClaw in coding tasks, particularly under the constraints of the SWE-bench framework. Existing benchmarks do not adequately account for the specific requirements of coding tasks, such as maintaining a clean Docker workspace and adhering to a patch and prediction contract. This gap complicates the assessment of coding capabilities across heterogeneous agent harnesses, or "claws." The authors present Claw-SWE-Bench as a solution to this problem, providing a structured and fair evaluation protocol. This work is a preprint and has not undergone peer review.

**Method**  
Claw-SWE-Bench consists of a comprehensive benchmark with 350 instances of GitHub issue resolution across eight programming languages and 43 repositories. The benchmark is derived from SWE-bench-Multilingual and SWE-bench-Verified-Mini datasets, following a future-commit cleanup process. The authors also introduce Claw-SWE-Bench Lite, an 80-instance subset designed for rapid validation, selected through a cost-aware, rank-aware procedure based on 17 calibration columns. The evaluation protocol includes fixed prompts, runtime budgets, workspace contracts, patch extraction procedures, and evaluators to ensure comparability among different agent harnesses. The authors demonstrate the importance of adapter design by comparing OpenClaw's performance with a minimal direct-diff adapter (19.1% Pass@1) against a full adapter (73.4% Pass@1), both utilizing the GLM 5.1 backbone.

**Results**  
The results indicate significant performance variability based on model and harness choice. In a comprehensive evaluation involving OpenClaw across nine models and five claws with two models, the choice of model influenced Pass@1 scores by 29.4 percentage points (pp), while the choice of harness affected scores by 27.4 pp under fixed models. This highlights the critical role of both harness design and model selection in achieving high performance in coding tasks. The authors emphasize that systems with similar accuracy can incur vastly different total API costs, underscoring the need for cost accounting in evaluations.

**Limitations**  
The authors acknowledge that the benchmark is limited to the specific coding tasks and repositories included in the dataset, which may not generalize to all software engineering scenarios. Additionally, the reliance on a fixed prompt and runtime budget may not capture the full variability of real-world coding environments. The authors do not discuss potential biases in the selection of GitHub issues or the implications of using a limited subset for rapid validation.

**Why it matters**  
Claw-SWE-Bench provides a structured framework for evaluating coding capabilities of OpenClaw-style agents, facilitating reproducible comparisons across different harnesses and models. This benchmark is crucial for advancing research in autonomous coding agents and improving their practical applications in software engineering. The implications of this work extend to the development of more effective agent architectures and evaluation methodologies, as highlighted in the context of existing literature on agent performance metrics, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.12344v1).
