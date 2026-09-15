---
title: "Ternary Mamba: Grouped Quantization-Aware Training of W1.58A16 State Space Models"
date: 2026-06-16 16:18:21 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18114v1"
arxiv_id: "2606.18114"
authors: ["Ramprasath Ganesaraja", "Sahil Dilip Panse", "Swathika N"]
slug: ternary-mamba-grouped-quantization-aware-training-of-w1-58a1
summary_word_count: 401
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces a novel approach to quantization-aware training of State Space Models, significantly reducing training data requirements and model size."
---

**Problem**  
This work addresses the limitations of deploying State Space Models (SSMs) like Mamba-2 on edge devices due to their substantial memory requirements. Prior research, specifically Slender-Mamba, necessitated training from scratch on an extensive dataset of 150 billion tokens, which is impractical for many applications. The authors propose a more efficient method that leverages a pretrained checkpoint, thereby reducing the marginal token budget by a factor of 1,000. This paper is a preprint and has not undergone peer review.

**Method**  
The authors introduce a grouped quantization-aware training (QAT) framework that utilizes knowledge distillation from a frozen FP16 teacher model. The focus is on compressing the Mamba-2 model, which has 1.3 billion parameters, achieving a compression ratio of 3.61x, reducing the model size from 2,687 MB to 744 MB. The training process is conducted using only 102 million tokens and requires approximately 4 GPU-hours on a single H100 GPU. A significant contribution of this work is the identification of "zero-ratio collapse," an instability that arises during QAT due to learnable quantization scales, which is not present in traditional from-scratch training. The authors also note that conventional post-hoc correction strategies for Transformers are ineffective for SSMs due to error propagation through recurrent structures.

**Results**  
The proposed method achieves a zero-shot accuracy of 48.1% across seven tasks, which is competitive with the Bi-Mamba model's accuracy of 48.4%, falling within a confidence interval of +/-0.9 percentage points. This performance is notable given the reduced training data and compute resources, demonstrating the effectiveness of the QAT-from-pretrained approach.

**Limitations**  
The authors acknowledge that the zero-ratio collapse presents a new challenge in the training of SSMs, which may require further investigation to mitigate its effects. Additionally, the reliance on a frozen teacher model may limit the adaptability of the approach to different tasks or domains. The paper does not explore the long-term stability of the quantized models in production environments or their performance on more diverse datasets beyond the seven tasks evaluated.

**Why it matters**  
This research has significant implications for the deployment of SSMs in resource-constrained environments, as it demonstrates that effective quantization can be achieved without the need for extensive training from scratch. The findings suggest that pretrained models can be leveraged for efficient fine-tuning, which could accelerate the adoption of SSMs in edge applications. This work contributes to the growing body of literature on model compression and efficiency in deep learning, as published in [arXiv](https://arxiv.org/abs/2606.18114v1).
