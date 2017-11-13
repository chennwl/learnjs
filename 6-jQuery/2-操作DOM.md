## 操作DOM
- `text()`,`html()`修改Text和HTML
- 修改CSS
    - `css()`
    - `hasClass()`、`addClass()`、`removeClass()`
- `show()`、`hide()`显示和隐藏DOM
- 获取DOM信息
    - `height()`、`width()`获取DOM节点的宽高
    - `attr()`、`removeAttr()`用于操作DOM节点的属性
    ```javascript
    // <div id="test-div" name="Test" start="1">...</div>
    var div = $('#test-div');
    div.attr('data'); // undefined, 属性不存在
    div.attr('name'); // 'Test'
    div.attr('name', 'Hello'); // div的name属性变为'Hello'
    div.removeAttr('name'); // 删除name属性
    div.attr('name'); // undefined
    ```
    - `prop()`类似于`attr()`，但`prop()`对于`checked`这样的属性返回的值会是`true`，更合理
    ```javascript
    var radio = $('#test-radio');
    radio.attr('checked'); // 'checked'
    radio.prop('checked'); // true
    ```
    - 对于`checked`和`selected`这样的属性，用`is()`方法判断会更好
    ```javascript
    var radio = $('#test-radio');
    radio.is(':checked'); // true
    ```
- 操作表单
    - `val()`统一了各种输入框的取值和赋值

### 修改DOM结构
- `append()`把DOM添加到最后，`prepend()`则把DOM添加到最前。除了可以传入HTML片段，还可以传入传入原始的DOM对象，jQuery对象和函数对象
```javascript
// 创建DOM对象:
var ps = document.createElement('li');
ps.innerHTML = '<span>Pascal</span>';
// 添加DOM对象:
ul.append(ps);

// 添加jQuery对象:
ul.append($('#scheme'));

// 添加函数对象:
ul.append(function (index, html) {
    return '<li><span>Language - ' + index + '</span></li>';    //返回一个字符串、DOM对象或者jQuery对象
});
```
- 如果要添加的DOM节点已经存在于HTML文档中，它会首先从文档移除，然后再添加。即用`append()`，可以移动一个DOM节点
- 同级节点可以用`after()`或者`before()`方法
- `remove()`删除DOM节点