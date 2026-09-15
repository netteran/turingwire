---
title: "Data-Driven Dynamic Assortment in Online Platforms: Learning about Two Sides"
date: 2026-06-09 17:15:10 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2606.11118v1"
arxiv_id: "2606.11118"
authors: ["Rahul Roy", "Nur Sunar", "Jayashankar M. Swaminathan"]
slug: data-driven-dynamic-assortment-in-online-platforms-learning-
summary_word_count: 428
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper presents a novel data-driven algorithm for dynamic assortment optimization on two-sided platforms with unknown choice parameters."
---

**Problem**  
This work addresses a significant gap in the literature regarding dynamic assortment problems on two-sided service platforms, particularly in scenarios where both customer and seller choice parameters are unknown. Previous studies have primarily focused on static or fully known parameters, leaving a void in understanding how to optimize assortments dynamically under incomplete information. This paper is a preprint and has not undergone peer review.

**Method**  
The authors propose a data-driven algorithm that operates in a discrete-time setting, where customers arrive seeking services and the platform selects an assortment of sellers to display. The customer’s choice is modeled using a multinomial logit model, allowing for the selection of at most one seller from the displayed assortment. After a fixed number of periods, sellers evaluate the proposals they have received and choose one customer based on another multinomial logit model. The algorithm learns the unknown choice parameters of both customers and sellers while simultaneously optimizing the platform's revenue objective over time. The performance of the algorithm is evaluated using regret, defined as the revenue loss compared to a clairvoyant benchmark that possesses complete knowledge of all parameters and customer arrivals.

**Results**  
The proposed algorithm demonstrates a worst-case regret that grows polylogarithmically over time, indicating a favorable scaling behavior as the number of periods increases. The authors derive a matching lower bound for the regret, confirming the rate optimality of their approach. While specific numerical results against named baselines are not provided in the abstract, the theoretical guarantees suggest that the algorithm performs significantly better than naive approaches that do not account for the learning of choice parameters.

**Limitations**  
The authors acknowledge that their model assumes a fixed number of periods for customer-seller interactions, which may not reflect real-world scenarios where interactions can be more dynamic. Additionally, the reliance on multinomial logit models may limit the applicability of the findings to contexts where customer preferences are not well-captured by this choice model. The paper does not explore the impact of potential biases in customer or seller behavior, which could affect the learning process and the resulting assortment optimization.

**Why it matters**  
This research has important implications for the design and operation of online platforms that facilitate transactions between heterogeneous customers and sellers. By providing a method to dynamically optimize assortments while learning about user preferences, the findings can enhance revenue generation strategies in e-commerce, ride-sharing, and other two-sided markets. The work contributes to the growing body of literature on adaptive algorithms in uncertain environments, as discussed in related works on dynamic pricing and recommendation systems, and is available on [arXiv](https://arxiv.org/abs/2606.11118v1).
