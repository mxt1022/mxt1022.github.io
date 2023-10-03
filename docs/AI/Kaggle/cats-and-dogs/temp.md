# kaggle 猫狗识别学习

## 环境配置
>全程使用kaggle notebook, GPU:T4*2,python

## 环境依赖
```python
# Basic 基本的依赖包，用于数据处理
import os
from os import makedirs
from os import listdir
from shutil import copyfile
from random import seed
from random import random
import numpy as np
import pandas as pd

# visuals 可视化相关的安装包，在整个流程当中可能会用到一些数据可视化进行数据分析
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.image import imread
from PIL import Image

# Scikit-learn 机器学习相关的包，用于数据预处理，模型训练，模型评估等
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report,confusion_matrix,ConfusionMatrixDisplay

# Tensorflow 深度学习相关的包，用于模型的构建，训练，评估等
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Dense,MaxPooling2D,Dropout,Flatten,BatchNormalization,Conv2D
from tensorflow.keras.callbacks import ReduceLROnPlateau,EarlyStopping
```