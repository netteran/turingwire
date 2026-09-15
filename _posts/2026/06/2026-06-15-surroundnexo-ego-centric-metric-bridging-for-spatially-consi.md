---
title: "SurroundNEXO: Ego-Centric Metric Bridging for Spatially Consistent Geometry in Autonomous Driving"
date: 2026-06-15 17:00:32 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CV"
source_url: "https://arxiv.org/abs/2606.16960v1"
arxiv_id: "2606.16960"
authors: ["Shuai Yuan", "Runxi Tang", "Yuzhou Ji", "Fudong Ge", "Hanshi Wang", "Yifei Wang"]
slug: surroundnexo-ego-centric-metric-bridging-for-spatially-consi
summary_word_count: 403
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces SurroundNEXO, a novel framework for ego-centric metric depth prediction in autonomous driving, enhancing spatial consistency across low-overlap camera views."
---

**Problem**  
The paper addresses the limitations of existing multi-camera depth prediction methods in autonomous driving, particularly the challenges posed by low-overlap views from vehicle-mounted camera rigs. Traditional approaches rely on dense visual correspondences, which are difficult to establish in this context. The authors propose SurroundNEXO as a solution to this problem, focusing on ego-centric geometry rather than conventional multi-view geometry. This work is a preprint and has not yet undergone peer review.

**Method**  
SurroundNEXO employs a novel architecture that integrates Ego-Ray Positional Encoding to assign globally comparable viewing directions in the ego-frame. The framework utilizes sparse LiDAR measurements as metric anchors to propagate absolute scale cues effectively. The method progresses through several stages: it begins with local modeling of features, transitions to decomposed spatio-temporal reasoning, and culminates in global integration. This structured approach allows for improved metric-scale depth prediction and spatial consistency across weakly overlapping camera views. The authors do not disclose specific training compute details, but the architecture is designed to leverage the unique characteristics of ego-centric geometry.

**Results**  
SurroundNEXO demonstrates significant performance improvements over state-of-the-art (SOTA) methods across multiple low-overlap autonomous driving benchmarks, including NuScenes, Waymo, and DDAD. Specifically, it achieves a 33.2% reduction in single-view error, a 10.5% improvement in cross-view consistency, and a 25.6% enhancement in metric reconstruction quality. These results indicate that SurroundNEXO not only outperforms existing techniques but also maintains robustness under conditions of sparse depth prompts and exhibits strong zero-shot generalization capabilities to unseen camera layouts.

**Limitations**  
The authors acknowledge that while SurroundNEXO improves spatial consistency and depth prediction, it may still face challenges in scenarios with extreme occlusions or highly dynamic environments, which are common in autonomous driving. Additionally, the reliance on sparse LiDAR data may limit its applicability in settings where such data is unavailable. The paper does not discuss potential computational overhead introduced by the progressive feature interaction stages, which could impact real-time performance in practical applications.

**Why it matters**  
The development of SurroundNEXO has significant implications for the field of autonomous driving, particularly in enhancing the reliability of perception and planning systems that depend on accurate 3D understanding. By shifting the focus from dense visual correspondences to ego-centric geometry, this work opens new avenues for research in multi-camera systems and depth prediction. The findings contribute to the ongoing discourse on improving spatial consistency in low-overlap camera setups, as highlighted in related literature. For further details, see the full paper available on [arXiv](https://arxiv.org/abs/2606.16960v1).
