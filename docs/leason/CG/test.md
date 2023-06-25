# MFC

### `Bresenham`中点划线

###### 参数版：

```c++
int x, y, a, b,d, d1, d2, d;
	int x1 = 10, x2=221, y1=10, y2=90;
	a=y1-y2,b=x2-x1;
	d = 2 * a + b; d1 = 2 * a; d2 = 2 * (a + b);
	x = x1; y = y1;
	pDC->SetPixel(x, y, RGB(0, 23, 23));
	while (x<x2){
		x += 1;
		if (d<0){
			y++;
			d += d2;
		}
		else{
			d += d1;
		}
		pDC->SetPixel(x, y, RGB(0, 23, 23));
	}
```

###### 函数版：

```c++
void midpointline(int x1,int y1,int x2,int y2,int color,CDC *pDC){
	int x, y, a, b,d, d1, d2, d;a=y1-y2,b=x2-x1;
	d = 2 * a + b; d1 = 2 * a; d2 = 2 * (a + b);
	x = x1; y = y1;
	pDC->SetPixel(x, y, RGB(0, 23, 23));
	while (x<x2){
		x += 1;
		if (d<0){
			y++;
			d += d2;
		}
		else{
			d += d1;
		}
		pDC->SetPixel(x, y, RGB(0, 23, 23));
	}
}
```

### `DDA`算法

###### 参数版：

```c++
int x1 = 0, y1 = 0, x2 = 255, y2 = 255, x;
	float k, dx, dy, y = y1;
	dx = x2 - x1, dy = y2 - y1; k = dy / dx;
	for (x = x1; x <= x2; x++){
		pDC->SetPixel(x, (int)(y + 0.5), RGB(0, 0, 255));
		y += k;
	}
```

```c++
int x,x1=10,x2=255,y1=10,y2=90;
	float k, dx, dy, y = y1;
	dx = x2 - x1, dy = y2 - y1, k = dy / dx;
	for (x = x1; x <= x2; x++){
		pDC->SetPixel(x, (int)(y + 0.5), RGB(0, 0, 0));
	}
```

###### 函数版：

```c++
void dda(int x1,int x2,int y1,int y2,int color,CDC*pDC){
	float k,dx,dy,y=y1;
    dx=x2-x1,dy=y2-y1;k=dy/dx;
    for(x=x1;x<=x2;x++){
		pDC->SetPixel(x,(int)(y+0.5),RGB(0,0,0));
        y+=k;
    }
}
```

### `WU反走样算法`

###### 参数版：

```c++
int x, y, a, b, d1, d2, d;
	int x1 = 0, x2 = 255, y1 = 0, y2 = 255;
	float k, e;
	int color = RGB(23, 23, 23);
	k = 1.0*(y2 - y1) / (x2 - x1);
	e = 0.0;
	x = x1, y = y1;
	pDC->SetPixel(x, y,color);
	while (x < x2){
		x++;
		e += k;
		if (e >= 1){
			y += 1;
			e -= 1;
		}
		pDC->SetPixel(x, y, e*color);
		pDC->SetPixel(x, y, (1 - e)*color);
	}
```

###### 函数版：

```c++
void dda_wu(int x1,int y1,int x2,int y2;int color,CDC* pDC){
	float k,e,dx,dy;
    dx=x1-x2,dy=y1-y2;
    e=0.0,k=dy/dx;
    int x=x1,y=y1;
    pDC->SetPixel(x,y,color);
    while(x<=x2){
		x++;
        e+=k;
        if(e>=1){
			y++;
            e-=1;
        }
       	pDC->SetPixel(x,y,e*color);
        pDC->SetPixel(x,y,(1-e)*color);
    }
}
```

### `1/8圆画法`

###### 函数版：

