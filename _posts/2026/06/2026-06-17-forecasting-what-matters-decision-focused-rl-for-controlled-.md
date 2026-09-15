---
title: "Forecasting what Matters: Decision-Focused RL for Controlled EV Charging with Unknown Departure Times"
date: 2026-06-17 15:37:35 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.19199v1"
arxiv_id: "2606.19199"
authors: ["Giuseppe Gabriele", "Fabio Pavirani", "Seyed Soroush Karimi Madahi", "Chris Develder"]
slug: forecasting-what-matters-decision-focused-rl-for-controlled-
summary_word_count: 416
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a decision-focused reinforcement learning framework for EV charging that incorporates forecasting of unknown departure times, enhancing decision quality."
---

**Problem**  
The paper addresses the challenge of managing electric vehicle (EV) charging in the context of increasing adoption rates, which can lead to peak demand and grid instability. Traditional reinforcement learning (RL) approaches struggle when key features, such as departure times, are unknown, which is common in real-world scenarios. The authors note that existing forecasting models are typically optimized for accuracy rather than their influence on downstream decision-making, leading to potential performance degradation in RL agents. This work is a preprint and has not yet undergone peer review.

**Method**  
The authors propose a novel decision-focused reinforcement learning (DF-RL) framework that integrates an end-to-end training approach for both the forecaster and the RL agent. The forecaster is designed to predict unknown features (departure times) using available historical data, while the RL agent learns to optimize charging policies based on these forecasts. The joint training process allows the forecaster to receive feedback from the RL agent's actions, ensuring that the forecasting model is aligned with the decision-making objectives of the RL agent. The architecture details, including specific neural network configurations or loss functions, are not disclosed in the abstract.

**Results**  
The DF-RL framework demonstrates significant improvements over baseline methods. The authors report up to a 14% increase in total reward and a 55% reduction in unsupplied energy compared to a standard RL approach that does not incorporate departure time forecasting. These results suggest that the integrated training of the forecaster and RL agent leads to more effective charging decisions, thereby enhancing the overall performance of the EV charging system.

**Limitations**  
The authors acknowledge that the proposed method relies on the quality of the available historical data for forecasting. If the data is insufficient or biased, it may adversely affect the performance of the DF-RL framework. Additionally, the paper does not explore the scalability of the approach in larger, more complex grid environments or the computational overhead introduced by the joint training process. The lack of detailed architecture specifications may also limit reproducibility.

**Why it matters**  
This research has significant implications for the future of smart grid management and EV charging infrastructure. By effectively addressing the uncertainty of departure times through a decision-focused approach, the proposed DF-RL framework can enhance the reliability and efficiency of EV charging systems. This work contributes to the growing body of literature on integrating machine learning techniques with energy management systems, as published in [arXiv](https://arxiv.org/abs/2606.19199v1). The findings may inform future developments in RL applications for energy systems, particularly in optimizing resource allocation under uncertainty.
