---
title: "Clinically Grounded Privacy Evaluation of Medical LMs"
date: 2026-06-08 15:02:19 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: major
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.09590v1"
arxiv_id: "2606.09590"
authors: ["Sasha Ronaghi", "Sana Tonekaboni", "Lena Stempfle", "Vivian Utti", "Jordan Li Cahoon", "Nathaniel Hendrix"]
slug: clinically-grounded-privacy-evaluation-of-medical-lms
summary_word_count: 427
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents a framework for evaluating privacy risks in medical language models, focusing on realistic threat models and semantic leakage."
---

**Problem**  
The paper addresses a significant gap in the evaluation of privacy risks associated with medical language models (LMs), particularly in the context of their ability to memorize and disclose protected health information (PHI). Existing privacy assessments often emphasize the recovery of training text rather than the potential for disclosure under realistic adversarial conditions. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for rigorous scrutiny in the domain of medical data privacy.

**Method**  
The authors propose a clinically grounded framework that evaluates privacy leakage along a continuum of adversarial access scenarios. This framework categorizes potential leaks from publicly inferable demographics to sensitive note fragments. The evaluation involves measuring both verbatim memorization of patient-specific text and semantic leakage of sensitive diagnoses. The study utilizes a medical LM pretrained on a dataset comprising 378,000 clinical notes. The authors assess the model's performance in terms of memorization rates and diagnostic recovery, employing metrics such as Area Under the Receiver Operating Characteristic (AUROC) to quantify the model's ability to recover sensitive information.

**Results**  
The findings reveal that routine encounter metadata, including patient name, date of birth, provider, practice, and visit date, leads to high rates of verbatim memorization across a patient's clinical timeline. Specifically, the model demonstrates an AUROC of 0.91 for recovering abortion-related information and 0.81 for HIV-related diagnoses. However, the authors caution that exact-match memorization metrics may overstate the risk of disclosure, as 36% of memorized tokens are attributed to templated documentation practices, which do not necessarily reflect unique patient information.

**Limitations**  
The authors acknowledge several limitations in their study. First, the framework may not encompass all potential adversarial access scenarios, particularly those that could arise in real-world applications. Additionally, the reliance on a single pretrained LM may limit the generalizability of the findings across different architectures or training datasets. The authors also note that the presence of templated documentation could skew the interpretation of memorization rates, potentially leading to an overestimation of privacy risks.

**Why it matters**  
This work has significant implications for the development and deployment of medical LMs, emphasizing the necessity for robust privacy evaluations that account for realistic threat models. By providing a structured approach to assess privacy risks, the framework can guide future research and regulatory efforts in ensuring the safe use of LMs in clinical settings. The findings underscore the importance of addressing privacy concerns in the training of models on longitudinal clinical data, as highlighted in the context of ongoing discussions about data ethics and patient confidentiality, as published in [arXiv](https://arxiv.org/abs/2606.09590v1).
