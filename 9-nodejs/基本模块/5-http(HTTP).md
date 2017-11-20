# http

## HTTP协议
- HTTP是在网络上传输HTML的协议，用于浏览器和服务器的通信。采用了非常简单的请求-响应模式
- HTTP请求
    1. 浏览器首先向服务器发送HTTP请求，请求包括：
        - 方法：`GET`还是`POST`，`GET`仅请求资源，`POST`会附带用户数据；
        - 路径：`/full/url/path`，如`/`则表示首页；
        - 域名：由Host头指定：如Host: `www.sina.com.cn`
        - 以及其他相关的Header；
        - 如果是POST，那么请求还包括一个Body，包含用户数据。
    2. 服务器向浏览器返回HTTP响应，响应包括：
        - 响应代码：200表示成功，3xx表示重定向，4xx表示客户端发送的请求有错误，5xx表示服务器端处理时发生了错误；
        - 响应类型：由`Content-Type`指定；`Content-type`有`text/html;charset=UTF-8`,`image/jpeg`等
        - 以及其他相关的Header；
        - 通常服务器的HTTP响应会携带内容，也就是有一个Body，包含响应的内容，网页的HTML源码就在Body中。
    3. 如果浏览器还需要继续向服务器请求其他资源，比如图片，就再次发出HTTP请求，重复步骤1、2。
    4. 一个HTTP请求只处理一个资源
- 一个站点可以链接到其他站点的资源，从而将请求压力分散到各个服务器上，无数个站点互相链接起来，就形成了World Wide Web，简称WWW。
- HTTP格式
    - 每个HTTP请求和响应都遵循相同的格式，一个HTTP包含Header和Body两部分，其中Body是可选的
    - HTTP请求和响应的格式是每个HEADER一行一个，换行符是`\r\n`。如果包含BODY，都是通过`\r\n\r\n`来分隔的。在HTTP POST请求中，BODY是用户数据；在HTTP响应中，BODY的数据类型是由`Content-Type`头来确定
    - 在HTTP响应中，当存在`Content-Encoding`时，Body数据是被压缩的，最常见的压缩方式是`gzip`，所以，看到`Content-Encoding: gzip`时，需要将Body数据先解压缩，才能得到真正的数据。压缩的目的在于减少Body的大小，加快网络传输。
    ```javascript
    //HTTP POST请求的格式
    POST /path HTTP/1.1
    Header1: Value1
    Header2: Value2
    Header3: Value3

    body data goes here...

    //HTTP响应的格式
    00 OK
    Header1: Value1
    Header2: Value2
    Header3: Value3

    body data goes here...
    ```
## HTTP服务器
- 开发HTTP服务器，可以操作`http`模块提供的`request`和`response`对象
- `request`对象封装了HTTP请求，调用`request`对象的属性和方法就可以拿到所有HTTP请求的信息；
- `response`对象封装了HTTP响应，操作`response`对象的方法，就可以把HTTP响应返回给浏览器。
```javascript
var http = require('http');

var content = 'Hello!';
// 创建http server，并传入回调函数:
var server = http.createServer(function(request,response){
    //每当页面发生请求时就会输出
    console.log(request.method + ":" + request.url);
    // 该方法只可调用一次，将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-type': 'text/html'});
    //发送响应主体,且可被多次调用
    response.write(content,"utf-8");
    //用于结束当前请求，不然当前请求会一直处在等待的状态
    response.end();
}).listen(8080);    // 让服务器监听8080端口

console.log('create a server at: 127.0.0.1:8080');
```
## 文件服务器：设定一个目录，然后让Web程序变成一个文件服务器。要实现这一点，只需要解析`request.url`中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了。
- 解析URL需要使用Node.js提供的`url`模块，通过`url.parse()`将一个字符串解析为一个Url对象
- 处理本地文件目录需要使用Node.js提供的`path`模块，它可以方便地构造目录.使用`path`模块可以正确处理操作系统相关的文件路径。
```javascript
var path = require('path');

//解析当前工作目录：
var workDir = path.resolve('.');        //  '/learning/learnjs'
// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');         // '/learning/learnjs/pub/index.html'
```
- 示例：
```javascript
'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
```
** 没有必要手动读取文件内容。由于`response`对象本身是一个`Writable Stream`，直接用`pipe()`方法就实现了自动读取文件内容并输出到HTTP响应
**