# JS随机
1. package.json文件中的`devDependencies`和`dependencies`
    - `devDependencies`: 开发时候需要的模块。模块只用于开发环境，不用于生产环境
    - `dependencies`: 程序跑起来需要的模块，没有这个模块程序跑不了。需要发布到生产环境

2. Vue字符串模板：
    + 通过组件选项里用`template: “ ”`指定的模板
    ```javascript
    var p = new Vue({
        template: '<MyComponent></MyComponent>'
    });
    ```
    + 在单文件组件里用`<template><template/>`指定的模板
    ```html
    <template v-if="ok">
        <h2>Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </template>
    ```

3. 事件捕获和事件冒泡
    + 事件捕获：事件从最上一级标签开始往下查找，直到捕获到事件目标(`target`)。即如果点击时，最上层绑定的点击事件先触发。从上到下
    + 事件从事件目标(`target`)开始，往上冒泡直到页面的最上一级标签。在W3C模型中，这是事件触发的标准过程。从下往上

4. `$.fn.extend()` 和 `$.extend()`
    - `$.fn`是指jquery的命名空间，而且`$.fn` === `$.prototype`，加在`$.fn`上的方法和属性，会对每一个jquery实例有效。在实例化一个jQuery对象的时候，它就具有了通过`$.fn.extend()`扩展的方法
    ```javascript
    $.fn.extend({
        alertWhileClick:function() {
              $(this).click(function(){
                     alert($(this).val());
               });
         }
    });
    $("#input1").alertWhileClick();
    ```
    - `$.extend()`
        - 为jQuery类添加类方法，可以理解为添加静态方法
        ```javascript
        $.extend({
            min: function(a, b) { return a < b ? a : b; },
            max: function(a, b) { return a > b ? a : b; }
        });
        $.min(2,3); //  2
        $.max(4,5); //  5
        ```
        - 用一个或多个其他对象来扩展一个对象，返回被扩展的对象
        ```javascript
        var settings = { validate: false, limit: 5, name: "foo" };
        var options = { validate: true, name: "bar" };
        jQuery.extend(settings, options); //settings == { validate: true, limit: 5, name: "bar" }
        ```

5. 理解`(function(){... })()`
    - 立即执行的匿名函数
    - 作用：使用这种技术可以模仿一个私有作用域，用匿名函数作为一个“容器”，“容器”内部可以访问外部的变量，而外部环境不能访问“容器”内部的变量，所以`(function(){…})()`内部定义的变量不会和外部的变量发生冲突，俗称“匿名包裹器”或“命名空间”

6. 响应式布局，自适应布局和流式布局
    - 响应式布局：监听屏幕大小变化，随时作出响应的变化，同一页面在不同大小设备呈现不同的效果（rem, em, 百分比, 流布局, 弹性盒flex, bootstrap, 媒体查询)
    - 自适应布局：为不同的屏幕分辨率定义布局，改变屏幕分辨率可以切换不同的静态局部（页面元素位置发生改变），但在每个静态布局中，页面元素不随窗口大小的调整发生变化
    - 流式布局：页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。代表作栅栏系统（网格系统）

7. 网站性能优化(gulp, grunt, webpack)
    - HTTP请求数减少：
        + 减少资源文件的下载：gulp之类的工具压缩图片，css sprite图
        + 用localStroage将常用的数据存储起来
    - 减少文件体积：
        + 图片转为base64位的格式
        + 用lazylaod增强用户体验性（多图片时）
        + 服务器上压缩，CDN加速，服务器缓存
        + 将图标转成字体（iconfont, font-awesome)
        + 代码规范（将重复代码封装起来）
        + css在body上，js在body下，使用`<link>`不用`@import`
        + 压缩js, css, 合并js

8. GET和POST方法的区别
    - 数据存放位置不同（GET:url.query, POST:request.body)
    - 数据存储大小（GET是2KB以下）
    - 安全性（GET的数据会被浏览器缓存起来，POST数据会放在request.body里面作为HTTP消息的实体内容发给Web服务器）
    - GET处理效率高
    - 发送一个请求来取得服务器上的某一资源
    - 提交表单数据或附加新的数据通常用POST方法

9. 浏览器内核（渲染引擎和JS引擎）
    1. Trident内核：IE，不开源，只能用于Windows平台
    2. Gecko内核：firefox，开源，跨平台
    3. Webkit内核：Safari, 曾经的Chrome，开源
    4. Presto内核：Opera
    5. Blink内核：由Google和Opera Software开发的浏览器排版引擎。现在Chrome的内核是Blink，谷歌还开发了自己的JS引擎，V8，使JS运行速度极大地提高

