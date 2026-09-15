---
title: "\"Chi nas dal soch el sent de legn\" -- Auditing Text Corpora for Lombard"
date: 2026-06-04 16:20:14 +0000
category: research
subcategory: other
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2606.06349v1"
arxiv_id: "2606.06349"
authors: ["Edoardo Signoroni", "Pavel Rychl\u00fd"]
slug: chi-nas-dal-soch-el-sent-de-legn-auditing-text-corpora-for-l
summary_word_count: 390
classification_confidence: 0.70
source_truncated: false
layout: post
description: "This paper audits Lombard language corpora, revealing severe data quality issues and advocating for community-driven curation over quantity-driven scraping."
---

**Problem**  
This work addresses the significant gap in Natural Language Processing (NLP) resources for Lombard, an under-resourced language continuum in Italy. The authors highlight the lack of high-quality datasets necessary for training and evaluating NLP models, particularly for tasks like Machine Translation (MT). The paper is a preprint and unreviewed, contributing to the ongoing discourse on language resource development.

**Method**  
The authors conducted a manual audit of both parallel and monolingual corpora available for Lombard. They systematically analyzed web-scraped datasets, curated corpora, and existing benchmarks to assess their quality. Key aspects of the analysis included language misidentification, the prevalence of boilerplate text, and non-linguistic noise. The authors also examined the orthographic composition of valid Lombard data, focusing on the representation of different dialects within the language continuum. This involved categorizing the data based on its adherence to various orthographic systems and identifying biases in representation.

**Results**  
The findings indicate that the perceived abundance of Lombard data is misleading, with many datasets suffering from severe quality issues. The analysis revealed that high-quality data is predominantly skewed towards Western Lombard varieties, while Eastern Lombard dialects are significantly underrepresented. The authors did not provide specific quantitative metrics or comparisons against named baselines, but the qualitative assessment underscores the critical need for improved data curation practices.

**Limitations**  
The authors acknowledge that their audit is limited to the datasets currently available and may not encompass all potential sources of Lombard language data. They also note that the focus on orthographic representation may overlook other linguistic features that are important for NLP tasks. Additionally, the reliance on manual auditing introduces subjectivity, which could affect the reproducibility of their findings. The paper does not address potential solutions for the identified biases or propose specific methodologies for community-driven curation.

**Why it matters**  
This work has significant implications for the development of NLP tools for under-resourced languages, particularly in advocating for a shift from quantity-driven data scraping to a more nuanced, community-informed approach to data curation. By highlighting the issues of misidentification and representational bias, the authors call for a concerted effort to ensure that diverse dialects are adequately represented in training datasets. This is crucial for building robust NLP systems that can serve the entire linguistic community. The findings contribute to the broader conversation on language resource development, as discussed in related literature, and are available on [arXiv](https://arxiv.org/abs/2606.06349v1).
