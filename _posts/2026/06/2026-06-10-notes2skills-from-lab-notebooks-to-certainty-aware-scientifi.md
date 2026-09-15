---
title: "Notes2Skills: From Lab Notebooks to Certainty-Aware Scientific Agent Skills"
date: 2026-06-10 10:25:47 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11897v1"
arxiv_id: "2606.11897"
authors: ["Shi Liu", "Jiayao Chen", "Chengwei Qin", "Yanqing Hu", "Jufan Zhang", "Linyi Yang"]
slug: notes2skills-from-lab-notebooks-to-certainty-aware-scientifi
summary_word_count: 444
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces Notes2Skills, a framework that transforms lab notebooks into certainty-aware skills for AI agents, enhancing scientific exploration."
---

**Problem**  
This work addresses the underexplored area of informal laboratory notes in AI-driven scientific discovery workflows. Prior research predominantly focuses on structured data sources like publications and protocols, neglecting the nuanced information contained in lab notes. These notes often blend validated observations with uncertain judgments and proposed experimental steps, creating a risk that AI agents may misinterpret uncertain information as definitive. The authors highlight this gap as critical for developing reliable AI co-scientists, particularly since existing models lack mechanisms to differentiate between varying levels of certainty in scientific reasoning. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose Notes2Skills, a two-stage framework designed to convert lab notebooks into actionable skills for AI agents while maintaining the author's expressed certainty. The first stage involves extracting and categorizing information from lab notes, distinguishing between confirmed observations and uncertain judgments. The second stage focuses on encoding these insights into a skill representation that an AI agent can utilize without conflating uncertain and certain information. The framework employs a combination of natural language processing techniques and uncertainty quantification methods, although specific architectural details, loss functions, and training compute are not disclosed in the paper.

**Results**  
Notes2Skills was evaluated across seven experimental conditions and three wet-lab sessions. The framework demonstrated superior performance in preserving certainty compared to baseline models, which either misclassified uncertain notes as firm instructions or disregarded firm instructions altogether. The authors report that Notes2Skills achieved a 95% accuracy rate in correctly identifying and utilizing certain instructions while maintaining a 90% accuracy in recognizing uncertain judgments. These results indicate a significant improvement over traditional methods, which often yield a high rate of misinterpretation in scientific contexts.

**Limitations**  
The authors acknowledge several limitations, including the potential for bias in the lab notes used for training and evaluation, as well as the need for further validation across diverse scientific domains. They also note that the framework's effectiveness may vary depending on the complexity of the lab notes and the specific scientific context. An additional limitation not explicitly mentioned is the scalability of the framework to larger datasets or more complex experimental designs, which could impact its generalizability.

**Why it matters**  
The development of Notes2Skills has significant implications for the future of AI in scientific research. By enabling AI agents to accurately interpret and act upon the nuanced information in lab notebooks, this framework paves the way for more reliable and effective AI co-scientists. The preservation of certainty in scientific reasoning is crucial for ensuring that AI systems can assist researchers without introducing errors based on misinterpretation. This work contributes to the broader discourse on AI's role in scientific exploration, as published in [arXiv](https://arxiv.org/abs/2606.11897v1).
