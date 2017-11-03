## AJAX
- ajax
    - `ajax(url,setting)`函数需要接收一个URL和一个可选的`settings`对象，常用的选项如下：
        - async：是否异步执行AJAX请求，默认为`true`，千万不要指定为`false`；
        - method：发送的Method，缺省为`'GET'`，可指定为`'POST'`、`'PUT'`等；
        - contentType：发送POST请求的格式，默认值为`'application/x-www-form-urlencoded; charset=UTF-8'`，也可以指定为`text/plain`、`application/json`；
        - data：发送的数据，可以是字符串、数组或object。如果是GET请求，data将被转换成query附加到URL上，如果是POST请求，根据`contentType`把data序列化成合适的格式；
        - headers：发送的额外的HTTP头，必须是一个object；
        - dataType：接收的数据格式，可以指定为`'html'`、`'xml'`、`'json'`、`'text'`等，缺省情况下根据响应的`Content-Type`猜测
    - 回调函数处理返回的数据和出错时的响应。jQuery的jqXHR对象类似一个Promise对象，可以用链式写法来处理各种回调
    ```javascript
    function ajaxLog(s) {
        var txt = $('#test-response-text');
        txt.val(txt.val() + '\n' + s);
    }

    var jqxhr = $.ajax('/api/categories', {
        dataType: 'json'
    }).done(function (data) {
        ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
    }).fail(function (xhr, status) {
        ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
    }).always(function () {
        ajaxLog('请求完成: 无论成功或失败都会调用');
    });
    ```
- get
    - `$.get()`方法
    ```javascript
    var jqxhr = $.get('/path/to/resource', {
        name: 'Bob Lee',
        check: 1
    });
    ```
    第二个参数如果是object，jQuery自动把它变成query string然后加到URL后面，实际的URL是`/path/to/resource?name=Bob%20Lee&check=1`
- post跟`get`类似，但是传入的第二个参数默认被序列化为`application/x-www-form-urlencoded`，作为POST的body被发送
- `getJSON()`可以快速通过GET获取一个JSON对象
```javascript
var jqxhr = $.getJSON('/path/to/resource', {
    name: 'Bob Lee',
    check: 1
}).done(function (data) {
    // data已经被解析为JSON对象了
});
```
- 安全限制
如果需要使用JSONP，可以在`ajax()`中设置`jsonp: 'callback'`，让jQuery实现JSONP跨域加载数据