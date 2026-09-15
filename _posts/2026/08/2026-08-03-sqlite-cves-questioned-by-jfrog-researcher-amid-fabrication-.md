---
title: "SQLite CVEs Questioned by JFrog Researcher Amid Fabrication Claims"
date: 2026-08-03 11:28:54 +0000
category: news
subcategory: safety_alignment
company: "SQLite"
secondary_companies: []
impact: major
source_publisher: "Hacker News (AI filtered)"
source_url: "https://research.jfrog.com/post/sqlite-critical-cves-or-llm-slops/"
slug: sqlite-cves-questioned-by-jfrog-researcher-amid-fabrication-
summary_word_count: 156
classification_confidence: 0.80
source_truncated: false
layout: post
quality: high
description: "JFrog's Afek Berger claims multiple SQLite CVEs are fabricated and lack validity."
---

Afek Berger, a researcher at JFrog, asserts that several critical CVEs related to SQLite, including CVE-2026-51302 with an initial severity score of 10.0, are fabricated. Berger highlights that none of these CVEs are listed on SQLite’s official advisory page and claims that the advisory mentions non-existent functions and fixes. The CVSS scores for the CVEs in question are notably high, with CVE-2026-51303 and CVE-2026-51300 both scoring 9.8 and 9.1 respectively. Berger states that the provided proof of concept (PoC) is invalid SQL that fails at the parser stage, and the cited line numbers do not exist in the relevant SQLite versions (3.41.0, 3.51.2, 3.51.3). This follows a February 2024 pause by NIST on deep analysis of CVEs, raising concerns about the integrity of vulnerability reporting. The claims suggest that a plausible-sounding fake advisory can easily pass through the cybersecurity pipeline, potentially impacting developers relying on accurate vulnerability data. For more details, see [Hacker News (AI filtered)](https://research.jfrog.com/post/sqlite-critical-cves-or-llm-slops/).
