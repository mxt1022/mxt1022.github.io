---
title: Datawhale 2026 夏季实训：基于现场 LIBS 光谱的煤炭弹筒发热量预测
description: 记录科大讯飞 AI 开发者大赛 LIBS 光谱回归赛题的任务、评估方式，以及 2026 年 7 月 16 日的两次真实提交结果。
date: 2026-07-16
updated: 2026-07-19
type: AI 竞赛
platform: 科大讯飞 AI 开发者大赛
status: 初赛实践
tags: [Datawhale, 科大讯飞, LIBS, 回归]
progress:
  label: SUBMISSION TIMELINE
  metric: RMSE
  precision: 5
  goal: lower
  accent: "#2775a9"
  submissions:
    - time: 2026-07-16T12:25:26+08:00
      title: 第一次提交
      strategy: 提交 submit1.zip，平台返回首个可用于比较的线上结果。
      score: 278.5046
      note: 平台已返回分数，作为后续实验的对照结果。
    - time: 2026-07-16T12:58:46+08:00
      title: 第二次提交
      strategy: 提交 submit2.zip，平台完成评测并返回第二个线上结果。
      score: 280.53604
      note: RMSE 比第一次高 2.03144，结果回退；现有记录不足以把变化归因于某个具体改动。
    - time: 2026-07-19
      title: STAGE2修改
      strategy: 修改feature.py
      score: 280.08222
      note: RMSE 全局CV-RMSE：153.69
    - time: 2026-07-19
      title: STAGE2修改
      strategy: Stage1：RidgeCV Stage2：RidgeCV（CV和最终模型一致）辅助指标增强权重 ×3辅助指标物理范围裁剪保留 Group CV保留小批次 shrinkage修复 LightGBM 导致 CV 偏差问题
      score: 261.48212
      note: RMSE 全局CV-RMSE：153.69

---

这次实践来自 Datawhale 2026 夏季实训机器学习赛道，对应科大讯飞 AI 开发者大赛的“基于现场 LIBS 光谱的煤炭弹筒发热量预测挑战赛”。

## 赛题任务

煤炭发热量是评价煤炭质量的重要指标。传统测定通常在实验室中使用弹筒发热量计完成，流程较长，难以直接满足煤场现场的实时调控需求。LIBS（Laser-Induced Breakdown Spectroscopy，激光诱导击穿光谱）可以在现场皮带上快速采集煤流的光谱信息。

赛题提供现场采集的煤炭 LIBS 光谱数据，以及对应批次煤样的实验室化验数据。任务是建立光谱与弹筒发热量之间的回归映射，并预测测试样本的发热量。

## 评估方式

比赛使用均方根误差（RMSE）评估预测结果，数值越低越好。其计算方式可写为 `RMSE = sqrt((1 / n) × Σ(yᵢ - ŷᵢ)²)`。

RMSE 与预测目标使用相同量纲，同时会对较大的预测误差给予更高惩罚。因此，判断实验是否有效时应比较相同提交阶段的 RMSE，而不是把更高的数值理解为更好的成绩。

## 已确认的提交记录

2026 年 7 月 16 日共完成两次有效提交，提交者均为 `mxt1022`：

| 提交时间 | 文件名 | 平台评分（RMSE） | 相对第一次提交 |
| --- | --- | ---: | ---: |
| 2026-07-16 12:25:26 | `submit1.zip` | 278.5046 | — |
| 2026-07-16 12:58:46 | `submit2.zip` | 280.53604 | +2.03144 |
| 2026-07-19 16:03:58 | `submit3.zip` | 280.08222	 | — |
| 2026-07-19 16:23:33 | `submit4.zip` | 261.48212 | — |

第二次提交发生在第一次之后 33 分 20 秒。由于 RMSE 越低越好，当前最佳结果仍是第一次提交的 `278.5046`。仅凭提交页面无法确认两份结果之间具体修改了哪些特征、参数或后处理步骤，因此不对分数变化作未经记录的归因。

## 当前复盘


