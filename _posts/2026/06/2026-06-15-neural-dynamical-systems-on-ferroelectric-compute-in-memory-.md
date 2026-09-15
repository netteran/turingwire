---
title: "Neural dynamical systems on ferroelectric compute-in-memory for real-time forecasting"
date: 2026-06-15 16:07:05 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.16896v1"
arxiv_id: "2606.16896"
authors: ["Keshava Katti", "Adithya Selvakumar", "Pratik Chaudhari", "Deep Jariwala"]
slug: neural-dynamical-systems-on-ferroelectric-compute-in-memory-
summary_word_count: 378
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents FerroNDS, a neuromorphic system leveraging ferroelectric compute-in-memory for efficient real-time forecasting of dynamic signals."
---

**Problem**  
This work addresses the limitations of traditional digital hardware in implementing neural dynamical systems (NDS), which are adept at modeling continuous-time dynamics but struggle with the discrete nature of digital computation. The authors highlight the mismatch between the sequential structure of NDS and the dense matrix operations favored by digital architectures. Furthermore, this paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The core contribution is the design and implementation of FerroNDS, a neuromorphic system that integrates two analog components: an integrator for temporal accumulation and an oscillator for frequency-selective filtering. This system is mapped onto compute-in-memory hardware utilizing multi-bit ferrodiodes, which allow for efficient analog computation. The architecture consists of a 128-neuron instance capable of performing short-time Fourier transforms and forecasting over a 500 ms horizon. The training and inference processes leverage the inherent continuous-time dynamics of the analog components, enabling real-time operation with minimal energy consumption.

**Results**  
FerroNDS demonstrates impressive performance metrics, achieving a per-neuron per-inference energy consumption of 1.64 μJ at 200 Hz and 0.29 μJ at 10 kHz. The system exhibits a significant area reduction of 25-40 times compared to SRAM-based digital systems, with per-layer latencies of 3.18 ms at 200 Hz and 63.87 μs at 10 kHz. These results indicate that FerroNDS not only meets the real-time operational requirements but also offers substantial efficiency improvements over traditional digital implementations.

**Limitations**  
The authors acknowledge that the current implementation is limited to a specific architecture and may not generalize to all types of neural dynamical systems. Additionally, the reliance on analog components may introduce noise and variability that could affect the robustness of the forecasts. The scalability of the system beyond the tested 128-neuron instance is not discussed, leaving open questions regarding its performance in larger configurations.

**Why it matters**  
The introduction of FerroNDS represents a significant advancement in the integration of neuromorphic computing with ferroelectric materials, paving the way for more efficient analog implementations of neural networks. This work has implications for real-time forecasting applications in various domains, including robotics, finance, and environmental monitoring. The findings contribute to the growing body of research on analog computing paradigms and their potential to overcome the limitations of digital systems, as published in [arXiv cs.NE](https://arxiv.org/abs/2606.16896v1).
