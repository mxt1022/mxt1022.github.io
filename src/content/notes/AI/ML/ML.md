---
title: 机器学习：从任务定义到模型评估
description: 用一条完整工作流串起监督学习、无监督学习、特征工程与评估指标。
date: 2024-01-15
updated: 2026-07-17
category: 人工智能
tags: [机器学习, 特征工程, 模型评估]
featured: true
---

机器学习不是“选择一个模型然后调用 `fit`”，而是把一个现实问题转换成可以被数据检验的假设。下面按实践顺序整理一条最小但完整的工作流。

## 先定义任务

监督学习从带标签的样本中学习映射 $x \rightarrow y$。如果目标值连续，通常是回归；如果目标是有限类别，通常是分类。无监督学习没有给定标签，更关注数据内部的结构，例如聚类与降维。

开始写代码前应先回答三个问题：

1. 模型最终要预测什么？
2. 一次错误预测的代价是什么？
3. 训练时可用的信息，在真实预测时是否仍然存在？

第三个问题可以帮助发现数据泄漏。一个离线分数很高、线上却失效的模型，往往不是算法不够复杂，而是验证方式与真实场景不一致。

## 建立可复现的 Baseline

Baseline 的价值是提供一个稳定参照。对于表格分类任务，可以从下面的组合开始：

```python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = make_pipeline(SimpleImputer(strategy="median"), StandardScaler())
category = make_pipeline(
    SimpleImputer(strategy="most_frequent"),
    OneHotEncoder(handle_unknown="ignore"),
)

preprocess = ColumnTransformer([
    ("num", numeric, numeric_columns),
    ("cat", category, category_columns),
])

model = make_pipeline(preprocess, LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)
```

把预处理和模型放进同一个 Pipeline，可以避免训练集与验证集采用不同处理逻辑，也能降低交叉验证时的数据泄漏风险。

## 选择与任务一致的指标

准确率只适合类别相对均衡、各类错误代价接近的情况。类别不平衡时，还应观察：

- Precision：被预测为正例的样本中有多少是真的；
- Recall：真实正例中有多少被找到了；
- F1：Precision 与 Recall 的调和平均；
- ROC-AUC：模型对正负样本的整体排序能力。

指标不是越多越好。最好选择一个主指标用于优化，再用混淆矩阵和分组统计检查模型是否在某些样本上系统性失败。

## 实验记录模板

每次实验至少保存：数据版本、特征变化、验证切分、模型参数、随机种子、主指标与观察。这样才能区分“这次真的更好”与“只是一次幸运的随机波动”。

> 复杂模型可以晚一点加入，但可靠的验证与实验记录应该从第一次训练开始。
