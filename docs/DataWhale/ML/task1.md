# 概览西瓜书+南瓜书1、2章

## 西瓜书的Chapter 1的读书感想及其收获

通过阅读西瓜书的前两章节，成功了解了关于机器学习的一些的基础的知识：
从西瓜开始引入，了解了什么是机器学习，机器学习的分类，机器学习的基本术语，机器学习的基本流程，机器学习的基本性能度量，机器学习的基本假设，机器学习的基本算法，机器学习的基本挑战，机器学习的基本应用，机器学习的基本研究方向。
机器学习是一门多领域交叉的学科，涉及到概率论、统计学、信息论、计算机科学、心理学、神经科学等学科，同时也是人工智能的一个重要分支。
通过经验来提高系统自身的性能，这就是机器学习的核心思想。

### 机器学习的基本术语
>例如：
1. 数据集：数据的集合
2. 样本：数据集中的一条数据
3. 属性：样本的特征
4. 属性值：属性的取值
5. 属性空间：属性张成的空间
6. 学习：从数据中学得模型的过程
7. 训练数据：学习过程中使用的数据
8. 训练样本：训练数据中的一条数据
9. 训练集：训练样本的集合
10. 假设空间：学习模型的集合
11. 真实数据：训练集中的数据
12. 真实样本：真实数据中的一条数据
13. 真实模型：真实数据所对应的模型
14. 学习器：学得模型的算法
15. 预测：对新样本进行预测
16. 测试数据：测试样本的集合
17. 测试样本：测试数据中的一条数据
18. 测试误差：学习器在测试数据上的误差
19. 泛化能力：学得模型适用于新样本的能力
20. 过拟合：学得模型对训练样本的过度拟合
21. 欠拟合：学得模型对训练样本的拟合不足
22. 交叉验证：用于评估模型泛化能力的统计学方法
23. 模型选择：选择模型的过程
24. 欠拟合：学得模型对训练样本的拟合不足

初次以外，还了解到了机器学习的实质就是从训练数据中学得模型，对测试数据进行预测，从而使得模型能够很好地适用于新样本的能力，这就是泛化能力。

其所对应的数学公式是：$P(|f(x)-y|\leq \epsilon )\leq1-\delta$
具体的含义就是：对于任意的$\epsilon$>0，以概率至少为$1-\delta$，不等式$|f(x)-y|\leq \epsilon$成立。其中$f(x)$是学得模型，$y$是真实模型，$\epsilon$是预测误差，$\delta$是置信度。这个公式的含义就是：学得模型的预测误差不会超过$\epsilon$的概率至少为$1-\delta$。这个公式也是机器学习的基本假设，也是机器学习的基本性能度量。

关于独立同分布的问题：训练样本和测试样本都是独立同分布的，这是机器学习的基本假设之一。独立同分布在数学上的定义是指：对于任意的样本$x_1,x_2$，其联合概率分布为$P(x_1,x_2)=P(x_1)P(x_2)$。这个公式的含义就是：训练样本和测试样本都是从同一个概率分布中独立采样得到的。

关于归纳偏好，例如针对与同一个现实问题，有两种解决方案，模型一在某一方面更贴合实际问题，而模型二在另一个方面更贴近于这个实际问题。那么对于解决该实际问题，我们选取偏好的模型，这就是归纳偏好。虽然在大多数情况下，我们可能会在“奥卡姆剃须刀”准则下，选取更为“简单”的模型。但是由于实际问题的不确定性，如何定义简单还需要更进一步的商榷。归纳偏好是学习算法自身在学习过程中对某种类型假设的偏好，这种偏好可以是任何的形式，例如：简单性、对称性、稳定性、最小长度、最大间隔等等。归纳偏好是机器学习算法的基本性能度量。根据 **NFL** 定理，我们可以知道，不论在什么样的情况下，学习算法$\mathfrak{L}_{A}$与$\mathfrak{L}_{B}$总会在不同的问题当中存在其各自的优势，而并非总有一种 **Learning Algorithm** 是最好的。这就是 **NFL** 定理的含义。 当然，再好的机器学习算法，如果脱离了实际应用，那么都是毫无用处的。面向具体的问题，能够通过输入得到输出的机器学习算法，才是真正有用的机器学习算法。


