1. 绪论：核心知识点、黄色部分、标题
2. 关系数据库：概念、算子+操作2.2、2.3、2.4
3. 关系数据库标准语言SQL：作业+实验<font color='red'>看清题目是关系代数还是SQL</font>
4. 安全性：考察概念
5. 完整性：概念+应用
6. 习题+作业（关系数据库理论：范式、模式分解）
7. 可能考点：7.3、7.4、7.5（概念结构设计、逻辑结构设计、物理结构设计）
8. 应用
9. 效率判断+策略选择




## Chapter 1
## Chapter 2
1. 候选码：值能唯一标识一个元组，子集不能即为候选码
2. 主属性：候选码的属性，非候选码属性为非主属性
	候选码可以唯一标识一个元组，候选码可以为码的组合（eg：学号+课程号 为成绩表的候选码），主属性不可为空
3. 主码：多个候选码时选取其中之一为主码
4. 全码：所有属性为候选码（不可去除）
考点：区分主码/候选码/码
1. 关系模式：$R(U,D,DOM,F)$  R->关系名，U->属性名集合，D->U中属性来自的域，DOM->属性对域的指向集合，F属性域当中的依赖关系集合
2. 算子：选择、投影、并、差、笛卡尔积<font color='red'>基本操作</font>（其他操作可以由基本操作推导）<font color='red'>算子的操作对象和结果都是集合</font>
3. <font color='red'> 完整性约束：实体完整性、参照完整性、用户自定义的完整性</font>，前二者为关系的两个不变性（必须满足的条件）
	1. 实体完整性：规则：主属性不为空
	2. 参照完整性（相容性）：考点（区分参照关系与被参照关系）Ps：往引用方向思考<font color='red'>（一般情况：外码为参照关系，主码为被参照关系）</font>
	3. 用户定义的完整性（一般只作为填空，与上二者同时出现）
4. 关系代数：
	1. 二元运算：交、并、差、笛卡尔积
	2. 专门的关系运算：选择、投影、连接、除（连接=笛卡尔积+选择、）
		1. 连接：
			1. 自然连接
			2. 外连接（保留悬浮元组）（悬浮元组：不存在公共属性被舍弃的元组），保留左边为左外连接，同理右边为右外连接
		2. 除：<font color='red'>难点</font>
			1. $R÷S$的结果为$R-S$的属性的取值
			2. 象集：

Ps：
1. 关系操作中，操作对象和结果都是 <font color='red'>集合</font>
2. <font color='red'>关系数据模型组成要素：数据结构、操作集合、关系完整性约束</font>（Cp 1 内容）
3. 三大模型特点：——>Cp 1 内容（数据模型）
	1. 概念模型（信息模型）：按照用户的观点对数据和信息进行建模主要用于数据库设计 <font color='red'>概念模型首先将现实世界抽象为信息世界，数据库管理系统支持的数据模型再把信息世界转换为机器世界</font>
	3. 逻辑模型和物理模型：（非重点考点 maybe ）
4. <font color='red'>数据是信息的符号表示或者载体</font>，信息是数据的内涵，是数据的语义解释。
5. 同一列的值必须来自同一个域
## Chapter 3
S：供应商、P：零件表、J：工程项目表
```sql
select JNO
from SPJ
where SNO='S1'
```
```sql
select PNAME,COLOR,WEIGHT
from P
```
```sql
select SNAME,CITY
from S
```
```sql
select JNAME
from P,SPJ,S,J
where CITY='上海'
```
```sql
select PNO
from SPJ,S,P
where city='上海'
```
```sql
select PNAME,QTY
from SPJ,P
where JNO='J2',SPJ.PNO=P.pno
```
```sql
select JNO
from SPJ,S
where SPJ.SNO=S.SNO and SPJ.SNO not in(
	select SNO
	from SPJ,S
	where SPJ.SNO=S.SNO and CITY='天津' 
)
```

```sql
select SNO
FROM Student 
where SNO not in(
	select SNO
	from SC
	where CNO='C1'
	group by SNO
)
```

```sql
select 

```

作业5：
```sql
update P
set color='蓝色'
where color ='红色'
select *
from P
```
```sql
update spj
set sno='S3'
where sno='S5' and pno='P6' and jno='J4'
select *
from SPJ
```
```sql
delete 
from SPJ
where SNO='S2'
delete 
from S
where SNO='S2'
select *
from spj
```
```sql
insert 
into SPJ(SNO,JNO,PNO,QTY)
value(S2,J6,P4,200)
select *
from SPJ
```

## Chapter 4

## Chapter 5
1. 完整性：正确性、相容性。完整性是是为了防止数据库中出现不正确的数据
2. 完整性与安全性的区别：
完整性：防止出现不正确的数据，对象：不合语意、不正确的数据
安全性：保护数据库被恶意的破坏，对象：非法用户、非法操作
## Chapter 6
1. 范式：
	1. 第一范式：满足最低要求（不可再分）
	2. 第二范式：第一范式的基础上——>去除<font color='red'>非主属性</font>的部分依赖关系
		1. 函数依赖：A-->B，如果通过A属性（属性组）的值，可以确定唯一的B属性的值，则称B依赖于A
			1. 例如：学号---->姓名    （学号、课程名称 的属性组）-->  分数
	　　2. 完全函数依赖：A-->B   如果A是一个属性组，则B属性值的确定需要依赖A属性组的中所有的属性值
		　　1. 例如：（学号、课程名称）--> 分数
		　　2. 由左端<font color='red'>所有属性</font>可以推得右端
		　　3. <font color='red'>多端可推出一端</font>
	　　3. 部分函数依赖： A-->B   如果A是一个属性组，则B属性值的确定只需要依赖A属性组的中某一些的属性值（第二范式就是消除这个）
		　　1. 例如：（学号 、课程名称）--> 姓名
		　　2. 由左端部份属性可以推出右端
	　　4. 传递函数依赖：A -- >B , B -- >C 如果通过A属性（属性组）的值，可以确定唯一的B属性的值，再通过B属性（属性组）的值，可以唯一确定C属性的值，那么称C传递依赖于A
	3. 第三范式：第二范式的基础上——>去除<font color='red'>非主属性</font>的传递函数依赖
		1. 传递函数依赖：
	4. BC范式：第三范式的基础上——>去除<font color='red'>主属性的部份依赖（P）和主属性的传递函数依赖（T）</font>
关系数据理论练习：

求最小函数依赖集：<font color='red'>重点</font>

## Chapter 7
## Chapter 8