```c++
void midpointcircle(int xc,int yc,int r,int color,CDC*pDC){//中点划线（这里是2*x+3和2*(x-y)+5）
    int x=0,y=r,d=1-r;
    WholeCircle(xc,yc,x,y,color);
    while(x<=y){
        if(d<0){
            d+=2*x+3;
            x++;
        }
        else{
            d+=2*(x-y)+5;
            x++;
            y--;
        }
        WholeCircle(xc,yc,x,y,color)
    }
}
void WholeCircle(int xc,int yc,int x,int y,int color,CDC*pDC){//改变的只有后面的参数
	pDC->SetPixel(xc+x,yc+y,color);
    pDC->SetPixel(xc-x,yc+y,color);
    pDC->SetPixel(xc+x,yc-y,color);
    pDC->SetPixel(xc-x,yc-y,color);
    pDC->SetPixel(xc+y,yc+x,color);
    pDC->SetPixel(xc-y,yc+x,color);
    pDC->SetPixel(xc+y,yc-x,color);
    pDC->SetPixel(xc-y,yc-x,color);
}
```

### `Bresenham画圆算法`

```c++
void BresenhamCircle(int xc,int yc,int r,int color，CDC*pDC){//d0是3-2*r(后面的更改项分别是前面的两倍，4*x+6和4*(x-y)+10)
	int x=0,y=r,d=3-2*r;
    while(x<y){
		WholeCircle(xc,yc,x,y,color,pDC);
    	if(d<0)d=d+4*x+6;
        else{d=d+4*(x-y)+10;y--;}
         x++;
    }
    if(x==y)WholeCircle(xc,yc,x,y,color,pDC)
}
void WholeCircle(int xc,int yc,int x,int y,int color,CDC*pDC){
	pDC->SetPixel(xc+x,yc+y,color);
    pDC->SetPixel(xc-x,yc+y,color);
    pDC->SetPixel(xc+x,yc-y,color);
    pDC->SetPixel(xc-x,yc-y,color);
    pDC->SetPixel(xc+y,yc+x,color);
    pDC->SetPixel(xc-y,yc+x,color);
    pDC->SetPixel(xc+y,yc-x,color);
    pDC->SetPixel(xc-y,yc-x,color);
}

```

### `椭圆生成算法`：

```c++
void MidpointEllipse(int xc, int yc, int a, int b, int color, CDC*pDC){
	int aa = a*a, bb = b*b;
	int twoaa = 2 * aa, twobb = 2 * bb;
	int x = 0, y = b;
	int dx = 0, dy = twoaa*y;
	int d = (int)(bb + aa*(-b + 0.25) + 0.5);
	WholeEllipse(xc, yc, x, y, color, pDC);
	while (dx<dy){
		x++; dx += twobb;
		if (d<0)d += bb + dx;
		else{
			y--;
			dy -= twoaa;
			d += bb + dx - dy;
		}
		WholeEllipse(xc, yc, x, y, color, pDC);
	}
	d = (int)(bb*(x + 0.5)*(x + 0.5) + aa*(y - 1)*(y - 1) - aa*bb + 0.5);
	while (y>0){//下半段生成
		y--;
		dy -= twoaa;
		if (d>0)d += aa - dy;
		else{
			x++; dx += twobb;
			d += aa - dy + dx;
		}
		WholeEllipse(xc, yc, x, y, color, pDC);
	}
}
void WholeEllipse(int xc, int yc, int x, int y, int color, CDC*pDC){
	pDC->SetPixel(xc + x, yc + y, color);
	pDC->SetPixel(xc - x, yc + y, color);
	pDC->SetPixel(xc + x, yc - y, color);
	pDC->SetPixel(xc - x, yc - y, color);
}
```
`dda算法`

```c++
void dda(int x1,int y1,int x2,int y2,int color,CDC *pDC){
    float k,dx,dy,x,y;
    dx=x1-x2,dy=y1-y2;
    k=1.0*dy/dx;
    y=y1;
    for(int x=x1;x<=x2;x++){
		pDC->SetPixel(x,(int)(y+0.5),color);
    }
}

```

`中点划线算法`

