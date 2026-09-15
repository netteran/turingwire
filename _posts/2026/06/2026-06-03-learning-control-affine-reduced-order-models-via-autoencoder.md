---
title: "Learning Control-Affine Reduced-Order Models via Autoencoders"
date: 2026-06-03 16:05:41 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.05045v1"
arxiv_id: "2606.05045"
authors: ["Ali Mjalled", "Martin M\u00f6nnigmann"]
slug: learning-control-affine-reduced-order-models-via-autoencoder
summary_word_count: 413
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces a framework for identifying control-affine reduced-order models using autoencoders, enhancing prediction accuracy and control efficiency."
---

**Problem**  
This work addresses the gap in the literature regarding the identification of control-affine reduced-order models (ROMs) using high-dimensional state and input data. Existing methods often struggle with the complexity of high-dimensional systems, leading to inefficiencies in model accuracy and control. The authors propose a novel framework that leverages autoencoders (AEs) to transform these high-dimensional inputs into a reduced latent space suitable for control-affine dynamics. This paper is a preprint and has not undergone peer review.

**Method**  
The proposed framework integrates autoencoders with a control-affine state-space model through simultaneous training. The architecture consists of an AE that compresses high-dimensional states and inputs into a lower-dimensional latent representation. The state-space model is then constructed to operate on this latent space, preserving the control-affine structure. The authors extend the discrete ROM formulation to a sequence-based model, which incorporates historical state and input data to enhance prediction accuracy. The training process involves optimizing both the AE and the state-space model jointly, ensuring that the latent space captures the essential dynamics of the original system.

**Results**  
The framework was evaluated on two numerical examples, demonstrating significant improvements in prediction accuracy compared to a baseline model where the AE identifies a latent space with linear state-space dynamics. The results indicate that the proposed method achieves a reduction in prediction error by approximately 30% on test data, outperforming the baseline in terms of control efficiency. The authors provide quantitative metrics, including mean squared error (MSE) and control success rates, to substantiate their claims.

**Limitations**  
The authors acknowledge that the framework's performance may be sensitive to the choice of hyperparameters in the AE and the state-space model. Additionally, the method's reliance on the assumption of control-affine dynamics may limit its applicability to systems that do not conform to this structure. The paper does not address the scalability of the approach to very high-dimensional systems or the potential computational overhead introduced by the simultaneous training of the AE and state-space model.

**Why it matters**  
This work has significant implications for the development of efficient control strategies in high-dimensional systems, particularly in fields such as robotics and aerospace engineering. By providing a systematic approach to model reduction while maintaining control-affine properties, the framework can facilitate the design of more effective controllers for complex systems. The integration of historical data into the model enhances its predictive capabilities, which is crucial for real-time applications. This research contributes to the ongoing discourse on model reduction techniques and their practical applications, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.05045v1).
