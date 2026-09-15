---
title: "iOSWorld: A Benchmark for Personally Intelligent Phone Agents"
date: 2026-06-08 17:27:13 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09764v1"
arxiv_id: "2606.09764"
authors: ["Lawrence Keunho Jang", "Mareks Woodside", "Geronimo Carom", "Andrew Keunwoo Jang", "Jing Yu Koh", "Ruslan Salakhutdinov"]
slug: iosworld-a-benchmark-for-personally-intelligent-phone-agents
summary_word_count: 497
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces iOSWorld, a benchmark for evaluating personally intelligent phone agents using a persistent user identity across multiple iOS apps."
---

**Problem**  
Existing benchmarks for mobile agents primarily focus on isolated task execution without considering user personalization, which is critical for developing effective phone agents. This paper addresses the gap in the literature by presenting iOSWorld, the first interactive native iOS simulator benchmark that incorporates a persistent user identity across 26 newly developed iOS applications. The authors highlight that current benchmarks do not adequately evaluate the ability of agents to reason over a user's history and preferences, which is essential for creating more intelligent and context-aware mobile agents. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
iOSWorld consists of 133 tasks categorized into three levels of difficulty: single-app tasks (27), multi-app tasks (60), and memory and personalization tasks (46). The benchmark is designed to evaluate both frontier and open-source models in two settings: vision-only and privileged vision+XML. The privileged setting allows models to access an XML representation of the app's accessibility tree, which provides additional context about the app's UI elements. The authors report that the best-performing configuration achieves an overall accuracy of 52%, with a notable drop to 37% on multi-app tasks, indicating the complexity of reasoning across multiple applications. The paper also discusses the performance improvements observed with privileged access, where frontier models benefit from up to a 26 percentage point increase in accuracy, while smaller models do not show significant gains from the added input.

**Results**  
The evaluation of iOSWorld reveals that the best configuration achieves an overall accuracy of 52% across all tasks. However, performance on multi-app tasks is significantly lower, with only 37% accuracy. The introduction of privileged vision+XML access leads to substantial improvements in model performance, particularly for frontier models, which see increases of up to 26 percentage points. This stark contrast in performance highlights the challenges faced by agents when required to integrate information across multiple applications, underscoring the need for enhanced reasoning capabilities in mobile agents.

**Limitations**  
The authors acknowledge that the benchmark is limited to the 26 iOS applications included in the study, which may not fully represent the diversity of user interactions across all mobile applications. Additionally, the reliance on a specific set of tasks may restrict the generalizability of the findings. The authors also note that smaller models do not benefit from the privileged access, suggesting that the architecture and capacity of the model play a crucial role in performance. Furthermore, as a preprint, the work has not yet been validated through peer review, which may affect the robustness of the findings.

**Why it matters**  
The introduction of iOSWorld as an open-source benchmark provides a critical resource for researchers and developers aiming to create more personalized and intelligent mobile agents. By focusing on the integration of user identity and preferences, this work lays the groundwork for future advancements in personal assistant technologies. The benchmark's release, including all apps, seeded data, tasks, rubrics, and evaluation code, facilitates further research in this domain, as emphasized in the paper and available on [arXiv](https://arxiv.org/abs/2606.09764v1).