```c++
void midpointline(int x1,int y1,int x2,int y2,int color,CDC* pDC){
    int x,y,a,b,d,d1,d2,dl
        a=y1-y2,b=x2-x1;//a为-\derta{y}
    d=2*a+b;d1=2*a,d2=2*(a+b);
    x=x1;y=y1;//初始的坐标起点
    pDC->SetPixel(x,y,RGB(0,0,0));
    while(x<=x2){
		x+=1;//x自增
        if(d>=0){//如果d>=0说明直线在中点上方，画上面的点，中点变化(d+1-k)->(d+2\derta{x}-2\derta{y})
            y++;
            d+=d2;
        }//否则d<0,画同一个Y的点，y不变，d变化(d-k)->(d-2\derta{y})
        else{
            d+=d1;
        }
    	pDC->SetPixel(x,y,RGB(0,0,0));
    }
}
```

`Wu反走样`

```c++
void dda_wu(int x1,int y1,int x2,int y2;int color,CDC* pDC){//y=kx+b,直线增量为k
	float k,e,dx,dy;
    dx=x1-x2,dy=y1-y2;
    e=0.0,k=dx/dy;
    int x=x1,y=y1;
    pDC->SetPixel(x,y,color);
    while(x<=x2){
		x++;
        e+=k;
        if(e>=1){//确保e的值始终保持在[0,1]之间
			y++;
            e-=1;
        }
       	pDC->SetPixel(x,y,e*color);
        pDC->SetPixel(x,y,(1-e)*color);
    }
}
```

### `二维变换矩阵`

###### 1. 平移矩阵

$$
T=
\left[\begin{array}{c}
1 &0&0\\
0&1&0\\
T_x& T_y &1
\end{array}\right]
$$

注释如下：

$T_x$与$T_y$分别对应着不同方向的平移量，最终的坐标等于$\left(x+T_x,y+T_y\right)$

###### 2. 比例变换矩阵

$$
T=
\left[\begin{array}{c}
S_x &0 &0\\
0& S_y& 0\\
0& 0& 1
\end{array}\right]
$$

注释如下：

$S_x与S_y$均为比例系数，即最终的坐标为$\left(x*S_x,y*S_y\right)$

###### 3. 旋转变换矩阵

$$
T=
\left[\begin{array}{c}
\cos\beta& \sin\beta& 0\\
-\sin\beta& \cos\beta& 0\\
0& 0& 1
\end{array}
\right]
$$

注释如下：

根据公式$\begin{cases}x=r\cos\alpha\\y=r\sin\alpha\end{cases}$可以得到$\begin{cases}x'=r\cos(\alpha+\beta)=xcos\beta-y\sin\beta\\y'=r\sin(\alpha+\beta)=xsin\beta-y\cos\beta\end{cases}$所以得出最终的矩阵形式为上述

###### 4. 反射变换矩阵
   具体的正负号要根据 $x'$和$x$，$y'$和$y$的关系决定，可以先写出$x'与x的关系，y'与y的关系$
   eg:
   $x'=-x,y'=-y$
   则变换矩阵为：
   
$$
T=
\left[
\begin{array}{c}
-1&0&0\\
0&-1&0\\
0&0&1
\end{array}
\right]
$$


###### 5. 错切变换矩阵

$$
T=
\left[
\begin{array}{c}
1&b&0\\
c&1&0\\
0&0&1
\end{array}
\right]
$$


错切变换->要看$x、y$的关系

$$
x'=x+cy,y'=bx+y
$$

做错切变换时一定要先，写清楚$x、y$的关系，再写出错切变换矩阵


#### `Bezier曲线的表达式`

##### 1. 一阶Bezier曲线

当给定定点$P_0、P_1$时，曲线上的点$B(t)$可以表示为（实际上为）

$$
B(t)=P_(P_1-P_0)t=(1-t)P_0+tP_1,t\in[0,1]
$$

##### 2. 二阶Bezier曲线

给定定点$P_0,P_1,P_2$

$$
B(t)=(1-t)^2P_0+2t(1-t)P_1+t^2P_2,t\in[0,1]
$$

##### 3. 三阶Bezier曲线

给定定点$P_0,P_1,P_2,P_3$

$$
B(t)=(1-t)^3P_0+3t(1-t)^2P_1+3t^2(1-t)P_2+t^3P_3,t\in[0,1]
$$

具体到时候看题目给定的点的个数，就知道是几阶的了

%未更新部分：椭圆的计算部分（如何计算椭圆的上下分界点）


