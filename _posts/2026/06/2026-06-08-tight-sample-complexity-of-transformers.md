---
title: "Tight Sample Complexity of Transformers"
date: 2026-06-08 16:56:24 +0000
category: research
subcategory: theory
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.09731v1"
arxiv_id: "2606.09731"
authors: ["Chenxiao Yang", "Nathan Srebro", "Zhiyuan Li"]
slug: tight-sample-complexity-of-transformers
summary_word_count: 389
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper establishes tight bounds on the VC dimension and sample complexity of Transformers, enhancing understanding of their learning capabilities."
---

**Problem**  
This work addresses the gap in understanding the sample complexity and VC dimension of depth-$L$ Transformers, particularly in the context of chain-of-thought learning. Prior literature lacked precise characterizations of these metrics, which are crucial for evaluating the learning efficiency of Transformers. The authors present their findings as a preprint, indicating that the work is unreviewed and may be subject to further validation.

**Method**  
The authors derive upper and lower bounds for the VC dimension of depth-$L$ Transformers with $W$ parameters, mapping input sequences of length $T$ to a single output. They establish an upper bound of $O(L W \log (T W))$ and a lower bound of $Ω(L W \log (T W / L))$. Additionally, they analyze the sample complexity of chain-of-thought learning, specifically under a teacher forcing paradigm. The sample complexity for this approach is characterized as $O\left(L W \log \left(\left(T+T^{\prime}\right) W\right)\right)$, where $T^{\prime}$ denotes the number of autoregressive steps. The authors also provide a lower bound of $Ω\left(L W \log \left(\left(T+T^{\prime}\right) W / L\right)\right)$ for any learning rule utilizing chain-of-thought data.

**Results**  
The findings indicate that the VC dimension of depth-$L$ Transformers scales logarithmically with the input length and the number of parameters, providing a more nuanced understanding of their capacity. The established upper and lower bounds are nearly tight, suggesting that the theoretical limits of Transformer models are well-defined. The sample complexity results imply that teacher forcing can significantly reduce the number of examples needed for effective learning, but still requires a substantial amount of data, particularly as the input length and autoregressive steps increase.

**Limitations**  
The authors acknowledge that their results are contingent on the assumptions made regarding the architecture and the nature of the input data. They do not explore the implications of varying the depth or width of the Transformers beyond the established bounds. Additionally, the practical applicability of these theoretical results in real-world scenarios remains to be validated, as the study is primarily theoretical.

**Why it matters**  
This work has significant implications for the design and training of Transformer models, particularly in applications requiring chain-of-thought reasoning. By providing a clearer understanding of the sample complexity and VC dimension, it informs researchers about the data requirements and potential limitations of Transformers in various tasks. This foundational knowledge can guide future research in optimizing Transformer architectures and training methodologies, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.09731v1).
