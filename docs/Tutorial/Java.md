# 题型分布：
### 判断
书上重点知识点+概念
### 分析题
手写Input,Output，补全代码
### 课后习题


## 第一章
Java特点+地位+开发步骤+编写简单java程序
类定义、类名规范
## 第二章
数据类型、标识符、关键字
格式化输出（了解）、 数组+方法（初始化方法）
按位或、异或、非（位运算）insents of 
## 第三章
if、switch 写计算程序
for/if 计算（5'）
### Chapter4、5
类与对象->面向过程、对象区别，变量声明，面向对象特点+命名
实例变量与类变量的区别（分析/选择考点）
重载/重写区别->体现多态性，类方法、对象构建（new） 传参->引用传递、值传递
抽象类：abstract 抽象定义类关键字与抽象类区分、类方法、接口成员  、default 关键字
继承、多态->继承+接口回调->多态
接口、继承->接口回调 上转型对象<font color='red'>（重点）</font>
成员变量隐藏、方法重写（Cp5）
super、dicks（莫名的东西？？？）、final
自动装箱、拆箱（应该是了解）、课后题
this 、static、package语句使用、import用法、访问权限
写程序

1. 类变量：
	1. 静态变量 static 修饰，加载时会分配空间
		1. 使用方式：**类名.变量名** 
	2. 静态方法：static 修饰
		1. 使用方式：**类名.函数名（）**
Ps：如果不是静态变量/方法，则需要先new一个对象然后才可以使用
例如：
```java
import java.util.Scanner;
public class Main{
	public static void main(String args[]){
		Scanner in = new Scanner(System.in);
	}
}
```
2. public    private：访问权限修饰符
	1. public : 公开的->可直接访问（通过点好进行访问对象当中的成员）
	2. private : 私有的->只能在当前类当中使用，不能被外部引用，其他类引用需要提供公开接口给类调用
3. this ：this时一个关键字（对当前方法的引用）
4. 构造方法：名字与类名相同的方法，可以带参数，但是没有返回值（构造方法支持重载）
	1. 用处：创建对象时进行赋值
	2. 例如 this.name = "张三"
5. 成员变量：类当中、方法体外定义的变量
	1. 类变量：static 修饰（也叫静态变量）
	2. 实例变量： 无 static 修饰
	3. 区别：类变量通常为静态变量，实例变量通常为动态变量，类变量为所有对象共有，实例变量为所属对象单独私有。
4. 重载和重写的区别：<font color='red'>（重载和重写体现了多态性）</font>
	1. 重写：子类当中，重新书写父类当中的方法<font color='red'>方法名、参数、返回值均不变</font>对方法体进行修改/重写，子类函数的访问修饰权限不能少于父类
	2. 重载：同名方法，<font color='red'>参数类型、参数个数/顺序不同</font>对于返回值类型没有要求
		1. 在同一个类中，方法名相同，参数列表不同的多个方法构成方法重载
		2. <font color='red'>Ps : 千万不要通过返回值类型是否相同判断重载</font> 
		3. 重载是类的多态性的体现
5. 抽象类：abstract 修饰的类
	1. 抽象类和普通类的区别：
		1. 抽象方法必须为 public 或者 protected（如果为private，则无法被继承，子类也无法实现该方法），默认public（缺省条件）
		2. 抽象类不能被用来创建对象
		3. 一个类继承一个抽象类，子类必须实现父类的抽象方法。若子类没实现父类的抽象方法，子类也定义为抽象类
	2. 继承/实现 Implance
6. 接口：interface  泛指供别人调用的方法或者函数
	1. 


### Chapter 6
内部类、匿名类、lambada表达式 异常类->前三题<font color='red'>（重点）</font>
内部类：类中进行类声明(类中在进行创建类)
eg：
```java
class test{
	String s;
	public class look{//内部类
		int a;
		String te;
		look(int a,int b){
		}
		void eat(){}
		
	}
}
```

匿名类：
eg:
```java
abstract class Animal{
	public abstract void eat();
}

class C{
	void f(Animal animal){
		animal.eat();
	}

class test{
	public static void main(String args[]){
		Animal ani;
		ani=new C();
		ani.f(new Animal(){//匿名类
			public void eat(){
				System.out.printf("hello");
			}
		})//匿名类
	}
}

```


try{ }  catch{ }      finally{ }
java 反射（非重点）------------未看
### Chapter 7、8
UML类图<font color='red'>（重点）</font>：三元素（类名、变量、方法） +符号+斜体（抽象图）（具体的意义）
1. 抽象类、接口需要斜体——>Ps：接口需要标注（《interface》）
2. 正负号：public +   private  -  protected  \#
3. 书写格式： "+/-/#" +"成员名/方法名(参数)" +"：" +"返回值类型（构造方法不写）"
四种关系：泛化、依赖、继承、     及箭头画法<font color='red'>（重点）</font>
泛化：实线空三角——>子指向父（继承关系）
关联：实现箭头——>A指向B，A中的成员变量用B类型声明
依赖：虚线箭头——>A指向B，A中的方法的参数/返回值类型用B声明
实现：虚线空三角——>A指向B，A实现B接口
开闭原则概念、其他原则
Cp8: 设计模式： 访问者、装饰、工厂、适配器、策略
### Chapter 9 
String 类 方法 正则表达式（了解）   Random类
### Chapter 10、11 
输入输出流、文件读写->读程序题（装饰模式）
bufferreader/bufferwriter
### Chapter 13 
泛型、链表、散列、映射、   
自动拆装箱<font color='red'>（重点）</font>
### Chapter 14（不考）实训+课设
线程、生命期、状态、多线程、编写多线程程序
创建：ranable 接口、子类
### Chapter 16
socket 套接字（maybe） udp数据报（了解）
考试内容\=\=上课内容
CG+作业+课后习题



