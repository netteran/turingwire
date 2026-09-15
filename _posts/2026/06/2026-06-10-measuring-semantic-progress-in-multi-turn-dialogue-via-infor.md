---
title: "Measuring Semantic Progress in Multi-turn Dialogue via Information Gain"
date: 2026-06-10 17:04:59 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.12332v1"
arxiv_id: "2606.12332"
authors: ["Paul He", "Shiva Kasiviswanathan", "Dominik Janzing"]
slug: measuring-semantic-progress-in-multi-turn-dialogue-via-infor
summary_word_count: 459
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces an information-theoretic metric for measuring semantic progress in multi-turn dialogue, demonstrating competitive performance against human judgments."
---

**Problem**  
Evaluating multi-turn dialogue systems presents a significant challenge, as the quality of dialogue is often assessed across multiple turns rather than in isolation. Existing metrics frequently fail to capture the nuanced accumulation of relevant information throughout a conversation. This paper addresses this gap by focusing on semantic progress, defined as the reduction of uncertainty regarding the question at hand through the dialogue. The authors propose a novel metric that quantifies this semantic progress, which is particularly relevant given the limitations of current evaluation methods, including those reliant on large language models (LLMs). This work is presented as a preprint and has not undergone peer review.

**Method**  
The authors formalize semantic progress as question-conditioned uncertainty reduction and introduce an information-theoretic metric that approximates this concept in embedding space. The core technical contribution is a Gaussian formulation that allows for tractable, closed-form updates to the metric. This estimator is designed to exhibit desirable properties such as monotonicity and additive decomposition of total information gain across dialogue turns. Additionally, the authors provide a maximum-entropy argument to explain the emergence of log-determinant structures when only second-order embedding information is retained. The proposed metric operates independently of autoregressive inference, making it fully reproducible with a fixed embedding model. The experiments utilize lightweight embedding models, demonstrating that effective semantic progress measurement does not necessitate large model capacities.

**Results**  
The proposed metric was evaluated on three benchmarks: MT-Bench, Chatbot Arena, and UltraFeedback. The results indicate that the metric achieves competitive agreement with human judgments, particularly excelling in alignment on MT-Bench and UltraFeedback compared to several LLM-based judges. Specific performance metrics include a notable improvement in correlation with human evaluations, suggesting that the proposed method effectively captures semantic progress. The authors report that their approach remains effective even under CPU-only execution, highlighting its efficiency and accessibility.

**Limitations**  
The authors acknowledge that their metric is limited to measuring semantic progress and does not encompass other dimensions of dialogue quality, such as coherence or engagement. Additionally, while the method shows promise with lightweight models, its performance in more complex dialogue scenarios or with diverse embedding architectures remains to be fully explored. The reliance on embedding models also raises questions about the generalizability of the metric across different dialogue contexts and tasks.

**Why it matters**  
This work has significant implications for the evaluation of dialogue systems, particularly in contexts where understanding the accumulation of information is critical. By providing a reproducible and efficient metric for semantic progress, the authors pave the way for more nuanced assessments of dialogue quality that do not depend on large-scale models. This advancement could facilitate the development of more effective dialogue systems and improve the interpretability of their performance. The findings are relevant for future research in dialogue evaluation and are available on [arXiv](https://arxiv.org/abs/2606.12332v1).
