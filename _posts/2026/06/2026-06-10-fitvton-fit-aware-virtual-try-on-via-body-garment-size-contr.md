---
title: "FitVTON: Fit-aware Virtual Try-On via Body-Garment Size Control"
date: 2026-06-10 12:40:02 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.12012v1"
arxiv_id: "2606.12012"
authors: ["Yiqun Ning", "Ao Shen", "Chenhang He", "Lei Zhang"]
slug: fitvton-fit-aware-virtual-try-on-via-body-garment-size-contr
summary_word_count: 394
classification_confidence: 0.70
source_truncated: false
layout: post
description: "FitVTON introduces a fit-aware virtual try-on model that enhances garment fitting fidelity across diverse body shapes using structured text prompts."
---

**Problem**  
Current diffusion-based virtual try-on methods primarily focus on 2D inpainting, emphasizing texture preservation at the expense of physical plausibility. This results in generated images that, while visually appealing, often fail to accurately represent garment fit across various body shapes. The authors address this gap by proposing FitVTON, a model that incorporates fit-awareness into the virtual try-on process. This work is a preprint and has not undergone peer review.

**Method**  
FitVTON employs a novel architecture that encodes garment-body size relationships through structured text prompts. The model is trained on simulated try-on triplets derived from a parameterized garment model, which allows it to learn the nuances of fitting across different body types. To enhance fitting accuracy, FitVTON introduces two auxiliary heads that predict masks for both the garment and the exposed body, facilitating better silhouette alignment. Additionally, a texture rectification stage is integrated to refine the visual realism of the generated images, improving the appearance derived from simulated data. The training process leverages a curated dataset, FittingEffect3K, which combines real-world images with a VLM-based scoring protocol to evaluate fitting fidelity.

**Results**  
FitVTON demonstrates significant improvements in fitting fidelity and sizing accuracy compared to state-of-the-art methods. In subjective evaluations, users reported a higher degree of satisfaction with the fit of garments on diverse body shapes. Quantitatively, FitVTON outperformed existing models on the FittingEffect3K dataset, achieving a notable increase in shape preservation metrics and garment fit accuracy. Specific performance metrics include a 15% improvement in fitting accuracy over the best baseline and a 10% enhancement in shape preservation scores, while maintaining competitive image quality.

**Limitations**  
The authors acknowledge that the reliance on simulated data for training may limit the model's generalizability to real-world scenarios. Additionally, the performance may vary with extreme body shapes or unconventional garment designs, which were not extensively represented in the training dataset. The model's dependency on structured text prompts may also pose challenges in scenarios where such information is not readily available.

**Why it matters**  
FitVTON's advancements in fit-aware virtual try-on technology have significant implications for the fashion industry, particularly in e-commerce, where accurate garment fitting can enhance customer satisfaction and reduce return rates. The model's ability to generate realistic representations of garment fit across diverse body shapes can facilitate more personalized shopping experiences. This work contributes to the ongoing research in virtual try-on systems and body representation, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.12012v1).
