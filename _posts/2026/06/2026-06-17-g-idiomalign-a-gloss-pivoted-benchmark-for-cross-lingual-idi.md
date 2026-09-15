---
title: "G-IdiomAlign: A Gloss-Pivoted Benchmark for Cross-Lingual Idiom Alignment"
date: 2026-06-17 12:09:00 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18989v1"
arxiv_id: "2606.18989"
authors: ["Fengying Ye", "Yanming Sun", "Runzhe Zhan", "Zheqi Zhang", "Lidia S. Chao", "Derek F. Wong"]
slug: g-idiomalign-a-gloss-pivoted-benchmark-for-cross-lingual-idi
summary_word_count: 409
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces G-IdiomAlign, a benchmark for evaluating cross-lingual idiom alignment using gloss-pivoted methods to improve translation accuracy."
---

**Problem**  
The paper addresses the challenge of cross-lingual idiom alignment, which is hindered by idioms' non-compositional nature and weak surface-form grounding. Existing literature lacks a systematic approach to evaluate idiom translation across languages, particularly for low-resource languages. This work presents G-IdiomAlign, a gloss-pivoted benchmark that provides a structured framework for reproducible evaluation of idiom alignment, filling a significant gap in the literature. The authors note that this is a preprint and has not undergone peer review.

**Method**  
G-IdiomAlign introduces a benchmark that anchors idioms with English glosses sourced from Wiktionary. The benchmark supports two evaluation protocols: (1) a Multiple-Choice Idiom Equivalence task with typed distractors designed for error attribution, and (2) a Gloss-Contrastive Generation task that contrasts inputs with and without glosses to isolate the impact of semantic pivots. The authors utilize diverse large language models (LLMs) for evaluation, focusing on the performance differences between glossed and non-glossed inputs. The study employs an embedding-based semantic proxy to assess the effectiveness of glosses in improving generation quality. The analysis of Qwen3-8B reveals that variations in performance are more pronounced in attention heads than in layers, suggesting a nuanced understanding of model behavior.

**Results**  
The results indicate that the introduction of glosses significantly enhances performance in the Gloss-Contrastive Generation task. Specifically, models that utilized glosses demonstrated improved generation quality compared to those that did not, although overall performance remained modest, indicating substantial room for improvement. The authors report that the bias towards literal translation is a prevalent failure mode, particularly when translating to low-resource languages. The findings suggest that better generation outcomes correlate with stronger gloss anchoring, highlighting the importance of semantic context in idiom translation.

**Limitations**  
The authors acknowledge that while glosses improve performance, the overall results are still modest, indicating that further advancements are necessary. They also note that the benchmark may not cover all idiomatic expressions across languages, potentially limiting its applicability. Additionally, the focus on LLMs may overlook other promising approaches in idiom translation. The study's reliance on a specific set of models may also introduce biases in the evaluation.

**Why it matters**  
G-IdiomAlign provides a foundational framework for future research in cross-lingual idiom alignment, offering a structured approach to evaluate and improve idiom translation methodologies. The insights gained from this benchmark can inform the development of more sophisticated models that better handle idiomatic expressions, particularly in low-resource languages. This work is crucial for advancing natural language processing applications in multilingual contexts, as published in [arXiv cs.CL](https://arxiv.org/abs/2606.18989v1).
