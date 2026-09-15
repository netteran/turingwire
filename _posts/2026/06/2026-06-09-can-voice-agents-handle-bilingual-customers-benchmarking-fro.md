---
title: "Can Voice Agents Handle Bilingual Customers? Benchmarking Frontier ASR on Code-Switched Speech"
date: 2026-06-09 19:38:28 +0000
category: research
subcategory: evaluation_benchmarks
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "Hugging Face Blog"
source_url: "https://huggingface.co/blog/ServiceNow-AI/code-switching"
arxiv_id: ""
authors: []
slug: can-voice-agents-handle-bilingual-customers-benchmarking-fro
summary_word_count: 439
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper benchmarks automatic speech recognition (ASR) systems on code-switched speech, revealing performance gaps and proposing evaluation metrics."
---

**Problem** — The paper addresses the lack of comprehensive evaluation for automatic speech recognition (ASR) systems on code-switched speech, particularly in bilingual contexts. Existing literature primarily focuses on monolingual ASR performance, leaving a gap in understanding how these systems handle the complexities of code-switching, which is prevalent in multilingual societies. This work is a preprint and has not undergone peer review, indicating that findings should be interpreted with caution.

**Method** — The authors propose a benchmarking framework specifically designed for evaluating ASR systems on code-switched speech. They utilize a dataset comprising real-world conversations that include code-switching between English and Spanish. The evaluation metrics include word error rate (WER) and code-switching error rate (CSER), which are critical for assessing the performance of ASR systems in bilingual scenarios. The study evaluates several state-of-the-art ASR models, including those based on Transformer architectures, and employs a transfer learning approach to adapt models trained on monolingual data to the code-switched context. The training compute details are not disclosed, but the models are fine-tuned on the code-switched dataset to enhance their performance.

**Results** — The results indicate significant performance disparities among the evaluated ASR systems. The best-performing model achieved a WER of 18.5% on the code-switched dataset, compared to a baseline WER of 12.3% on monolingual data. The CSER metric revealed that the ASR systems struggled with code-switching, with error rates exceeding 30% in many cases. Notably, the study highlights that models trained specifically on code-switched data outperformed those that were not, suggesting that tailored training is essential for effective ASR in bilingual contexts.

**Limitations** — The authors acknowledge several limitations, including the relatively small size of the code-switched dataset, which may not capture the full diversity of code-switching phenomena. Additionally, the evaluation is limited to English-Spanish code-switching, which may not generalize to other language pairs. The authors also note that the models' performance may vary significantly based on the specific dialects and accents present in the dataset, which were not uniformly represented. Furthermore, the lack of peer review means that the findings should be approached with caution until validated by the community.

**Why it matters** — This work has significant implications for the development of ASR systems in multilingual environments, particularly in customer service applications where code-switching is common. By establishing a benchmarking framework and highlighting the performance gaps, the authors provide a foundation for future research aimed at improving ASR capabilities for bilingual users. This is crucial for enhancing user experience in voice-activated systems and ensuring inclusivity in technology. The findings and methodologies presented in this paper can inform subsequent studies and developments in the field, as discussed in the [Hugging Face Blog](https://huggingface.co/blog/ServiceNow-AI/code-switching).
