---
title: LIBS 光谱回归竞赛实验
description: 围绕煤炭弹筒发热量预测任务，记录回归建模、线上提交、策略变化与 RMSE 结果。
date: 2026-07-16
updated: 2026-07-19
status: 实验项目
role: 竞赛实践与实验记录
tags: [Python, Regression, Datawhale, LIBS]
stack: [Python, scikit-learn, Regression]
featured: true
highlights:
  - 从可提交的回归 Baseline 开始建立实验对照
  - 记录每次真实提交时间、策略与 RMSE 分数
  - 使用时间轴保留模型改进和结果变化
links:
  - label: 查看竞赛复盘
    href: /contests/datawhale_kedaxunfei_libs_2026/
---

## 任务背景

该实践来自科大讯飞 AI 开发者大赛相关赛题，目标是根据现场 LIBS 光谱数据预测煤炭弹筒发热量，并使用 RMSE 评价预测误差。

## 实验方法

首先建立能够完成训练、预测与提交的基础流程，再以线上返回结果作为对照。每次提交都记录时间、文件、策略和分数，避免只保留最终结果而丢失实验路径。

## 记录方式

竞赛详情页使用可定制提交时间轴展示真实提交。指标设置为 RMSE，并明确“越低越好”，从而自动计算最佳成绩、最新成绩和相对首提交的改进。

## 后续计划

- 补充离线验证与线上结果之间的差异分析；
- 整理光谱特征处理对模型表现的影响；
- 保留无效实验，减少后续重复尝试。
