---
title: "A Red-Team Study of Anthropic Fable 5 & Opus 4.8 Models"
date: 2026-06-16 17:23:58 +0000
category: research
subcategory: alignment_safety
company: "Anthropic"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18193v1"
arxiv_id: "2606.18193"
authors: ["Nicola Franco"]
slug: a-red-team-study-of-anthropic-fable-5-opus-4-8-models
summary_word_count: 411
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This study evaluates the adversarial robustness of Anthropic's Fable 5 and Opus 4.8 models against automated jailbreak attacks, revealing significant vulnerabilities."
---

**Problem**  
This paper addresses the gap in understanding the adversarial robustness of large language models (LLMs), specifically Anthropic's Fable 5 and Opus 4.8, against automated jailbreak attacks. The study is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for rigorous evaluation of LLMs in the context of security and safety. The authors aim to quantify the models' vulnerabilities across a comprehensive set of harmful intents, categorized into a ten-category harm taxonomy.

**Method**  
The authors employed the HackAgent red-teaming framework to generate hundreds of thousands of adversarial attempts targeting both models. The evaluation involved four families of automated jailbreak attacks across 7,826 harmful intents. Each attack's success was independently adjudicated by a panel of three judge models using a majority vote mechanism. The study specifically focused on the models' responses to adaptive iterative attacks, which were found to be the most effective, while static obfuscation techniques were largely neutralized. The evaluation process was designed to be automated and cost-effective, allowing for rapid identification of harmful completions.

**Results**  
The findings indicate that both models exhibit a degree of resilience against adversarial attacks, with Opus 4.8 being compromised on 11.5% of intents and Fable 5 on 6.1% in worst-case scenarios. However, the authors caution that aggregate success rates may provide a false sense of security, as the residual vulnerabilities are significant. Notably, both models produced harmful completions, with Opus 4.8 generating 1,620 and Fable 5 generating 702 panel-confirmed harmful outputs across all harm categories. These results underscore the models' susceptibility to sustained automated adversarial pressure, despite their advanced configurations.

**Limitations**  
The authors acknowledge that their study is limited by the scope of the attack vectors explored and the reliance on automated adjudication, which may not capture all nuances of harmful outputs. Additionally, the study does not account for potential human-in-the-loop interventions that could alter the effectiveness of the attacks. The focus on specific attack families may also limit the generalizability of the findings to other types of adversarial strategies.

**Why it matters**  
The implications of this research are significant for the development and deployment of LLMs in real-world applications, particularly in sensitive domains where safety and security are paramount. The study highlights the need for ongoing vigilance and robust adversarial testing in the design of AI systems, as even state-of-the-art models can be compromised under automated attack scenarios. This work contributes to the broader discourse on AI safety and adversarial robustness, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.18193v1).
