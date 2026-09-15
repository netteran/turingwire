---
title: "Automated reproducibility assessments in the social and behavioral sciences using large language models"
date: 2026-06-11 17:58:36 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.13670v1"
arxiv_id: "2606.13670"
authors: ["Tobias Holtdirk", "Pietro Marcolongo", "Anna Steinberg Schulten", "Felix Henninger", "Stefan Rose", "Sarah Ball"]
slug: automated-reproducibility-assessments-in-the-social-and-beha
summary_word_count: 384
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper demonstrates the use of large language models to automate reproducibility assessments in social and behavioral sciences, outperforming human reanalysts."
---

**Problem**  
Reproducibility in the social and behavioral sciences is traditionally assessed through independent reanalysis of original data, a process that is resource-intensive and difficult to scale. This paper addresses the gap in automated methods for reproducibility assessments, leveraging large language models (LLMs) to streamline this process. The work is presented as a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors developed a pipeline utilizing LLMs to automate the analysis of N=76 published studies with predefined claims from the behavioral and social sciences. The LLM was tasked with generating effect size estimates and qualitative conclusions based on the original findings. The evaluation involved comparing the LLM's outputs against both the original results and those obtained through human reanalysis. The LLM's performance was quantified using Cohen's d, with a tolerance of +/-0.05 for effect size recovery. The training compute and specific architecture details of the LLM were not disclosed in the paper.

**Results**  
The LLM successfully recovered the original effect sizes in 41% of the studies analyzed, significantly outperforming human reanalysts, who achieved a recovery rate of 34%. In terms of qualitative conclusions, the LLM matched the original study conclusions in 96% of cases, while human reanalysts reached the same conclusions in only 74% of cases. These results indicate that LLMs can effectively automate the reproducibility assessment process, providing a scalable alternative to traditional methods.

**Limitations**  
The authors note that for 7 studies, the LLM was unable to produce a viable effect size estimate, highlighting a limitation in its applicability. Additionally, the study's reliance on a specific set of published studies may limit the generalizability of the findings. The paper does not address potential biases in the LLM's training data or the implications of using LLMs in contexts where nuanced understanding of social and behavioral phenomena is critical.

**Why it matters**  
This research has significant implications for the field of social and behavioral sciences, as it suggests that LLMs can serve as a scalable tool for reproducibility assessments, potentially enhancing the integrity of empirical research. The findings provide a foundation for systematic auditing of empirical results, which is crucial for advancing scientific rigor. As published in [arXiv](https://arxiv.org/abs/2606.13670v1), this work opens avenues for further exploration of LLM applications in research validation and the broader implications for automated analysis in various scientific domains.
