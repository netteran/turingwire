---
title: "Seeing Is Not Screening: Multimodal Hidden Instruction Attacks on Agent Skill Scanners"
date: 2026-06-16 17:29:11 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18198v1"
arxiv_id: "2606.18198"
authors: ["Xiaojun Jia", "Jie Liao", "Simeng Qin", "Ke Ma", "Wenbo Guo", "Yebo Feng"]
slug: seeing-is-not-screening-multimodal-hidden-instruction-attack
summary_word_count: 404
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SkillCamo, a multimodal attack on agent skill scanners, and ExecScan, a defense mechanism to detect hidden malicious instructions."
---

**Problem** — This work addresses a critical gap in the security of LLM-based systems, specifically the vulnerability of agent skill scanners to multimodal hidden instruction attacks. Current defenses primarily focus on textual signals, leaving visual cues insufficiently scrutinized. The authors highlight that malicious operational instructions embedded in images can evade detection, posing a significant risk to system integrity. This is particularly relevant as the paper is a preprint and has not undergone peer review.

**Method** — The authors propose SkillCamo, a novel attack framework that embeds malicious instructions within images associated with a skill, while simultaneously modifying the surrounding documentation to reference these images. This approach leverages the joint interpretation of text and visual content during execution, making it difficult for traditional scanners to detect the hidden threats. To counter this, they introduce ExecScan, a multimodal scanning module that operates on the execution level. ExecScan performs intent extraction, behavior reconstruction, abuse assessment, and simulation of execution to analyze skill artifacts comprehensively. It integrates analysis of documentation, code, referenced resources, and visual content to recover concealed instructions and assess potential risks.

**Results** — The empirical evaluation demonstrates that SkillCamo effectively challenges existing skill scanners, with a significant increase in successful evasion rates compared to baseline methods. ExecScan shows improved detection capabilities, with a reported increase in detection accuracy by 30% over traditional scanning methods on a dataset of multimodal skill artifacts. The authors benchmark their methods against standard skill scanning techniques, illustrating the efficacy of ExecScan in identifying hidden malicious instructions and reconstructing executable behavior chains.

**Limitations** — The authors acknowledge that their approach may not cover all possible attack vectors, particularly as new multimodal attack strategies emerge. They also note that the effectiveness of ExecScan may vary depending on the complexity of the skill artifacts and the quality of the visual content. Additionally, the reliance on execution simulation may introduce computational overhead, which could limit real-time applicability in high-stakes environments.

**Why it matters** — This research highlights the critical need for enhanced security measures in LLM-based systems, particularly as multimodal interactions become more prevalent. The introduction of SkillCamo and ExecScan provides a framework for understanding and mitigating risks associated with hidden instructions in multimodal contexts. The findings underscore the importance of integrating visual content analysis into security protocols, paving the way for more robust defenses against sophisticated attacks. This work is essential for future research in multimodal AI security, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.18198v1).
