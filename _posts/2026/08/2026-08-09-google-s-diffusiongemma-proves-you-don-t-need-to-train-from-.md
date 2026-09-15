---
title: "Google's DiffusionGemma proves you don't need to train from scratch to build a text diffusion model"
date: 2026-08-09 10:01:26 +0000
category: research
subcategory: training_methods
company: "Google DeepMind"
secondary_companies: ["Google"]
impact: notable
source_publisher: "The Decoder"
source_url: "https://the-decoder.com/googles-diffusiongemma-proves-you-dont-need-to-train-from-scratch-to-build-a-text-diffusion-model/"
arxiv_id: ""
authors: []
slug: google-s-diffusiongemma-proves-you-don-t-need-to-train-from-
summary_word_count: 166
classification_confidence: 0.80
source_truncated: false
layout: post
quality: high
description: "Google DeepMind's DiffusionGemma demonstrates efficient text diffusion model adaptation, achieving high throughput with reduced training costs."
---

Google DeepMind has introduced DiffusionGemma, a novel approach that retrofits the existing Gemma 4 model into a diffusion framework. This method allows for the generation of text without the need to train a new model from scratch, utilizing less than 10% of the original training budget. The adaptation leverages the strengths of the Gemma 4 architecture while significantly reducing resource expenditure.

DiffusionGemma is capable of generating 256 tokens in parallel, achieving an impressive throughput of approximately 1,500 tokens per second. However, despite these advancements in efficiency and speed, the quality of the generated text still lags behind that of the original autoregressive model, particularly in reasoning tasks. This indicates that while the diffusion model offers practical benefits, there are trade-offs in performance that need to be considered. The findings highlight the potential for cost-effective model adaptation in the field of natural language processing, paving the way for future research in efficient model training and deployment. For further details, refer to the original article on [The Decoder](https://the-decoder.com/googles-diffusiongemma-proves-you-dont-need-to-train-from-scratch-to-build-a-text-diffusion-model/).
