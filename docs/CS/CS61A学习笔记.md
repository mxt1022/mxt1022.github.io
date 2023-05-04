# CS61A学习笔记

## 第一章 Begin

### 1.1 开始：

1. 本文当中作者简单介绍了python3及一些相关的简单操作：

      > 直接计算，导入包，变量赋值，复合表达式等一些基本的操作

2. 较为关键的部分：

    1. 赋值语句：
       ```python
       >>> words = set(shakespeare.read().decode().split())
       ```
       
        `read`（读取）、` decode`（解码）、`split`（拆分）、`set`（集合）
       
    2. 复合表达式：
    
    	```python
    	>>> {w for w in words if len(w) == 6 and w[::-1] in words}
    	{'redder', 'drawer', 'reward', 'diaper', 'repaid'}
    	```

3. 调试（`debug`）：
    
    1. 增量测试：由可以单独测试的小型模块儿化组件构成，测试编写的所有部分。
    2. 隔离错误：先追踪错误最小的部分（先把错误尽可能的缩小到一定的范围），再尝试着修复问题
    3. 检查假设：明确自己的假设，然后集中debug验证自己的假设（程序实际的执行目标）
    4. 咨询他人：让别人查看你的代码的问题

### 1.2 编程要素：





