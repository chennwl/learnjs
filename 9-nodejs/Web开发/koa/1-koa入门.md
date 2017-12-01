# koa入门

## 创建Koa2工程
1. 创建工程文件夹，编写app.js文件
    - 在koa2中，导入的是一个class，因此要用大写的Koa表示:`const Koa = require('koa');`
    - 创建一个Koa对象表示web app本身：`const app = new Koa();`
    - 对于每一个http请求，koa将调用传入的异步函数来处理：
    ```javascript
    //由async标记的函数叫做异步函数。在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入
    async (ctx, next) => {
        await next();       //处理下一个异步函数
        // 设置response的Content-Type:
        ctx.response.type = 'text/html';
        // 设置response的内容:
        ctx.response.body = '<h1>Hello, koa2!</h1>';
    }
    ```
    其中，参数`ctx`是由koa传入的封装了`request`和`response`的变量，可以通过它访问`request`和`response`，`next`是koa传入的将要处理的下一个异步函数。
    - app.js
    ```javascript
    // 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
    const Koa = require('koa');

    // 创建一个Koa对象表示web app本身:
    const app = new Koa();

    // 对于任何请求，app将调用该异步函数处理请求：
    app.use(async (ctx, next) => {
        await next();
        ctx.response.type = 'text/html';
        ctx.response.body = '<h1>Hello, koa2!</h1>';
    });

    // 在端口3000监听:
    app.listen(3000);
    console.log('app started at port 3000...');
    ```
2. 安装koa包
    - npm命令直接安装：`npm install koa@2.0.0`
    - 在工程文件夹下创建一个`package.json`，这个文件会描述`hello-koa`工程会用到哪些包。然后在工程目录下执行`npm install`就可以把所需包以及依赖包一次性安装好。
    ```javascript
    {
        "name": "hello-koa2",
        "version": "1.0.0",
        "description": "Hello Koa 2 example with async",
        "main": "app.js",
        "scripts": {
            "start": "node app.js"      //执行npm start命令就会执行start对应命令
        },
        "keywords": [
            "koa",
            "async"
        ],
        "author": "Michael Liao",
        "license": "Apache-2.0",
        "repository": {
            "type": "git",
            "url": "https://github.com/williamChann/learnjs.git"
        },
        "dependencies": {       //描述工程依赖的包以及版本号
            "koa": "2.0.0"
        }
    }
    ```

## koa middleware
- 每收到一个`http`请求，koa就会调用通过`app.use()`注册的`async`函数，并传入`ctx`和`next`参数。
- 调用`await next()`是因为koa把很多`async`函数组成一个处理链，每个`async`函数都可以做一些自己的事情，然后用`await next()`来调用下一个async函数。每个`async`函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
- middleware的顺序很重要，也就是调用`app.use()`的顺序决定了middleware的顺序。
- 如果一个middleware没有调用`await next()`，后续的middleware将不再执行

## ctx简写方法
`ctx.url` => `ctx.request.url`, `ctx.type` => `ctx.response.type`
