## AJAX
- AJAX请求是异步执行的，也就是说，要通过回调函数获得响应。写AJAX主要依靠`XMLHttpRequest`对象
```javascript
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');   //低版本的IE
}
request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {   //根据status === 200判断是否是一个成功的响应
            // 成功，通过responseText拿到响应的文本:
        } else {
            // 失败，根据响应码判断失败原因:
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
//XMLHttpRequest对象的open()方法有3个参数，第一个参数指定是GET还是POST，第二个参数指定URL地址，第三个参数指定是否使用异步，默认是true
request.send();
//send()方法才真正发送请求。GET请求不需要参数，POST请求需要把body部分以字符串或者FormData对象传进去
```
- 安全限制
    - 由于浏览器的同源策略，发送AJAX请求时，URL的域名必须和当前页面完全一致，即域名要相同，协议要相同，端口号要相同
    - 跨域请求
        - 通过Flash插件发送HTTP请求，这种方式可以绕过浏览器的安全限制，但必须安装Flash，并且跟Flash交互(已经很少用)
        - 通过在同源域名下架设一个代理服务器来转发，JavaScript负责把请求发送到代理服务器：`'/proxy?url=http://www.sina.com.cn'`，代理服务器再把结果返回，这样就遵守了浏览器的同源策略。这种方式需要服务器端额外做开发
        - `JSONP`，只能用GET请求，并且要求返回JavaScript。这种方式跨域实际上是利用了浏览器允许跨域引用JavaScript资源
- `CORS`，需要浏览器和服务器同时支持。IE浏览器低于IE10不支持。
    - 浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉
    - 实现CORS通信的关键在于服务器实现CORS接口，就可以跨源通信
    - 请求方法是以下三种方法之一：`HEAD`、`GET`、`POST`，HTTP的头信息不超出以下几种字段：`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`、`Content-Type`：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`。同时满足上述两个条件的就是简单请求，不然就是非简单请求。浏览器对这两种请求的处理，是不同的。[处理方式具体参考网站](http://www.ruanyifeng.com/blog/2016/04/cors.html)
    - CORS与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持`GET`请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。