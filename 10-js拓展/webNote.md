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

