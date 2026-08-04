---
title: Kaggle Titanic：第一次完整走过表格竞赛流程
description: 从缺失值、可视化与特征构造开始，建立一个可验证、可提交的分类 Baseline。
date: 2023-07-09
updated: 2026-07-17
type: AI 竞赛
platform: Kaggle
status: 实践复盘
tags: [Kaggle, 特征工程, 分类]
featured: true
progress:
  label: SUBMISSION TIMELINE
  metric: Public Score
  precision: 5
  goal: higher
  accent: "#20beff"
  demo: true
  submissions:
    - time: 2023-07-09T10:20:00+08:00
      title: Logistic Regression Baseline
      strategy: 对年龄与票价做中位数填充，编码性别和舱位等级，先验证完整提交流程。
      score: 0.76555
      note: 建立可复现的预处理 Pipeline，作为后续实验对照组。
    - time: 2023-07-09T14:45:00+08:00
      title: 加入称谓与家庭规模
      strategy: 从姓名中提取 Title，并构造 FamilySize 与 IsAlone 特征。
      score: 0.78229
      note: 新特征改善了家庭关系与社会身份信息的表达。
    - time: 2023-07-10T09:30:00+08:00
      title: Random Forest 参数调整
      strategy: 替换为随机森林并限制树深，尝试捕捉非线性关系。
      score: 0.77751
      note: 公开分下降，回到交叉验证重新检查模型方差。
    - time: 2023-07-10T21:10:00+08:00
      title: 验证驱动的小型集成
      strategy: 融合逻辑回归与随机森林概率，并只保留稳定提升的特征。
      score: 0.78468
      note: 最终方案优先保证本地验证与公开榜变化方向一致。
---

Titanic 是我第一次把数据分析、特征工程、建模、验证和提交串成完整流程的练习。数据集规模不大，但非常适合暴露表格任务中的基础问题。

## 从问题与数据开始

目标是根据乘客信息预测是否生还。最初先检查字段类型、缺失值与标签分布，再分别观察年龄、性别、舱位等级等变量和生还率的关系。

```python
bins = [0, 12, 18, 65, 100]
train["age_group"] = pd.cut(train["Age"], bins)
train.groupby("age_group", observed=True)["Survived"].mean()
```

可视化并不是为了“图更好看”，而是为了形成可以继续验证的假设。例如，年龄本身可能不是线性影响，但划分年龄段后更容易观察儿童与成年乘客的差异。

## 特征工程

姓名看起来像自由文本，但称谓（`Mr`、`Mrs`、`Miss` 等）同时包含性别、年龄与社会身份信息，可以从姓名中提取：

```python
train["Title"] = train["Name"].str.extract(r" ([A-Za-z]+)\.", expand=False)
```

此外还可以构造家庭人数、是否独自出行等特征。每次新增特征都应该通过固定验证方案判断是否真正有效，而不是只看训练集表现。

## 这次实践留下的方法

1. 先做稳定 Baseline，再增加复杂度；
2. 所有预处理都放进 Pipeline；
3. 训练集与测试集必须使用完全一致的转换；
4. 比单次分数更重要的是可复现的验证过程。

这次练习没有把排行榜名次作为主要目标，而是建立了以后参加表格竞赛可以复用的第一套流程。
