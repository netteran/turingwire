---
title: "DeliChess: A Multi-party Dialogue Dataset for Deliberation in Chess Puzzle Solving"
date: 2026-06-03 15:08:46 +0000
category: research
subcategory: reasoning
company: null
secondary_companies: []
impact: notable
source_publisher: "arXiv cs.AI"
source_url: "https://arxiv.org/abs/2606.04987v1"
arxiv_id: "2606.04987"
authors: ["Xiaochen Zhu", "Georgi Karadzhov", "Tom Stafford", "Andreas Vlachos"]
slug: delichess-a-multi-party-dialogue-dataset-for-deliberation-in
summary_word_count: 375
classification_confidence: 0.80
source_truncated: false
layout: post
description: "This paper introduces DeliChess, a dataset for studying multi-party dialogue in collaborative chess puzzle solving, enhancing understanding of group reasoning."
---

**Problem**  
Existing datasets for multi-party dialogue often lack a focus on structured, complex reasoning tasks, particularly in collaborative settings. This paper addresses this gap by presenting DeliChess, a novel dataset designed to facilitate the study of deliberation in group decision-making within the context of chess puzzle solving. The authors note that the work is a preprint and has not yet undergone peer review.

**Method**  
DeliChess comprises 107 dialogues where participants first solve chess puzzles individually and then engage in discussions to reach a collective answer. The dataset includes full transcripts of the dialogues, pre- and post-discussion choices, and metadata detailing puzzle difficulty and move quality. The authors evaluate the effectiveness of deliberation using three metrics based on chess engine evaluations, which assess the accuracy of the group’s final answers. Additionally, they analyze the impact of probing utterances—messages designed to elicit deeper engagement and reflection—on group performance, employing a classifier trained on prior deliberation data to assess the variability introduced by these utterances.

**Results**  
The findings indicate that group deliberation significantly enhances accuracy in solving chess puzzles, with specific performance metrics showing improved outcomes compared to individual attempts. The authors report that while probing utterances can lead to more variable performance post-discussion, they do not consistently improve the accuracy of the group’s final answers. This nuanced understanding of dialogue dynamics is critical for modeling collaborative reasoning processes.

**Limitations**  
The authors acknowledge that the dataset is limited in size, with only 107 dialogues, which may restrict the generalizability of the findings. They also note that the variability introduced by probing utterances could complicate the interpretation of results, as it does not uniformly lead to improved performance. Furthermore, the dataset is confined to chess puzzles, which may limit its applicability to other domains of multi-party dialogue and reasoning.

**Why it matters**  
DeliChess provides a rich resource for researchers interested in group reasoning, dialogue dynamics, and the resolution of differing perspectives in collaborative tasks. The dataset's structured approach to multi-party dialogue in a strategic domain like chess allows for deeper insights into the mechanisms of deliberation and decision-making. This work lays the groundwork for future studies on collaborative reasoning and could inform the development of AI systems that better understand and facilitate group discussions, as published in [arXiv cs.AI](https://arxiv.org/abs/2606.04987v1).
