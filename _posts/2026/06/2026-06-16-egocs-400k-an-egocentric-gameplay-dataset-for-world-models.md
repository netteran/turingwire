---
title: "EgoCS-400K: An Egocentric Gameplay Dataset for World Models"
date: 2026-06-16 17:13:58 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18180v1"
arxiv_id: "2606.18180"
authors: ["Rongjin Guo", "Dong Liang", "Yuhao Liu", "Fang Liu", "Tianyu Huang", "Gerhard P. Hancke"]
slug: egocs-400k-an-egocentric-gameplay-dataset-for-world-models
summary_word_count: 412
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces EgoCS-400K, a large-scale egocentric gameplay dataset designed for developing interactive world models in AI."
---

**Problem**  
The paper addresses the gap in available datasets for training interactive world models, which require temporally aligned video-action-language trajectories that reflect human gameplay dynamics. Existing datasets either lack executable actions and reliable states (e.g., web video datasets) or are limited in scene diversity and costly to obtain (e.g., robotic datasets). Furthermore, current simulators do not provide large-scale human-driven interaction trajectories. This work presents EgoCS-400K, a preprint dataset that aims to fill this void by offering a comprehensive collection of gameplay data from the popular games Counter-Strike and Counter-Strike 2.

**Method**  
EgoCS-400K is constructed from public professional match demos, capturing over 400,000 first-person videos and 10,000 hours of gameplay across more than 1,000 matches and 40,000 rounds. The dataset includes detailed annotations of player states, view directions, movements, keyboard/button inputs, view-angle changes, weapon usage, game events, and round-level context. The authors employ a replay-grounded approach to render clean first-person videos from the captured trajectories, ensuring temporal alignment between visual observations and gameplay actions. The dataset supports various interactive visual modeling tasks, such as action-conditioned future prediction, state- and event-aware scene rollout, replay-grounded captioning, and agent egocentric action understanding.

**Results**  
While specific quantitative results comparing EgoCS-400K to existing baselines are not provided in the abstract, the dataset's scale and diversity are emphasized as significant improvements over previous datasets. The authors claim that EgoCS-400K enables a range of advanced modeling tasks that were previously infeasible due to data limitations, thus setting a new benchmark for future research in interactive world modeling.

**Limitations**  
The authors acknowledge that EgoCS-400K is limited to the Counter-Strike franchise, which may restrict its applicability to other domains or game types. Additionally, the reliance on public match demos may introduce biases based on the skill levels of the players involved. The dataset's focus on specific gameplay mechanics may also limit its generalizability to broader interactive scenarios outside of first-person shooter games. As a preprint, the dataset has not yet undergone peer review, which may affect its acceptance in the research community.

**Why it matters**  
EgoCS-400K represents a significant advancement in the development of datasets for interactive world models, bridging the gap between passive video data and active, controllable simulations. By providing a large-scale, temporally aligned dataset that connects visual observations with human actions and game states, it opens new avenues for research in action understanding, scene generation, and predictive modeling. This work is crucial for advancing AI systems capable of understanding and interacting with complex environments, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.18180v1).
