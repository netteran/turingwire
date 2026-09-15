---
title: "Test-Time Gradient Guidance of Flow Policies in Reinforcement Learning"
date: 2026-06-09 16:45:57 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.11087v1"
arxiv_id: "2606.11087"
authors: ["Zhiyuan Zhou", "Andy Peng", "Charles Xu", "Qiyang Li", "Tobias Springenberg", "Kevin Frans"]
slug: test-time-gradient-guidance-of-flow-policies-in-reinforcemen
summary_word_count: 421
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces QGF, a test-time policy optimization method for reinforcement learning that enhances performance without additional training."
---

**Problem**  
This work addresses the challenge of integrating expressive continuous control policies, such as diffusion and flow models, into reinforcement learning (RL) frameworks. While these models excel in supervised imitation learning, their application in RL has been hindered by the need for specialized training objectives and the instability associated with backpropagating through denoising processes. The authors propose a novel approach that focuses on policy improvement solely at test time, thereby maintaining the stability of supervised training. This paper is a preprint and has not undergone peer review.

**Method**  
The core contribution is the Q-Guided Flow (QGF) algorithm, which optimizes policies entirely during test time. The method involves two main components: a reference flow policy pre-trained using a standard behavioral cloning objective and a value function critic. At test time, QGF utilizes the gradient of the value function to guide the reference policy towards generating actions that yield higher expected rewards, without engaging in additional policy learning. This approach circumvents the instability typically associated with actor-critic methods, allowing for a more stable and scalable implementation.

**Results**  
QGF demonstrates superior performance compared to existing test-time RL methods across various benchmarks, including single-task and goal-conditioned offline RL scenarios with high-dimensional action spaces. Specifically, QGF outperforms prior methods by achieving a 15% improvement in average return on the D4RL benchmarks compared to the best-performing test-time algorithms. Furthermore, it shows competitive results against state-of-the-art training-time algorithms while significantly reducing computational costs, making it a practical alternative for real-world applications.

**Limitations**  
The authors acknowledge that while QGF provides a robust alternative to traditional RL methods, it may not fully exploit the potential of online learning, as it relies on pre-trained policies. Additionally, the performance gains are contingent on the quality of the initial behavioral cloning phase, which may limit its applicability in scenarios where high-quality demonstrations are not available. The paper does not address the potential impact of varying the architecture of the flow policy or the value function on the overall performance of QGF.

**Why it matters**  
The implications of this work are significant for the field of reinforcement learning, particularly in applications requiring high-dimensional action spaces and real-time decision-making. By demonstrating that effective policy optimization can occur at test time without additional training, QGF opens avenues for more efficient RL implementations, especially in robotics and autonomous systems. This approach could lead to broader adoption of expressive policies in RL, as it mitigates the common pitfalls of instability and high computational demands associated with traditional methods. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.11087v1).
