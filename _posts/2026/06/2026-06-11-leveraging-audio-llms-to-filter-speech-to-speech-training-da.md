---
title: "Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data"
date: 2026-06-11 15:55:23 +0000
category: research
subcategory: training_methods
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.13507v1"
arxiv_id: "2606.13507"
authors: ["Qixu Chen", "Satoshi Nakamura"]
slug: leveraging-audio-llms-to-filter-speech-to-speech-training-da
summary_word_count: 441
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel method for filtering noisy training data in speech-to-speech translation using an audio large language model."
---

**Problem**  
The paper addresses the challenge of filtering noisy data in large-scale mined corpora for end-to-end speech-to-speech translation (S2ST). Existing datasets often contain noise, misalignment, and semantic errors, which can degrade translation performance. The authors highlight the lack of effective methods for automated data filtering without relying on manual labeling, which is time-consuming and impractical for large datasets. This work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose a two-stage Rank-to-Distill strategy to filter paired speech data. In the first stage, a lightweight ranker generates pseudo-labels indicating whether to keep or drop specific speech pairs based on their quality. This ranker is trained on a subset of the data to produce reliable labels without manual intervention. In the second stage, an audio large language model (Audio-LLM) is trained to predict these keep/drop decisions directly from raw paired speech inputs. The model is designed to capture both acoustic fidelity and cross-lingual semantic consistency, ensuring that the selected data is suitable for training robust S2ST systems. The training process leverages a significant amount of compute, although specific details on compute resources are not disclosed.

**Results**  
The proposed method was evaluated on two benchmarks: CVSS-C and SpeechMatrix. The results demonstrate consistent improvements in performance over unfiltered training data, achieving an increase of up to +1.4 ASR-BLEU scores. This improvement indicates that the filtering process effectively enhances the quality of the training data, leading to better overall performance in S2ST tasks. The authors compare their results against baseline models that do not utilize the filtering mechanism, showcasing the efficacy of their approach.

**Limitations**  
The authors acknowledge that the reliance on pseudo-labels may introduce some level of noise, as the ranker is not perfect. Additionally, the method's performance may vary depending on the characteristics of the input data and the specific languages involved in the translation task. They do not discuss potential scalability issues or the computational costs associated with training the Audio-LLM, which could be significant for very large datasets. Furthermore, the generalizability of the approach to other domains beyond S2ST is not explored.

**Why it matters**  
This work has significant implications for improving the quality of training data in speech-to-speech translation systems, which is critical for enhancing translation accuracy and robustness. By automating the data filtering process, the proposed method can facilitate the use of larger datasets, ultimately leading to better-performing models. The findings contribute to the ongoing research in data quality management within machine learning, particularly in the context of speech processing. This is particularly relevant as the field continues to evolve towards more scalable and efficient training methodologies, as published in [arXiv](https://arxiv.org/abs/2606.13507v1).
