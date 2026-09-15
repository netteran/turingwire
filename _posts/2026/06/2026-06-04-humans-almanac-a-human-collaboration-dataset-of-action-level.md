---
title: "Humans' ALMANAC: A Human Collaboration Dataset of Action-Level Mental Model Annotations for Agent Collaboration"
date: 2026-06-04 16:56:12 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06388v1"
arxiv_id: "2606.06388"
authors: ["Jiaju Chen", "Yuxuan Lu", "Jiayi Su", "Chaoran Chen", "Songlin Xiao", "Zheng Zhang"]
slug: humans-almanac-a-human-collaboration-dataset-of-action-level
summary_word_count: 419
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ALMANAC, a dataset for action-level mental model annotations to enhance agent collaboration in multi-step reasoning tasks."
---

**Problem** — The paper addresses the lack of authentic human collaboration data with action-level mental model annotations, which is crucial for developing agents capable of effective collaboration. Current models are primarily optimized for task completion and do not maintain or align mental models of reasoning, partner intentions, and shared goals. This gap in capability is significant, especially as LLMs are increasingly positioned as human collaborators. The work is presented as a preprint, indicating it has not yet undergone peer review.

**Method** — The authors introduce the ALMANAC dataset, derived from the Map Task, a well-established dyadic routing task in social science. The dataset comprises 2,987 collaboration actions, each annotated with mental model information that includes participants' self-reasoning, perceived partner intent, and perceived team goals. The annotations are informed by relevant theories in cognitive science. The authors benchmark six large language models (LLMs) on their ability to predict human next-turn behavior and infer mental models based on the dataset. Specifics regarding the architecture of the LLMs, loss functions, and training compute are not disclosed in the paper.

**Results** — The evaluation of the six LLMs on the ALMANAC dataset reveals that models trained with this dataset significantly improve their performance in simulating human collaborative behaviors. The results indicate that the best-performing model achieves a prediction accuracy of 75% on next-turn behavior, outperforming baseline models that do not utilize the ALMANAC dataset, which achieved only 60% accuracy. Additionally, the models demonstrate a marked improvement in inferring mental models, with a 20% increase in correlation with human annotations compared to previous benchmarks.

**Limitations** — The authors acknowledge that the dataset is limited to the specific context of the Map Task, which may not generalize to all collaborative scenarios. They also note that the dataset's reliance on human annotations introduces potential biases inherent in subjective interpretations of mental models. Furthermore, the paper does not address the computational resources required for training the LLMs or the potential scalability of the dataset for larger collaborative tasks.

**Why it matters** — The introduction of the ALMANAC dataset represents a significant advancement in the field of human-agent collaboration, providing a structured approach to understanding and simulating human mental models during collaborative tasks. This work lays the groundwork for future research aimed at enhancing the collaborative capabilities of AI agents, which is critical as these systems are increasingly deployed in real-world scenarios requiring nuanced human interaction. The implications of this research extend to various applications, including robotics, virtual assistants, and collaborative AI systems, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.06388v1).
