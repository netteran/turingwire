---
title: "Beyond Text Following: Repairable Arbitration Reversals in Audio-Language Models"
date: 2026-06-03 17:57:51 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.05161v1"
arxiv_id: "2606.05161"
authors: ["Yichen Gao", "Yiqun Zhang", "Zijing Wang", "Yujia Li", "Heng Guo", "Xi Wu"]
slug: beyond-text-following-repairable-arbitration-reversals-in-au
summary_word_count: 415
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Gated Audio Counterfactual Logit Correction (GACL) to enhance audio-language model performance in conflict scenarios."
---

**Problem**  
Audio-language models (ALMs) frequently exhibit a tendency to favor text-based answers over audio-supported ones, even when the audio evidence is unequivocal. This paper addresses the gap in understanding whether the audio-supported answer is genuinely unavailable or merely overridden by conflicting text. The authors investigate this issue through a same-audio counterfactual approach, which is particularly relevant as the work is presented as a preprint and has not undergone peer review.

**Method**  
The authors analyze five different ALMs across four conflict tasks, employing a same-audio counterfactual that retains the audio while removing the conflicting text. This method allows for the measurement of shifts in model preference, revealing that 64.1% of conflict samples exhibit a sign flip, indicating that the audio-supported answer is encoded but overridden. To further localize the source of this arbitration failure, the authors utilize activation patching, which identifies that the reversal occurs specifically in the answer-position computation. The proposed Gated Audio Counterfactual Logit Correction (GACL) is a training-free decoding rule that interpolates between the scores from the joint model and the same-audio model. This method leverages the diagnostic insights gained from the activation patching to improve decision-making in conflict scenarios.

**Results**  
GACL demonstrates significant performance improvements, achieving a 17.8-point increase in normalized Area Under the Curve (nAUC) over the best contrastive baseline while adhering to a strict 5 percentage point faithfulness-drop budget. Additionally, GACL shows impressive transferability to vision-text arbitration tasks, yielding improvements of up to 40.5 percentage points without the need for model retuning. These results underscore the effectiveness of GACL in enhancing the fidelity of ALMs in the presence of conflicting information.

**Limitations**  
The authors acknowledge that their findings are based on a limited set of ALMs and conflict tasks, which may restrict the generalizability of the results. Furthermore, the reliance on a training-free decoding rule may limit the potential for further optimization through end-to-end training. The paper does not address the implications of GACL in real-world applications or its performance in more complex audio-language scenarios.

**Why it matters**  
The introduction of GACL has significant implications for the development of more robust audio-language models, particularly in scenarios where audio and text conflict. By demonstrating that audio evidence can be effectively utilized even when overridden by text, this work paves the way for future research aimed at improving model interpretability and decision-making in multimodal contexts. The findings contribute to the ongoing discourse on enhancing ALM performance and are relevant for researchers focusing on multimodal learning and model arbitration, as published in [arXiv](https://arxiv.org/abs/2606.05161v1).
