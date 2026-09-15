---
title: "MagPlus: Bridging Micro-to-Regular Facial Expressions through Learnable Magnification"
date: 2026-06-11 13:08:34 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13312v1"
arxiv_id: "2606.13312"
authors: ["Sliman Jammal", "Andrei Sharf"]
slug: magplus-bridging-micro-to-regular-facial-expressions-through
summary_word_count: 421
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces MagPlus, a novel pipeline for enhancing micro-expression generation by magnifying subtle facial motions for compatibility with standard models."
---

**Problem**  
The paper addresses the challenge of generating and modeling facial micro-expressions, which are critical for understanding genuine human emotions but are difficult to capture due to their subtlety and the scarcity of annotated datasets. Existing methods often yield low-quality outputs and lack robustness and generalization capabilities. This work is a preprint and has not undergone peer review.

**Method**  
MagPlus employs a two-stage pipeline to bridge the gap between micro-expression analysis and conventional facial animation models. The first component, MagPlus, learns to magnify subtle micro-expressions into a range compatible with regular facial expressions, effectively transforming weak facial motions into more pronounced signals. This transformation allows the use of existing facial expression models without the need for dedicated training on micro-expression data. The second component, DeMagPlus, restores the magnified expressions back to realistic micro-expression intensity levels while maintaining the synthesized dynamics. The framework is evaluated using four facial animation models: FOMM (First Order Motion Model), FSRT (Facial Synthesis and Recognition Transformer), MetaPortrait, and EmoPortraits, all of which were not originally trained on micro-expression datasets.

**Results**  
The authors report that the MagPlus-DeMagPlus pipeline significantly enhances the realism of generated micro-expressions when evaluated against the aforementioned models. While specific quantitative results are not detailed in the abstract, the qualitative improvements suggest a marked increase in the fidelity of micro-expression synthesis compared to baseline models that do not utilize the proposed magnification technique. The results indicate that pretrained macro-expression models can effectively generate more realistic micro-expressions without requiring retraining, showcasing the transferability of the approach.

**Limitations**  
The authors acknowledge that the reliance on existing facial animation models may limit the performance of MagPlus in scenarios where these models are not well-suited for micro-expression tasks. Additionally, the effectiveness of the pipeline may vary depending on the specific characteristics of the input data and the chosen facial animation model. The paper does not address potential computational overhead introduced by the magnification and restoration processes, nor does it explore the generalization of the approach across diverse demographic groups or varying emotional contexts.

**Why it matters**  
The MagPlus framework represents a significant advancement in the field of facial expression synthesis, particularly for applications in affective computing, virtual reality, and human-computer interaction. By enabling the generation of realistic micro-expressions from existing models, this work opens avenues for more nuanced emotional analysis and interaction in AI systems. The implications of this research extend to improving the realism of virtual avatars and enhancing emotion recognition systems, as discussed in related works on facial expression synthesis and analysis, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.13312v1).