##### 1. 二次B样条曲线

$$
N_{0,2}(t)=\frac{1}{2}(t-1)^2 \\
$$

$$
N_{1,2}(t)=\frac{1}{2}(-2t^2+2t+1) \\
$$

$$
N_{2,2}(t)=\frac{1}{2}t^2 \\
$$

$$
p_{i,2}(t)=P_{i}·N_{0,2}(t)+P_{i+1}·N_{1,2}(t)+P_{i+2}·N_{2,2}(t),i=0,1,2,···,m\\
$$

$$
p(t)=\frac{1}{2}\left[\begin{array}{c}t^2 & t& 1\end{array}\right]\left[\begin{array}{c}
1& -2& 1\\
-2& 2& 0\\
1& 1& 0
\end{array}\right]
·
\left[
\begin{array}{c}
P_0\\
P_1\\
P_2
\end{array}
\right]
t\in[0,1]
$$

##### 2. 三次B样条曲线

$$
N_{0,3}(t)=\frac{1}{6}(-t^2+3t^2-3t+1)\\%可以联系1331，二次项公式使用
$$

$$
N_{1,3}(t)=\frac{1}{6}(3t^3-6t^2+4)
$$

$$
N_{2,3}(t)=\frac{1}{6}(-3t^3-6t^2+3t+1)\\
$$

$$
N_{3,3}(t)=\frac{1}{6}t^3\\
$$

$$
p_{1,3}(t)=P_i·N_{0,3}(t)+P_{i+1}·N_{1,3}(t)+P_{i+2}·N_{2,3}(t)+P_{i+3}·N_{3,3}(t),t=0,1,2,···,m\\
$$

$$
i=0段曲线为：
p(t)=\frac{1}{6}\left[\begin{array}{c}
t^3& t^2& t& 1
\end{array}\right]
·
\left[\begin{array}{c}
-1& 3& -3& 1\\
3& -6& 3& 0\\
-3& 0& 3& 0\\
1& 4& 1& 0
\end{array}\right]
·
\left[
\begin{array}{c}
P_0\\
P_1\\
P_2\\
P_3
\end{array}
\right],
t\in[0,1]
$$



#### `种子填充算法`
```c++
void fill4(int seedx,int seedy,int fcolor,int bcolor,CDC*pDC){
	int current=pDC->GetPixel(seedx,seedy);
    if((current!=bcolor)&&(current!=fcolor)){
        pDC->SetPixel(seedx,seedy,fcolor);
        //下上左右,上减下加，左减右加
        fill4(seedx,seedy+1,fcolor,bcolor,pDC);
        fill4(seedx,seedy-1,fcolor,bcolor,pDC);
        fill4(seedx-1,seedy,fcolor,bcolor,pDC);
        fill4(seedx+1,seedy,fcolor,bcolor,pDC);
       }
}
//如果是八邻域的种子填充：
void fill8(int seedx,int seedy,int fcolor,int bcolor,CDC*pDC){
	int current=pDC->GetPixel(seedx,seedy);
    if((current!=bcolor)&&(current!=fcolor)){
		pDC->SetPixel(seedx,seedy,fcolor);
        //上下左右，左上，右上，左下，右下
        fill8(seedx,seedy-1,fcolor,bcolor,pDC);
        fill8(seedx,seedy+1,fcolor,bcolor,pDC);
        fill8(seedx-1,seedy,fcolor,bcolor,pDC);
        fill8(seedx+1,seedy,fcolor,bcolor,pDC);
        fill8(seedx-1,seedy-1,fcolor,bcolor,pDC);
        fill8(seedx+1,seedy-1,fcolor,bcolor,pDC);
        fill8(seedx-1,seedy+1,fcolor,bcolor,pDC);
        fill8(seedx-1,seedy+1,fcolor,bcolor,pDC);
    }
}
//询问堆栈当中最多有几个像素的时候，需要从头开始一个一个进入堆栈，进行判定（人工循环）。
//注意堆栈是不走到头不退栈的
```

$t·P_a+(1-t)·P_b，或者形式为：P_1+(P_2-P_1)·t$
