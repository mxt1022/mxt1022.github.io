# 关于天池量子化赛道的baseline理解

## 1.解压数据集
```python
!unzip #解压命令
```

## 2. 安装相关的库
```python
!pip install #安装命令
```
> polats catboost joblib 库的作用是为了方便的保存模型，方便后续的调用

一些常用的库及其所起到的作用：
1. numpy：科学计算库，用于进行数值计算（提供了矩阵运算的功能）
2. pandas：数据处理库，用于数据分析和处理（提供了数据处理的功能）
3. polars：数据处理库，用于处理大规模数据集（提供了数据处理的功能）
4. from collections import defaultdict, Counter：导入collections库中的defaultdict和Counter类，用于创建字典和计数
5. from catboost import CatBoostClassifier：导入CatBoostClassifier类，用于构建CatBoost分类器，用于梯度提升树模型
6. from sklearn.model_selection import StratifiedKFold：导入StratifiedKFold类，用于交叉验证
7. from joblib import Parallel, delayed ：导入Parallel和delayed类，用于并行计算
8. import sys, os, gc, argparse, warnings, tqdm ：导入系统、操作系统、垃圾回收、参数解析、警告、进度条等类
9. from sklearn.metrics import mean_absolute_error ：导入mean_absolute_error类，用于计算绝对误差（均绝对误差）是一个用于回归问题评估模型性能的指标之一，它衡量了预测值与实际观测值之间的平均绝对差异。）
10. warnings.filterwarnings('ignore') ：忽略警告

