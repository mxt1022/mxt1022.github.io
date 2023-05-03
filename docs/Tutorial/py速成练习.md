# py速成练习

### DAY 1. 循环输出

1. 直接输出：

   ```python
   for i in range(2000,3201):
   	if(i%7==0 and i%5!=0):
   		print(i,end=',')#具体设置是由Print的参数决定
   #print 参数：print(*bojects,sep=' ',end='n',file=sys.stdout)
   ```

   object：一次输出的对象（可以多个）

   sep：多个对象的间隔值

   end：设定以什么东西结尾（结尾符号）

   file：要写入的文件对象

2. 通过列表：

   ```python
   l=[]
   for i in range(2000,3201):
       if(i%7==0 and i%5!=0):
           l.append(str(i))
   print(','.join(l))
   ```

3. 利用print多对象输出：
   ```python
   print(*(i for i in range(2000,3201) if(i%7==0 and i%5!=0)),sep=',')
   #类似
   i
   for i in range():
       if():
           print
   ```


### DAY 2. 列表输入

1. 有分隔符的输入：

   ```python
   input().split('sep')
   #spe为分隔符，输入一个List
   list.tuple()
   #转换成tuple元组
   ```

2. 类定义：

   ```python
   class io:
       def getstr(self):
           self.s=input()
       def prtstr(self):
           print(self.s.upper())
   
   t=io()
   t.getstr()
   t.prtstr()
   ```

3. 列表计算

   ```python
   #直接用列表算
   from math import sqrt
   c,h=50,30
   
   def cal(temp):
       return sqrt((2*c*temp)/h)
   
   l=input().split(',')
   for i in range(0,len(l)):
       if i!=len(l)-1:
           print((int)(cal(int(l[i]))),end=',')
       else:
           print((int)(cal(int(l[i]))))
      
   #solution: 用一个新的list存储结果再输出
   from math import sqrt
   C,H = 50,30
   
   def calc(D):
       return sqrt((2*C*D)/H)
   
   print(",".join([str(int(calc(int(i)))) for i in input().split(',')]))  
   ```

4. 二维数组：类用vector<>建立二维数组

   ```python
   
   ```
   

### DAY3

1. 字符串数组排序：
   ```python
   for i in l:
       if l.count(i)>1:
           l.remove(i)
   l.sort()
   print(" ".join(l))
   
   
   #答案：
   l=input().split()
   
   for i in l:
       if l.count(i)>1:
           l.remove(i)
   l.sort()
   print(" ".join(l))
   ```

2. python二进制转换为十进制：

   ```python
   l=input().split(',')
   for i in l:
       t=int(i,2)
       if(t%5==0):
           print(i)
   #利用int进行转换，int(字符串，原进制数)
   ```

3. python的数字和字符串转换：
   ```python
   l=[]
   for i in range(2000,2050):
       t=int(i)
       a=int(t%10)#个位
       b=int(t/10%10)#十位
       c=int(t/100%10)#百位
       d=int(t/1000%10)#千位
       if(a%2==0 and b%2==0 and c%2==0 and d%2==0):
           l.append(str(i))
   print(",".join(l))
   ```

4. python统计对应种类字符的数量：
   ```python
   l=input()
   le=0
   di=0
   for i in l:
       if((i<='z' and i>='a')or (i<='Z' and i>='A')):
           le+=1
       if(i<='9' and i>='0'):
           di+=1
   print("LETTERS %d"%le)
   print("DIGITS %d"%di)
   #输出的另一种写法
   print("LETTERS {0}\nDIGITS {1}".format(letter,digit))
   OR
   print(f"LETTERS {letter}\n{digits}") # two different types of formating method is shown in both solution
   
   ```


### Day4

1. 统计大小写个数：
   ```python
   word = input()
   upper,lower = 0,0
   
   for i in word:
       if 'a'<=i and i<='z' :
           lower+=1
       if 'A'<=i and i<='Z':
           upper+=1
   #输出：
   print("UPPER CASE %d\nLOWER CASE %d"%(upper,lower))
   #或者
   print("UPPER CASE {0}\nLOWER CASE {1}".format(upper,lower))
   ```

