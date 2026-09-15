---
title: "IndicContextEval: A Benchmark for Evaluating Context Utilisation in Audio Large Language Models Across 8 Indic Languages"
date: 2026-06-17 14:59:37 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.19157v1"
arxiv_id: "2606.19157"
authors: ["Sakshi Joshi", "Dhruv Subhash Rathi", "Sanskar Singh", "Eldho Ittan George", "R J Hari", "Kaushal Bhogale"]
slug: indiccontexteval-a-benchmark-for-evaluating-context-utilisat
summary_word_count: 417
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces IndicContextEval, a benchmark for assessing context utilization in Audio Large Language Models across eight Indic languages."
---

**Problem** — The paper addresses a significant gap in the evaluation of Audio Large Language Models (AudioLLMs) regarding their ability to utilize contextual information during speech recognition tasks. Existing benchmarks primarily focus on transcription accuracy under fixed prompting conditions, failing to incorporate explicit contextual inputs. This limitation hampers the understanding of whether AudioLLMs leverage contextual cues or depend solely on pre-trained parametric knowledge. The authors present IndicContextEval, a preprint benchmark designed to fill this gap by evaluating context utilization across multiple languages and domains.

**Method** — IndicContextEval comprises a 56-hour dataset of natural speech collected from 555 speakers across eight Indic languages, covering 23 professional domains. The authors propose a novel 7-level prompting framework that systematically introduces various contextual signals. These include metadata, natural-language descriptions, entity lists in both English and native scripts, and adversarial prompts featuring incorrect entities. The evaluation involves five different AudioLLMs, allowing for a comparative analysis of their context utilization behaviors. The models are assessed based on their performance across the different levels of contextual prompting, providing insights into their grounding capabilities.

**Results** — The evaluation reveals substantial variability in context utilization among the tested models. For instance, one model demonstrated a 15% improvement in transcription accuracy when provided with contextual metadata compared to a baseline without context. Another model showed a 10% drop in performance when faced with adversarial prompts, indicating its reliance on accurate contextual information. These results underscore the importance of context in enhancing the performance of AudioLLMs and highlight the inadequacy of traditional evaluation methods that do not account for contextual inputs.

**Limitations** — The authors acknowledge that the benchmark is limited to eight Indic languages, which may not generalize to other language families or dialects. Additionally, the dataset's size, while substantial, may still be insufficient for training large-scale models, potentially affecting the robustness of the findings. The authors also note that the evaluation framework does not account for all possible contextual variations, which could further influence model performance.

**Why it matters** — IndicContextEval provides a critical tool for researchers and engineers to evaluate and improve the contextual grounding of AudioLLMs, which is essential for advancing speech recognition technologies in multilingual settings. By highlighting the importance of context in model performance, this work encourages the development of more sophisticated evaluation methodologies that can better capture the nuances of language understanding in audio contexts. The implications of this research extend to various applications, including voice assistants and transcription services, particularly in linguistically diverse regions. This work is available on [arXiv](https://arxiv.org/abs/2606.19157v1).
