---
title: "Bridging the Modality Gap in Forensic Image Retrieval"
date: 2026-06-10 16:32:30 +0000
category: research
subcategory: multimodal
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.12294v1"
arxiv_id: "2606.12294"
authors: ["Ricardo Gonz\u00e1lez-Gazapo", "Annette Morales-Gonz\u00e1lez", "Yoanna Mart\u00ednez-D\u00edaz", "Heydi M\u00e9ndez-V\u00e1zquez", "Milton Garc\u00eda-Borroto"]
slug: bridging-the-modality-gap-in-forensic-image-retrieval
summary_word_count: 425
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a unified multimodal retrieval framework for forensic image analysis, enhancing retrieval tasks involving tattoos and facial sketches."
---

**Problem**  
This study addresses the gap in forensic image retrieval systems that effectively integrate multimodal data sources, particularly in real-world scenarios. Prior research has primarily focused on optimizing multimodal retrieval systems without thoroughly evaluating their applicability in forensic contexts. The authors highlight the need for a comprehensive framework that can handle diverse input modalities, such as images, textual descriptions, and sketches, which are common in forensic investigations. This work is a preprint and has not undergone peer review.

**Method**  
The authors propose a unified retrieval framework tailored to four forensic tasks: (1) tattoo image retrieval from a tattoo query image, (2) tattoo retrieval using human-expert textual descriptions, (3) tattoo retrieval from hand-drawn sketches, and (4) face retrieval from forensic sketches. The system employs a multimodal large language model (MLLM) to generate structured textual descriptions for both queries and gallery images. For the retrieval process, the authors utilize sentence-transformer embeddings for text-based comparisons. They evaluate three approaches: visual-only embeddings, text-only embeddings, and a multimodal fusion strategy that combines similarity scores from both text and image modalities. The visual feature extractors used are state-of-the-art, ensuring robust performance across the tasks.

**Results**  
The proposed multimodal retrieval framework demonstrates significant improvements in retrieval precision and robustness compared to baseline methods. Specifically, the fusion strategy outperforms both visual-only and text-only approaches, particularly in challenging scenarios with limited or noisy visual information, such as sketches and fragmented witness statements. While specific numerical results are not disclosed in the abstract, the authors emphasize that the multimodal approach consistently enhances retrieval outcomes across all tasks, indicating a strong potential for practical application in forensic workflows.

**Limitations**  
The authors acknowledge that their framework's performance may vary depending on the quality of the input data, particularly in cases where visual information is severely degraded. Additionally, the reliance on a large language model may introduce biases based on the training data used, which could affect the generalizability of the results. The study does not address the computational costs associated with deploying the MLLM in real-time forensic applications, which could be a barrier to practical implementation.

**Why it matters**  
This work underscores the potential of multimodal retrieval systems in enhancing forensic analysis, particularly in tasks that traditionally depend on manual expert evaluation. By operationalizing complex retrieval tasks through automated means, the framework can significantly streamline investigative workflows involving tattoos, facial composites, and witness descriptions. The findings contribute to the growing body of literature on multimodal systems in computer vision and forensic science, suggesting avenues for future research and development in this domain, as published in [arXiv cs.CV](https://arxiv.org/abs/2606.12294v1).