2. 求a+aa+aaa+aaaa的值，a为输入:

   ```python
   a=int(input())
   sum,t=0,0
   for i in range(1,5):
       t+=a
       sum+=t
       t*=10
   print(sum)
   ```

   

### Day5

1. 对于输入的一串数字对其中的奇数求平方然后添加到列表当中再输出：
   ```python
   l=input().split(',')
   res=[]
   for i in l:
       t=int(i)
       if(t%2==1):
           res.append(str(t*t))
   print(",".join(res))
   ```

2. python按行输入不定长数据：
   ```python
   import sys
   res=0
   while True:
       t=input().split()
       if not t:
           break
       if(t[0]=='D'):
           res+=int(t[1])
       else:
           res-=int(t[1])
   print(res)
   ##答案
   total = 0
   while True:
       s = input().split()
       if not s:            # break if the string is empty
           break
       cm,num = map(str,s)    # two inputs are distributed in cm and num in string data type
   
       if cm=='D':
           total+=int(num)
       if cm=='W':
           total-=int(num)
   
   print(total)
   ```

   

### Day6

1. 打印指定格式的字符：
   ```python
   l=input().split(',')
   def le_l(x):
       re=0
       for j in x:
           if(j>='a' and j<='z'):
               re+=1
       return re
       
   def le_u(x):
       re=0
       for j in x:
           if(j>='A' and j<='Z'):re+=1
       return re
       
   def num(x):
       re=0
       for j in x:
           if(j>='0' and j<='9'):re+=1
       return re
   
   def ch(x):
       re=0
       for j in x:
           if(j=='$' or j=='#' or j=='@'):re+=1
       return re
       
   res=[]
   for i in l:
       if(len(i)>=6 and len(i)<=12):
           if(le_l(i)>=1 and le_u(i)>=1 and num(i)>=1 and ch(i)>=1):
               res.append(i)
   print(','.join(res))
       
   ```

2. python按优先级排序：(此题有点问题)
   ```python
   # 答案代码（ACW上环境无法实现）
   lst = []
   while True:
       s = input().split(',')
       if not s[0]:                          # breaks for blank input
           break
       lst.append(tuple(s))
   
   lst.sort(key= lambda x:(x[0],int(x[1]),int(x[2])))  # here key is defined by lambda and the data is sorted by element priority 0>1>2 in accending order
   print(lst)
   ```


### DAY 7

1. 求0->n之间能整除7的数字：

   ```python
   n=input()
   def cal(x):
       for i in range(0,int(x)+1):
           if(i%7==0):
               print(i)
   cal(n)
   ```

2. 计算经过上下左右四个方向移动之后的欧几里得距离：
   ```python
   import math
   x=0
   y=0
   for i in range(0,5):
       s=input()
       t=[s.split(" ")]
       if(t[0]=="UP"):
           y+=int(t[1])
       elif(t[0]=="DOWN"):
           y-=int(t[1])
       elif(t[0]=="LEFT"):
           x-=int(t[1])
       elif(t[0]=="RIGHT"):
           x+=int(t[1])
       else:
           continue
   print(int(round(math.sqrt(x*x+y*y))))
   ```

### DAY8

1. 统计单词的出现数量：
   ```python
   l=input().split()
   word=sorted(set(l))#对其进行排序，由于是set集合所以不重复
   for i in word:
       print("{0}:{1}".format(i,l.count(i)))
   #使用pprint(本质与上面同理)
   from pprint import pprint
   p=input().split()
   pprint({i:p.count(i) for i in p})
   ```

2. 直接计算平方：

   ```python
   n=input()
   print(int(n)**2)
   # a^b的运算：
   a,b=input().split()
   print(int(a)**int(b))
   ```

3. 打印python的官方文档：
   ```python
   print(str.__doc__)
   print(sorted.__doc__)
   def pow(a,b):
       #this is a pow program
       return int(a)**int(b)
   print(pow(2,3))
   print(pow.__doc__)
   ```

4. 类名与成员变量一致：
   ```python
   class algo:
       name="algo"
       def __init__(self,name):
           self.name=name
   dp=algo("dpp")
   print("{0},{1}".format(dp.name,algo.name))
   merge=algo("me")
   print("{0},{1}".format(merge.name,algo.name))
   
   #输出：
   dpp,algo
   me,algo
   ```

### DAY9

