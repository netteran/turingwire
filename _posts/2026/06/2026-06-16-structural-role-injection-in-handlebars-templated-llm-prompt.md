---
title: "Structural Role Injection in Handlebars-Templated LLM Prompts: Triple-Brace Interpolation, Delimiter Family, and the Limits of HTML Auto-Escaping"
date: 2026-06-16 16:21:43 +0000
category: research
subcategory: alignment_safety
company: "Microsoft"
secondary_companies: []
impact: major
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.18120v1"
arxiv_id: "2606.18120"
authors: ["Mohammadreza Rashidi"]
slug: structural-role-injection-in-handlebars-templated-llm-prompt
summary_word_count: 424
classification_confidence: 0.85
source_truncated: false
layout: post
description: "This paper investigates structural role injection vulnerabilities in Handlebars-templated prompts for large language models, revealing critical security implications."
---

**Problem**  
This work addresses a significant gap in the security analysis of prompt templates used in large language models (LLMs), specifically focusing on Handlebars, a widely adopted templating engine in Microsoft Semantic Kernel. The authors highlight the unexamined risk of structural role injection, where attacker-controlled data can manipulate chat role delimiters to escalate privileges within LLM interactions. This paper is a preprint and has not undergone peer review, indicating that the findings should be interpreted with caution.

**Method**  
The authors conduct a model-free analysis to elucidate the mechanics of structural role injection facilitated by Handlebars' templating syntax. They differentiate between the double-brace `{x}` expression, which HTML-escapes interpolated values, and the triple-brace `{x}` expression, which inserts values raw. The analysis reveals that while angle brackets are neutralized by escaping, other delimiters such as square brackets, colons, and Markdown hashes remain unprotected. The authors execute 5760 trials across seven delimiter families, two attack objectives (task hijacking and secret exfiltration), and four models (GPT-3.5 Turbo, GPT-4o mini, GPT-4.1 mini, Claude Haiku 4.5) at a total API cost of $1.63. The experimental setup is designed to assess the efficacy of escaping in preventing structural role injection.

**Results**  
The results indicate that GPT-3.5 Turbo is highly susceptible to task hijacking, following the instruction in 97% of raw trials and 91% of escaped trials. The escaping mechanism effectively neutralizes angle-bracket-based delimiters (survival rate 0.00) but fails to protect against colon- and Markdown-based delimiters (survival rate 1.00 for the latter). Claude Haiku 4.5 demonstrates a robust resistance to both attack objectives, indicating a potential advantage in security over the other models tested. The findings underscore that the escaping mechanism does not provide comprehensive protection and is limited to specific delimiter families.

**Limitations**  
The authors acknowledge that the escaping mechanism's effectiveness is contingent upon the specific characters it neutralizes, which does not extend to all delimiter families. They also note that the structural separation of instruction and data is essential for robust security, a feature that escaping alone cannot provide. Additionally, the study's reliance on a limited set of models and attack vectors may not capture the full spectrum of vulnerabilities present in other LLM architectures or configurations.

**Why it matters**  
This research has significant implications for the design and implementation of secure prompt templates in LLM applications. By exposing the vulnerabilities associated with Handlebars' escaping mechanism, the findings prompt a reevaluation of templating practices to mitigate structural role injection risks. The work encourages further exploration into more robust methods for separating instruction from data in LLM prompts, as published in [arXiv](https://arxiv.org/abs/2606.18120v1).
