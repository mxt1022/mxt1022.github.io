# 二维码的识别与生成

### 所需要使用到的库

> 1. pyzbar（该库负责主要的二维码识别，并且可以获得相关的信息，需要自行安装）
> 2. webbrowser（该库负责打开对应的网站，不需要额外安装）

### 项目源码

```python
import cv2 as cv
from pyzbar.pyzbar import decode
import webbrowser#跳转到网站链接

data=['link']#二维码链接,至少有一个元素

#img= cv.imread("test.jpg")
cap=cv.VideoCapture(0)
#二维码标点
while True:
    success,img=cap.read()
    code=decode(img)
    #print(code)
    for qr in code:
        qr_data = qr.data.decode('utf-8')
        #print(qr_data)  # b：字节为单位，需要转换
        if (qr_data!=data[-1]):#与最后一个不一样，加载到列表，否则是一个false
            data.append(qr_data)
            webbrowser.open(qr_data)
            print(data)

        point = qr.rect

        #画矩形框，显示网站链接
        cv.rectangle(img, (point[0], point[1]), (point[0] + point[2], point[1] + point[3]), (200, 20, 200), 5)
        cv.putText(img, qr_data, (point[0] - 20, point[1] - 20), cv.FONT_HERSHEY_COMPLEX_SMALL, 0.8, (20, 0, 255))

    cv.imshow("output", img)
    #如果按下ESC，终止
    if cv.waitKey(1) & 0xFF ==27:
        break

```

### 具体画框效果：

![image-20230513172553804](https://unlome.oss-cn-beijing.aliyuncs.com/img/image-20230513172553804.png)

### 项目反馈：

1. 该项目是一个简单的python-opencv项目，适合与了解python与opencv库之后自己动手实践
2. 此项目也反映了一般的cv项目流程，从图片->摄像头，从图片到视频，逐帧进行图像处理