10. HTML5新特性
    - 绘画 `canvas`
    - 用于媒介回放的 `video` 和 `audio` 元素
    - 本地离线存储 `localStorage` 长期存储数据，同源窗口能分享数据，浏览器关闭后数据不丢失
    - `sessionStorage` 的数据在浏览器关闭后自动删除，同源不分享
    - 语意化更好的内容元素，比如`article`、`footer`、`header`、`nav`、`section`
    - 表单控件，`calendar`、`date`、`time`、`email`、`url`、`search`、`number`
    - 新的技术`webworker`, `websocket`, `Geolocation`
    - IE8/IE7/IE6支持通过`document.createElement`方法产生的新标签，也可以直接使用成熟的框架，比如`html5shim`
11. `localStorage`, `sessionStorage`, `cookie`, `session`
    - `cookie`: 网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密），4KB左右，有时效性，始终在同源HTTP请求中携带，即会在浏览器和服务器来回传递;
    - `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存;
    - `sessionStorage`和`localStorage`存储大小可以达到5M或更大;
    - `sesstion`: 服务器可以为每个用户浏览器创建一个会话对象（`session`对象）。一个浏览器独占一个session对象。Session对象由服务器创建
12. HTMl5的离线存储
    - 在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。离线缓存可加快页面的访问速度
    - 原理：HTML5的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件解析清单上的离线存储资源，这些资源就会像`cookie`一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示
    - 使用：
        + 页面头部加入一个`manifest`的属性；
        + 在`cache.manifest`文件中编写离线存储的资源
        + 在离线状态时，操作`window.applicationCache`进行需求实现
        ```html
        CACHE MANIFEST
        #v0.11
        CACHE:
        js/app.js
        css/style.css
        NETWORK:
        resourse/logo.png
        FALLBACK:
        / /offline.html
        ```

13. WEB标准和W3C标准
    - 标签闭合
    - 标签小写
    - 不乱嵌套
    - 使用外链css和js
    - 结构表现行为的分离

14. HTML全局属性(global attribute)有哪些
    - `class`: 为元素设置类标识
    - `data-*`: 为元素增加自定义属性
    - `draggable`: 设置元素是否可拖拽
    - `id`: 元素id，文档内唯一
    - `lang`: 元素内容的的语言
    - `style`: 行内css样式
    - `title`: 元素相关的建议信息

15. 网页验证码介绍和作用
    - 区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水
    - 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试

16. BFC(块级格式化上下文)
    - 它决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用
    - 创建规则：
        + 根元素
        + 浮动元素（`float`不是`none`）
        + 绝对定位元素（`position`取值为`absolute`或`fixed`）
        + `display`取值为`inline-block`,`table-cell`, `table-caption`,`flex`, `inline-flex`之一的元素
        + `overflow`不是`visible`的元素（`hidden`，`auto`，`scroll`）
    - 作用：
        + 可以包含浮动元素
        + 不被浮动元素覆盖
        + 阻止父子元素的`margin`折叠

17. css3新特性
    - 新增各种css选择器
    - 圆角 `border-radius`
    - 多列布局
    - 阴影和反射
    - 文字特效`text-shadow`
    - 线性渐变
    - 旋转`transform`
    - 过渡`transtion`
    - 动画`animate`

18. 标准的CSS盒子模型和低版本IE盒子模型
    - 有两种，IE盒子模型、W3C盒子模型；
    - 盒模型：内容(`content`)、填充(`padding`)、边界(`margin`)、 边框(`border`)；
    - 区 别：IE的`content`部分把 `border` 和 `padding`计算了进去;
    - 加 `doctype` 声明即可解决盒子兼容问题

19. `display:inline-block` 什么时候不会显示间隙？
    - 元素间留白间距出现的原因就是标签段之间的空格，所以可以移除空格
    - 使用 `margin` 负值
    - 父元素使用`font-size:0`
    - 无标签闭合去除
    - letter-spacing(字符间距)，父元素设负值，当前元素设为0
    - word-spacing(单词间距)，父元素设负值，当前元素设为0

20. `::before` 和 `:after`中双冒号和单冒号区别
    - 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素
    - 用于区分伪类和伪元素

21. 可以改变页面布局的属性
    - position、display、float、width、height、margin、padding、top、left、right、bottom

22. 弹性盒flex
    - Webkit 内核的浏览器，必须加上`-webkit`前缀
    ```html
    .box{
      display: -webkit-flex; /* Safari */
      display: flex;
    }
    ```
    - 容器的属性
        + `flex-direction`属性决定主轴(main axis)的方向（即项目的排列方向）
        ```html
        .box {
          flex-direction: row(默认，水平) | row-reverse | column(垂直) | column-reverse;
        }
        ```
        + `flex-wrap`属性定义，如果一条轴线排不下项目，如何换行
        ```html
        .box{
           flex-wrap: nowrap(默认，不换行) | wrap(换行，第一行在上面) | wrap-reverse;
        }
        ```
        + `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`
        ```html
        .box {
          flex-flow: <flex-direction> || <flex-wrap>;
        }
        ```
        + `justify-content`属性定义了项目在主轴上的对齐方式
        ```html
        .box {
          justify-content: flex-start(默认，左对齐) | flex-end(右对齐) | center(居中) | space-between(两端对齐，项目之间的间隔都相等) | space-around(每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍);
        }
        ```
        + `align-items`属性定义项目在交叉轴上如何对齐
        ```html
        .box {
          align-items: flex-start | flex-end | center | baseline(项目的第一行文字的基线对齐) | stretch(默认，如果项目未设置高度或设为auto，将占满整个容器的高度);
        }
        ```
        + `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
        ```html
        .box {
          align-content: flex-start | flex-end | center | space-between | space-around | stretch(默认，轴线占满整个交叉轴);
        }
        ```
    - 容器内项目的属性
        + `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
        ```html
        .item {
          order: <integer>;
        }
        ```
        + `flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
        ```html
        .item {
          flex-grow: <number>; /* default 0 */
        }
        ```
        + `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
        ```html
        .item {
          flex-shrink: <number>; /* default 1 */
        }
        ```
        + `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小
        ```html
        .item {
          flex-basis: <length> | auto; /* default auto */
        }
        ```
        + `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选
        ```html
        .item {
          flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
        }
        ```
        + `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为auto
        ```html
        .item {
          align-self: auto | flex-start | flex-end | center | baseline | stretch;
        }
        ```

