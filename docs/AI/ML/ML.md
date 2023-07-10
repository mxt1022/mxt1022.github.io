# Machine Learning
## <font color='blue'>1、吴恩达（Coursera）</font>
> Machine Learning is a subset of AI. It is the study of    algorithms and statistical models that computer systems use to perform a specific task without using explicit instructions, relying on patterns and inference instead. It is a field of computer science that gicode-translate

### 1、机器学习概论
AI机器学习涉及到：语言识别NLP，邮件智能分类、优化风力发电、CV进入工厂流水线等方法。
机器学习算法、实用技巧、制作技巧
intake survey  

### 2、什么是机器学习

>Definition about `Machine Learning`
the definition is attributed to Arthur Samuel 
`Machine Learning` is "Field of study that gives computers the ability to learn without being explicitly programmed."

机器学习当中并没有存在有明确的编程。
Arthur Samuel的跳棋程序（通过不断的学习从而可以得知，下一步进行的好坏）机器可以不断的自行模拟从而获得更好的程序过程。
#### 机器学习算法的分类：
1. `Supervised learning` 监督学习（最常用的机器学习算法类）
前两部分的课程(course 1,2)将讲述监督学习这部分
2. `Unsupervised learning` 无监督学习
后两部分的课程(course 3)将讲述无监督学习、推荐系统以及强化学习(Unsupervised learning、Recommender systems、Reinforcement learning)
目前最常见的机器学习种类是：监督学习、无监督学习、推荐系统
建议花费大量时间的地方：应用机器学习算法同样，机器学习的工具也是很重要的（比较重要的就是应用工具、应用技能可以有效地结合起来）<font color='red'>最重要的目标：学会实际上如何开发实用的、有价值的机器学习系统。(学会构建工程系统)</font>

#### 监督学习第一部分
监督学习的本质是：  

$$
x \rightarrow y \\
$$

x->y的映射, x:input，y:out label，会给出相当准确的预测或者猜测输出。  
例如：Input(x)->Output(y)   
email -> spam?(0/1) (提供基于邮件的垃圾邮件过滤器spam filtering)  
audio -> text transcripts（语音识别speech recognition）  
English -> Spanish （机器翻译machine translation）  
ad,user info -> click? (0/1) （智能推荐 online advertising）  
image,radar info(雷达) -> position other cars (sef-driving car)（自动驾驶汽车）  
image of phone -> defect? (0/1) (视觉检查visual inspection)  
-> ：指通过有学习的算法  
首先应训练自己的模型和示例：输入x与正确的答案（label y）模型在了解到足够多的示例后，就可以预测新的输入x的输出y了。  
For example:  
    房价预测(Housing price prediction)  
    假设房屋价格和房屋面积成正比，那么可以通过给出的房屋面积来预测房屋价格。所有的点都会回归于一条线性拟合曲线上。  
监督学习问题：->分类 <font color='red'>（这部分可以参考🍉书第一章节所讲的）</font>  

#### 监督学习第二部分
大题分为两种部分：  
1. 预测x,y的关系，从而可以获得更准确的预测值。（通过学习使得，x可以获得对应相关准确的y）。（<font color='blue'>这种叫做预测</font>）  
2. 分类：For example : 乳腺癌检测    
对于肿瘤的类别进行分类：
Malignant(恶性)：0
Benign(良性)：1
根据肿瘤的大小对于肿瘤的良性、恶性进行分类。 
具体的例子：猫和狗的分类问题。      
也可以是对于数字的分类问题：   
分类与回归不同：分类问题是离散的，回归问题是连续的。        
分类通过不同的区间进行区域划分，在不同条件下组成的多维线性空间（根据输入的变量决定）当中通过判断具体例子的位置，从而进行分类。        
算法必须具备可以拟合边界线的问题（通过数据）        
'Summary:'
监督学习的两种主要类型：回归、分类

