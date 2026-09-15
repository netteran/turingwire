---
title: "ProvenanceGuard: Source-Aware Factuality Verification for MCP-Based LLM Agents"
date: 2026-06-16 15:10:29 +0000
category: research
subcategory: alignment_safety
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.18037v1"
arxiv_id: "2606.18037"
authors: ["Ander Alvarez", "Santhiya Rajan", "Samuel Mugel", "Rom\u00e1n Or\u00fas"]
slug: provenanceguard-source-aware-factuality-verification-for-mcp
summary_word_count: 439
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper presents ProvenanceGuard, a source-aware verifier for factuality in MCP-based LLM agents, addressing cross-source conflation in evidence attribution."
---

**Problem**  
The paper addresses a significant gap in the factuality verification of tool-using LLM agents that utilize the Model Context Protocol (MCP). Traditional metrics for factuality verification often overlook the issue of cross-source conflation, where a claim may be supported by evidence from one source but incorrectly attributed to another. This work is particularly relevant as it is a preprint and has not undergone peer review, highlighting the need for robust methodologies in verifying the provenance of information in LLM outputs.

**Method**  
ProvenanceGuard is designed to enhance factuality verification by leveraging captured MCP traces, which include stable tool IDs, source IDs, and raw outputs. The methodology involves several key steps: 
1. Decomposing answers into atomic claims.
2. Routing these claims to their respective source-specific evidence.
3. Employing Natural Language Inference (NLI) and a token-alignment proxy to check for support.
4. Comparing the stated attribution of claims with the routed source to determine correctness.
5. Returning verdicts for each claim and an overall allow/block decision for the answer. 
Additionally, blocked answers can be repaired through retrieval-augmented answer revision followed by re-verification. The evaluation is conducted on 281 medical-domain MCP-agent traces, with a focus on a 266-trace adjudicated subset.

**Results**  
ProvenanceGuard demonstrates strong performance metrics, achieving a block F1 score of 0.802 and source accuracy of 0.858 on a held-out split of 40 traces, which includes 260 source-eligible claims. This performance surpasses that of source-blind baselines that do not utilize claim-to-source IDs. On a more challenging multi-source benchmark, ProvenanceGuard achieves a block F1 score of 0.846, although the source-plus-relation accuracy drops to 0.229, indicating the complexity of maintaining accurate source attribution among semantically similar sources. Furthermore, in controlled clinical conflation probes, ProvenanceGuard successfully detects all injected attribution swaps without retaining any incorrect attributions.

**Limitations**  
The authors acknowledge that while ProvenanceGuard effectively addresses cross-source conflation, challenges remain in achieving high accuracy for source-plus-relation tasks, as evidenced by the low accuracy score in the multi-source benchmark. Additionally, the reliance on human verification for a subset of claims may introduce biases or limitations in the evaluation process. The paper does not discuss potential scalability issues or the computational overhead introduced by the verification process.

**Why it matters**  
The implications of this work are significant for the development of reliable LLM agents that utilize heterogeneous evidence sources. By introducing a source-aware verification mechanism, ProvenanceGuard provides a framework for improving the integrity of information presented by LLMs, which is crucial for applications in sensitive domains such as healthcare. This advancement in factuality verification can inform future research and development in LLM architectures and their deployment in real-world scenarios, as discussed in related works available on [arXiv](https://arxiv.org/abs/2606.18037v1).
