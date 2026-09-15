---
title: "HoF-Bench: Rediscovering Real AI-Discovered CVEs Without Frontier Models"
date: 2026-07-29 15:25:07 +0000
category: research
subcategory: evaluation_benchmarks
company: "Hugging Face"
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.LG"
source_url: "https://arxiv.org/abs/2607.27030v1"
arxiv_id: "2607.27030"
authors: ["Petr Simecek", "Elnaz Babayeva", "Jiri Balhar", "Michal Bida", "Michal Buran", "Vaclav Cadek"]
slug: hof-bench-rediscovering-real-ai-discovered-cves-without-fron
summary_word_count: 157
classification_confidence: 0.80
source_truncated: false
layout: post
quality: high
description: "HoF-Bench introduces a benchmark for evaluating LLM-based vulnerability analyzers using AI-discovered CVEs from open-source projects."
---

## Problem
This paper addresses the gap in evaluating the effectiveness of LLM-based analyzers in rediscovering real vulnerabilities, specifically focusing on AI-discovered Common Vulnerabilities and Exposures (CVEs). The work is presented as a preprint and aims to provide a structured benchmark for assessing the capabilities of various vulnerability detection models.

## Method
The authors introduce HoF-Bench, a benchmark constructed from 95 public AI-discovered CVEs across eight repositories, with a focus on vulnerable commits. The benchmark is designed such that analyzers receive source code and target-file scope without CVE identifiers, descriptions, fixes, or expected mechanisms. A detector-blinded frontier-model judge evaluates the findings based on the identification of the same code path, root cause, attack condition, and impact. The study employs a minimal LLM-based analyzer that rediscovers up to 65 of the 95 CVEs (68%) under strict evaluation criteria. The ten detector backbones consist of five open-weight models (totaling 21B–284B parameters, with 3–13B active) and five proprietary small or
