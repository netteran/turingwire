---
title: "ReSCom: A Reconfigurable Spiking Neural Network Accelerator Using Stochastic Computing"
date: 2026-06-11 16:44:08 +0000
category: research
subcategory: efficiency_inference
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.NE"
source_url: "https://arxiv.org/abs/2606.13560v1"
arxiv_id: "2606.13560"
authors: ["Ali Alipour Fereidani", "Mohammad Rasoul Roshanshah", "Saeed Safari"]
slug: rescom-a-reconfigurable-spiking-neural-network-accelerator-u
summary_word_count: 359
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces ReSCom, a reconfigurable SNN accelerator utilizing stochastic computing to enhance energy efficiency and stability in inference tasks."
---

**Problem**  
The paper addresses the challenge of efficiently implementing Spiking Neural Networks (SNNs) in hardware, which is hindered by high power and area costs associated with neuronal computations. Additionally, the instability of recurrent state updates due to uncontrolled approximate arithmetic poses a significant barrier to practical applications. This work is a preprint and has not undergone peer review.

**Method**  
ReSCom is a reconfigurable SNN accelerator that employs stochastic computing to simplify hardware complexity while ensuring stable inference. The architecture utilizes stochastic arithmetic for multiplication operations within neuron dynamics, complemented by precise fixed-point addition and subtraction. This hybrid approach allows for runtime adjustments in accuracy, latency, and energy consumption. The design features a unified neuron architecture capable of supporting multiple neuron models, including Integrate-and-Fire (IF), Leaky Integrate-and-Fire (LIF), and Synaptic models, all within a single hardware framework. The implementation was tested on a Xilinx Artix-7 FPGA, operating at 100 MHz.

**Results**  
Experimental evaluations on the MNIST dataset demonstrate that ReSCom achieves a classification accuracy of 92.80% while consuming only 0.05 mJ of operational energy per image. This performance surpasses that of recent state-of-the-art SNN implementations, indicating a significant improvement in energy efficiency. The ability to manage the stochastic bit-stream length provides explicit control over the trade-offs between accuracy, latency, and energy consumption, allowing the system to adapt to specific application requirements.

**Limitations**  
The authors acknowledge that while ReSCom offers significant improvements in energy efficiency and stability, the reliance on stochastic computing may introduce variability in performance that could affect certain applications. Additionally, the paper does not explore the scalability of the architecture beyond the tested MNIST dataset, nor does it address potential limitations in real-time applications where latency may be critical.

**Why it matters**  
The development of ReSCom has important implications for the deployment of SNNs in energy-constrained environments, such as edge computing and IoT devices. By providing a flexible architecture that balances accuracy, latency, and energy consumption, this work paves the way for more practical applications of SNNs in real-world scenarios. The findings contribute to the ongoing discourse on efficient neural network implementations, as discussed in related literature on hardware accelerators for deep learning, and are available on [arXiv](https://arxiv.org/abs/2606.13560v1).
