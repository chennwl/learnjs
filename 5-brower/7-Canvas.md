## Canvas
- `getContext('2d')`方法可以拿到一个`CanvasRenderingContext2D`对象，所有的绘图操作都需要通过这个对象完成。
```javascript
var ctx = canvas.getContext('2d');      //获得CanvasRenderingContext2D对象
```
- 如果想绘制3D图形则用WebGL规范，`gl = canvas.getContext("webgl");`
- Canvas除了能绘制基本的形状和文本，还可以实现动画、缩放、各种滤镜和像素转换等高级操作。如果要实现非常复杂的操作，考虑以下优化方案：
    - 通过创建一个不可见的Canvas来绘图，然后将最终绘制结果复制到页面的可见Canvas中；
    - 尽量使用整数坐标而不是浮点数；
    - 可以创建多个重叠的Canvas绘制不同的层，而不是在一个Canvas中绘制非常复杂的图；
    - 背景图片如果不变可以直接用`<img>`标签并放到最底层。

