---
title: "ReFree: Towards Realistic Co-Speech Video Generation via Reward-Free RL and Multilevel Speech Guidance"
date: 2026-06-11 13:00:58 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13304v1"
arxiv_id: "2606.13304"
authors: ["Salaheldin Mohamed", "M. Hamza Mughal", "Rishabh Dabral", "Christian Theobalt"]
slug: refree-towards-realistic-co-speech-video-generation-via-rewa
summary_word_count: 386
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ReFree-S2V, a novel framework for realistic co-speech video generation that enhances lip synchronization and expressive behavior using reward-free RL."
---

**Problem**  
The paper addresses the limitations in existing speech-driven talking character animation methods, which struggle to balance accurate lip synchronization with dynamic facial expressions and head movements. Prior approaches often result in animations that are either rigidly accurate or expressively dynamic but poorly synchronized. This work is a preprint and contributes to the ongoing discourse in the field of video generation and animation.

**Method**  
The authors propose ReFree-S2V, a flow-matching speech-to-portrait animation framework that leverages a pretrained video generation model. The core technical contribution includes a multi-level speech representation that captures both phonetic and prosodic information at local and global levels. This representation is integrated into transformer blocks through learnable level selectors, allowing the model to achieve precise lip synchronization while maintaining natural expressive motion. Additionally, the authors introduce a novel reward-free reinforcement learning (RL) scheme that discourages perceptually implausible motion without relying on handcrafted synchronization metrics or extensive human preference annotations, thus reducing the training cost.

**Results**  
ReFree-S2V demonstrates significant improvements over existing methods in both quantitative and qualitative metrics. The model achieves state-of-the-art performance in lip-sync accuracy, surpassing named baselines such as previous flow-matching and video generation techniques. In qualitative assessments, human evaluators rated the naturalness and expressivity of the generated animations higher than those produced by competing methods. Specific numerical results are not disclosed in the abstract, but the authors emphasize the substantial effect sizes in their evaluations.

**Limitations**  
The authors acknowledge that while their approach improves synchronization and expressivity, it may still face challenges in extreme cases of facial motion or complex speech patterns. Additionally, the reliance on a pretrained model may limit the generalizability of the framework to diverse datasets or styles of animation. The absence of detailed numerical results in the abstract also leaves some questions regarding the extent of performance improvements.

**Why it matters**  
The implications of this work are significant for the fields of computer vision and animation, particularly in applications requiring realistic human-like interactions, such as virtual assistants, gaming, and film production. The introduction of a reward-free RL approach could inspire further research into efficient training methodologies that minimize reliance on human annotations, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13304v1). This paper sets a foundation for future advancements in realistic video generation and could lead to more sophisticated models that better understand and replicate human expressiveness in animated characters.
