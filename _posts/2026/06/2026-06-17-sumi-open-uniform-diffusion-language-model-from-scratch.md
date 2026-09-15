---
title: "Sumi: Open Uniform Diffusion Language Model from Scratch"
date: 2026-06-17 12:32:46 +0000
category: research
subcategory: foundation_models
company: "null"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.19005v1"
arxiv_id: "2606.19005"
authors: ["Mengyu Ye", "Keito Kudo", "Wataru Ikeda", "Ryosuke Matsuda", "Keisuke Sakaguchi", "Jun Suzuki"]
slug: sumi-open-uniform-diffusion-language-model-from-scratch
summary_word_count: 407
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces Sumi, a 7B parameter uniform diffusion language model pretrained from scratch on 1.5T tokens, providing a reference for future research."
---

**Problem**  
This work addresses the lack of large-scale pretrained uniform diffusion language models (UDLMs) in the literature, which hampers the understanding of their scaling behavior and generation dynamics. Prior to this study, existing UDLMs were not pretrained from scratch at a significant parameter scale or token budget, limiting their applicability and comparability to autoregressive and masked diffusion models. This paper is a preprint and has not undergone peer review.

**Method**  
The authors present Sumi, a 7 billion parameter UDLM pretrained from scratch on a dataset comprising 1.5 trillion tokens. The architecture leverages a uniform diffusion process, allowing for the simultaneous update of any token at any step, which is a departure from traditional autoregressive models. The training involved a diverse data mixture sourced from publicly available corpora, although the specific datasets and their proportions are detailed in the supplementary materials. The training recipe, including hyperparameters and optimization strategies, is fully disclosed to facilitate reproducibility. The model was trained using substantial computational resources, although exact compute details are not specified.

**Results**  
Sumi demonstrates competitive performance against autoregressive models on various benchmarks, particularly in knowledge, reasoning, and coding tasks. For instance, it achieves performance metrics comparable to those of established autoregressive models trained on similar token budgets. However, it underperforms on commonsense reasoning benchmarks, which the authors attribute to the education-heavy nature of the training data. The paper provides quantitative results, including specific scores on benchmarks, but does not disclose exact effect sizes or statistical significance.

**Limitations**  
The authors acknowledge that Sumi's performance on commonsense benchmarks is suboptimal, likely due to the data mixture's focus on educational content. They also note that the model's performance may vary significantly across different tasks, indicating that further investigation into the model's capabilities and limitations is necessary. Additionally, the lack of peer review means that the findings should be interpreted with caution until validated by the community.

**Why it matters**  
The introduction of Sumi as a large-scale UDLM provides a critical reference point for future research into uniform diffusion models, particularly in understanding their scaling properties and generation dynamics. By releasing the model weights, checkpoints, and training recipes, the authors aim to catalyze further exploration into the capabilities and trade-offs of UDLMs compared to established paradigms. This work is significant for advancing the field of language modeling, as it opens avenues for investigating the unique aspects of uniform diffusion, which remain poorly understood. For more details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.19005v1).
