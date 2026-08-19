---
title: kaggle_s6e8_Predicting Smartphone Addiction
description: kaggle表格赛学习记录
date: 2026-08-01
updated: 2026-08-19
type: AI 竞赛
platform: Kaggle
status: 持续记录
tags: [Kaggle, 分类, 预测]
featured: true
progress:
  label: SUBMISSION TIMELINE
  metric: ROC
  precision: 5
  goal: higher
  accent: "#d34646"
  submissions:
    - time: 2026-08-05T12:24:14+08:00
      title: 第一次提交_baseline
      strategy: 提交 v1版本csv，baseline采用快速EDA,从数据形状/缺失值/目标分布/特征与目标的相关性处理；预处理方面类别特征采用OrdinalEncoder（保留NaN），数据特征保留；基线模型采用HistGradientBoostingClassifier，采用五折分层交叉验证评估AUC
      score: 0.95871
      note: V1版本baseline得分
    - time: 2026-08-05T16:18:55+08:00
      title: 第二次提交
      strategy: lgb+cat+xgb权重融合
      score: 0.96594
      note: V2版本修改为lgb+cat+xgb权重融合后得分
    
---


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


