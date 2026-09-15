---
title: "Multi-Agent AI System for Radiology Report Structuring and Quality Assurance with Independent Radiologist Evaluation"
date: 2026-08-18 17:57:08 +0000
category: research
subcategory: agents_robotics
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.CL"
source_url: "https://arxiv.org/abs/2608.18072v1"
arxiv_id: "2608.18072"
authors: ["Iryna Hartsock", "Cesar Lam", "Christopher Otteni", "Aliya Qayyum", "Robert Gatenby", "Cyrillo Araujo"]
slug: multi-agent-ai-system-for-radiology-report-structuring-and-q
summary_word_count: 217
classification_confidence: 0.80
source_truncated: false
layout: post
quality: high
description: "This paper presents a multi-agent AI system for structuring radiology reports and ensuring quality assurance, evaluated against independent radiologists."
---

## Problem
This work addresses the gap in automated structuring and quality assurance of radiology reports, particularly in the context of locally deployed AI systems. The study is a preprint and has not undergone peer review, indicating the need for further validation in clinical settings.

## Method
The authors developed a multi-agent AI pipeline that utilizes regex rules and local large language models to structure radiology reports into standardized anatomical sections at the sentence level. The system identifies mismatches between the Findings and Impression sections, gender-anatomy conflicts, and undocumented critical findings. The evaluation involved 638 radiology reports from CT examinations, dictated by 15 board-certified radiologists, covering the chest, abdomen, and pelvis. A subset of 45 reports was independently assessed by two radiologists for quality assurance.

## Results
The AI system successfully structured the Findings sections of all reports, encompassing 22,270 sentences, while preserving the original content. It flagged 90 reports (14.1%) for various issues, with the majority (80 reports, 12.5%) related to section mismatches. In the independent evaluation, both radiologists agreed that 31 reports (69%) were correctly restructured, while 2 reports (4%) were deemed incorrectly restructured, with disagreement on 12 reports (27%). Importantly, both reviewers confirmed that no clinically significant information was omitted and no fabricated content was introduced. Overall, the quality assurance performance was rated as
