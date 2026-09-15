---
title: "Semantic Grading of Written Answers in Low-Resource Language Bangla Using a Fine-Tuned Lightweight Language Model"
date: 2026-06-10 11:03:59 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.11931v1"
arxiv_id: "2606.11931"
authors: ["Meherun Farzana", "Aniket Joarder", "Mahmudul Hasan", "Md. Mosaddek Khan"]
slug: semantic-grading-of-written-answers-in-low-resource-language
summary_word_count: 400
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a fine-tuned lightweight language model for semantic grading of written answers in Bangla, addressing educational NLP challenges in low-resource settings."
---

**Problem**  
This work addresses the gap in educational NLP for the Bangla language, which is underrepresented in automated assessment research. The authors highlight the challenges faced in low-resource settings, where qualified teachers are scarce, leading to manual grading of written answers. This manual process is time-consuming and inconsistent, necessitating an automated solution that can evaluate semantic correctness rather than mere lexical similarity. The paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a bilingual evaluation system that leverages a fine-tuned lightweight language model, specifically QLoRA-tuned Qwen3-8B, to assess student responses. The model is trained on a synthetic bilingual dataset constructed to facilitate controlled training and evaluation. The architecture focuses on integrating the question, reference answer, and student answer to generate a numeric score and contextually relevant feedback. The training process emphasizes semantic understanding, allowing the model to prioritize meaning over surface-level text matching. The authors disclose that the model was evaluated against both proprietary and open-source large language models (LLMs) under a unified protocol.

**Results**  
The proposed model demonstrates significant performance improvements over baseline models. In synthetic evaluations, it achieves a leakage-resistant feedback score (RoRa) of 0.819. In a dedicated human study, the model shows a strong correlation with human grading, achieving a Spearman correlation coefficient (rho) of 0.936 and a mean absolute error (MAE) of 0.725. These results indicate that the model not only provides semantically accurate assessments but also aligns closely with human evaluators, suggesting its potential for practical classroom deployment.

**Limitations**  
The authors acknowledge several limitations, including the reliance on a synthetic dataset, which may not fully capture the diversity of real-world student responses. Additionally, the model's performance may vary with different question types or subject matter, which has not been extensively tested. The authors also note that while the model shows promise, further validation in real educational contexts is necessary to assess its robustness and generalizability.

**Why it matters**  
This research has significant implications for the field of educational NLP, particularly in low-resource language contexts. By providing a scalable solution for automated grading, it can enhance the efficiency and consistency of feedback in educational settings where human resources are limited. The focus on semantic correctness over lexical matching represents a shift towards more meaningful assessments in language processing. This work contributes to the growing body of literature on low-resource language models and their applications in education, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.11931v1).
