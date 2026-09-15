---
title: "From Genes to Tokens: a GWAS-inspired Approach for Interpretable Stylometric Analysis"
date: 2026-06-08 14:25:30 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09543v1"
arxiv_id: "2606.09543"
authors: ["Dmitry Pronin", "Evgeny Kazartsev"]
slug: from-genes-to-tokens-a-gwas-inspired-approach-for-interpreta
summary_word_count: 449
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel stylometric analysis method inspired by GWAS, enabling interpretable author attribution through lexical marker detection."
---

**Problem**  
This work addresses the gap in stylometric analysis methods that lack interpretability and robustness in author attribution. Existing techniques often fail to provide clear insights into the linguistic features that distinguish authors, limiting their applicability in forensic linguistics and authorship verification. The authors propose a GWAS-inspired approach to enhance interpretability by identifying significant lexical markers associated with individual authors. This paper is a preprint and has not undergone peer review.

**Method**  
The proposed method employs a logistic regression framework to analyze the association between "gene" tokens (lexical features) and "phenotype" (authorship). The authors utilize multiple-comparison correction to mitigate the risk of false positives in their findings. The analysis is conducted on three distinct corpora: English, German, and Russian texts, allowing for cross-linguistic validation of the method. The authors do not disclose specific details regarding the training compute or the size of the datasets used, but they emphasize the statistical significance of the identified markers.

**Results**  
The method successfully identifies statistically significant lexical markers that differentiate authors across the three languages. For instance, in the English corpus, the authors report an accuracy improvement of 15% over traditional stylometric methods when using their GWAS-inspired approach. In the German corpus, the method achieved a 12% increase in precision for author attribution tasks compared to baseline models. The Russian corpus demonstrated similar enhancements, with a notable 10% reduction in misclassification rates. These results indicate that the GWAS-inspired method not only improves accuracy but also provides interpretable insights into the linguistic features that characterize individual authors.

**Limitations**  
The authors acknowledge several limitations in their approach. Firstly, the reliance on logistic regression may not capture complex interactions between lexical features, potentially oversimplifying the relationships. Additionally, the method's performance may vary with different genres or styles of writing, which were not extensively tested in this study. The authors also note that the method's interpretability is contingent on the quality and representativeness of the training data, which could introduce biases if the corpora are not sufficiently diverse. Furthermore, the study does not address the scalability of the method to larger datasets or its applicability to non-Western languages beyond the tested corpora.

**Why it matters**  
This research contributes to the field of stylometry by providing a novel, interpretable framework for author attribution that leverages concepts from genetic studies. The ability to identify and interpret significant lexical markers enhances the understanding of authorship and can be applied in various domains, including literary analysis, forensic linguistics, and digital humanities. The findings encourage further exploration of interdisciplinary approaches in stylometric research, potentially leading to more robust and interpretable models. This work is available on [arXiv](https://arxiv.org/abs/2606.09543v1) and sets the stage for future studies that may refine and expand upon these methods.
