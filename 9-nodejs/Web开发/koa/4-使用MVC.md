# 使用MVC
- 当用户通过浏览器请求一个URL时，koa将调用某个异步函数处理该URL。在这个异步函数内部，可以用一行代码：`ctx.render('home.html', { name: 'Michael' });`，通过Nunjucks把数据用指定的模板渲染成HTML，然后输出给浏览器，用户就可以看到渲染后的页面了，这就是"MVC"，中文名"模型-视图-控制器"

## MVC实例
1. 编写每个页面的异步处理函数放在'controllers'文件夹里面，如'index.js'
2. 编写View页面
3. 编写middleware
    1. `controllers.js`，读取controllers里面的控制器js文件
    2. `static-files.js`，处理静态文件
    3. `templating.js`，集成Nunjucks，给ctx对象绑定一个`render(view, model)`的方法
    4. `app.js`

## 拓展
- 使用了一个`mz`的包，并通过`require('mz/fs');`导入。`mz`提供的API和Node.js的`fs`模块完全相同，但`fs`模块使用回调，而`mz`封装了`fs`对应的函数，并改为Promise。这样，就可以非常简单的用`await`调用`mz`的函数，而不需要任何回调。
- Node.js在全局变量`process`中定义了一个环境变量`env.NODE_ENV`，在开发的时候，环境变量应该设置为`'development'`，而生产环境上必须配置环境变量`NODE_ENV = 'production'`。在编写代码的时候，要根据当前环境作不同的判断。
- 读取静态文件的middleware，也要根据环境变量判断。在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。而在开发环境下，希望koa能顺带处理静态文件，否则，就必须手动配置一个反向代理服务器，这样会导致开发环境非常复杂。
- `ctx.render`内部渲染模板时，Model对象并不是传入的model变量，而是：`Object.assign({}, ctx.state || {}, model || {});`，这个小技巧是为了扩展。
    - `model || {}`确保了即使传入`undefined`，`model`也会变为默认值`{}`。`Object.assign()`会把除第一个参数外的其他参数的所有属性复制到第一个参数中。第二个参数是`ctx.state || {}`，这个目的是为了能把一些公共的变量放入`ctx.state`并传给`View`,如：
    ```javascript
    //某个middleware负责检查用户权限，它可以把当前用户放入ctx.state中：
    app.use(async (ctx, next) => {
        var user = tryGetUserFromCookie(ctx.request);
        if (user) {
            ctx.state.user = user;
            await next();
        } else {
            ctx.response.status = 403;
        }
    });
    ```