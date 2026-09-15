---
title: "IDEAL: In-DEpth ALignment Makes A Discrete Representation AutoEncoder"
date: 2026-06-09 16:53:30 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.11096v1"
arxiv_id: "2606.11096"
authors: ["Yitong Chen", "Zijie Diao", "Junke Wang", "Lingyu Kong", "Yixuan Ren", "Bo He"]
slug: ideal-in-depth-alignment-makes-a-discrete-representation-aut
summary_word_count: 347
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces IDEAL, a framework that enhances discrete representation autoencoders by aligning shallow and deep visual features for improved image generation."
---

**Problem**  
This work addresses the limitations of existing representation autoencoders (RAEs) built on pretrained vision foundation models (VFMs), particularly their suboptimal reconstruction quality due to insufficient preservation of fine-grained visual details in deep VFM representations. The authors note that shallow VFM features retain richer local appearance and structural detail, which is critical for effective image generation. This paper is a preprint and has not undergone peer review.

**Method**  
The proposed IDEAL framework employs an In-depth Alignment strategy that jointly aligns quantized tokens with both shallow and deep VFM features. This dual alignment allows the discrete visual tokens to maintain high visual fidelity while also capturing rich semantic information. The architecture leverages pretrained VFMs, although specific details regarding the model architecture, loss functions, and training compute are not disclosed in the paper. The authors conduct extensive experiments to validate the effectiveness of their approach.

**Results**  
IDEAL achieves a reconstruction fidelity score of 0.61 rFID on the ImageNet dataset, surpassing the previous best method by 0.28. In the context of autoregressive image generation, IDEAL sets a new state-of-the-art with a generative fidelity score of 1.89 gFID. These results indicate a significant improvement in both reconstruction quality and generative performance compared to existing RAEs.

**Limitations**  
The authors acknowledge that while IDEAL improves upon previous methods, it may still be limited by the inherent constraints of the underlying VFM architectures. Additionally, the paper does not discuss the computational efficiency or scalability of the proposed method, which could be critical for practical applications. The reliance on pretrained models may also limit the generalizability of the approach to different domains or tasks.

**Why it matters**  
The IDEAL framework represents a significant advancement in the field of discrete representation autoencoding, particularly for image generation tasks. By effectively leveraging both shallow and deep features, it opens new avenues for improving the quality of generated images and could influence future research on multimodal representation learning. This work is particularly relevant for researchers focusing on generative models and representation learning, as it highlights the importance of feature alignment in enhancing model performance, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.11096v1).
