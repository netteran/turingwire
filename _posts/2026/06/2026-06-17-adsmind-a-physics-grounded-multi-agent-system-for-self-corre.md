---
title: "AdsMind: A Physics-Grounded Multi-Agent System for Self-Correcting Discovery of Adsorption Configurations on Heterogeneous Catalyst Surfaces"
date: 2026-06-17 14:57:16 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.19152v1"
arxiv_id: "2606.19152"
authors: ["Zongmin Zhang", "Yuyang Lou", "Bowen Zhang", "Junwu Chen", "Ryo Kuroki", "Xuan Vu Nguyen"]
slug: adsmind-a-physics-grounded-multi-agent-system-for-self-corre
summary_word_count: 424
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces AdsMind, a multi-agent system that autonomously discovers adsorption configurations on heterogeneous catalysts using ML feedback."
---

**Problem** — The paper addresses the challenge of identifying the lowest-energy surface-adsorbate configurations in heterogeneous catalysis, a task that is computationally intensive when relying on ab initio calculations. Existing machine-learning force fields (MLFFs) can accelerate structural relaxation but do not effectively navigate the vast configurational space due to the lack of a feedback mechanism for correcting erroneous initial guesses. This work is a preprint and has not undergone peer review.

**Method** — The authors propose AdsMind, a closed-loop multi-agent framework that integrates MLFF relaxation feedback to enable autonomous error correction. The system employs four different large language model (LLM) backends to facilitate the discovery process. AdsMind operates by iteratively refining adsorption configurations based on feedback from MLFFs, significantly enhancing the reliability of the search. The architecture leverages a multi-agent setup where agents collaborate to explore configurations, and the feedback mechanism allows for self-correction of errors in the initial guesses. The training compute details are not disclosed, but the framework demonstrates a substantial reduction in the number of MLFF relaxations required per case, achieving only 4.11 and 4.67 relaxations for the AA20 and OCD-GMAE62 benchmarks, respectively.

**Results** — AdsMind achieves a success rate of 100% on the AA20 benchmark and 98.8% on the OCD-GMAE62 benchmark, showcasing its high reliability in discovering accurate adsorption configurations. Compared to a single-pass (1-Shot) ablation, AdsMind reduces cross-backend energy dispersion significantly. The method also demonstrates an approximately 14-fold reduction in the number of required relaxations compared to heuristic enumeration baselines. Validation against density functional theory (DFT) using VASP/PBE on six representative AA20 systems reveals that while the open-loop Adsorb-Agent outputs exhibit qualitative errors in adsorption-energy signs for molecular adsorbates, AdsMind maintains the correct sign across all tested cases, indicating closer quantitative agreement.

**Limitations** — The authors acknowledge that while AdsMind shows significant improvements, the reliance on specific LLM backends may limit generalizability. Additionally, the computational efficiency of the framework is contingent on the performance of the underlying MLFFs, which may vary based on the specific systems being studied. The paper does not address potential scalability issues when applied to larger or more complex systems beyond the tested benchmarks.

**Why it matters** — The development of AdsMind represents a significant advancement in the autonomous discovery of adsorption configurations, combining reliability, self-reflection, and interpretability. This framework has the potential to streamline DFT-informed autonomous chemistry workflows, facilitating more efficient exploration of catalytic processes. The implications of this work extend to various applications in materials science and catalysis, as it provides a robust methodology for tackling complex configurational searches, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.19152v1).
