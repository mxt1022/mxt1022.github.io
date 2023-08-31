# 科学计算软件`Mathematica`使用教程

## Chapter 1

### 1.1 Mathematica 基本介绍：

`Mathematica` 是一个科学计算软件，可以通过用户人为地输入`Input`(例如：1+1)，获取输出`Output`（例如：2，`1+1=2`）

1. 常规计算：$\mathbf{+、-、*、/}$
2. 精确答案：直接输入相关内容+'sheft+enter'即可
3. 近似答案：使用$\textbf{N[...]}$函数，如果想要精确到小数点后几位：需要在$N[...]$函数当中添加第二个参数，例如：$\textbf{N[718/3,5]}$，表示一共保留5位<font color='red'>（注意和保留到小数点后N位进行区分）Ps:详见实用教程指南P4</font> 使用自由格式输入计算可以获取相关的所有计算结果

### 1.2 相关的函数
1. 清楚变量定义： $\textbf{Clear[...]}$ 可以清楚变量的定义（如赋值语句）将a置于无定义状态
    
    eg: $\textbf{Clear[a]}$ 可将a置于无定义状态（清楚先前的赋值）

2. 代数表达式展开：$\textbf{Expand[...]}$ 可以进行函数表达式的展开
    
    eg: $\textbf{Expand[(x+y)^2]}$ 输出结果为：$\mathbf{x^2+2xy+y^2}$

3. 解方程：$\textbf{Solve[...]}$ 可以解方程(不管是一元一次方程或者二元一次方程组都可)
    
    eg: $\mathbf{Solve[2x-7==0,x]}$ 输出结果为：$\mathbf{{x}\to{\frac{7}{2}}}$ 其表明在该方程当中,x作为参数<font color='red'>注意使用双等号（单等号在计算机当中表示赋值）</font>

4. 求解方程解的近似值：$\textbf{NSolve[...]}$ 可以求解方程解的近似值
    
    eg: $\mathbf{NSolve[2x-7==0,x]}$ 输出结果为：$\mathbf{{x}\to{3.5}}$
5. 绘制方程函数：$\textbf{Plot[...]}$ 可以对与方程进行绘制，其中第一个参数为方程，第二个参数为变量，第三个参数为变量的取值范围
    
    eg: $\textbf{Plot[2x-7,{x,-10,10}]}$
    Ps: $Plot3D[...]$ 可以绘制三维图像

6. 生成数值列表（通常被用于数据处理当中）：$\textbf{Table[...]}$ 可以生成数值列表，第一个参数为变量，第二、三个参数为变量的取值范围
    
    eg: $\mathbf{Table[i^2,\{i,1,5\}]}$
<font color='red'>Ps: $\%$表示上一次计算/上一个输出单元，执行上一次计算，但是不一定是紧挨着的上一个计算，用$\%$指代之前的结果重新计算</font>

7. 计算求和：$\textbf{Total[...]}$
8. 画散点图：$\textbf{ListPlot[...]}$
9. 不定积分计算：$\textbf{Integrate[...]}$

    eg: $\mathbf{Integrate[x^2,x]}$ 输出结果为：$\mathbf{\frac{x^3}{3}}$
10. 计算矩阵的行列式：$\textbf{Det[...]}$

    eg：$\mathbf{Det[\{\{1,2\},\{3,4\}\}]}$ 输出结果为：$\mathbf{-2}$
11. 计算矩阵的逆：$\textbf{Inverse[...]}$


## Chapter 2

### 2.1 Mathematica项目示例：
eg: 世界上哪一个地方的人寿命最长（p11）

