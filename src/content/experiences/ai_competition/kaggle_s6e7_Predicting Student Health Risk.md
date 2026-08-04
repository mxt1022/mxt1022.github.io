---
title: kaggle_s6e7_Predicting Student Health Risk
description: kaggle表格赛学习记录
date: 2026-07-21
updated: 2026-07-29
type: AI 竞赛
platform: Kaggle
status: 入门学习
tags: [Kaggle, 分类, 预测]
featured: true
progress:
  label: SUBMISSION TIMELINE
  metric: RMSE
  precision: 5
  goal: higher
  accent: "#81dbac"
  submissions:
    - time: 2026-07-16T13:21:33+08:00
      title: 第一次提交
      strategy: 提交 submission1.csv，提交baseline
      score: 0.62566
      note: 平台已返回分数，作为后续实验的对照结果。
    - time: 2026-07-21T12:58:52+08:00
      title: 第二次提交
      strategy: 提交 submission2.csv，修改epochs为20
      score: 0.64456
      note: 得分比第一次高，修改了训练轮次之后有明显进步
    
---

本次学习赛题来自Kaggle，主要是跑通kaggle比赛流程，作为初学者初步学习平台使用操作，以及借鉴别人的思路，进行学习

## 赛题任务



## 评估方式

比赛使用均方根误差（RMSE）评估预测结果，数值越低越好。其计算方式可写为 `RMSE = sqrt((1 / n) × Σ(yᵢ - ŷᵢ)²)`。

RMSE 与预测目标使用相同量纲，同时会对较大的预测误差给予更高惩罚。因此，判断实验是否有效时应比较相同提交阶段的 RMSE，而不是把更高的数值理解为更好的成绩。

## 提交记录

| 提交时间 | 文件名 | 平台评分（RMSE） | 相对第一次提交 |
| --- | --- | ---: | ---: |
| 2026-07-16 13:21:33 | `submission1.csv` | 0.62566 | baseline |
| 2026-07-21 12:58:52 | `submission2.csv` | 0.64456 | 提交 submission2.csv，修改epochs为20 |
| 2026-07-21 15:49:23 | `submission3.csv` | 0.6919	| 调整正负样本权重为0.5，并且使用全量数据集 |
| 2026-07-19 16:23:33 | `submission4.csv` | 2 | — |



## 当前复盘


