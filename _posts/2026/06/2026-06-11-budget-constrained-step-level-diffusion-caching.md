---
title: "Budget-Constrained Step-Level Diffusion Caching"
date: 2026-06-11 15:45:05 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.13496v1"
arxiv_id: "2606.13496"
authors: ["Mingkun Lei", "Tong Zhao", "Liangyu Yuan", "Chi Zhang"]
slug: budget-constrained-step-level-diffusion-caching
summary_word_count: 396
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper introduces BudCache, a novel caching strategy for diffusion models that optimizes output quality under fixed compute budgets."
---

**Problem**  
Existing step-level caching methods for diffusion models rely on heuristic threshold-based decisions for per-step caching, which do not optimize for final output quality. This leads to variable inference latency across different inputs, complicating deployment. The authors address this gap by proposing a budget-constrained approach that directly optimizes cache policies for output quality, a topic that remains underexplored in the literature. This work is presented as a preprint and has not yet undergone peer review.

**Method**  
The proposed method, BudCache, inverts the traditional caching formulation by fixing the compute budget a priori and searching for the optimal cache policy that maximizes output quality. To manage the combinatorial complexity of selecting steps for caching, BudCache employs a hybrid optimization strategy that combines Simulated Annealing with deterministic Hill Climbing. This offline search process identifies effective cache policies within minutes, eliminating the need for online search or thresholding during inference. Additionally, the authors introduce cache-aware schedule alignment, which adapts the time discretization to the selected cache policy, thereby minimizing trajectory mismatch caused by caching.

**Results**  
BudCache demonstrates superior generation quality compared to heuristic caching baselines under equivalent inference budgets. Specifically, on the FLUX.1-dev benchmark, BudCache achieves a 5.2% improvement in FID score over the best heuristic method, while on Wan2.1, it shows a 7.8% enhancement in perceptual quality metrics. These results indicate that BudCache not only maintains but improves output fidelity while adhering to strict computational constraints.

**Limitations**  
The authors acknowledge that BudCache's performance is contingent on the quality of the initial cache policy generated during the offline search. If the initial conditions are suboptimal, the final output may still suffer. Furthermore, the method's reliance on offline optimization may limit its adaptability in dynamic environments where compute budgets fluctuate. The paper does not address the potential computational overhead associated with the initial policy search, which, while performed offline, may still require significant resources for complex models.

**Why it matters**  
BudCache's approach to optimizing caching strategies for diffusion models under fixed compute budgets has significant implications for real-time applications where latency and output quality are critical. By providing a systematic method for cache policy optimization, this work paves the way for more efficient deployment of diffusion models in resource-constrained environments. The findings contribute to the broader discourse on improving inference efficiency in generative models, as discussed in related works on model optimization and deployment strategies, and are available on [arXiv](https://arxiv.org/abs/2606.13496v1).
