# 01.02数组基础部分

## Python中的数组的增删改查部分
#### 1. 查询访问元素
> 假设存在一个数组$a$，且长度为$n$，则数组中的元素可以通过下标进行访问，下标的范围为$[0,n-1]$，其中$0$表示数组的第一个元素，$n-1$表示数组的最后一个元素。数组的访问时间复杂度为$O(1)$。

```pyython
# 例如从数组a中取出下标为i的元素
def get(a,i):
    if i<0 or i>=len(a):#这里用n也可以，即i>=n，为了保证数组的下标不越界
        return -1#如果出现下标越界就提前返回-1
    return a[i]#如果下标未越界就正常输出
a=[0,1,2,3]
print(get(a,2))#输出2
```
#### 2. 修改元素
> 例如将上述数组$a$中的下标为$i$的元素修改为$x$，则可以通过下面的代码实现，修改元素的时间复杂度为$O(1)$。

```pyython
def change(a,i,x):
    if i<0 or i>=len(a):#同上，进行越界判断
        return -1
    a[i]=x
    return a
a=[0,1,2,3]
print(change(a,2,5))#输出[0,1,5,3]
```
#### 3. 插入元素 
> 假设在上述数组$a$中的下标为$i$的元素后面插入一个元素$x$，则可以通过下面的代码实现，插入元素的时间复杂度为$O(n)$。

```python
def insert(a,i,x):
    if i<0 or i>=len(a):#同上，进行越界判断
        return -1
    a.insert(i,x)
    return a

```

#### 4. 删除元素
> 假设在上述数组$a$中的下标为$i$的元素后面删除一个元素$x$，则可以通过下面的代码实现，删除元素的时间复杂度为$O(n)$。

```python
def delete(a,i):
    if i<0 or i>=len(a):#同上，进行越界判断
        return -1
    a.pop(i)
    return a
```
## 01.02.02

### 练习题目 1
[0066.加一](https://leetcode.cn/problems/plus-one/)
解题步骤：
```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        n=len(digits)
        a=0
        for i in range(n):
            a*=10
            a=a+digits[i]
        a=str(int(a+1))
        res=[]
        for i in range(len(a)):
            res.append(int(a[i]))
        return res

```
解题思路：
1. 将数组中的数字提取出来，组成一个整数，然后+1
2. 将数字转化为数组即可

### 练习题目2 
[0724.寻找数组的中心下标](https://leetcode.cn/problems/find-pivot-index/)

解题步骤：
```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        su=sum(nums)
        res=0
        for i in range(len(nums)):
            su-=nums[i]
            if res==su:
                return i
            res=res+nums[i]
        return -1
```

解题思路：
1. 首先计算数组的总和
2. 遍历数组，计算左侧右侧值的和进行比较即可

### 练习题目3：
[0189.轮转数组](https://leetcode.cn/problems/rotate-array/)
解题步骤：
```python

```
解题思路：

## 01.02.03

### 练习题目3：
[]()
解题步骤：
```python
```
解题思路：

### 练习题目3：
[]()
解题步骤：
```python
```
解题思路：
