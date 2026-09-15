---
title: "Adaptive Turn-Taking for Real-time Multi-Party Voice Agents"
date: 2026-06-11 16:27:45 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13544v1"
arxiv_id: "2606.13544"
authors: ["Soumyajit Mitra", "Prabhat Pandey", "Abhinav Jain", "Shanmukha Sahith", "K V Vijay Girish"]
slug: adaptive-turn-taking-for-real-time-multi-party-voice-agents
summary_word_count: 387
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ModeratorLM, a role-conditioned voice agent that significantly enhances turn-taking in multi-party conversations."
---

**Problem**  
Turn-taking in multi-party spoken interactions poses significant challenges for voice agents, particularly in dynamic environments with competing speakers and varying user expectations. Existing systems often struggle with accurately managing interruptions and maintaining conversational flow. This paper addresses this gap by proposing a novel approach that leverages role conditioning to improve turn-taking behavior. The work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors introduce ModeratorLM, a voice agent that utilizes a large language model (LLM) specifically designed for speech processing. The architecture operates in a chunk-wise streaming manner, allowing for real-time interaction. A key innovation is the incorporation of role conditioning, where the agent's turn-taking behavior is influenced by an explicitly assigned role within the conversation. Additionally, a reasoning-augmented variant of the model is proposed, which employs chain-of-thought reasoning to enhance decision-making based on conversational context and the assigned role. The authors also create RolePlayConv, a synthetic dataset comprising diverse multi-party conversations tailored for training and evaluating the model.

**Results**  
Experiments demonstrate that ModeratorLM significantly outperforms non-role-conditioned baselines in terms of turn-taking metrics. Specifically, the model achieves over 40% improvement in precision and more than 70% improvement in recall when evaluated on both real-world meeting data and the RolePlayConv dataset. Furthermore, the system substantially reduces false-positive interruptions, indicating a more accurate and context-aware turn-taking mechanism.

**Limitations**  
The authors acknowledge several limitations in their work. First, the reliance on synthetic data (RolePlayConv) may not fully capture the complexities of real-world interactions, potentially affecting generalizability. Second, the model's performance in highly unpredictable or chaotic conversational settings remains untested. Additionally, the computational requirements for real-time processing with the LLM may pose challenges for deployment in resource-constrained environments. The authors do not address the potential biases introduced by the role assignments in the dataset or the implications of these biases on the model's performance.

**Why it matters**  
The advancements presented in this paper have significant implications for the development of more sophisticated voice agents capable of navigating complex multi-party interactions. By conditioning turn-taking behavior on roles, the proposed approach enhances the conversational capabilities of voice agents, making them more effective in collaborative environments such as meetings and group discussions. This work lays the groundwork for future research into role-aware conversational agents and their applications in various domains, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.13544v1).
