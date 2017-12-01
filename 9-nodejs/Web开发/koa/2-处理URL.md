# 处理URL

## koa-router
它负责处理URL映射。一个能集中处理URL的middleware，根据不同的URL调用不同的处理函数。
- 导入`koa-router`的语句最后的`()`是函数调用
- 使用`router.get('/path', async fn)`来注册一个GET请求。可以在路径中使用带变量的`/hello/:name`，变量可以通过`ctx.params.name`访问。路径中的`hello`也可以用变量表示.
```javascript
//导入koa，和koa 1.x不同，在koa2中，导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
//require('koa-router')返回的是函数
const router = require('koa-router')();
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 对于每个http请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
/*
*get请求
*/
//add url-router
router.get('/:title/:name', async(ctx, next) => {
    console.log(ctx.params);    //{title: '', name: ''}
    var name = ctx.params.name;
    var title = ctx.params.title;    
    ctx.response.body = `<h1>${title}, ${name}!</h1>`;
});
router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>`;
});

//add router middleware
app.use(router.routes());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
```

## 处理post请求
用`router.post('/path', async fn)`处理post请求。当post请求发送表单或者JSON时，是作为request的body发送的。这时需要引入`koa-bodyparser`来解析原始request请求，然后把解析后的参数，绑定到`ctx.request.body`中
- 在`package.json`添加依赖项：`"koa-bodyparser": "3.2.0"`
- 安装依赖，修改js文件，引入`koa-bodyparser`：`const bodyParser = require('koa-bodyparser');`
- `koa-bodyparser`必须在`router`之前被注册到`app`对象上：`app.use(bodyParser());`
```javascript
const Koa = require('koa');
//require('koa-router')返回的是函数
const router = require('koa-router')();
//引入koa-parser
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
/**
 * post请求
 */
router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin',async(ctx, next) => {
    var 
        name = ctx.request.body.name || '',
        pwd = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${pwd}`);
    if(name === 'koa' && pwd === '23333'){
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

//add router middleware
app.use(router.routes());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
```
put、delete、head请求都可以由router处理
GET、POST请求可参考(url-koa)[https://github.com/williamChann/learnjs/koa/url-koa]文件夹

## 重构
1. 把URL处理函数集中到某个js文件，或者某几个js文件中，通过将这些文件放入到某个文件夹里面，如`controllers`
2. 把扫描`controllers`目录和创建`router`的代码从`app.js`中提取出来，作为一个简单的middleware使用，命名为`controller.js`
```javascript
//controller.js
const fs = require('fs');   //导入fs模块

//创建router路由
function addMapping(router, mapping){
    for(var url in mapping){
        if(url.startsWith('GET')){  //GET路径方法
            var path = url.substring(4);
            router.get(path, mapping[url]);     //mapping[url]为该路径的异步处理方法，即async(ctx, next) => {}
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

//扫描目录
function addControllers(router, dir) {
    //用readdirSync列出文件，这里可以用sync是因为启动时只运行一次，不存在性能问题
    //__dirname:当前模块的目录名; __filename:当前模块文件的带有完整绝对路径的文件名
    var files = fs.readdirSync(__dirname + '/' + dir);

    //过滤出.js文件:
    var js_files = files.filter((f) => {
        return f.endsWith('.js');   //endsWith:判断当前字符串是否是以另外一个给定的子字符串“结尾”的，startsWith()同理
    });

    //处理每个js文件
    for(var f of js_files){     //es6循环方式
        console.log(`process controller: ${f}...`);         //f为controllers里面的js文件
        let mapping = require(__dirname + '/' + dir + '/' + f);     //导入js模块文件
        console.log(mapping);   //mapping就是module.exports暴露出的对象
        addMapping(router, mapping);    //对js模块文件暴露出来的URL进行处理
    }
}

module.exports = function (dir) {
    let 
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();       //require('koa-router')返回的是函数
    addControllers(router, controllers_dir);
    return router.routes();
}
```
3. 然后让`app.js`自动导入所有处理URL的函数
```javascript
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
//导入controller middleware
const controller = require('./controllers');        //这是一个函数[Function]

const app = new Koa();
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

//add router middleware
app.use(controller());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
```
可参考(url2-koa)[https://github.com/williamChann/learnjs/koa/url2-koa]文件夹