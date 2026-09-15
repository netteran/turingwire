---
title: "What Do Deepfake Speech Detectors Actually Hear?"
date: 2026-06-09 14:21:45 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.10912v1"
arxiv_id: "2606.10912"
authors: ["Vojt\u011bch Stan\u011bk", "Veronika Jirmusov\u00e1", "Anton Firc", "Kamil Malinka", "Jakub Re\u0161", "Martin Pere\u0161\u00edni"]
slug: what-do-deepfake-speech-detectors-actually-hear
summary_word_count: 412
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces an explainability framework for deepfake speech detectors, revealing the cues driving their decision-making processes."
---

**Problem**  
Deepfake speech detection has advanced significantly, yet existing models typically provide a single score without elucidating the underlying decision-making process. This lack of interpretability hampers trust and understanding of model behavior, particularly in critical applications. The authors address this gap by proposing an audio-native explainability pipeline that utilizes Integrated Gradients to localize decision evidence over time. This work is a preprint and has not undergone peer review.

**Method**  
The authors develop an explainability framework that leverages Integrated Gradients applied to time-aligned self-supervised representations from WavLM-based detectors. The pipeline is designed to identify and visualize the temporal regions of audio that contribute most significantly to the model's predictions. The study evaluates three specific detectors: AASIST, CA-MHFA, and SLS, all of which are trained on the ASVspoof 5 dataset. The authors manually annotate the regions of highest attribution to provide semantic insights into the cues that influence each detector's decisions. The methodology includes causal masking of identified cues to validate the significance of the detected features.

**Results**  
The proposed explainability framework reveals that while the three detectors achieve comparable performance metrics, they rely on distinct cues for their predictions. AASIST predominantly emphasizes non-speech and environmental cues, CA-MHFA focuses on localized phoneme artifacts, and SLS prioritizes word boundaries and spectral integrity. The authors demonstrate that causal masking of these primary cues leads to observable performance degradation, thereby reinforcing the semantic interpretations of the detected features. Specific performance metrics are not disclosed in the abstract, but the comparative analysis highlights the nuanced differences in cue reliance among the detectors.

**Limitations**  
The authors acknowledge that their approach is limited by the reliance on the ASVspoof 5 dataset, which may not encompass the full diversity of deepfake speech scenarios. Additionally, the manual annotation process for cue interpretation may introduce subjectivity. The paper does not address potential scalability issues of the explainability framework when applied to larger datasets or different model architectures.

**Why it matters**  
This work significantly contributes to the field of explainable AI in the context of deepfake detection, providing a structured approach to understanding model behavior. By elucidating the specific cues that influence decision-making, the authors enhance the interpretability of deepfake speech detectors, which is crucial for their deployment in real-world applications. The findings encourage further exploration of explainability techniques in audio processing and could inform the development of more robust detection systems. This research is relevant for ongoing discussions in the community about the importance of transparency in AI systems, as published in [arXiv](https://arxiv.org/abs/2606.10912v1).
