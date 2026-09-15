---
title: "Compositional Reasoning Depth Predicts Clinical AI Failure: Empirical Evidence Consistent with Transformer Compositionality Limits in Electronic Health Record Question Answering"
date: 2026-06-15 16:00:27 +0000
category: research
subcategory: reasoning
company: "OpenAI"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.16890v1"
arxiv_id: "2606.16890"
authors: ["Sanjay Basu"]
slug: compositional-reasoning-depth-predicts-clinical-ai-failure-e
summary_word_count: 414
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper introduces a hop-count taxonomy to predict clinical AI failure in EHR question answering, revealing systematic compositional reasoning limits in large language models."
---

**Problem**  
This preprint addresses a critical gap in understanding the limitations of large language models (LLMs) in electronic health record (EHR) question answering. While aggregate accuracy metrics are often reported, they obscure the systematic nature of model failures, particularly in tasks requiring multiple inferential steps. The authors propose a novel approach to quantify these failures through a hop-count taxonomy, which categorizes questions based on the number of distinct reasoning steps needed for accurate answers.

**Method**  
The study annotates 313 clinician-generated EHR question-answer pairs across four hop levels, where each level corresponds to the number of reasoning steps required. The authors evaluate model performance using three architectures: Claude Sonnet (version 4-6), GPT-4o, and GPT-5.4-2026-03-05, under both zero-shot and extended thinking conditions. The evaluation includes a within-model ablation study and cross-architecture replications. The models' performance is assessed using odds ratios (OR) and Cochran-Armitage tests to quantify the relationship between hop count and accuracy. The study also conducts a context-sufficiency audit to ensure that higher-hop questions are not disproportionately affected by EHR truncation.

**Results**  
The results demonstrate a consistent decline in accuracy as hop count increases across all models. For Claude Sonnet, accuracy drops from 30.6% at hop=1 to 17.6% at hop=4 (Cochran-Armitage z=-2.30, p=0.011; OR per hop 0.72, 95% CI [0.56,0.92], p=0.008). GPT-4o shows a similar trend, with accuracy decreasing from 37.8% to 14.7% (OR 0.58 [0.45,0.75], p<0.001). GPT-5.4-2026-03-05 confirms this pattern, with accuracy falling from 37.8% to 23.5% (OR 0.80 [0.66,0.98], p=0.027). The study also finds that the use of extended thinking does not significantly mitigate the accuracy-depth curve, and thinking-token usage correlates positively with hop count (r=0.31, p<0.0001).

**Limitations**  
The authors acknowledge that their findings are based on a limited dataset of 313 question-answer pairs, which may not capture the full diversity of clinical queries. Additionally, the study does not explore the potential impact of model fine-tuning or domain adaptation on performance across different hop levels. The reliance on zero-shot and extended thinking conditions may also limit the generalizability of the results to real-world clinical settings.

**Why it matters**  
This work has significant implications for the deployment of clinical AI systems, particularly in risk stratification and understanding model limitations in high-stakes environments. By establishing hop count as a predictor of model failure, the findings encourage further investigation into compositional reasoning capabilities of LLMs, which is crucial for ensuring reliable AI applications in healthcare. This research contributes to the ongoing discourse on the interpretability and robustness of AI in clinical contexts, as discussed in [arXiv](https://arxiv.org/abs/2606.16890v1).
