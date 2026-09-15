---
title: "From Nominal Intensity to Equivalent Rainfall: A Path-Based Credibility Evaluation Framework for Simulated Rainfall in Autonomous-Driving Perception Tests"
date: 2026-06-10 12:13:59 +0000
category: research
subcategory: evaluation_benchmarks
company: "UiPath"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11989v1"
arxiv_id: "2606.11989"
authors: ["Tian Xia", "Xin Zhao", "Shaolingfeng Ye", "Junyi Chen"]
slug: from-nominal-intensity-to-equivalent-rainfall-a-path-based-c
summary_word_count: 390
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a path-based credibility evaluation framework for simulating rainfall in autonomous-driving perception tests, enhancing realism and reliability."
---

**Problem**  
The paper addresses the gap in simulating credible rainfall conditions for autonomous-driving perception tests, which is crucial for identifying system boundaries and supporting Safety of the Intended Functionality (SOTIF) risk assessments. Current methodologies primarily rely on nominal rainfall intensity or single-point measurements, which inadequately represent real-world scenarios. This work is particularly relevant as it is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors propose a path-based credibility evaluation framework that utilizes the joint distribution of raindrop size and velocity from real rainfall as a reference. Each candidate path is characterized by three metrics: path-equivalent rainfall intensity, an uncertainty band, and a path-averaged Realism of Raindrop Distribution (RRD) score. The framework incorporates Lidar target point-cloud count and mean reflectivity to correct for perception consistency, thereby quantifying how well each simulated rainfall path can replicate the perception effects of real rainfall. The evaluation is based on approximately 10,000 real-rainfall raindrop-spectrum samples, 728 RainSense perception samples, and 45 spatial sampling points within a 2.4 m x 7.2 m simulated-rainfall area.

**Results**  
The results indicate that spatial non-uniformity persists under the same nominal conditions, underscoring the necessity for a path-based evaluation approach. The method identifies Path IV and Path VI as optimal candidates, yielding results of 11.54 ± 0.31 mm/h with an RRD of 0.43, and 8.28 ± 0.34 mm/h with an RRD of 0.46, respectively. These paths demonstrate a more balanced performance across rainfall-intensity stability, raindrop-spectrum realism, and perception consistency compared to other evaluated paths.

**Limitations**  
The authors acknowledge that their method may not account for all environmental variables affecting perception in real-world scenarios, such as wind effects or varying surface conditions. Additionally, the reliance on a specific dataset of raindrop spectra may limit the generalizability of the findings. The study's experimental setup is confined to a controlled environment, which may not fully capture the complexities of real-world driving conditions.

**Why it matters**  
This work has significant implications for the development of more reliable and realistic simulation environments for autonomous vehicles, particularly in the context of adverse weather conditions. By providing a structured approach to evaluate simulated rainfall, the proposed framework can enhance the credibility of perception tests, ultimately contributing to safer autonomous driving systems. This is particularly relevant for ongoing research in the field, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11989v1).