## 西瓜书 Chapter 2 模型评估与选择
过拟合（**overfitting**）和欠拟合（**underfitting**）：
所谓的过拟合就是：学得模型对训练样本的拟合过度，导致该模型对于训练样本的预测误差很小，但是对于测试样本的预测误差很大。欠拟合就是：学得模型对训练样本的拟合不足，导致该模型对于训练样本和测试样本的预测误差都很大。过拟合和欠拟合都是机器学习中的常见问题，也是机器学习中的基本挑战之一。解决过拟合和欠拟合的方法有很多，例如：增加训练样本、降低模型复杂度、正则化等等。

为了更好的选择模型通常通过一定的评估方法进行模型的选择与判定又有一些评估方法：
例如：
1. 留出法：将数据集划分为两个互斥的集合，其中一个集合作为训练集，另一个集合作为测试集。在训练集上训练出模型，在测试集上评估模型的测试误差，作为对泛化误差的估计。留出法的优点是：简单、直接、不需要重复地训练模型。缺点是：划分的训练集和测试集的数据分布可能有差别，从而影响模型的评估结果。
2. 交叉验证法：将数据集划分为k个大小相似的互斥子集，每个子集都尽可能保持数据分布的一致性，即从数据集中通过分层采样得到。然后每次用k-1个子集的并集作为训练集，余下的那个子集作为测试集，这样就可以获得k组训练/测试集，从而可以进行k次训练和测试，最终返回的是k个测试结果的均值。交叉验证法的优点是：所有的样本都被作为了训练集和测试集，每个样本都被验证了一次。缺点是：训练和测试需要进行k次，有时候会比较耗时。
交叉验证法这里可以参考天池竞赛（[首届世界科学智能大赛：量子化学赛道——分子属性预测B赛道](https://tianchi.aliyun.com/competition/entrance/532115/rankingList)）

具体的操作流程如下：
>1、K折交叉验证会把样本数据随机的分成K份；
2、每次随机的选择K-1份作为训练集，剩下的1份做验证集；
3、当这一轮完成后，重新随机选择K-1份来训练数据；
4、最后将K折预测结果取平均作为最终提交结果。

其中的代码：

```python
def catboost_model(train_x, train_y, test_x, seed = 2023):
    folds = 5
    kf = KFold(n_splits=folds, shuffle=True, random_state=seed)
    oof = np.zeros(train_x.shape[0])
    test_predict = np.zeros(test_x.shape[0])
    cv_scores = []
    
    for i, (train_index, valid_index) in enumerate(kf.split(train_x, train_y)):
        print('************************************ {} ************************************'.format(str(i+1)))
        trn_x, trn_y, val_x, val_y = train_x.iloc[train_index], train_y[train_index], train_x.iloc[valid_index], train_y[valid_index]
        
        params = {'learning_rate': 0.1, 
                  'depth': 6, 
                  'bootstrap_type':'Bernoulli',
                  'random_seed':2023,
                  'od_type': 'Iter', 
                  'od_wait': 200, 
                  'allow_writing_files': False,       
                  'task_type':"GPU",  # 任务类型，表示模型运行在GPU还是CPU上。设置为"GPU"表示模型运行在GPU上，如果计算机没有GPU，可以设置为"CPU"。
                  'devices':'0:1'}
        
        #iterations是迭代次数，可以根据自己的算力配置与精力调整
        model = CatBoostRegressor(iterations=10000, **params)
        model.fit(trn_x, trn_y, eval_set=(val_x, val_y),
                  metric_period=500,
                  use_best_model=True, 
                  cat_features=[],
                  verbose=1)

        val_pred  = model.predict(val_x)
        test_pred = model.predict(test_x)
        
        oof[valid_index] = val_pred
        test_predict += test_pred / kf.n_splits
        
        score = mean_absolute_error(val_y, val_pred)
        cv_scores.append(score)
        print(cv_scores)
        
        # 获取特征重要性打分，便于评估特征
        if i == 0:
            fea_ = model.feature_importances_
            fea_name = model.feature_names_
            fea_score = pd.DataFrame({'fea_name':fea_name, 'score':fea_})
            fea_score = fea_score.sort_values('score', ascending=False)
            fea_score.to_csv('feature_importances.csv', index=False)
        
    return oof, test_predict
cols = [f for f in test_df.columns if f not in ['elements','energy','mol_name','elements','istest']]
cat_oof, cat_test = catboost_model(train_df[cols], train_df['energy'], test_df[cols]) 
```
