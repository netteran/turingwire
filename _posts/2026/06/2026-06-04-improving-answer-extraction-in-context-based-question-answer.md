---
title: "Improving Answer Extraction in Context-based Question Answering Systems Using LLMs"
date: 2026-06-04 14:04:11 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06197v1"
arxiv_id: "2606.06197"
authors: ["Hafez Abdelghaffar", "Ahmed Alansary", "Ali Hamdi"]
slug: improving-answer-extraction-in-context-based-question-answer
summary_word_count: 400
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a fine-tuning approach for large language models to enhance answer extraction in context-based question answering systems."
---

**Problem**  
Current question answering (QA) systems, particularly those leveraging large language models (LLMs), exhibit limitations in accurately extracting and generating precise answers from contextual information. These systems often struggle with contextual understanding, answer consistency, and generalization across diverse domains. This work addresses these gaps by proposing a method to improve answer extraction capabilities in QA systems, specifically targeting the issues of irrelevant or imprecise responses. The research is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a fine-tuning methodology for a pre-trained LLM, specifically the Roberta-base model, to enhance its performance on answer extraction tasks. The training is conducted using the Stanford Question Answering Dataset (SQuAD1.1), which consists of context-question-answer triplets, providing a robust framework for supervised learning. The fine-tuning process focuses on improving the model's contextual comprehension and answer extraction capabilities. The training compute details are not disclosed, but the approach emphasizes targeted fine-tuning to adapt the model to the nuances of the QA task.

**Results**  
The fine-tuned Roberta-base model achieves notable performance metrics: a ROUGE-L score of 86.84%, a BLEU score of 28.24%, and a BERTScore of 95.38%. These results indicate a significant improvement in accuracy and answer relevance compared to baseline models, demonstrating the effectiveness of the proposed fine-tuning approach for context-based question answering tasks. The paper does not specify the baseline models used for comparison, which is a critical detail for evaluating the relative performance gains.

**Limitations**  
The authors acknowledge that while their approach improves answer extraction, it may still face challenges with highly ambiguous queries or contexts that require deeper reasoning beyond the provided information. Additionally, the reliance on a single dataset (SQuAD1.1) for training and evaluation may limit the generalizability of the findings across other QA datasets or real-world applications. The paper does not discuss potential biases in the training data or the model's performance on out-of-distribution queries.

**Why it matters**  
This research contributes to the ongoing development of more reliable and precise QA systems, which are critical for applications in information retrieval, customer support, and conversational agents. The findings underscore the importance of targeted fine-tuning in enhancing LLM capabilities for specific tasks, paving the way for future work that could explore broader datasets and more complex query types. The implications of this work are significant for advancing the state-of-the-art in context-based question answering, as discussed in related literature, such as that available on [arXiv](https://arxiv.org/abs/2606.06197v1).
