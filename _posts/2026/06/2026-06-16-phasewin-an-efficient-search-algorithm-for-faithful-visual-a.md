---
title: "PhaseWin: An Efficient Search Algorithm for Faithful Visual Attribution"
date: 2026-06-16 14:53:30 +0000
category: research
subcategory: interpretability
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.18008v1"
arxiv_id: "2606.18008"
authors: ["Zihan Gu", "Ruoyu Chen", "Junchi Zhang", "Li Liu", "Xiaochun Cao", "Hua Zhang"]
slug: phasewin-an-efficient-search-algorithm-for-faithful-visual-a
summary_word_count: 391
classification_confidence: 0.80
source_truncated: false
layout: post
description: "PhaseWin introduces a novel efficient search algorithm for faithful visual attribution, reducing computational complexity while maintaining high accuracy."
---

**Problem**  
This paper addresses the inefficiencies in existing visual attribution methods, particularly the exponential cost of exhaustive search and the quadratic evaluations required by greedy search approaches. The authors highlight the need for a more efficient algorithm that can provide faithful attributions in a computationally feasible manner. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The core contribution of this research is the PhaseWin algorithm, which reformulates the greedy selection process into a phased window-search procedure. This method consists of three main components: global candidate screening, adaptive pruning, and localized window refinement. By alternating these phases, PhaseWin avoids the need to rescore all remaining candidates at each selection step, thus significantly reducing the number of model evaluations. The authors analyze PhaseWin under monotone evidence-accumulation conditions and establish that it achieves linear evaluation complexity, specifically reducing the complexity from \(O(n^2)\) to \(O(n)\) while maintaining near-greedy faithfulness guarantees. The algorithm's performance is validated across various tasks, including image classification, object detection, visual grounding, and image captioning.

**Results**  
PhaseWin demonstrates superior performance in terms of faithfulness and computational efficiency compared to existing attribution methods. In extensive experiments, it achieves high faithfulness with the fewest forward passes, confirming the theoretical predictions of its linear complexity. While specific numerical results are not detailed in the abstract, the authors indicate that PhaseWin outperforms all compared methods across the mentioned benchmarks, suggesting a significant improvement in both speed and accuracy.

**Limitations**  
The authors acknowledge that while PhaseWin offers substantial improvements in efficiency, its performance is contingent on the structural assumptions made regarding feature-level evidence accumulation. Additionally, the paper does not address potential limitations related to the generalizability of the algorithm across different model architectures or datasets beyond those tested. The reliance on specific conditions for optimal performance may also restrict its applicability in more complex scenarios.

**Why it matters**  
The development of PhaseWin has significant implications for the field of interpretable machine learning, particularly in enhancing the efficiency of visual attribution methods. By providing a scalable solution that maintains high faithfulness, this work paves the way for more practical applications of visual attribution in real-world scenarios, such as model auditing and decision-making transparency. The findings contribute to the ongoing discourse on improving interpretability in AI systems, as discussed in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.18008v1).
