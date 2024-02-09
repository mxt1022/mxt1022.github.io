# Data_Clearning
数据残缺（乱码），对于使用无关的数据，

## 数据残缺处理（`NaN`和`None`）
### Ex1 
房价预测
导入数据集之后，先通过.head()函数检查是否有列存在空值（`NaN` 或者 `None`）
eg:
```python
# modules we'll use
import pandas as pd
import numpy as np

# read in all our data
sf_permits = pd.read_csv("../input/building-permit-applications-data/Building_Permits.csv")

# set seed for reproducibility
np.random.seed(0) 
```
导入数据之后通过以下代码进行检查：
```python
sf_permits.head()
```
会显示前五行的数据，如果有空值，会显示`NaN`或者`None`。

### Ex2
计算异常值的总数
使用(`.is_null.sum()函数`)如下代码：<font color='red'>（在上述情景）</font>
```python
sf_permits.isnull().sum()#计算空值的总数
sf_permits
```
计算异常值的百分比
```python
# TODO: Your code here!
percent_missing = sf_permits.isnull().sum()
missing_sum=percent_missing.sum()
all_sum=sf_permits.shape[0]*sf_permits.shape[1]
#或者all_sum=np.product(sf_permits.shape)
percent_missing=(missing_sum/all_sum)*100
```

### Ex3
思考是否数据根本未记录或者不存在
如果是数据不存在，比如需要记录一个没有孩子的人的孩子数量，那么可以用`NaN`进行填充
如果是数据未被记录，可以根据别的信息（其他行或者其他列上面的信息，进行`inputation`，应该是合理的推断）
分析这两种情况的化，需要根据提供的数据介绍（`dataset documentation`）进行合理的分析，例如在一场比赛当中，比赛的剩余时间是肯定会存在的，如果未被记录那么就可以进行推断，然后进行填充，但是对于判罚而言，如果没有被记录，那么就可以用`NaN`进行填充。
这时需要对于数据集的信息（明白具体的数据集的信息）进行进一步的了解。


### Ex4 
处理缺失值（Drop，直接舍去含有缺失值的行列）<font color='red'>平常并不推荐（更推荐花时间逐行分析，了解数据集）</font>
如果直接使用`dropna()`函数，会直接删除含有缺失值的行列，如果使用`dropna(axis=1)`，会删除含有缺失值的列，如果使用`dropna(axis=0)`，会删除含有缺失值的行。
Ps: 可以都试一下，尽可能的保留数据，不要轻易删除数据。
<font color='red' size='6pt'>Ps: 在对数据修改的同时，一定创建一个全新的变量存储而不是直接修改原来的变量</font>

### Ex5
自动填充缺失值
使用`fillna()`函数，可以填充缺失值，例如填充为0，或者填充为平均值，或者填充为中位数等等。
`fillna()函数的具体参数`分别为：fillna(a,[inplace=False])，其中`a`为填充的值，`inplace`为是否直接修改原来的变量。`method`参数可以填充为`ffill`或者`bfill`，分别为前向填充和后向填充。

eg:
```python
# TODO: Your code here
sf_permits_with_na_imputed = sf_permits.fillna(method='bfill',axis=0).fillna(0)
```

## Scaling and Normalization
scaling和normalization是两种不同的数据预处理方法，他们的目的是将数据转换为更适合模型的形式。其中： scaling是将数据转换为更小的范围，而normalization是将数据转换为更统一的范围。
### 二者的区别：
`Scaling`是改变数据的范围，而`Normalization`是改变数据的分布（或者说是改变数据的形状）。
前者是让数据成为`0-1`这种（归一化），而后者是让数据成为`正态分布`这种（标准化）。

eg:

`Scaling`：
```python
# generate 1000 data points randomly drawn from an exponential distribution
original_data = np.random.exponential(size=1000)

# mix-max scale the data between 0 and 1
scaled_data = minmax_scaling(original_data, columns=[0])

# plot both together to compare
fig, ax = plt.subplots(1, 2, figsize=(15, 3))
sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
ax[0].set_title("Original Data")
sns.histplot(scaled_data, ax=ax[1], kde=True, legend=False)
ax[1].set_title("Scaled data")
plt.show()
```
通过这种方法可以使得数据范围保持在`0-1`之间。例如100日元等于1美元，通过这种方法可以使得数据以100日元为单位，转换为1美元为单位。从而更好的进行数据分析。如果不进行归一化，那么数据对于`KNN`与`SVM`两种算法的运行过程当中可能会导致对于100日元和1美元的不同无法区分。

`Normalization`：
```python
# normalize the exponential data with boxcox
normalized_data = stats.boxcox(original_data)

# plot both together to compare
fig, ax=plt.subplots(1, 2, figsize=(15, 3))
sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
ax[0].set_title("Original Data")
sns.histplot(normalized_data[0], ax=ax[1], kde=True, legend=False)
ax[1].set_title("Normalized data")
plt.show()
```

如果需要正态分布的数据进行分析，需要对于数据进行标准化。例如：`线性判别分析(Linear Discriminant Analysis)`和`高斯朴素贝叶斯(Gaussian Naive Bayes)`两种算法对于数据的分布有要求，如果数据不是正态分布，那么这两种算法的运行效果可能会变差。(Ps: 名称中带有高斯的任何方法都可以假设正态分布)

在kaggle的示例当中使用`Box-Cox`方法进行变换

[练习地址：https://www.kaggle.com/code/unlome/notebook8031650b1c/edit](https://www.kaggle.com/code/unlome/notebook8031650b1c/edit)