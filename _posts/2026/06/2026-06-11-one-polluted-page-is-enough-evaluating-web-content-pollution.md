---
title: "One Polluted Page Is Enough: Evaluating Web Content Pollution in Generative Recommenders"
date: 2026-06-11 17:24:14 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13610v1"
arxiv_id: "2606.13610"
authors: ["Minghao Luo", "Liang Chen"]
slug: one-polluted-page-is-enough-evaluating-web-content-pollution
summary_word_count: 460
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces FORGE, a benchmark to evaluate the susceptibility of generative recommenders to web content pollution, revealing significant vulnerabilities."
---

**Problem**  
This work addresses the emerging risk of generative recommenders inadvertently promoting fake products due to polluted web content retrieved during the recommendation process. As search-augmented large language models (LLMs) increasingly mediate consumer recommendations, the authors highlight a gap in understanding how these models interact with misleading content, particularly in the context of fake reviews and promotional pages. The study is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors propose FORGE (Fake Online Recommendations in Generative Environments), a benchmark designed to evaluate the extent to which generative recommenders are influenced by polluted web content. FORGE operates by locally rewriting legitimate products in retrieved web pages into fake counterparts, simulating the effects of web-content pollution. The benchmark encompasses 225 real-world products across 15 categories and 5 consumer scenarios. The evaluation involves 12 different LLMs, both commercial and open-source, to assess their susceptibility to recommending fake products based on polluted search results. The study measures the "fooled rate," defined as the frequency with which the models recommend the fake products, under varying conditions of pollution.

**Results**  
The findings reveal that all evaluated models exhibit significant vulnerability to web content pollution. A single polluted page can lead to fooled rates of up to 27%, while replacing the top three search results with polluted content escalates this rate to 73.8%. The vulnerability is not uniform; it varies across product categories and is exacerbated when models lack stable prior knowledge of the relevant products. Notably, the authors observe that reasoning capabilities do not alleviate this vulnerability; instead, they often result in the generation of spurious social proof to support incorrect recommendations. 

**Limitations**  
The authors acknowledge several limitations in their study. First, the benchmark relies on the assumption that the rewritten content accurately reflects the nature of polluted web pages, which may not encompass all forms of misinformation. Additionally, the evaluation of defenses, such as skepticism prompting and consensus filtering, reveals that skepticism can inadvertently increase vulnerability, while filtering may suppress legitimate product recommendations. The study does not explore the long-term implications of repeated exposure to polluted content on model performance or user trust.

**Why it matters**  
The implications of this research are significant for the development of robust generative recommenders and the broader field of AI ethics. Understanding the susceptibility of LLMs to web content pollution is crucial for designing systems that can mitigate the risks of misinformation and enhance consumer trust. The findings underscore the need for improved filtering mechanisms and the careful consideration of model training data to reduce the impact of misleading content. This work contributes to the ongoing discourse on the reliability of AI systems in real-world applications, as discussed in related literature on AI safety and misinformation, and is available on [arXiv](https://arxiv.org/abs/2606.13610v1).