23. IE6兼容性
    - IE6怪异解析之padding与border算入宽高。解决方法：加入文档声明`<!doctype html>`
    - 在块元素左右浮动时、设定marin时造成margin双倍（双边距）。解决方法：`display:inline`
    - 内部盒模型超出父级时，父级被撑大。解决方法：父标签使用`overflow:hidden`
    - 标签高度无法小于19px。解决方法：`overflow: hidden;`
    - img于块元素中，底边多出空白。解决方法：父级设置`overflow: hidden;` 或 `img{display: block;}` 或 `margin-bottom: -5px;`
    - li之间会有间距。解决方法：`float: left;`
    - 使容器居中`margin: 0 auto;`在IE6是行不通的；对父容器使用`text-align: center;`
    - 块元素中有文字及右浮动的行元素，行元素换行。解决方法：将行元素置于块元素内的文字前
    - IE6 不支持`min-height`属性，但它却认为`height`就是最小高度。解决方法：使用ie6不支持但其余浏览器支持的属性`!important`
    ```css`
    container {min-height:200px; height:auto !important; height:200px;}
    ```
    - IE6背景闪烁。解决方法：`document.execCommand("BackgroundImageCache",false,true);`

24. 浏览器兼容性
    - `margin` 和 `padding`
    - 图片默认有间距 => 使用float为img布局
    - 透明度
    ```html
    .name {
        fiter: alpha(opacity=80); /* IE  */
        oapcity: .8;        /* 支持CSS3的浏览器 */
    }
    ```
25.JS兼容性
    - 获取目标对象的方法不同；获取目标元素的方法也不同
    ```javascript
    box.onclick = function(evt){
        var oEvent = evt || window.event;       //evt是标准获取，window.event是IE的
        //获取目标元素
        oEvent.srcElement; //IE
        oEvent.target;  //标准
    }
    ```
    - 在IE中不能操作tr的`innerHTML`
    - 标准绑定事件：`addEventListener;`，而IE使用的是`attachEvent;`
    - 获取style标签中的CSS样式值
    ```javascript
    var style = window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;        //后面的是为了兼容IE8及以下的版本
    ```
    - 封装函数来创建XHR对象（兼容性写法）：
    ```javascript
    function createXHR(){
        if(window.XMLHttpRequest){  //IE7+, google, firefox, safari
            return new XMLHttpRequest();
        }else{  // IE6以下
            return new ActiveObject('Microsoft.XMLHTTP');
        }
    }
    ```

26. jQuery特点：链式操作，选择器， 过滤器， DOM操作， 动画， AJAX， 开源
27. 事件代理
    - 事件代理，又称之为事件委托。“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。
    - 使用事件代理的好处是可以提高性能。可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件
    - 可以实现当新增子对象时无需再次对其绑定
28.

