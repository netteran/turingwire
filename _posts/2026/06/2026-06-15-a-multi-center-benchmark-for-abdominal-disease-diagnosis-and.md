---
title: "A Multi-Center Benchmark for Abdominal Disease Diagnosis and Report Generation from Non-Contrast CT"
date: 2026-06-15 17:29:32 +0000
category: research
subcategory: evaluation_benchmarks
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.16991v1"
arxiv_id: "2606.16991"
authors: ["Mariam Elbakry", "Aliaa Sayed Sheha", "Salma Hassan Tantawy", "Aya Yassin", "Concetto Spampinato", "Karim Lekadir"]
slug: a-multi-center-benchmark-for-abdominal-disease-diagnosis-and
summary_word_count: 435
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a multi-center benchmark for diagnosing abdominal diseases and generating reports from non-contrast CT, addressing safety and efficiency."
---

**Problem**  
The paper addresses the limitations of multiphasic contrast-enhanced CT (CECT) in abdominal imaging, which poses risks such as contrast-induced nephropathy and increases the workload for radiologists. Despite the widespread use of CECT for lesion characterization, there is a lack of effective methodologies that leverage single-phase non-contrast CT (NCCT) for similar diagnostic purposes. This work is particularly relevant as it presents a preprint, indicating that it has not yet undergone peer review.

**Method**  
The authors introduce a novel multi-center benchmark that utilizes a large-scale dataset comprising paired NCCT and CECT studies, along with their corresponding radiology reports, sourced from two medical centers. The dataset is divided into internal training sets and an external validation cohort. Five contemporary deep learning architectures were evaluated, including models tailored for chest imaging, abdomen-specific models, and general-purpose multimodal networks. The evaluation protocol is unified across these architectures, allowing for a direct comparison of their performance in synthesizing contrast-enhanced findings from NCCT. The models were trained using standard classification loss functions, although specific details regarding the training compute resources were not disclosed.

**Results**  
The study reports that NCCT retains significant diagnostic signals, achieving an average area under the curve (AUC) of 69.1% on the internal cohort and 63.1% on the external validation cohort. These results were benchmarked against the five architectures, demonstrating that NCCT can serve as a viable alternative to CECT for multi-organ disease diagnosis. The performance metrics indicate that while NCCT is less effective than CECT, it still provides a meaningful diagnostic capability, which could lead to safer imaging practices.

**Limitations**  
The authors acknowledge several limitations, including the potential for selection bias in the dataset due to its multi-center nature and the reliance on the quality of NCCT images. They also note that the performance may vary across different populations and imaging protocols. Additionally, the study does not explore the generalizability of the models to other imaging modalities or disease types beyond those included in the dataset. The lack of peer review at this stage may also imply that the findings should be interpreted with caution.

**Why it matters**  
This research has significant implications for the future of abdominal imaging, particularly in promoting safer and more efficient diagnostic workflows that do not rely on contrast agents. By releasing the dataset and benchmark publicly, the authors aim to stimulate further research in this area, potentially leading to advancements in automated radiology report generation and improved patient safety. This work contributes to the growing body of literature advocating for the use of NCCT in clinical practice, as highlighted in similar studies on imaging efficiency and safety, as published in [arXiv cs.LG](https://arxiv.org/abs/2606.16991v1).
