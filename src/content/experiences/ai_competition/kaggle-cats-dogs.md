---
title: Kaggle 猫狗识别：从 CNN Baseline 到误差分析
description: 在 Kaggle Notebook 中完成图像分类训练，记录数据增强、过拟合与评估过程。
date: 2023-08-06
updated: 2026-07-17
type: AI 竞赛
platform: Kaggle
status: 项目实践
tags: [Kaggle, CNN, TensorFlow]
progress:
  label: EXPERIMENT TIMELINE
  metric: Val Accuracy
  scoreSuffix: "%"
  precision: 1
  goal: higher
  accent: "#ff8a5b"
  demo: true
  submissions:
    - time: 2023-08-06T09:10:00+08:00
      title: CNN Baseline
      strategy: 使用三层卷积与固定训练/验证划分，先获得可复现的基线结果。
      score: 85.1
    - time: 2023-08-06T15:40:00+08:00
      title: 数据增强
      strategy: 加入水平翻转、随机缩放与小幅旋转，降低对训练样本细节的记忆。
      score: 88.9
      note: 训练准确率下降，但验证集泛化能力明显改善。
    - time: 2023-08-07T11:25:00+08:00
      title: Dropout 与 EarlyStopping
      strategy: 在分类头加入 Dropout，并根据验证损失提前停止训练。
      score: 91.6
    - time: 2023-08-07T20:05:00+08:00
      title: 错误样本驱动调整
      strategy: 检查高置信度误判，调整裁剪范围并减少会破坏主体的增强操作。
      score: 92.8
      note: 以错误样本分析决定最后一次数据策略修改。
---

猫狗识别是一个直观的二分类任务，也是一套完整计算机视觉训练流程的合适起点。实践环境使用 Kaggle Notebook 与 GPU，主要工具为 TensorFlow / Keras。

## 先检查数据

训练前先验证图片能否正常读取、类别是否平衡、尺寸与长宽比如何分布。数据读取错误或标签目录混乱，会比模型结构带来更直接的问题。

## 建立 CNN Baseline

模型从卷积、池化和全连接层开始，并使用独立验证集观察泛化表现。训练准确率继续提高、验证损失却开始上升时，说明模型已经过拟合。

应对过拟合的实验包括：

- 对训练图片使用翻转、裁剪等合理的数据增强；
- 加入 Dropout 或权重衰减；
- 使用 EarlyStopping 保留最佳验证轮次；
- 减小不必要的全连接层规模。

## 不只看准确率

混淆矩阵能显示两类错误是否对称。进一步查看置信度最高的错误样本，可以发现遮挡、背景干扰、主体过小或标签噪声等问题。误差分析会告诉我们下一次实验应该改变数据、损失函数，还是模型。

## 复盘

这次实践让我把“搭建 CNN”推进到“管理一次实验”：固定划分、记录曲线、保存最佳模型，并用错误样本解释指标变化。模型不是实验的全部，可靠的数据与评估流程同样重要。
